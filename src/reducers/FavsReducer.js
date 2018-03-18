import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';

import * as types from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    // case REHYDRATE:
    //   console.log('action:', action)
    //   return action.payload.likedJobs || [];
    case types.LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey');
    case types.DELETE_JOB:
      return state.filter(job => job.jobkey !== action.payload);
    case types.CLEAR_JOBS:
      return [];
    default:
      return state;
  }
}
