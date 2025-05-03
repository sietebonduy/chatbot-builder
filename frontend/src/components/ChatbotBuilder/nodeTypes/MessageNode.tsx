import React from "react";
import { Handle, Position } from "@xyflow/react";

const MessageNode = ({ data }) => (
  <div className="bg-white text-gray-800 p-3 rounded-lg border border-gray-300">
    <Handle type="source" position={Position.Right} id="source" />
    <Handle type="target" position={Position.Left} id="target" />
    {data.label}
  </div>
);

export default MessageNode;
