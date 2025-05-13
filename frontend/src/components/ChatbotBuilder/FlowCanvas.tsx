import React, { useCallback, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";

import { ReactFlow, Controls, Background } from "@xyflow/react";
import { addEdge, useNodesState, useEdgesState } from "@xyflow/react";
import type { ReactFlowInstance, ReactFlowJsonObject, Connection, XYPosition, NodeChange, EdgeChange } from '@xyflow/react';

import { useDrop, DropTargetMonitor } from "react-dnd";
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import EditNodeModal from "./EditNodeModal";
import ContextMenu from '@/components/UI/ContextMenu';
import { MessageNode, UserResponseNode, TextInputNode, ButtonNode, ConditionNode, APICallNode, TriggerNode } from './nodeTypes/Nodes';

import { show, update } from "@/api/repositories/ChatbotFlowRepository";
import { isBlank } from "@/utils/presence";

type FlowNode = {
  id: string;
  type: string;
  position: XYPosition;
  data: {
    label: string;
    onEdit: () => void;
    onContextMenu: (e: React.MouseEvent<HTMLElement>) => void;
    [key: string]: any;
  };
};

type DragItem = {
  type: string;
  label: string;
};

type FlowEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: { stroke: string };
};

interface IFlowCanvasProps {
  slug: string;
  onChange?: () => void;
}

const FlowCanvas = forwardRef(({ slug, onChange }: IFlowCanvasProps, ref) => {
  const { t } = useTranslation();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editingNode, setEditingNode] = useState<FlowNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const nodesRef = useRef(nodes);
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  const onInit = useCallback((rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi);
  }, []);

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    onChange?.();
  }, [onNodesChange, onChange]);

  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
    onChange?.();
  }, [onEdgesChange, onChange]);

  const saveFlow = useCallback(() => {
    if (!reactFlowInstance) return;

    const { x, y, zoom } = reactFlowInstance.getViewport?.() ?? { x: 0, y: 0, zoom: 1 };

    const flowData: ReactFlowJsonObject = {
      nodes,
      edges,
      viewport: { x, y, zoom },
    };

    update(slug, { flowData })
      .then(() => toast.success(t('notifications.success')))
      .catch(() => toast.error(t('notifications.error')));
  }, [nodes, edges, reactFlowInstance, slug, t]);

  useImperativeHandle(ref, () => ({
    save: saveFlow
  }));

  const nodeTypes = {
    message: MessageNode,
    userResponse: UserResponseNode,
    textInput: TextInputNode,
    button: ButtonNode,
    condition: ConditionNode,
    apiCall: APICallNode,
    trigger: TriggerNode
  };

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#A1A1AA" } },
          eds
        )
      );
      onChange?.();
    },
    [setEdges, onChange]
  );

  const [, drop] = useDrop({
    accept: "node",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const offset = monitor.getClientOffset();
      const bounds = wrapperRef.current?.getBoundingClientRect();

      if (!offset || !bounds || !reactFlowInstance) {
        console.warn("No offset/bounds/reactFlowInstance");
        return;
      }

      const zoom = reactFlowInstance.getZoom();

      const position = {
        x: (offset.x - bounds.left) / zoom,
        y: (offset.y - bounds.top) / zoom,
      };

      console.log("New node position:", position);

      const id = nanoid();
      const newNode = {
        id,
        type: item.type,
        position,
        data: {
          label: item.label,
          onEdit: () => handleEditNode(id),
          onContextMenu: (e: React.MouseEvent) => handleContextMenu(e, id),
        },
      };

      console.log("Adding node:", newNode);

      setNodes((nds) => {
        return [...nds, newNode];
      });
    }
  });

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLElement>, nodeId: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedNodeId(nodeId);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleCloseMenu = useCallback(() => {
    setContextMenuPosition(null);
    setSelectedNodeId(null);
  }, []);

  const handleEditNode = useCallback((nodeId: string) => {
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (!node) return;
    setEditingNode(node);
    setIsModalOpen(true);
    handleCloseMenu();
  }, [handleCloseMenu]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    handleCloseMenu();
  }, [handleCloseMenu, setEdges, setNodes]);

  const handleSaveNode = useCallback((newLabel: string) => {
    if (!editingNode) return;

    const nodeId = editingNode.id;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? {
            ...n,
            data: {
              ...n.data,
              label: newLabel,
              onEdit: () => handleEditNode(n.id),
              onContextMenu: (e) => handleContextMenu(e, n.id),
            },
          }
          : n
      )
    );

    setEditingNode(null);
    setIsModalOpen(false);
  }, [editingNode, handleContextMenu, handleEditNode]);

  useEffect(() => {
    if (isBlank(slug)) return;

    const loadFlow = async () => {
      try {
        const flow = await show(slug);
        const flowData: ReactFlowJsonObject = flow.data?.flowData || { nodes: [], edges: [] };
        const { nodes = [], edges = [], viewport } = flowData;

        setNodes(
          nodes.map((n: FlowNode) => ({
            ...n,
            data: {
              ...n.data,
              onEdit: () => handleEditNode(n.id),
              onContextMenu: (e) => handleContextMenu(e, n.id),
            },
          }))
        );
        setEdges(edges);

        if (viewport && reactFlowInstance) {
          reactFlowInstance.setViewport(viewport);
        }
      } catch {
        toast.error(t('notifications.load_error'));
      }
    };

    loadFlow();
  }, [slug, handleContextMenu, handleEditNode, setEdges, setNodes, reactFlowInstance, t]);

  return (
    <div ref={drop} className="w-full h-full" style={{ position: 'relative' }}>
      <div ref={wrapperRef} className="react-flow-wrapper w-full h-full">
        <ReactFlow
          onInit={onInit}
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          fitView
          nodesDraggable
          nodesConnectable
          elementsSelectable
        >
          <Controls position="bottom-right" />
          <Background color="#5b5b5b" variant="dots" />
        </ReactFlow>
      </div>

      {isModalOpen && editingNode && (
        <EditNodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialLabel={editingNode.data.label}
          onSave={handleSaveNode}
        />
      )}

      {contextMenuPosition && (
        <ContextMenu
          anchorEl={document.elementFromPoint(contextMenuPosition.x, contextMenuPosition.y)}
          open
          onClose={handleCloseMenu}
          onEdit={() => selectedNodeId && handleEditNode(selectedNodeId)}
          onDelete={() => selectedNodeId && handleDeleteNode(selectedNodeId)}
        />
      )}
    </div>
  );
});

export default FlowCanvas;
