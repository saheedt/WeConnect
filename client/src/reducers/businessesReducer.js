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
  QUERY_BUSINESS_ERROR
} from '../actions/actionTypes';

/**
 * @param {Object} state curent application data state
 * @param {Object} action current user action
 * @returns {Object} data to write into store
 */
export default function businessesReducer(state = {}, action) {
  switch (action.type) {
  case ADDING_BUSINESS:
    return {
      ...state,
      add: {
        isFetching: true,
        business: null,
        error: null
      }
    }
  case ADDING_BUSINESS_SUCCESS:
    return {
      ...state,
      add: {
        isFetching: false,
        business: action.business,
        error: null
      }
    }
  case ADDING_BUSINESS_ERROR:
    return {
      ...state,
      add: {
        isFetching: false,
        business: null,
        error: action.error
      }
    }
  case UPDATE_BUSINESS:
   return {
     ...state,
     update: {
       isFetching: true,
       business: null,
       error: null
     }
   }
  case UPDATE_BUSINESS_SUCCESS:
   return {
     ...state,
     update: {
       isFetching: false,
       business: action.business,
       error: null
     }
   }
  case UPDATE_BUSINESS_ERROR:
   return {
     ...state,
     update: {
       isFetching: false,
       business: null,
       error: action.error
     }
   }
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
      error: null,
      reviews: {
        error: null
      },
      queries: {
        error: null
      },
      add: {
        error: null
      },
      update: {
        error: null
      }
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
  case QUERY_BUSINESS:
    return {
      ...state,
      queries: {
        isFetching: true,
        businesses: null,
        error: null
      }
    }
  case QUERY_BUSINESS_SUCCESS:
    return {
      ...state,
      queries: {
        isFetching: false,
        businesses: action.businesses,
        error: null
      }
    }
    case QUERY_BUSINESS_ERROR:
      return {
        ...state,
        queries: {
          isFetching: false,
          error: action.error
        }
      }
  default:
    return state;
  }
}
