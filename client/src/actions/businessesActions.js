import {
  FETCHING_BUSINESSES,
  FETCHING_BUSINESSES_SUCCESS,
  FETCHING_BUSINESSES_ERROR,
  CLEAR_BUSINESSES_ERROR,
  FETCHING_BUSINESS,
  FETCHING_BUSINESS_SUCCESS,
  FETCHING_BUSINESS_ERROR
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
 * get business action
 * @returns {Object} FETCHING_BUSINESS
 */
export function getBusiness() {
  return {
    type: FETCHING_BUSINESS
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
 * @param {*} businessData businesses data
 * @returns {Object} FETCHING_BUSINESS_SUCCESS action & businessData
 */
export function getBusinessSuccess(businessData) {
  return {
    type: FETCHING_BUSINESS_SUCCESS,
    business: businessData
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
 * @param {*} error error data
 * @returns {Object} FEETCHING_BUSINESS_ERROR action & error data
 */
export function getBusinessError(error) {
  return {
    type: FETCHING_BUSINESS_ERROR,
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
