import React from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  FaPlay,
  FaCommentDots,
  FaCheckSquare,
  FaKeyboard,
  FaCodeBranch,
  FaUserCheck,
  FaCloudDownloadAlt,
} from 'react-icons/fa';
import type { INodeData } from '@/types/flow';

export interface NodeProps {
  data: INodeData;
  selected: boolean;
  type: keyof typeof typeStyles;
}

const typeStyles = {
  trigger: {
    bg: 'bg-purple-100 border-purple-500',
    icon: <FaPlay className="text-purple-500" />,
  },
  message: {
    bg: 'bg-blue-100 border-blue-500',
    icon: <FaCommentDots className="text-blue-500" />,
  },
  button: {
    bg: 'bg-green-100 border-green-500',
    icon: <FaCheckSquare className="text-green-500" />,
  },
  textInput: {
    bg: 'bg-yellow-100 border-yellow-500',
    icon: <FaKeyboard className="text-yellow-500" />,
  },
  condition: {
    bg: 'bg-violet-100 border-violet-500',
    icon: <FaCodeBranch className="text-violet-500" />,
  },
  userResponse: {
    bg: 'bg-red-100 border-red-500',
    icon: <FaUserCheck className="text-red-500" />,
  },
  apiCall: {
    bg: 'bg-cyan-100 border-cyan-500',
    icon: <FaCloudDownloadAlt className="text-cyan-500" />,
  },
} as const;

const Node: React.FC<NodeProps> = ({ data, selected, type }) => {
  const style = typeStyles[type];

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    data.onContextMenu?.(e);
  };

  return (
    <div
      onDoubleClick={data.onEdit}
      onContextMenu={handleContextMenu}
      className={`
        relative w-48 p-3 rounded shadow-sm cursor-pointer border-2 transition-colors duration-200
        ${style.bg} ${selected ? 'border-black' : ''}
      `}
    >
      {type !== 'trigger' && <Handle type="target" position={Position.Left} />}

      <div className="flex items-center gap-2 mb-2">
        <div className="text-xl">{style.icon}</div>
        <div className="text-sm font-semibold text-gray-800">
          {data.label}
        </div>
      </div>

      {type === 'textInput' && (
        <input
          type="text"
          placeholder={(data as any).placeholder || data.label}
          disabled
          className="w-full px-2 py-1 text-sm border rounded bg-white"
        />
      )}

      {type === 'button' && (
        <button className="w-full px-2 py-1 text-sm font-medium text-gray-700 bg-white border rounded">
          {data.label}
        </button>
      )}

      {['message', 'userResponse', 'textInput', 'button', 'trigger'].includes(type) && (
        <Handle type="source" position={Position.Right} />
      )}

      {type === 'condition' && (
        <>
          <Handle type="source" position={Position.Right} id="true" style={{ top: '30%' }} />
          <Handle type="source" position={Position.Right} id="false" style={{ top: '70%' }} />
        </>
      )}

      {type === 'apiCall' && (
        <>
          <Handle type="source" position={Position.Right} id="success" />
          <Handle type="source" position={Position.Bottom} id="error" style={{ left: '50%' }} />
        </>
      )}
    </div>
  );
};

export default Node;
