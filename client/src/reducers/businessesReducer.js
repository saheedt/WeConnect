import {
  FETCHING_BUSINESSES,
  FETCHING_BUSINESSES_SUCCESS,
  FETCHING_BUSINESSES_ERROR,
  CLEAR_BUSINESSES_ERROR
} from '../actions/actionTypes';

/**
 * @param {Object} state curent application data state
 * @param {Object} action current user action
 * @returns {Object} data to write into store
 */
export default function businessesReducer(state = {}, action) {
  switch (action.type) {
  case FETCHING_BUSINESSES:
    return {
      ...state,
      isFetching: true,
      businesses: null
    };
  case FETCHING_BUSINESSES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      businesses: action.businesses
    };
  case FETCHING_BUSINESSES_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.error
    };
  case CLEAR_BUSINESSES_ERROR:
    return {
      ...state,
      error: null
    };
  default:
    return state;
  }
}
