import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Handle,
  Position
} from "@xyflow/react";
import { useDrag, useDrop } from 'react-dnd';
import Divider from '@mui/material/Divider';

import "@xyflow/react/dist/style.css";

const MessageNode = ({ data }) => (
  <div style={{ backgroundColor: "#FFFFFF", color: "#333333", padding: 10, borderRadius: 10, border: "1px solid #D1D5DB" }}>
    <Handle type="source" position={Position.Right} id="source" />
    <Handle type="target" position={Position.Left} id="target" />
    {data.label}
  </div>
);

const UserResponseNode = ({ data }) => (
  <div style={{ backgroundColor: "#F3F4F6", color: "#333333", padding: 10, borderRadius: 10, border: "1px solid #D1D5DB" }}>
    <Handle type="source" position={Position.Right} id="source" />
    <Handle type="target" position={Position.Left} id="target" />
    {data.label}
  </div>
);

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Привет! Как я могу помочь?" },
    type: "message",
  },
  {
    id: "2",
    position: { x: 250, y: 100 },
    data: { label: "Что бы вы хотели сделать?" },
    type: "message",
  },
  {
    id: "3",
    position: { x: 500, y: 200 },
    data: { label: "Какой ваш вопрос?" },
    type: "userResponse",
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "source",
    targetHandle: "target",
    label: "Начать"
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "source",
    targetHandle: "target",
    label: "Выбрать"
  },
];

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


const ChatbotBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = {
    message: MessageNode,
    userResponse: UserResponseNode
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      sourceHandle: 'source',
      targetHandle: 'target',
      animated: true,
      style: { stroke: "#A1A1AA" }
    }, eds)),
    [setEdges]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'node',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: offset.x - reactFlowBounds.left,
        y: offset.y - reactFlowBounds.top
      };

      const newNode = {
        id: `${Date.now()}`,
        position,
        data: { label: item.label },
        type: item.type,
      };

      setNodes((nds) => [...nds, newNode]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="h-screen flex flex-row bg-gray-50">
      <div className="h-full w-1/4 bg-white p-4">
        <h2 className="text-gray-800 text-xl mb-4">Компоненты</h2>

        <Divider flexItem />

        <div className="mt-4">
          <NodeSelector />
        </div>
      </div>

      <Divider orientation="vertical" variant="middle" flexItem />

      <div ref={drop} className="flex-grow bg-white p-4 overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Controls position="bottom-right" />
          <Background color="#5b5b5b" variant="dots" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ChatbotBuilder;
