import React, { useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  ReactFlow, useNodesState, useEdgesState, addEdge,
  Controls, Background
} from "@xyflow/react";
import { useDrop } from "react-dnd";
import { nanoid } from 'nanoid';

import MessageNode from "./nodeTypes/MessageNode";
import UserResponseNode from "./nodeTypes/UserResponseNode";

import { show, update } from "@/api/repositories/ChatbotFlowRepository";
import { isBlank } from "@/utils/presence.ts";

const initialNodes = [];
const initialEdges = [];

const FlowCanvas = forwardRef(({ slug }, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const saveFlow = () => {
    const flowData = { nodes, edges };

    update(slug, { flowData: flowData })
      .then(() => {
        console.log("Flow updated!");
      })
      .catch((error) => {
        console.error("Ошибка обновления flow:", error);
      });
  };

  useImperativeHandle(ref, () => ({
    save: saveFlow
  }));

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
    if (isBlank(slug)) return;

    show(slug)
      .then((flow) => {
        const { nodes = [], edges = [] } = flow.data?.flowData || {};
        setNodes(nodes);
        setEdges(edges);
      })
      .catch((error) => {
        console.error("Ошибка загрузки flow:", error);
      });
  }, [slug]);

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
});

export default FlowCanvas;
