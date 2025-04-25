export interface IUserAttributes {
  email: string;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  admin: boolean;
}

export interface IUserResponse {
  data: {
    id: string;
    type: string;
    attributes: IUserAttributes;
  };
}
