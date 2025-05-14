import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import type { IBot, ICreateBotParams, IUpdateBotParams } from '@/types/bot';

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

export const update = (id: number | string, params: IUpdateBotParams) => {
  const url = `${Routes.API.V1.BOTS.ROOT}/${id}`;

  return FetchHelpers.put<IChatbotFlow>(url, params);
};

export const destroy = (id: number | string) => {
  const url = `${Routes.API.V1.BOTS.ROOT}/${id}`;

  return FetchHelpers.delete<void>(url);
};

export const checkStatus = (id: number | string) => {
  const url = `${Routes.API.V1.BOTS.CHECK_STATUS}?id=${id}`;

  return FetchHelpers.get<IBot>(url, id);
};
