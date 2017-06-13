import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

import * as types from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case types.LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey');
    case types.CLEAR_JOBS:
      return [];
    default:
      return state;
  }
}
