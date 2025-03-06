export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserResponse {
  message: string;
  data: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    jti?: string;
  };
  errors?: string[];
}