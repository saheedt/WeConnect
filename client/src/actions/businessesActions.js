import {
  FETCHING_BUSINESSES,
  FETCHING_BUSINESSES_SUCCESS,
  FETCHING_BUSINESSES_ERROR,
  CLEAR_BUSINESSES_ERROR
} from './actionTypes';

import API from '../axiosInstance/api';

/**
 * get businesses action
 * @returns {Object} FETCHING_BUSINESSES
 */
export function getBusinesses() {
  return {
    type: FETCHING_BUSINESSES
  };
}
/**
 * @param {*} businessData businesses data
 * @returns {Object} FETCHING_BUSINESSES_SUCCESS action & businessData
 */
export function getBusinessesSuccess(businessData) {
  return {
    type: FETCHING_BUSINESSES_SUCCESS,
    businesses: businessData
  };
}
/**
 * @param {*} error error data
 * @returns {Object} FEETCHING_BUSINESSES_ERROR action & error data
 */
export function getBusinessesError(error) {
  return {
    type: FETCHING_BUSINESSES_ERROR,
    error
  };
}
/**
 * @returns {Object} CLEAR_BUSINESSES_ERROR
 */
export function clearGetBusinessesError() {
  return {
    type: CLEAR_BUSINESSES_ERROR
  };
}
/**
 *@returns {Function} dispatch closure
*/
export function fetchBusinesses() {
  return (dispatch) => {
    dispatch(getBusinesses());
    return API.get('/api/v1/businesses')
      .then((businesses) => {
        if (businesses.data.error) {
          console.log(businesses.data.error);
          dispatch(getBusinessesError(businesses.data.error));
          return;
        }
        dispatch(getBusinessesSuccess(businesses.data.business));
      }).catch(() => {
        dispatch(getBusinessesError('network error, please try later'));
      });
  };
}
/**
 * @return {Function} dispatch closure
 */
export function clearBusinessesError() {
  return (dispatch) => {
    dispatch(clearGetBusinessesError());
  };
}
