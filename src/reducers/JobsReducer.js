import * as types from '../actions/types';

const initialState = {
  results: [],
  nextPage: 0,
  q: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_JOBS:
      return action.payload;
    default:
      return state;
  }
}
