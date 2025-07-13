import React, { forwardRef, MouseEvent, memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FaPlay, FaCommentDots, FaCheckSquare, FaKeyboard, FaCodeBranch, FaUserCheck, FaCloudDownloadAlt, FaCheckCircle } from 'react-icons/fa';
import type { INodeData, NodeType } from '@/types/flow';
import clsx from 'clsx';

const HANDLE_SIZE = 14;
const handleStyles: React.CSSProperties = {
  width: HANDLE_SIZE,
  height: HANDLE_SIZE,
  minWidth: HANDLE_SIZE,
  minHeight: HANDLE_SIZE,
  borderRadius: HANDLE_SIZE / 2,
  background: '#fff',
  border: '2px solid #555',
};

const nodeConfig: Record<
  NodeType,
  { bg: string; border: string; icon: React.ReactNode }
> = {
  trigger: { bg: 'bg-purple-100', border: 'border-purple-500', icon: <FaPlay className="text-purple-500" aria-label="Trigger icon" /> },
  message: { bg: 'bg-blue-100',   border: 'border-blue-500',   icon: <FaCommentDots className="text-blue-500" aria-label="Message icon" /> },
  button:  { bg: 'bg-green-100',  border: 'border-green-500',  icon: <FaCheckSquare className="text-green-500" aria-label="Button icon" /> },
  textInput: { bg: 'bg-yellow-100',border: 'border-yellow-500', icon: <FaKeyboard className="text-yellow-500" aria-label="Input icon" /> },
  condition: { bg: 'bg-violet-100',border: 'border-violet-500', icon: <FaCodeBranch className="text-violet-500" aria-label="Condition icon" /> },
  userResponse: { bg: 'bg-red-100', border: 'border-red-500',  icon: <FaUserCheck className="text-red-500" aria-label="User response icon" /> },
  apiCall: { bg: 'bg-cyan-100',   border: 'border-cyan-500',   icon: <FaCloudDownloadAlt className="text-cyan-500" aria-label="API call icon" /> },
  notifyUser: { bg: "bg-green-50", border: "border-green-300",   icon: <FaCheckCircle className="text-green-500" aria-label="Manager Request" /> },
  finish: { bg: "bg-stone-50", border: "border-stone-300", icon: <FaCheckCircle className="text-stone-500" aria-label="Finish icon" /> },
};

export interface NodeProps {
  data: INodeData;
  selected: boolean;
  type: NodeType;
}

const Node = forwardRef<HTMLDivElement, NodeProps>(({ data, selected, type }, ref) => {
  const config = nodeConfig[type];
  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); e.stopPropagation(); data.onContextMenu?.(e);
  };

  const renderSourceHandles = () => {
    if ((type === 'message' && data.options?.length > 0) || type === 'notifyUser' || type === 'finish') {
      return null;
    }

    switch (type) {
      case 'condition':
        return (
          <>
            <Handle type="source" position={Position.Right} id="true" style={handleStyles} />
            <Handle type="source" position={Position.Right} id="false" style={{ ...handleStyles, top: '70%' }} />
          </>
        );
      case 'apiCall':
        return (
          <>
            <Handle type="source" position={Position.Right} id="success" style={handleStyles} />
            <Handle type="source" position={Position.Bottom} id="error" style={{ ...handleStyles, left: '50%' }} />
          </>
        );
      default:
        return <Handle type="source" position={Position.Right} style={handleStyles} />;
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && data.onDoubleClick?.(e as any)}
      onDoubleClick={data.onEdit}
      onContextMenu={handleContextMenu}
      className={clsx(
        'relative w-60 p-4 rounded-2xl shadow-md cursor-pointer border-2 transition-colors duration-200 focus:outline-none',
        config.bg, config.border, selected && 'border-black', 'hover:shadow-lg'
      )}
      aria-label={`${type} node: ${data.label}`}
    >
      {type !== 'trigger' && (
        <Handle type="target" position={Position.Left} style={handleStyles} />
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl">{config.icon}</div>
        <div className="flex-1 text-sm font-semibold text-gray-800 truncate" title={data.label}>
          {data.label}
        </div>
      </div>

      {type === 'textInput' && (
        <input
          type="text"
          placeholder={(data as any).placeholder || data.label}
          disabled
          className="w-full px-3 py-2 text-sm border rounded-lg bg-white focus:ring focus:ring-opacity-50"
        />
      )}

      {type === 'message' && data.options?.length > 0 && (
        <div className="space-y-2 mt-2">
          {data.options.map((opt) => (
            <div key={opt.id} className="relative flex items-center bg-white border rounded-lg px-3 py-2">
              <span className="flex-1 text-sm font-medium text-gray-700">{opt.label}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={opt.id}
                style={handleStyles}
              />
            </div>
          ))}
        </div>
      )}

      {renderSourceHandles()}
    </div>
  );
});

Node.displayName = 'Node';
export default memo(Node);
