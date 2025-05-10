import { IUserDeviseResponse } from '@/types/auth';
import { IUser, IUserResponse } from '@/types/user';

export const normalizeFromDevise = (data: IUserDeviseResponse['data']): IUser => ({
  id: String(data.id),
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  avatarUrl: data.avatarUrl,
  admin: data.admin,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const normalizeFromJsonApi = (data: IUserResponse['data']): IUser => ({
  id: data.id,
  email: data.attributes.email,
  fullName: data.attributes.fullName,
  firstName: data.attributes.firstName,
  lastName: data.attributes.lastName,
  avatarUrl: data.attributes.avatarUrl,
  locale: data.attributes.locale,
  createdAt: data.attributes.createdAt,
  updatedAt: data.attributes.updatedAt,
  admin: data.attributes.admin,
});
