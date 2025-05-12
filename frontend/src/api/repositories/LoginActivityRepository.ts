import Routes from '../routes';
import { FetchHelpers } from '@/lib/FetchHelpers';
import { ILoginActivityResponse } from '@/types/loginActivity';

export const index = () => {
  const url = Routes.API.V1.LOGIN_ACTIVITIES.ROOT;

  return FetchHelpers.get<ILoginActivityResponse>(url);
};
