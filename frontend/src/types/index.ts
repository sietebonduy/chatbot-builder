export interface ICommonMessageResponse {
  message: string;
}

export interface IJSONAPIResource<T = any> {
  id: string;
  type: string;
  attributes: T;
  relationships?: Record<string, { data: IJSONAPIReference | IJSONAPIReference[] }>;
}

export interface IJSONAPIReference {
  id: string;
  type: string;
}

export interface IJSONAPIResponse<T = any> {
  data: IJSONAPIResource<T>;
  included?: IJSONAPIResource[];
}
