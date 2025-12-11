"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import PlusIcon from "./icons/PlusIcon";
import MinusIcon from "./icons/MinusIcon";

interface NodeData {
  id: string;
  name: string;
  title: string;
  photo: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  startDate: string;
  reportsTo?: string;
  expanded?: boolean;
  hasChildren?: boolean;
  onExpandToggle?: (id: string) => void;

  // Add these new properties
  tenure?: number;
  headcount?: number;
  avgTenure?: number;
}

export default function OrgChartNode({ data }: NodeProps<NodeData>) {
  const hasChildren = data.hasChildren || false;
  const isExpanded = data.expanded || false;

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren && data.onExpandToggle) {
      data.onExpandToggle(data.id);
    }
  };

  return (
    <div className="relative bg-white  px-4 py-2 shadow-lg rounded-xl border border-gray-200 w-[268px]   transition-all hover:shadow-xl hover:scale-[1.02] group duration-300 ">
      {/* Top connection handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Main content */}
      <div className="flex flex-col">
        {/* Member Photo and Info */}
        <div className="flex items-center gap-3 ">
          <div className="flex-shrink-0 h-full ">
            <img
              src={data.photo}
              alt={data.name}
              className="w-12 h-12 rounded-full border-3 border-gray-100 bg-gray-200 p-1 object-cover shadow-sm"
            />
          </div>

          <div className="flex-grow min-w-0 ">
            {/* Name and Title */}
            <div className="">
              <h3 className="font-semibold text-center text-gray-700 text-sm leading-tight ">
                {data.name}
              </h3>
              <p className="text-xs text-center text-gray-400 leading-tight">
                {data.title}
              </p>

              {/* Tenure in Header */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Tenure:</span>
                <span className="text-xs font-semibold text-gray-400">
                  {data.tenure}
                </span>
              </div>
              <div className="border-b border-dashed border-gray-400 my-1"></div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Headcount:</span>
                <span className="text-xs font-semibold text-gray-400">
                  {data.headcount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Avg Tenure:</span>
                <span className="text-xs font-semibold text-gray-400">
                  {data.avgTenure}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button - Bottom Center */}
        {hasChildren && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={handleExpandToggle}
              className="flex items-center justify-center  "
              aria-label={isExpanded ? "Collapse team" : "Expand team"}
            >
              {isExpanded ? (
                <MinusIcon className="w-3 h-3 text-gray-400" />
              ) : (
                <PlusIcon className="w-3 h-3 text-gray-400" />
              )}
            </button>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className={`!bg-gray-400 !w-3 !h-3 !border-2 !border-white opacity-0`}
      />
    </div>
  );
}
