"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { members, buildOrgChartNodes, getChildrenIds } from "@/lib/data";
import OrgChartNode from "@/components/OrgChartNode";
import MemberDetailsPanel from "@/components/MemberDetailsPanel";
import PlusIcon from "@/components/icons/PlusIcon";

const nodeTypes: NodeTypes = {
  orgNode: OrgChartNode,
};

export default function OrgChartPage() {
  // State for expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // State for React Flow
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // State for details panel
  const [selectedMember, setSelectedMember] = useState<
    (typeof members)[0] | null
  >(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Calculate visible nodes based on expanded state
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set<string>();

    // Always include top-level nodes
    const topLevelNodes = members.filter((m) => !m.reportsTo);
    topLevelNodes.forEach((node) => visibleIds.add(node.id));

    // Recursively add children of expanded nodes
    const addChildren = (parentId: string) => {
      if (expandedNodes.has(parentId)) {
        const children = members.filter((m) => m.reportsTo === parentId);
        children.forEach((child) => {
          visibleIds.add(child.id);
          addChildren(child.id); // Recursively add grandchildren if parent is expanded
        });
      }
    };

    // Start from top-level nodes
    topLevelNodes.forEach((node) => addChildren(node.id));

    return Array.from(visibleIds);
  }, [expandedNodes]);

  // Build nodes and edges when visible nodes change
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } =
      buildOrgChartNodes(visibleNodeIds);

    // Add expanded state to node data
    const updatedNodes = newNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        expanded: expandedNodes.has(node.id),
        onExpandToggle: handleExpandToggle,
      },
    }));

    setNodes(updatedNodes);
    setEdges(newEdges);
  }, [visibleNodeIds, expandedNodes, setNodes, setEdges]);

  // Handle node clicks to show details
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const member = members.find((m) => m.id === node.id);
    if (member) {
      setSelectedMember(member);
      setIsPanelOpen(true);
    }
  }, []);

  // Handle expand/collapse toggle
  const handleExpandToggle = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Fit view after nodes are updated
  useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.3,
          duration: 500,
          minZoom: 0.5,
          maxZoom: 1.5,
        });
      }, 50);
    }
  }, [reactFlowInstance, nodes]);

  // Initialize with CEO expanded
  useEffect(() => {
    setExpandedNodes(new Set(["1"])); // Expand CEO by default
  }, []);

  // Calculate tree statistics
  const treeStats = useMemo(() => {
    const totalMembers = members.length;
    const visibleMembers = visibleNodeIds.length;
    const expandedCount = expandedNodes.size;

    return { totalMembers, visibleMembers, expandedCount };
  }, [visibleNodeIds, expandedNodes]);

  // Handle expand all / collapse all
  const handleExpandAll = useCallback(() => {
    const allParentIds = members
      .filter((m) => members.some((child) => child.reportsTo === m.id))
      .map((m) => m.id);
    setExpandedNodes(new Set(allParentIds));
  }, []);

  const handleCollapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Header */}

      {/* Main React Flow Container */}
      <div className="h-full mt-4 pb-6 px-6">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          fitView
          defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          proOptions={{ hideAttribution: true }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200"
        >
          <Background
            color="#94a3b8"
            gap={40}
            size={1}
            className="opacity-70"
          />
          <Controls
            className="!shadow-xl !border !border-gray-300 !rounded-xl !p-1"
            showInteractive={true}
            position="bottom-right"
          />
          <MiniMap
            className="!shadow-xl !border !border-gray-300 !rounded-xl !overflow-hidden"
            nodeStrokeColor="#ffffff"
            nodeBorderRadius={8}
            position="bottom-left"
          />
        </ReactFlow>
      </div>

      {/* Details Panel */}
      <MemberDetailsPanel
        member={selectedMember}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
