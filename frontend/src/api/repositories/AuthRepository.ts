import Routes from '../routes';
import { FetchHelpers } from '../../lib/FetchHelpers';
import {IUserCredentials, IUserDeviseResponse } from '../../types/auth.ts';

export const registration = (params: IUserCredentials) => {
  const url = Routes.USER.REGISTRATION;

  return FetchHelpers.post<IUserDeviseResponse>(url, { user: params });
};

export const login = (params: IUserCredentials) => {
  const url = Routes.USER.LOGIN;

  return FetchHelpers.post<IUserDeviseResponse>(url, { user: params });
};

export const logout = () => {
  const url = Routes.USER.LOGOUT;

  return FetchHelpers.delete<IUserDeviseResponse>(url);
};
