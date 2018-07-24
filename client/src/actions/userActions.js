import querystring from 'querystring';

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
  FETCHING_USER_BUSINESSES_ERROR
} from './actionTypes';

import API from '../axiosInstance/api';

/**
 * user login action
 * @returns {Object} USER_LOGIN
 */
export function userLogin() {
  return {
    type: USER_LOGIN
  };
}

/**
 * user login success action
 * @param {Object} userData
 * @returns {Object} USER_LOGIN_SUCCESS
 */
export function userLoginSuccess(userData) {
  return {
    type: USER_LOGIN_SUCCESS,
    user: userData
  };
}

/**
 * user login error action
 * @param {String} error
 * @returns {Object} USER_LOGIN_ERROR
 */
export function userLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    error
  };
}

/**
 * user signup action
 * @returns {Object} USER_SIGNUP
 */
export function userSignup() {
  return {
    type: USER_SIGNUP
  };
}

/**
 * user signup success action
 * @param {Object} userData
 * @returns {Object} USER_SIGNUP_SUCCESS
 */
export function userSignupSuccess(userData) {
  return {
    type: USER_SIGNUP_SUCCESS,
    user: userData
  };
}

/**
 * user signup error action
 * @param {String} error
 * @returns {Object} USER_SIGNUP_ERROR
 */
export function userSignupError(error) {
  return {
    type: USER_SIGNUP_ERROR,
    error
  };
}

/**
 * @returns {Object} CLEAR_USER_TOKEN
 */
export function clearUserToken() {
  return {
    type: CLEAR_USER_TOKEN
  };
}

/**
 * @param {Object} userDetails
 * @returns {Object} CLEAR_USER_ERROR
 */
export function clearUserError(userDetails) {
  return {
    type: CLEAR_USER_ERROR,
    token: userDetails.token,
    user: userDetails.user
  };
}
/**
 * @returns {Object}
 */
export function fetchingUserBusinesses() {
  return {
    type: FETCHING_USER_BUSINESSES
  };
}

/**
 * @param {Array} businesses
 * @returns {Object}
 */
export function fetchingUserBusinessesSuccess(businesses) {
  return {
    type: FETCHING_USER_BUSINESSES_SUCCESS,
    businesses
  };
}

/**
 * @param {String} error
 * @returns {Object}
 */
export function fetchingUserBusinessesError(error) {
  return {
    type: FETCHING_USER_BUSINESSES_ERROR,
    error
  };
}

// /api/v1/businesses/:userId/businesses
/**
 * Action creators
 */

/**
  * @param {Number} userId
  * @returns {Function} dispatch function
  */
export function fetchUserBusinesses(userId) {
  return (dispatch) => {
    dispatch(fetchingUserBusinesses());
    return API.get(`/api/v1/businesses/${userId}/businesses`)
      .then(((businesses) => {
        const { data } = businesses;
        if (data && data.error) {
          return dispatch(fetchingUserBusinessesError(data.error));
        }
        if (data && data.message === 'user businesses successfully retrieved') {
          return dispatch(fetchingUserBusinessesSuccess(data.businesses));
        }
      })).catch(((error) => {
        const { response } = error;
        if (response && response.data.message) {
          dispatch(fetchingUserBusinessesError(response.data.message));
          return;
        }
        dispatch(fetchingUserBusinessesError('network error, try later'));
      }));
  };
}

/**
 * @param {Object} userData
 * @returns {Function} dispatch function
*/
export function doLogin(userData) {
  return (dispatch) => {
    dispatch(clearUserToken());
    dispatch(userLogin());
    return API.post(
      '/api/v1/auth/login',
      querystring.stringify(userData)
    )
      .then((user) => {
        if (user.data &&
          user.data.message === 'login successful') {
          const userDetails = {
            user: user.data.user,
            token: user.data.token
          };
          dispatch(userLoginSuccess(userDetails));
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          return dispatch(userLoginError(error.response.data.message));
        }
        dispatch(userLoginError('network error, please try later'));
      });
  };
}
/**
 * @param {Object} signupData
 * @return {Function} dispatch function
 */
export function doSignup(signupData) {
  return (dispatch) => {
    dispatch(clearUserToken());
    dispatch(userSignup());
    return API.post(
      '/api/v1/auth/signup',
      querystring.stringify(signupData)
    ).then((user) => {
      if (user.data &&
        user.data.message === 'user registered successfully') {
        const userData = {
          user: user.data.user,
          token: user.data.token
        };
        dispatch(userSignupSuccess(userData));
      }
    }).catch((error) => {
      if (error.response && error.response.data.message) {
        return dispatch(userSignupError(error.response.data.message));
      }
      dispatch(userSignupError('network error, please try later'));
    });
  };
}
/**
 * @param {String} error
 * @returns {Function} dispatch function
*/
export function loginError(error) {
  return (dispatch) => {
    dispatch(userLoginError(error));
  };
}
/**
 * @param {String} error
 * @returns {Function} dispatch function
*/
export function signupError(error) {
  return (dispatch) => {
    dispatch(userSignupError(error));
  };
}
/**
 * @param {Object} userDetails
 * @returns {Function} dispatch function
*/
export function wipeUserError(userDetails) {
  return (dispatch) => {
    dispatch(clearUserError(userDetails));
  };
}
/**
 * @returns {Fuction} dispatch function
 */
export function signOut() {
  return (dispatch) => {
    dispatch(clearUserToken());
  };
}
