import React from "react";
import NodeSelector from "./NodeSelector";

const NodeSidebar = () => {
  return (
    <aside className="h-full w-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Компоненты</h2>
        <NodeSelector />
      </div>
    </aside>
  );
};

export default NodeSidebar;
