import humps from 'humps';
import { JsonApiResponse, JsonApiData } from '../types/jsonApi';

export const parseJsonApi = <T>(data: unknown): JsonApiData<T> => {
  const camelized = humps.camelizeKeys(data) as JsonApiResponse<T>;
  return camelized.data;
};
