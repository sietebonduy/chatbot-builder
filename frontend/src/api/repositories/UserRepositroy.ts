import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import { IUserResponse, IUpdateUserParams, IUpdatePasswordParams, IResetPasswordParams } from '@/types/user';
import { ICommonMessageResponse } from '@/types';

export const index = () => {
  const url = Routes.API.V1.USERS.ROOT;

  return FetchHelpers.get<IUserResponse>(url);
};
export const show = (id: number | string) => {
  const url = `${Routes.API.V1.USERS.ROOT}/${id}`;

  return FetchHelpers.get<IUserResponse>(url);
};

export const update = (id: number | string, params: IUpdateUserParams) => {
  const url = `${Routes.API.V1.USERS.ROOT}/${id}`;

  return FetchHelpers.put<IUserResponse>(url, params);
};

export const getCurrentUser = () => {
  const url = Routes.API.V1.USERS.ME;

  return FetchHelpers.get<IUserResponse>(url);
};

export const updatePassword = (params: IUpdatePasswordParams) => {
  const url = Routes.USER.UPDATE_PASSWORD;

  return FetchHelpers.patch<ICommonMessageResponse>(url, params);
}

export const createPasswordResetToken = (params: { email: string } ) => {
  const url = Routes.USER.CREATE_PASSWORD_TOKEN;

  return FetchHelpers.post<ICommonMessageResponse>(url, params);
}

export const updatePasswordByResetToken = (params: IResetPasswordParams) => {
  const url = Routes.USER.RESET_PASSWORD_BY_TOKEN;

  return FetchHelpers.put<ICommonMessageResponse>(url, params);
}
