import { useDrag } from 'react-dnd';
import {
  FaPlay,
  FaCommentDots,
  FaCheckSquare,
  FaKeyboard,
  FaCodeBranch,
  FaUserCheck,
  FaCloudDownloadAlt,
} from 'react-icons/fa';

const NODE_TYPES = [
  {
    type: 'trigger',
    label: 'Старт',
    color: '#64748B',
    icon: <FaPlay />,
  },
  {
    type: 'message',
    label: 'Сообщение',
    color: '#3B82F6',
    icon: <FaCommentDots />,
  },
  {
    type: 'button',
    label: 'Кнопка',
    color: '#10B981',
    icon: <FaCheckSquare />,
  },
  {
    type: 'textInput',
    label: 'Текстовое поле',
    color: '#F59E0B',
    icon: <FaKeyboard />,
  },
  {
    type: 'condition',
    label: 'Условие',
    color: '#8B5CF6',
    icon: <FaCodeBranch />,
  },
  {
    type: 'userResponse',
    label: 'Ответ пользователя',
    color: '#EF4444',
    icon: <FaUserCheck />,
  },
  // {
  //   type: 'apiCall',
  //   label: 'API вызов',
  //   color: '#0EA5E9',
  //   icon: <FaCloudDownloadAlt />,
  // },
];


const NodeSelector = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {NODE_TYPES.map((nodeType) => (
        <DraggableNode key={nodeType.type} {...nodeType} />
      ))}
    </div>
  );
};

const DraggableNode = ({ type, label, color, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-move transition-all duration-200 
        ${isDragging ? 'opacity-60 scale-95' : 'hover:shadow-lg'} `}
      style={{
        backgroundColor: `${color}10`,
        borderColor: color,
      }}
    >
      <div className="text-md mb-2" style={{ color }}>
        {icon}
      </div>
      <div className="text-xs font-semibold text-center" style={{ color }}>
        {isDragging ? 'Перетаскивается...' : label || 'Без названия'}
      </div>
    </div>
  );
};

export default NodeSelector;
