import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import type { IChatbotFlow, IUpdateChatbotFlowParams, ICreateChatbotFlowParams } from "@/types/chatbotFlow";

export const index = () => {
  const url = Routes.API.V1.CHATBOT_FLOWS.ROOT;

  return FetchHelpers.get<any[]>(url);
};

export const show = (id: number | string) => {
  const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;

  return FetchHelpers.get<IChatbotFlow>(url);
};

export const create = (params: ICreateChatbotFlowParams) => {
  const url = Routes.API.V1.CHATBOT_FLOWS.ROOT;

  return FetchHelpers.post<IChatbotFlow>(url, params);
};

export const update = (id: number | string, params: IUpdateChatbotFlowParams) => {
  const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;

  return FetchHelpers.put<IChatbotFlow>(url, params);
};

export const destroy = (id: number | string) => {
  const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;

  return FetchHelpers.delete<T>(url);
};
