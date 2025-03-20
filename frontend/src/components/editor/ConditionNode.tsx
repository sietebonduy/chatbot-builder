import { Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const ConditionNode = ({ data }) => (
  <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md">
    <p>{data.label}</p>
    <Handle type="source" position={Position.Bottom} className="bg-white w-2 h-2 rounded-full" />
    <Handle type="target" position={Position.Top} className="bg-white w-2 h-2 rounded-full" />
  </div>
);

export default ConditionNode;
