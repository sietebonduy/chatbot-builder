import { IUserDeviseResponse } from '@/types/auth';
import { IUser, IUserResponse } from '@/types/user';

export const normalizeFromDevise = (data: IUserDeviseResponse['data']): IUser => ({
  id: String(data.id),
  email: data.email,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const normalizeFromJsonApi = (data: IUserResponse['data']): IUser => ({
  id: data.id,
  email: data.attributes.email,
  createdAt: data.attributes.createdAt,
  updatedAt: data.attributes.updatedAt,
  admin: data.attributes.admin,
});
