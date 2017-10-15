import {reqHandle} from '../common/ajax';

import {LIST_URL} from './config';

export default {
  listGetReq: reqHandle(LIST_URL)
}
