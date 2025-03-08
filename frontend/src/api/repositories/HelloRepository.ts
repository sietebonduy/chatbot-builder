import Routes from '../routes.ts';
import { FetchHelpers } from '../../lib/FetchHelpers.ts';

function index() {
  const url = Routes.HELLO.INDEX;

  return FetchHelpers.get(url);
}

export default {
  index,
};
