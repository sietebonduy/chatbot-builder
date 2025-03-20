import React from "react";
import { Handle, Position } from "@xyflow/react";

const ButtonNode = ({ data }: any) => {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-red-500 text-white">
      <strong>{data.label}</strong>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default ButtonNode;
