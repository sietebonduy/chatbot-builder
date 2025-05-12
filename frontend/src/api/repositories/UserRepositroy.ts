import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import { IUserResponse, IUpdateUserParams, IUpdatePasswordParams } from '@/types/user';

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

  return FetchHelpers.patch<T>(url, params);
}
