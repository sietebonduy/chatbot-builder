export interface IJsonApiData<T> {
  id: string;
  type: string;
  attributes: T;
}

export interface IJsonApiResponse<T> {
  data: JsonApiData<T>;
}

export interface IJsonApiListResponse<T> {
  data: JsonApiData<T>[];
}
