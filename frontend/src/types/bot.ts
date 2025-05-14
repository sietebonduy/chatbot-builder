export interface IBotAttributes {
  id: number;
  provider: string;
  token: string;
  extra: Record<string, any>;
  username: string | null;
  bot_id: string | null;
  name: string | null;
  is_active: boolean;
  webhook_url: string | null;
  webhook_set_at: string | null;
  last_used_at: string | null;
  default_reply: string | null;
  default_response: string;
  message_count: number;
  error_count: number;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface IBotResource {
  id: string;
  type: "bot";
  attributes: IBotAttributes;
}

export interface IBot {
  id: number;
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  provider: string;
  token: string;
  userId: number;
  extra: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  webhookUrl: string | null;
  webhookSetAt: string | null;
  lastUsedAt: string | null;
  defaultReply: string | null;
  defaultResponse: string;
  messageCount: number;
  errorCount: number;
}

export interface ICreateBotParams {
  userId: number;
  name: string | null;
  provider: string;
  token: string;
  defaultResponse: string | null;
}

export interface IUpdateBotParams {
  name: string | null;
  provider: string;
  token: string;
  defaultResponse: string | null;
  isActive?: boolean;
  extra?: Record<string, any>;
}

export interface IBotListParams {
  userId?: number;
  provider?: string;
  withoutFlows?: boolean;
  includeBotId?: number | string;
}
