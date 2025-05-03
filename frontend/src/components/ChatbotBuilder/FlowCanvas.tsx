import React, { useCallback, useEffect } from "react";
import {
  ReactFlow, useNodesState, useEdgesState, addEdge,
  Controls, Background
} from "@xyflow/react";
import { useDrop } from "react-dnd";
import { nanoid } from 'nanoid';

import MessageNode from "./nodeTypes/MessageNode";
import UserResponseNode from "./nodeTypes/UserResponseNode";

import { show } from "@/api/repositories/ChatbotFlowRepository";

const initialNodes = [];
const initialEdges = [];

const FlowCanvas = ({ flowId = '1' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = { message: MessageNode, userResponse: UserResponseNode };

  const onConnect = useCallback(
    (params) => setEdges((eds) =>
      addEdge({ ...params, animated: true, style: { stroke: "#A1A1AA" } }, eds)
    ),
    [setEdges]
  );

  const [, drop] = useDrop(() => ({
    accept: "node",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const bounds = document.querySelector(".react-flow")?.getBoundingClientRect();
      if (!offset || !bounds) return;

      const position = {
        x: offset.x - bounds.left,
        y: offset.y - bounds.top,
      };

      const newNode = {
        id: nanoid(),
        position,
        data: { label: item.label },
        type: item.type,
      };

      setNodes((nds) => [...nds, newNode]);
    },
  }));

  useEffect(() => {
    if (!flowId) return;

    show(flowId)
      .then((flow) => {
        console.log(flow)
        const { nodes = [], edges = [] } = flow.data?.flowData || {};
        setNodes(nodes);
        setEdges(edges);
      })
      .catch((error) => {
        console.error("Ошибка загрузки flow:", error);
      });
  }, [flowId, setNodes, setEdges]);

  return (
    <div ref={drop} className="react-flow-wrapper w-full h-full">
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
  );
};

export default FlowCanvas;
