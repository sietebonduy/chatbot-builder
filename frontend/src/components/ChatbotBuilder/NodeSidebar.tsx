import React from "react";
import Divider from "@mui/material/Divider";
import NodeSelector from "./NodeSelector";

const NodeSidebar = () => {
  return (
    <div className="h-full w-full bg-white p-4">
      <h2 className="text-gray-800 text-xl mb-4">Компоненты</h2>

      <div className="mt-4">
        <NodeSelector />
      </div>
    </div>
  );
};

export default NodeSidebar;
