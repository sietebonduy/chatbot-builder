import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "🚀 Node 1" },
    style: {
      backgroundColor: "#1E40AF",
      color: "white",
      padding: 10,
      borderRadius: 10,
      boxShadow: "2px 4px 6px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "2",
    position: { x: 200, y: 100 },
    data: { label: "🔥 Node 2" },
    style: {
      backgroundColor: "#B91C1C",
      color: "white",
      padding: 10,
      borderRadius: 10,
      boxShadow: "2px 4px 6px rgba(0,0,0,0.2)",
    },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Hello: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#6366F1" } }, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-start p-4">
      <div className="w-full h-full border-2 border-gray-700 rounded-lg flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={{hideAttribution: true}}
          fitView
        >
          <Controls position='bottom-right'/>
          <Background color="#4B5563" variant={BackgroundVariant.Dots}/>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Hello;
