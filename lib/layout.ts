import dagre from "dagre";

// Node dimensions - adjust based on your actual node size
const NODE_WIDTH = 240;
const NODE_HEIGHT = 130;

/**
 * Apply Dagre layout to nodes and edges
 */
export function layoutTree(
  nodes: any[],
  edges: any[],
  direction: "TB" | "LR" = "TB"
) {
  // Create new dagre graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure layout
  dagreGraph.setGraph({
    rankdir: direction, // 'TB' for top-to-bottom (vertical tree)
    nodesep: 50, // Horizontal spacing between sibling nodes
    ranksep: 120, // Vertical spacing between levels
    marginx: 30,
    marginy: 30,
    align: "UL", // Upper Left alignment
  });

  // Set nodes with dimensions
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  // Set edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply positions to nodes
  const positionedNodes = nodes.map((node) => {
    const dagreNode = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: dagreNode.x - NODE_WIDTH / 2, // Center node
        y: dagreNode.y - NODE_HEIGHT / 2,
      },
      data: {
        ...node.data,
        // Ensure expanded state and onExpandToggle are preserved
        expanded: node.data?.expanded || false,
        onExpandToggle: node.data?.onExpandToggle,
      },
    };
  });

  return { nodes: positionedNodes, edges };
}

/**
 * Get visible nodes and edges based on expanded state
 */
export function getVisibleElements(
  allMembers: any[],
  expandedNodes: Set<string>,
  onExpandToggle: (id: string) => void
) {
  const visibleNodeIds = new Set<string>();
  const allNodes: any[] = [];
  const allEdges: any[] = [];

  // Always include top-level nodes (no reportsTo)
  const topLevelNodes = allMembers.filter((m) => !m.reportsTo);
  topLevelNodes.forEach((node) => visibleNodeIds.add(node.id));

  // Recursively add children of expanded nodes
  const addChildren = (parentId: string) => {
    if (expandedNodes.has(parentId)) {
      const children = allMembers.filter((m) => m.reportsTo === parentId);
      children.forEach((child) => {
        visibleNodeIds.add(child.id);
        addChildren(child.id);
      });
    }
  };

  // Start recursion from top-level nodes
  topLevelNodes.forEach((node) => addChildren(node.id));

  // Create nodes
  const visibleIds = Array.from(visibleNodeIds);
  visibleIds.forEach((id) => {
    const member = allMembers.find((m) => m.id === id);
    if (member) {
      const hasChildren = allMembers.some((m) => m.reportsTo === member.id);

      allNodes.push({
        id: member.id,
        type: "orgNode",
        data: {
          ...member,
          hasChildren,
          expanded: expandedNodes.has(member.id),
          onExpandToggle: onExpandToggle,
        },
        // Temporary position - will be set by dagre
        position: { x: 0, y: 0 },
      });
    }
  });

  // Create edges only between visible nodes
  allMembers.forEach((member) => {
    if (
      member.reportsTo &&
      visibleNodeIds.has(member.id) &&
      visibleNodeIds.has(member.reportsTo)
    ) {
      allEdges.push({
        id: `e${member.reportsTo}-${member.id}`,
        source: member.reportsTo,
        target: member.id,
        type: "smoothstep",
        animated: false,
        style: { stroke: "#94a3b8", strokeWidth: 2 },
      });
    }
  });

  return { nodes: allNodes, edges: allEdges };
}
