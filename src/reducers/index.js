import { combineReducers } from 'redux';

import jobs from './JobsReducer';
import likedJobs from './FavsReducer';

export default combineReducers({
  jobs, likedJobs
})
