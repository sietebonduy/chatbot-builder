import Routes from '../routes.ts';
import { FetchHelpers } from '../../lib/FetchHelpers.ts';

function verify() {
  const url = Routes.API.V1.CAPTCHA.VERIFY;

  return FetchHelpers.get(url);
}

export default {
  verify,
};
