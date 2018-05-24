import querystring from 'querystring';

import {
  ADDING_BUSINESS,
  ADDING_BUSINESS_SUCCESS,
  ADDING_BUSINESS_ERROR,
  UPDATE_BUSINESS,
  UPDATE_BUSINESS_SUCCESS,
  UPDATE_BUSINESS_ERROR,
  FETCHING_BUSINESSES,
  FETCHING_BUSINESSES_SUCCESS,
  FETCHING_BUSINESSES_ERROR,
  CLEAR_BUSINESSES_ERROR,
  FETCHING_BUSINESS,
  FETCHING_BUSINESS_SUCCESS,
  FETCHING_BUSINESS_ERROR,
  FETCHING_BUSINESS_REVIEWS,
  FETCHING_BUSINESS_REVIEWS_SUCCESS,
  FETCHING_BUSINESS_REVIEWS_ERROR,
  QUERY_BUSINESS,
  QUERY_BUSINESS_SUCCESS,
  QUERY_BUSINESS_ERROR,
  CLEAR_QUERY_ERROR
} from './actionTypes';

import API from '../axiosInstance/api';

/**
 * add business action
 * @returns {Object} ADDING_BUSINESS
 */
export function addingBusiness() {
  return {
    type: ADDING_BUSINESS
  };
}
/**
 * add business success action
 * @param {Object} business
 * @returns {Object} ADDING_BUSINESS_SUCCESS
 */
export function addingBusinessSuccess(business) {
  return {
    type: ADDING_BUSINESS_SUCCESS,
    business
  };
}
/**
 * add business error action
 * @param {String} error
 * @returns {Object} ADDING_BUSINESS_ERROR
 */
export function addingBusinessError(error) {
  return {
    type: ADDING_BUSINESS_ERROR,
    error
  };
}
/**
 * update business action
 * @returns {Object} UPDATE_BUSINESS
 */
export function updateBusiness() {
  return {
    type: UPDATE_BUSINESS
  };
}
/**
 * update business success action
 * @param {Object} business
 * @returns {Object} UPDATE_BUSINESS_SUCCESS
 */
export function updateBusinessSuccess(business) {
  return {
    type: UPDATE_BUSINESS_SUCCESS,
    business
  };
}
/**
 * update business error action
 * @param {String} error
 * @returns {Object} UPDATE_BUSINESS_ERROR
 */
export function updateBusinessError(error) {
  return {
    type: UPDATE_BUSINESS_ERROR,
    error
  };
}
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
    businesses: businessData.businesses,
    count: businessData.count
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
 * @param {String} error error data
 * @returns {Object}  FETCHING_BUSINESS_REVIEWS_ERROR action & error data
 */
export function getBusinessReviewsError(error) {
  return {
    type: FETCHING_BUSINESS_REVIEWS_ERROR,
    error
  };
}
/**
 * @param {Object} details
 * @returns {Object} CLEAR_BUSINESSES_ERROR
 */
export function clearBusinessesError(details) {
  return {
    type: CLEAR_BUSINESSES_ERROR,
    details
  };
}
/**
 * @returns {Object} QUERY_BUSINESS
 */
export function queryBusiness() {
  return {
    type: QUERY_BUSINESS
  };
}
/**
 * @param {*} businesses queried businesses
 * @returns {Object} QUERY_BUSINESS_SUCCESS & businesses
 */
export function queryBusinessSuccess(businesses) {
  return {
    type: QUERY_BUSINESS_SUCCESS,
    businesses
  };
}
/**
 * @param {*} error query error
 * @returns {Object} QUERY_BUSNESS_ERROR & error
 */
export function queryBusinessError(error) {
  return {
    type: QUERY_BUSINESS_ERROR,
    error
  };
}
/**
 * @returns {Object} CLEAR_QUERY_ERROR
 */
export function clearQueryError() {
  return {
    type: CLEAR_QUERY_ERROR
  };
}

/**
 * Action creators
 */
/**
 * @param {Object} businessDetails
 * @param {String} token
 * @returns {Function} dispatch function
 */
