export interface IFlowNodeStyle {
  color?: string;
  padding?: number;
  border_radius?: number;
  background_color?: string;
}

export interface IFlowNode {
  id: string;
  data: { label: string };
  type: string;
  style?: IFlowNodeStyle;
  dragging: boolean;
  measured?: { width: number; height: number };
  position: { x: number; y: number };
  selected?: boolean;
}

export interface IFlowEdgeStyle {
  stroke?: string;
}

export interface IFlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  selected?: boolean;
  style?: IFlowEdgeStyle;
  animated?: boolean;
}

export interface IViewport {
  x: number;
  y: number;
  zoom: number;
}

export interface IFlowData {
  nodes: IFlowNode[];
  edges: IFlowEdge[];
  viewport: IViewport;
}

export interface IRelationship<T extends string> {
  data: { id: string; type: T };
}

export interface IChatbotFlowAttributes {
  id: number;
  name: string;
  slug: string;
  description: string;
  flow_data: IFlowData;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IChatbotFlowResource {
  id: string;
  type: 'chatbot_flow';
  attributes: IChatbotFlowAttributes;
  relationships: {
    user: IRelationship<'user'>;
    bot?: IRelationship<'bot'>;
  };
}

export interface ICollectionResponse<T> { data: T[]; }
export interface ISingleResponse<T> { data: T; }

export interface IChatbotFlow {
  id: number;
  name: string;
  slug: string;
  description: string;
  flowData: IFlowData;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  botId?: number;
}

export interface ICreateChatbotFlowParams {
  name: string;
  description: string;
  bot_id: number | string;
}

export interface IUpdateChatbotFlowParams {
  name?: string;
  description?: string;
  flow_data?: IFlowData;
  published?: boolean;
}
