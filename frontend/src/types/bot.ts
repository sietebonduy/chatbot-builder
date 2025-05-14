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
}