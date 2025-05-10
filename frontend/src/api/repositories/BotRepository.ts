import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';

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
}

export const index = () => {
  const url = Routes.API.V1.BOTS.ROOT;

  return FetchHelpers.get<IBot[]>(url);
};

export const show = (id: number | string) => {
  const url = `${Routes.API.V1.BOTS.ROOT}/${id}`;

  return FetchHelpers.get<IBot>(url);
};

export const create = (params: ICreateBotParams) => {
  const url = Routes.API.V1.BOTS.ROOT;

  return FetchHelpers.post<IBot>(url, params);
};
//
// export const update = (id: number | string, params: IUpdateChatbotFlowParams) => {
//   const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;
//
//   return FetchHelpers.put<IChatbotFlow>(url, params);
// };

export const destroy = (id: number | string) => {
  const url = `${Routes.API.V1.BOTS.ROOT}/${id}`;

  return FetchHelpers.delete<T>(url);
};
