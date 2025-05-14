import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import type {
  IChatbotFlowResource,
  ICollectionResponse,
  ISingleResponse,
  ICreateChatbotFlowParams,
  IUpdateChatbotFlowParams,
} from '@/types/chatbotFlow';

export const index = () => {
  const url = Routes.API.V1.CHATBOT_FLOWS.ROOT;

  return FetchHelpers.get<ICollectionResponse<IChatbotFlowResource>>(url);
};

export const show = (id: number | string) => {
  const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;

  return FetchHelpers.get<ISingleResponse<IChatbotFlowResource>>(url);
};

export const create = (params: ICreateChatbotFlowParams) => {
  const url = Routes.API.V1.CHATBOT_FLOWS.ROOT;

  return FetchHelpers.post<ISingleResponse<IChatbotFlowResource>>(url, params);
};

export const update = (id: number | string, params: IUpdateChatbotFlowParams) => {
  const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;

  return FetchHelpers.put<ISingleResponse<IChatbotFlowResource>>(url, params);
};

export const destroy = (id: number | string) => {
  const url = `${Routes.API.V1.CHATBOT_FLOWS.ROOT}/${id}`;

  return FetchHelpers.delete<void>(url);
};
