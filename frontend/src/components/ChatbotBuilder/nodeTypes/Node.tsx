import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface NodeProps {
  data: {
    label: string;
    onEdit?: () => void;
    onContextMenu?: (e: React.MouseEvent<HTMLElement>) => void;
  };
  selected: boolean;
  type: 'message' | 'userResponse' | 'textInput' | 'button' | 'condition' | 'apiCall' | 'trigger';
  position: { x: number; y: number };
}

const Node: React.FC<NodeProps> = ({ data, selected, type, position = { x: 0, y: 0 } }) => {
  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    data.onContextMenu?.(e);
  };

  const renderNodeContent = () => {
    switch (type) {
      case 'message':
        return <div className="p-2">{data.label}</div>;
      case 'userResponse':
        return <div className="p-2 bg-blue-50 rounded">{data.label}</div>;
      case 'textInput':
        return <input type="text" placeholder={data.label} className="border p-2 rounded w-full" />;
      case 'button':
        return <button className="border p-2 rounded bg-gray-100 w-full">{data.label}</button>;
      case 'condition':
        return <div className="p-2 bg-yellow-50 rounded">Condition: {data.label}</div>;
      case 'apiCall':
        return <div className="p-2 bg-green-50 rounded">API: {data.label}</div>;
      case 'trigger':
        return <div className="p-2 bg-purple-50 rounded">START</div>;
      default:
        return <div className="p-2 bg-gray-100 rounded">Unknown node</div>;
    }
  };

  const commonStyle = {
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    position: 'absolute',
    left: position.x,
    top: position.y,
  };

  return (
    <div
      onDoubleClick={data.onEdit}
      onContextMenu={handleContextMenu}
      className={`p-3 border rounded bg-white text-black cursor-pointer ${
        selected ? 'border-blue-500' : 'border-gray-300'
      }`}
      style={commonStyle}
    >
      {type !== 'trigger' && (
        <Handle type="target" position={Position.Left} />
      )}

      {type === 'message' && (
        <>
          {renderNodeContent()}
          <Handle type="source" position={Position.Right} />
        </>
      )}

      {type === 'userResponse' && (
        <>
          {renderNodeContent()}
          <Handle type="source" position={Position.Right} id="source" />
        </>
      )}

      {type === 'textInput' && (
        <>
          {renderNodeContent()}
          <Handle type="source" position={Position.Right} />
        </>
      )}

      {type === 'button' && (
        <>
          {renderNodeContent()}
          <Handle type="source" position={Position.Right} />
        </>
      )}

      {type === 'condition' && (
        <>
          {renderNodeContent()}
          <Handle
            type="source"
            position={Position.Right}
            id="true"
            style={{ top: '30%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="false"
            style={{ top: '70%' }}
          />
        </>
      )}

      {type === 'apiCall' && (
        <>
          {renderNodeContent()}
          <Handle type="source" position={Position.Right} id="success" />
          <Handle
            type="source"
            position={Position.Bottom}
            id="error"
            style={{ left: '50%' }}
          />
        </>
      )}

      {type === 'trigger' && (
        <>
          {renderNodeContent()}
          <Handle type="source" position={Position.Right} />
        </>
      )}
    </div>
  );
};

export default Node;
