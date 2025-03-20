import { Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const MessageNode = ({ data }) => (
  <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
    <p>{data.label}</p>
    <Handle type="source" position={Position.Bottom} className="bg-white w-2 h-2 rounded-full" />
  </div>
);

export default MessageNode;