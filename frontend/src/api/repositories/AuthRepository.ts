import Routes from '../routes';
import { FetchHelpers } from '../../lib/FetchHelpers';
import { IUserCredentials, IUserResponse } from '../../types/auth.ts';

export const registration = (params: IUserCredentials) => {
  const url = Routes.USER.REGISTRATION;

  return FetchHelpers.post<IUserResponse>(url, { user: params });
};

export const login = (params: IUserCredentials) => {
  const url = Routes.USER.LOGIN;

  return FetchHelpers.post<IUserResponse>(url, { user: params });
};