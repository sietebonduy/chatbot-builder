import React from "react";
import { Handle, Position } from "@xyflow/react";

const UserResponseNode = ({ data }) => (
  <div style={{ backgroundColor: "#F3F4F6", color: "#333333", padding: 10, borderRadius: 10, border: "1px solid #D1D5DB" }}>
    <Handle type="source" position={Position.Right} id="source" />
    <Handle type="target" position={Position.Left} id="target" />
    {data.label}
  </div>
);

export default UserResponseNode;
