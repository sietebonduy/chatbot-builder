export interface IUserAttributes {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  avatarUrl: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  avatarUrl: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse {
  data: {
    id: string;
    type: string;
    attributes: IUserAttributes;
  };
}

export interface IUpdateUserParams {
  email: string;
  avatar?: File;
  admin: boolean;
  firstName: string;
  lastName: string;
  locale: string;
}
