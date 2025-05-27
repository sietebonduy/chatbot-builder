import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrag } from 'react-dnd';
import { FaPlay, FaCommentDots, FaCheckSquare, FaKeyboard, FaCodeBranch, FaUserCheck } from 'react-icons/fa';

const NODE_CONFIGS = [
  { type:'trigger', color:'#64748B', icon:<FaPlay /> },
  { type:'message', color:'#3B82F6', icon:<FaCommentDots /> },
  // { type: 'button', color: '#10B981', icon: <FaCheckSquare /> },
  { type: 'textInput', color: '#F59E0B', icon: <FaKeyboard /> },
  { type: 'condition', color: '#8B5CF6', icon: <FaCodeBranch /> },
  { type: 'userResponse', color: '#EF4444', icon: <FaUserCheck /> },
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
  const { t } = useTranslation();
  const list = useMemo(() =>
    NODE_CONFIGS.map((config) => ({
      ...config,
      label: t(`flow_builder.node_selector.node_types.${config.type}`),
    })), [t]
  );

  return <div style={{ padding: 8 }}>{list.map(nt => <DraggableNode key={nt.type} {...nt} />)}</div>;
};

export default NodeSelector;
