import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
} from '@xyflow/react';

import { INodeTypes } from '../types/nodeTypes.ts';

import MessageNode from '../components/editor/MessageNode';
import ButtonNode from '../components/editor/ButtonNode';
import ConditionNode from '../components/editor/ConditionNode';
import Sidebar from '../components/editor/Sidebar';

import '@xyflow/react/dist/style.css';

const nodeTypes: INodeTypes = {
  message: MessageNode,
  condition: ConditionNode,
  button: ButtonNode,
};

const initialNodes = [
  { id: "1", type: "message", position: { x: 0, y: 0 }, data: { label: "Hello!" } },
  { id: "2", type: "button", position: { x: 200, y: 100 }, data: { label: "Click Me", onClick: () => alert('Button clicked!') } },
  { id: "3", type: "condition", position: { x: 400, y: 200 }, data: { label: "If user says Hi" } }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Editor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#818CF8", strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const handleNodeClick = (_: any, node: any) => {
    setSelectedNode(node);
  };

  const updateNodeData = (id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...newData } } : node))
    );
  };

  const deleteNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    setSelectedNode(null);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full h-screen bg-gray-100">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={{ hideAttribution: true }}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Controls position="top-right" />
          <Background color="#6B7280" variant={BackgroundVariant.dots} />
        </ReactFlow>

        <Sidebar selectedNode={selectedNode} onUpdateNode={updateNodeData} onDeleteNode={deleteNode} />
      </div>
    </div>
  );
};

export default Editor;
