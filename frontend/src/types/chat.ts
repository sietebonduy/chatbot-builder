export interface IChatAttributes {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface IClientAttributes {
  id: number;
  chat_id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  bot_id: number;
  avatarUrl: string | null;
}

export interface IBotAttributes {
  id: number;
  username: string;
  name: string;
  provider: string;
  is_active: boolean;
  webhook_url: string;
  default_response: string;
}

export interface IMessageAttributes {
  id: number;
  chat_id: number;
  content: string;
  from_bot: boolean;
  created_at: string;
}

export interface IChat {
  id: number;
  createdAt: string;
  updatedAt: string;
  client: IClientAttributes;
  bot: IBotAttributes;
  messages: IMessageAttributes[];
}

export interface IJSONAPIReference {
  id: string;
  type: string;
}

export interface IJSONAPIResource<T = any> {
  id: string;
  type: string;
  attributes: T;
  relationships?: Record<string, { data: IJSONAPIReference | IJSONAPIReference[] }>;
}

export interface IJSONAPIResponse<T = any> {
  data: IJSONAPIResource<T>;
  included?: IJSONAPIResource[];
}

export interface IMessageResponse {
  data: IMessageAttributes;
}


