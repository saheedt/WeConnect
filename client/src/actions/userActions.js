import querystring from 'querystring';

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  CLEAR_USER_TOKEN,
  CLEAR_USER_ERROR
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
 * Action creators
 */

/**
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
            dispatch(userLoginSuccess(userDetails))
          }
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
              return dispatch(userLoginError(error.response.data.message));
            }
            dispatch(userLoginError('network error, please try later'));
          });
    }
}
/**
 * 
 * @param {Object} signupData
 * @return {Function} dispatch function
 */
export function doSignup(signupData){
  return (dispatch) => {
    dispatch(clearUserToken())
    dispatch(userSignup())
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
          dispatch(userSignupSuccess(userData))
        }
    }).catch((error) => {
      if (error.response && error.response.data.message) {
        return dispatch(userSignupError(error.response.data.message));
      }
      dispatch(userSignupError('network error, please try later'));
    })
  }
}
/**
 * @returns {Function} dispatch function
*/
export function loginError(error) {
  return (dispatch) => {
    dispatch(userLoginError(error));
  }
}

/**
 * @returns {Function} dispatch function
*/
export function signupError(error) {
  return (dispatch) => {
    dispatch(userSignupError(error));
  }
}

/**
 * @returns {Function} dispatch function
*/
export function wipeUserError(userDetails) {
  return (dispatch) => {
    dispatch(clearUserError(userDetails));
  }
}
