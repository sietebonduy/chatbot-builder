export interface IChatbotFlow {
  id: number;
  name: string;
  slug: string;
  description: string;
  flowData: IFlowData;
  userId: number;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IFlowData {
  nodes: any[];
  edges: any[];
}

export interface ICreateChatbotFlowParams {
  name: string;
  description: string;
  botId: number | string;
}

export interface IUpdateChatbotFlowParams {
  flow_data?: IFlowData;
  name?: string;
  description?: string;
  published?: boolean;
}
