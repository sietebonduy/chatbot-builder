import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import type { IChat, IChatAttributes, IJSONAPIResponse } from '@/types/chat';
import { normalizeChatResource, normalizeChatsBatch } from '@/lib/normalizeChat';

interface ChatIndexResponse {
  data: IJSONAPIResource<IChatAttributes>[];
  included: IJSONAPIResource[];
}

interface ShowResponse {
  data: IJSONAPIResource<IChatAttributes>;
  included: IJSONAPIResource[];
}

export const index = async (botId: number | string): Promise<IChat[]> => {
  const url = `${Routes.API.V1.CHAT.ROOT}?bot_id=${botId}&include=client,bot,messages`;

  const response = await FetchHelpers.get<ChatIndexResponse>(url);

  const { data, included } = response.data;

  return normalizeChatsBatch(data, included);
};

export const show = async (chatId: number | string): Promise<IChat> => {
  const url = `${Routes.API.V1.CHAT.ROOT}/${chatId}`;

  const response = await FetchHelpers.get<ShowResponse>(url);

  const { data, included = [] } = response.data;

  return normalizeChatResource(data, included);
};

export const sendMessage = async (chatId: number | string, content: string): Promise<IChat> => {
  const url = `${Routes.API.V1.CHAT.ROOT}/${chatId}/send_message`;

  return FetchHelpers.post<T>(url, { content, chatId });
};
