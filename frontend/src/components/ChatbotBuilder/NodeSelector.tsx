import { useDrag } from 'react-dnd';

const NODE_TYPES = [
  {
    type: 'message',
    label: 'Новое сообщение',
    description: 'Перетащите для создания нового сообщения',
    color: '#3B82F6'
  },
  {
    type: 'button',
    label: 'Новая кнопка',
    description: 'Перетащите для создания кнопки',
    color: '#10B981'
  },
  {
    type: 'textInput',
    label: 'Текстовое поле',
    description: 'Перетащите для создания текстового поля',
    color: '#F59E0B'
  },
  {
    type: 'condition',
    label: 'Условие',
    description: 'Перетащите для создания условия ветвления',
    color: '#8B5CF6'
  }
];

const NodeSelector = () => {
  return (
    <div className="space-y-4 p-4">
      {NODE_TYPES.map((nodeType) => (
        <DraggableNode key={nodeType.type} {...nodeType} />
      ))}
    </div>
  );
};

const DraggableNode = ({ type, label, description, color }) => {
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
      className={`p-4 rounded-lg border-2 cursor-move transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 hover:shadow-md'
      }`}
      style={{
        backgroundColor: `${color}10`,
        borderColor: color,
      }}
    >
      <div
        className="font-semibold"
        style={{ color }}
      >
        {isDragging ? 'Перетаскивается...' : label}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {description}
      </div>
    </div>
  );
};

export default NodeSelector;