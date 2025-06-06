import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import type {
  ReactFlowInstance,
  ReactFlowJsonObject,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
} from '@xyflow/react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { Menu, MenuItem } from '@mui/material';

import EditNodeModal from './EditNodeModal';
import ContextMenu from '@/components/UI/ContextMenu';
import {
  MessageNode,
  UserResponseNode,
  TextInputNode,
  ButtonNode,
  ConditionNode,
  APICallNode,
  TriggerNode,
  NotifyUserNode,
} from './nodeTypes';
import { show as fetchFlow, update as updateFlow } from '@/api/repositories/ChatbotFlowRepository';
import { normalizeFlow } from '@/lib/normalizeFlow';
import Loader from '@/components/UI/loader/Loader';
import finishNode from "./nodeTypes/FinishNode.tsx";

export interface FlowCanvasHandle {
  save: () => Promise<void>;
}

interface FlowCanvasProps {
  slug: string;
  onChange?: () => void;
}

type FlowNode = any;
type FlowEdge = Edge & { id: string };
type DragItem = { type: string; label: string };

const FlowCanvas = forwardRef<FlowCanvasHandle, FlowCanvasProps>(
  ({ slug, onChange }, ref) => {
    const { t } = useTranslation();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [savedViewport, setSavedViewport] = useState<{ x: number; y: number; zoom: number } | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);

    const [editingNode, setEditingNode] = useState<FlowNode | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ node: FlowNode; anchorEl: HTMLElement } | null>(null);
    const [edgeContextMenu, setEdgeContextMenu] = useState<{ edgeId: string; anchorEl: HTMLElement } | null>(null);

    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

    const nodeTypes = useMemo(
      () => ({
        message: MessageNode,
        userResponse: UserResponseNode,
        textInput: TextInputNode,
        button: ButtonNode,
        condition: ConditionNode,
        apiCall: APICallNode,
        trigger: TriggerNode,
        notifyUser: NotifyUserNode,
        finish: finishNode,
      }),
      []
    );

    const handleNodesChange = useCallback(
      (changes: NodeChange[]) => {
        onNodesChange(changes);
        onChange?.();
      },
      [onNodesChange, onChange]
    );

    const handleEdgesChange = useCallback(
      (changes: EdgeChange[]) => {
        onEdgesChange(changes);
        onChange?.();
      },
      [onEdgesChange, onChange]
    );

    const onConnect = useCallback(
      (conn: Connection) => {
        setEdges((eds) => addEdge({ ...conn, style: { stroke: '#A1A1AA' } }, eds));
        onChange?.();
      },
      [setEdges, onChange]
    );

    useEffect(() => {
      if (!slug) return;
      setLoading(true);
      fetchFlow(slug)
        .then((res) => {
          const domain = normalizeFlow(res.data.data);
          const { nodes: nds = [], edges: eds = [], viewport } = domain.flowData || {};
          setNodes(
            nds.map((n: FlowNode) => ({
              ...n,
              data: {
                ...n.data,
                onContextMenu: (e: React.MouseEvent<HTMLElement>) => handleOpenContextMenu(e, n),
              },
            }))
          );
          setEdges(eds as FlowEdge[]);
          if (viewport) setSavedViewport(viewport);
        })
        .catch(() => toast.error(t('notifications.error')))
        .finally(() => setLoading(false));
    }, [slug, t, setNodes, setEdges]);

    useEffect(() => {
      if (rfInstance && savedViewport) {
        rfInstance.setViewport(savedViewport);
        setSavedViewport(null);
      }
    }, [rfInstance, savedViewport]);

    const save = useCallback(async () => {
      if (!rfInstance) return;
      const { x, y, zoom } = rfInstance.getViewport();
      const flowData: ReactFlowJsonObject = { nodes, edges, viewport: { x, y, zoom } };
      try {
        await updateFlow(slug, { flowData });
        toast.success(t('notifications.success'));
      } catch {
        toast.error(t('notifications.error'));
      }
    }, [slug, nodes, edges, rfInstance, t]);
    useImperativeHandle(ref, () => ({ save }), [save]);

    const handleOpenContextMenu = useCallback(
      (e: React.MouseEvent<HTMLElement>, node: FlowNode) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ node, anchorEl: e.currentTarget });
      },
      []
    );
    const handleCloseContextMenu = useCallback(() => setContextMenu(null), []);

    const handleOpenEdgeContextMenu = useCallback(
      (e: React.MouseEvent<SVGElement>, edge: FlowEdge) => {
        e.preventDefault();
        e.stopPropagation();
        setEdgeContextMenu({ edgeId: edge.id, anchorEl: e.currentTarget });
      },
      []
    );
    const handleCloseEdgeContextMenu = useCallback(() => setEdgeContextMenu(null), []);
    const handleDeleteEdge = useCallback(() => {
      if (edgeContextMenu) {
        setEdges((eds) => eds.filter((e) => e.id !== edgeContextMenu.edgeId));
        handleCloseEdgeContextMenu();
      }
    }, [edgeContextMenu, setEdges, handleCloseEdgeContextMenu]);

    const handleOpenEdit = useCallback(
      (id: string) => {
        const node = nodes.find((n) => n.id === id);
        if (!node || node.type === 'trigger') return;
        setEditingNode(node);
        setIsModalOpen(true);
        handleCloseContextMenu();
      },
      [nodes, handleCloseContextMenu]
    );
    const handleDeleteNode = useCallback(
      (id: string) => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
        setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
        handleCloseContextMenu();
      },
      [setNodes, setEdges, handleCloseContextMenu]
    );
    const handleSaveNodeEdit = useCallback(
      (newData: any) => {
        if (!editingNode) return;
        setNodes((nds) =>
          nds.map((n) =>
            n.id === editingNode.id
              ? {
                ...n,
                data: {
                  ...n.data,
                  ...newData,
                  onContextMenu: (e: React.MouseEvent<HTMLElement>) => handleOpenContextMenu(e, n),
                },
              }
              : n
          )
        );
        setIsModalOpen(false);
        setEditingNode(null);
      },
      [editingNode, handleOpenContextMenu]
    );

    const [, drop] = useDrop({
      accept: 'node',
      drop: (item: DragItem, monitor) => {
        const offset = monitor.getClientOffset();
        const bounds = wrapperRef.current?.getBoundingClientRect();
        const vp = rfInstance?.getViewport() || { x: 0, y: 0, zoom: 1 };
        if (!offset || !bounds || !rfInstance) return;
        if (item.type === 'trigger' && nodes.some((n) => n.type === 'trigger')) {
          toast.warning(t('flow_builder.notifications.trigger_exists'));
          return;
        }
        const x = (offset.x - bounds.left - vp.x) / vp.zoom;
        const y = (offset.y - bounds.top - vp.y) / vp.zoom;
        const id = nanoid();
        setNodes((nds) => [
          ...nds,
          {
            id,
            type: item.type,
            position: { x, y },
            data: {
              label: item.label,
              onContextMenu: (e) => handleOpenContextMenu(e, { id } as any),
            },
          },
        ]);
        onChange?.();
      },
    });

    return (
      <div
        ref={(el) => {
          wrapperRef.current = el;
          drop(el!);
        }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <ReactFlow
          onInit={setRfInstance}
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={handleOpenContextMenu}
          onEdgeContextMenu={handleOpenEdgeContextMenu}
          onNodeDoubleClick={(e, node) => handleOpenEdit(node.id)}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          fitView
          nodesDraggable
          nodesConnectable
          elementsSelectable
        >
          <Controls position="bottom-right" />
          <Background color="#aaa" variant="dots" gap={12} />
        </ReactFlow>

        {contextMenu && (
          <ContextMenu
            node={contextMenu.node}
            anchorEl={contextMenu.anchorEl}
            open
            onClose={handleCloseContextMenu}
            onEdit={() => handleOpenEdit(contextMenu.node.id)}
            onDelete={() => handleDeleteNode(contextMenu.node.id)}
          />
        )}

        {edgeContextMenu && (
          <Menu
            anchorEl={edgeContextMenu.anchorEl}
            open
            onClose={handleCloseEdgeContextMenu}
          >
            <MenuItem onClick={handleDeleteEdge}>
              {t('flow_builder.delete_edge')}
            </MenuItem>
          </Menu>
        )}

        {editingNode && isModalOpen && (
          <EditNodeModal
            isOpen={isModalOpen}
            type={editingNode.type}
            initialData={editingNode.data}
            onSave={handleSaveNodeEdit}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {loading && (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}>
            <Loader />
          </div>
        )}
      </div>
    );
  }
);

export default FlowCanvas;
