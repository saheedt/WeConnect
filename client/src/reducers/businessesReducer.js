import {
  FETCHING_BUSINESSES,
  FETCHING_BUSINESSES_SUCCESS,
  FETCHING_BUSINESSES_ERROR,
  CLEAR_BUSINESSES_ERROR,
  FETCHING_BUSINESS,
  FETCHING_BUSINESS_SUCCESS,
  FETCHING_BUSINESS_ERROR,
  FETCHING_BUSINESS_REVIEWS,
  FETCHING_BUSINESS_REVIEWS_SUCCESS,
  FETCHING_BUSINESS_REVIEWS_ERROR
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
  case FETCHING_BUSINESS:
    return {
      ...state,
      isFetching: true,
      business: null
    };
  case FETCHING_BUSINESSES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      businesses: action.businesses
    };
  case FETCHING_BUSINESS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      business: action.business
    };
  case FETCHING_BUSINESSES_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.error
    };
  case FETCHING_BUSINESS_ERROR:
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
  case FETCHING_BUSINESS_REVIEWS:
    return {
      ...state,
      reviews: {
        isFetching: true,
        reviews: null
      }
    };
  case FETCHING_BUSINESS_REVIEWS_SUCCESS:
    return {
      ...state,
      reviews: {
        isFetching: false,
        reviews: action.reviews
      }
    };
  case FETCHING_BUSINESS_REVIEWS_ERROR:
    return {
      ...state,
      reviews: {
        isFetching: false,
        error: action.error
      }
    };
  default:
    return state;
  }
}