export function addBusiness(businessDetails, token) {
  return (dispatch) => {
    dispatch(clearBusinessesError());
    dispatch(addingBusiness());
    return API.post(
      '/api/v1/businesses',
      querystring.stringify(businessDetails),
      {
        headers: {
          authorization: token
        }
      }
    )
      .then((business) => {
        if (business.data &&
        business.data.message === 'business successfully added') {
          const addedBusinessDetails = business.data.business;
          return dispatch(addingBusinessSuccess(addedBusinessDetails));
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          return dispatch(addingBusinessError(error.response.data.message));
        }
        return dispatch(addingBusinessError('network error, try later'));
      });
  };
}
/**
 * @param {Int} businessId
 * @param {Object} updateDetails
 * @param {String} token
 * @returns {Function} dispatch function
 */
export function businessUpdate(businessId, updateDetails, token) {
  return (dispatch) => {
    dispatch(clearBusinessesError());
    dispatch(updateBusiness());
    return API.put(
      `/api/v1/businesses/${businessId}`,
      querystring.stringify(updateDetails),
      {
        headers: {
          authorization: token
        }
      }
    )
      .then((business) => {
        if (business.data &&
        business.data.message === 'business successfully updated') {
          const updated = business.business;
          return dispatch(updateBusinessSuccess(updated));
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          return dispatch(updateBusinessError(error.response.data.message));
        }
        return dispatch(updateBusinessError('network error, try later'));
      });
  };
}
/**
 * @param {Int} page
 * @returns {Function} dispatch function
*/
export function fetchBusinesses(page) {
  return (dispatch) => {
    dispatch(clearBusinessesError());
    dispatch(getBusinesses());
    return API.get(`/api/v1/businesses?page=${page}`)
      .then((businesses) => {
        if (businesses.data && businesses.data.error) {
          return dispatch(getBusinessesError(businesses.data.error));
        }
        const businessData = {
          businesses: businesses.data.businesses,
          count: businesses.data.count
        };
        dispatch(getBusinessesSuccess(businessData));
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          return dispatch(getBusinessReviewsError(error.response.data.message));
        }
        return dispatch(getBusinessReviewsError('network error, try later'));
      });
  };
}
/**
 * @returns {Function} dispatch function
 * @param {Int} businessId
*/
export function fetchBusiness(businessId) {
  return (dispatch) => {
    dispatch(clearBusinessesError());
    dispatch(getBusiness());
    return API.get(`/api/v1/businesses/${businessId}`)
      .then((business) => {
        if (business.data && business.data.error) {
          dispatch(getBusinessError(business.data.error));
          return;
        }
        dispatch(getBusinessSuccess(business.data.business));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          return dispatch(getBusinessReviewsError(error.response.data.message));
        }
        return dispatch(getBusinessReviewsError('network error, try later'));
      });
  };
}
/**
 * @returns {Function} dispatch function
 * @param {Int} businessId
*/
export function fetchReviews(businessId) {
  return (dispatch) => {
    dispatch(clearBusinessesError());
    dispatch(getBusinessReviews());
    return API.get(`/api/v1/businesses/${businessId}/reviews`)
      .then((reviews) => {
        if (reviews.data && reviews.data.error) {
          dispatch(getBusinessReviewsError(reviews.data.error));
          return;
        }
        dispatch(getBusinessReviewsSuccess(reviews.data.reviews));
      }).catch((error) => {
        if (error.response && error.response.data.message) {
          return dispatch(getBusinessReviewsError(error.response.data.message));
        }
        return dispatch(getBusinessReviewsError('network error, try later'));
      });
  };
}
/**
 * @param {Object} details
 * @return {Function} dispatch function
 */
export function clearAllBusinessesError(details) {
  return (dispatch) => {
    return dispatch(clearBusinessesError(details));
  };
}
/**
 * @param {String} by
 * @param {Object} queryData
 * @returns {Function} dispatch function
*/
export function query(by, queryData) {
  return (dispatch) => {
    dispatch(clearQueryError());
    dispatch(queryBusiness());
    return API.get(`/api/v1/businesses?${by}=${queryData}`)
      .then((filtered) => {
        if (filtered.data && filtered.data.error) {
          return dispatch(queryBusinessError(filtered.data.error));
        }
        dispatch(queryBusinessSuccess(filtered.data.business));
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          return dispatch(queryBusinessError(error.response.data.message));
        }
        return dispatch(queryBusinessError('network error, try later'));
      });
  };
}
