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
 * get business review
 * @returns {Object} FETCHING_BUSINESS_REVIEWS
 */
export function getBusinessReviews() {
  return {
    type: FETCHING_BUSINESS_REVIEWS
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
 * @param {*} businessReviews businesses reviews
 * @returns {Object} FETCHING_BUSINESS_REVIEWS_SUCCESS action & businessData
 */
export function getBusinessReviewsSuccess(businessReviews) {
  return {
    type: FETCHING_BUSINESS_REVIEWS_SUCCESS,
    reviews: businessReviews
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
 * @param {*} error error data
 * @returns {Object}  FETCHING_BUSINESS_REVIEWS_ERROR action & error data
 */
export function getBusinessReviewsError(error) {
  return {
    type: FETCHING_BUSINESS_REVIEWS_ERROR,
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
    dispatch(clearGetBusinessesError());
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
 * @returns {Function} dispatch closure
 * @param {Int} businessId
*/
export function fetchBusiness(businessId) {
  return (dispatch) => {
    dispatch(clearGetBusinessesError());
    dispatch(getBusiness());
    return API.get(`/api/v1/businesses/${businessId}`)
      .then((business) => {
        if (business.data.error) {
          dispatch(getBusinessError(business.data.error));
          return;
        }
        dispatch(getBusinessSuccess(business.data.business));
      }).catch(() => {
        dispatch(getBusinessError('network error, please try later'));
      });
  };
}
/**
 * @returns {Function} dispatch closure
 * @param {Int} businessId
*/
export function fetchReviews(businessId) {
  return (dispatch) => {
    dispatch(clearGetBusinessesError());
    dispatch(getBusinessReviews());
    return API.get(`/api/v1/businesses/${businessId}/reviews`)
      .then((reviews) => {
        if (reviews.data.error) {
          dispatch(getBusinessReviewsError(reviews.data.error));
          return;
        }
        dispatch(getBusinessReviewsSuccess(reviews.data.reviews));
      }).catch(() => {
        dispatch(getBusinessReviewsError('network error, please try later'));
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
