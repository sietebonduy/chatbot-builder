import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrag } from 'react-dnd';
import { FaPlay, FaCommentDots, FaCheckSquare, FaKeyboard, FaCodeBranch, FaUserCheck } from 'react-icons/fa';

const NODE_TYPES = [
  { type:'trigger', label:'Старт', color:'#64748B', icon:<FaPlay /> },
  { type:'message', label:'Сообщение', color:'#3B82F6', icon:<FaCommentDots /> },
  { type: 'button', label: 'Кнопка', color: '#10B981', icon: <FaCheckSquare /> },
  { type: 'textInput', label: 'Текстовое поле', color: '#F59E0B', icon: <FaKeyboard /> },
  { type: 'condition', label: 'Условие', color: '#8B5CF6', icon: <FaCodeBranch /> },
  { type: 'userResponse', label: 'Ответ пользователя', color: '#EF4444', icon: <FaUserCheck /> },
];

export const DraggableNode = ({ type, label, color, icon }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({ type:'node', item:{type,label}, collect: m=>({ isDragging: m.isDragging() }) }), [type]);
  return (
    <div ref={drag} style={{ background: color + '10', border: '2px solid ' + color, opacity: isDragging?0.5:1, padding:8, marginBottom:8, cursor:'move' }}>
      <div style={{ color }}>{icon}</div>
      <div style={{ color }}>{label}</div>
    </div>
  );
};

const NodeSelector: React.FC = () => {
  const list = useMemo(() => NODE_TYPES, []);
  return <div style={{ padding:8 }}>{list.map(nt => <DraggableNode key={nt.type} {...nt} />)}</div>;
};
export default NodeSelector;
