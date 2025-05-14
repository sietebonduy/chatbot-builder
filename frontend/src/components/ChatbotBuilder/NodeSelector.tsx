import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrag } from 'react-dnd';
import {
  FaPlay,
  FaCommentDots,
  FaCheckSquare,
  FaKeyboard,
  FaCodeBranch,
  FaUserCheck,
} from 'react-icons/fa';

interface NodeType {
  type: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

const NODE_TYPES: NodeType[] = [
  { type: 'trigger', label: 'Старт', color: '#64748B', icon: <FaPlay /> },
  { type: 'message', label: 'Сообщение', color: '#3B82F6', icon: <FaCommentDots /> },
  { type: 'button', label: 'Кнопка', color: '#10B981', icon: <FaCheckSquare /> },
  { type: 'textInput', label: 'Текстовое поле', color: '#F59E0B', icon: <FaKeyboard /> },
  { type: 'condition', label: 'Условие', color: '#8B5CF6', icon: <FaCodeBranch /> },
  { type: 'userResponse', label: 'Ответ пользователя', color: '#EF4444', icon: <FaUserCheck /> },
];

const NodeSelector: React.FC = () => {
  const { t } = useTranslation();
  const NODE_LIST = useMemo(() => NODE_TYPES, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {NODE_LIST.map((nt) => (
        <DraggableNode key={nt.type} {...nt} />
      ))}
    </div>
  );
};

interface DraggableNodeProps extends NodeType {}

const DraggableNode: React.FC<DraggableNodeProps> = ({ type, label, color, icon }) => {
  const { t } = useTranslation();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'node',
      item: { type, label },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [type, label]
  );

  return (
    <div
      ref={drag}
      role="option"
      aria-grabbed={isDragging}
      className={`w-full h-28 flex flex-col items-center justify-center p-2 border-2 rounded-lg cursor-move transition-transform duration-200 ${
        isDragging ? 'opacity-60 scale-95' : 'hover:scale-105 hover:shadow-lg'
      }`}
      style={{
        backgroundColor: `${color}10`,
        borderColor: color,
      }}
    >
      <div className="text-xl mb-1" style={{ color }}>
        {icon}
      </div>
      <div className="text-xs font-semibold text-center" style={{ color }}>
        {isDragging ? t('node_selector.dragging') : label}
      </div>
    </div>
  );
};

export default NodeSelector;
