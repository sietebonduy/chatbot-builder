import React from "react";
import { useDrag } from 'react-dnd';

const NodeSelector = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { type: 'message', label: 'Новое сообщение' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white text-gray-800 p-5 mb-4 cursor-move rounded-xl border shadow-lg transition-all duration-300 ease-in-out transform ${isDragging ? 'opacity-50 scale-105' : 'opacity-100'}`}
      style={{
        borderColor: '#D1D5DB',
        boxShadow: isDragging ? '0 10px 20px rgba(0, 0, 0, 0.15)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="text-lg font-medium">{isDragging ? 'Перетаскивайте...' : 'Новое сообщение'}</div>
      <div className="mt-2 text-sm text-gray-500">Перетащите для создания нового сообщения</div>
    </div>
  );
};

export default NodeSelector;