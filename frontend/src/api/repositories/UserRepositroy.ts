import Routes from '../routes';
import { FetchHelpers } from '../../lib/FetchHelpers';
import { IUserResponse } from '../../types/user';

export const index = () => {
  const url = Routes.API.V1.USERS.INDEX;

  return FetchHelpers.get<IUserResponse>(url);
};

export const getCurrentUser = () => {
  const url = Routes.API.V1.USERS.ME;

  return FetchHelpers.get<IUserResponse>(url);
};
