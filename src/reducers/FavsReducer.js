import _ from 'lodash';

import * as types from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case types.LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey');
    case types.CLEAR_JOBS:
      return [];
    default:
      return state;
  }
}
