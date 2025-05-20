import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';

export const index = () => {
  const url = Routes.API.V1.ANALYTICS.ROOT;

  return FetchHelpers.get<T>(url);
};

export const getMessagesOverTime = () => {
  const url = `${Routes.API.V1.ANALYTICS.ROOT}/messages_over_time`;

  return FetchHelpers.get<T>(url);
};

export const getChatsOverTime = () => {
  const url = `${Routes.API.V1.ANALYTICS.ROOT}/chats_over_time`;

  return FetchHelpers.get<T>(url);
};

export const getMessagesByHour = () => {
  const url = `${Routes.API.V1.ANALYTICS.ROOT}/messages_by_hour`;

  return FetchHelpers.get<T>(url);
};
