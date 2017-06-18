import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import * as types from '../actions/types'

const INDEED_API_URL = 'http://api.indeed.com/ads/apisearch?';

const getFullUrl = (paramsObj, page = 0) => {
  const params = {
    publisher: '4201738803816157',
    co: 'ZA',
    format: 'json',
    latlong: 1,
    start: page * 10,
    v: '2',
    ...paramsObj,
  };
  return `${INDEED_API_URL}${qs.stringify(params)}`;
};

export const searchJobs = (q, region, page = 0, callBack) => async dispatch => {
  try {
    const zip = await reverseGeocode(region);  // convert coordinates to zip code
    const url = getFullUrl({ l: zip, q }, page);
    let { data } = await axios.get(url);
    data = {results: data.results, nextPage: data.pageNumber + 1, q};
    dispatch({type: types.SEARCH_JOBS, payload: data});
    callBack();
  } catch (e) {
    // TODO: toaster !!!
    console.log(e);
  }
};

export const likeJob = payload => ({ type: types.LIKE_JOB, payload });

export const clearJobs = () => ({ type: types.CLEAR_JOBS });

export const deleteJob = jobkey => ({ type: types.DELETE_JOB, payload: jobkey });
