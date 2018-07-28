import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  CLEAR_USER_TOKEN,
  CLEAR_USER_ERROR,
  FETCHING_USER_BUSINESSES,
  FETCHING_USER_BUSINESSES_SUCCESS,
  FETCHING_USER_BUSINESSES_ERROR,
  DELETE_BUSINESS,
  DELETE_BUSINESS_SUCCESS,
  DELETE_BUSINESS_ERROR
} from '../actions/actionTypes';

  /**
 * @param {Object} state curent application data state
 * @param {Object} action current user action
 * @returns {Object} data to write into store
 */
export default function userReducer(state = {}, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
      token: null,
      user: null
    };
  case USER_LOGIN_SUCCESS:
    return {
      ...state,
      isFetching: false,
      user: action.user.user,
      token: action.user.token,
      error: null
    };
  case USER_LOGIN_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.error,
      user: null,
      token: null
    };
  case USER_SIGNUP:
    return {
      ...state,
      isFetching: true,
      error: null,
      token: null,
      user: null
    };
  case USER_SIGNUP_SUCCESS:
    return {
      ...state,
      isFetching: false,
      error: null,
      user: action.user.user,
      token: action.user.token
    };
  case USER_SIGNUP_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.error,
      user: null,
      token: null
    };
  case FETCHING_USER_BUSINESSES:
    return {
      ...state,
      profile: {
        isFetching: true,
        error: null,
        businesses: null,
        message: null,
      }
    };
  case FETCHING_USER_BUSINESSES_SUCCESS:
    return {
      ...state,
      profile: {
        isFetching: false,
        error: null,
        businesses: action.businesses,
        message: null,
      }
    };
  case FETCHING_USER_BUSINESSES_ERROR:
    return {
      ...state,
      profile: {
        isFetching: false,
        error: action.error,
        businesses: null,
        message: null,
      }
    };
  case DELETE_BUSINESS:
    return {
      ...state,
      profile: {
        ...state.profile,
        isFetching: true,
        message: null,
        error: null
      }
    };
  case DELETE_BUSINESS_ERROR:
    return {
      ...state,
      profile: {
        ...state.profile,
        isFetching: false,
        message: null,
        error: action.error
      }
    };
  case DELETE_BUSINESS_SUCCESS:
    return {
      ...state,
      profile: {
        ...state.profile,
        isFetching: false,
        message: action.message,
        error: null
      }
    };
  case CLEAR_USER_ERROR:
    return {
      ...state,
      isFetching: false,
      error: null,
      token: action.token,
      user: action.user
    };
  case CLEAR_USER_TOKEN:
    return {
      ...state,
      isFetching: false,
      error: null,
      token: null,
      user: null
    };
  default:
    return state;
  }
}
