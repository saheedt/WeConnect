import businessReducer from '../../../src/reducers/businessesReducer';
import * as actionTypes from '../../../src/actions/actionTypes';

describe('businesses reducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {};
  });
  it('should return empty object as initial state', () => {
    expect(businessReducer(undefined, {})).toEqual({});
  });

  it('should handle ADDING_BUSINESS action', () => {
    expectedState = {
      add: {
        isFetching: true,
        business: null,
        error: null
      }
    };
    const { ADDING_BUSINESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: ADDING_BUSINESS
    })).toEqual(expectedState);
  });

  it('should handle ADDING_BUSINESS_SUCCESS action', () => {
    expectedState = {
      add: {
        isFetching: false,
        business: {
          name: 'test',
          location: 'test',
          employees: 200,
          address: 'test',
          phonenumber: 1234567890,
          category: 'testing',
          userId: 1,
          image_url: 'http://test.com'
        },
        error: null
      }
    };
    const { ADDING_BUSINESS_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: ADDING_BUSINESS_SUCCESS,
      business: {
        name: 'test',
        location: 'test',
        employees: 200,
        address: 'test',
        phonenumber: 1234567890,
        category: 'testing',
        userId: 1,
        image_url: 'http://test.com'
      }
    })).toEqual(expectedState);
  });

  it('should handle ADDING_BUSINESS_ERROR action', () => {
    expectedState = {
      add: {
        isFetching: false,
        business: null,
        error: 'action.error'
      }
    };
    const { ADDING_BUSINESS_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: ADDING_BUSINESS_ERROR,
      error: 'action.error'
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_BUSINESS_PREP action', () => {
    expectedState = {
      update: {
        isFetching: false,
        business: null,
        error: null,
        existing: {
          name: 'x',
          location: 'y',
          employees: 20,
          address: 'z',
          phonenumber: 123457890,
          category: 'movement',
          userId: 1,
          image_url: 'http://exist.com'
        }
      }
    };
    const { UPDATE_BUSINESS_PREP } = actionTypes;
    expect(businessReducer(initialState, {
      type: UPDATE_BUSINESS_PREP,
      businessData: {
        name: 'x',
        location: 'y',
        employees: 20,
        address: 'z',
        phonenumber: 123457890,
        category: 'movement',
        userId: 1,
        image_url: 'http://exist.com'
      }
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_BUSINESS_PREP action', () => {
    expectedState = {
      update: {
        isFetching: false,
        business: null,
        error: null,
        existing: null
      }
    };
    const { UPDATE_BUSINESS_PREP } = actionTypes;
    expect(businessReducer(initialState, {
      type: UPDATE_BUSINESS_PREP
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_BUSINESS action', () => {
    expectedState = {
      update: {
        isFetching: true,
        business: null,
        error: null,
      }
    };
    const { UPDATE_BUSINESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: UPDATE_BUSINESS
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_BUSINESS_SUCCESS action', () => {
    initialState = {
      update: {
        isFetching: true,
        business: {
          name: 'x',
          location: 'yy',
          employees: 20,
          address: 'zzz',
          phonenumber: 12345670,
          category: 'movement',
          userId: 1,
          image_url: 'http://exist_1.com'
        },
        error: 'errored earlier'
      }
    };
    expectedState = {
      update: {
        isFetching: false,
        business: {
          name: 'xx',
          location: 'yy',
          employees: 2000,
          address: 'zzz',
          phonenumber: 1234567890,
          category: 'movemented',
          userId: 1,
          image_url: 'http://exist.com'
        },
        error: null
      }
    };
    const { UPDATE_BUSINESS_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: UPDATE_BUSINESS_SUCCESS,
      business: {
        name: 'xx',
        location: 'yy',
        employees: 2000,
        address: 'zzz',
        phonenumber: 1234567890,
        category: 'movemented',
        userId: 1,
        image_url: 'http://exist.com'
      }
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_BUSINESS_ERROR action', () => {
    initialState = {
      update: {
        isFetching: true,
        business: {
          name: 'x',
          location: 'yy',
          employees: 20,
          address: 'zzz',
          phonenumber: 12345670,
          category: 'movement',
          userId: 1,
          image_url: 'http://exist_1.com'
        },
        error: 'errored earlier'
      }
    };
    expectedState = {
      update: {
        isFetching: false,
        business: null,
        error: 'errored..'
      }
    };
    const { UPDATE_BUSINESS_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: UPDATE_BUSINESS_ERROR,
      error: 'errored..'
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESSES action', () => {
    expectedState = {
      isFetching: true,
      businesses: null,
      error: null
    };
    const { FETCHING_BUSINESSES } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESSES
    })).toEqual(expectedState);
  });
  it('should handle FETCHING_BUSINESS action', () => {
    expectedState = {
      isFetching: true,
      business: null,
      error: null
    };
    const { FETCHING_BUSINESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESS
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESSES_SUCCESS action', () => {
    expectedState = {
      isFetching: false,
      businesses: [
        {
          name: 'x',
          location: 'yy',
          employees: 20,
          address: 'zzz',
          phonenumber: 12345670,
          category: 'movement',
          userId: 1,
          image_url: 'http://exist_1.com'
        },
        {
          name: 'xx',
          location: 'yyy',
          employees: 21,
          address: 'zzzz',
          phonenumber: 123456701,
          category: 'movements',
          userId: 2,
          image_url: 'http://exist_2.com'
        },
      ],
      count: 2,
      error: null
    };
    const { FETCHING_BUSINESSES_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESSES_SUCCESS,
      count: 2,
      businesses: [
        {
          name: 'x',
          location: 'yy',
          employees: 20,
          address: 'zzz',
          phonenumber: 12345670,
          category: 'movement',
          userId: 1,
          image_url: 'http://exist_1.com'
        },
        {
          name: 'xx',
          location: 'yyy',
          employees: 21,
          address: 'zzzz',
          phonenumber: 123456701,
          category: 'movements',
          userId: 2,
          image_url: 'http://exist_2.com'
        },
      ]
    })).toEqual(expectedState);
  });
  it('should handle FETCHING_BUSINESS_SUCCESS action', () => {
    expectedState = {
      isFetching: false,
      business: {
        name: 'xx',
        location: 'yyy',
        employees: 21,
        address: 'zzzz',
        phonenumber: 123456701,
        category: 'movements',
        userId: 2,
        image_url: 'http://exist_2.com'
      },
      error: null
    };
    const { FETCHING_BUSINESS_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESS_SUCCESS,
      business: {
        name: 'xx',
        location: 'yyy',
        employees: 21,
        address: 'zzzz',
        phonenumber: 123456701,
        category: 'movements',
        userId: 2,
        image_url: 'http://exist_2.com'
      }
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESSES_ERROR action', () => {
    expectedState = {
      isFetching: false,
      businesses: false,
      error: 'action.error'
    };
    const { FETCHING_BUSINESSES_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESSES_ERROR,
      error: 'action.error'
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESS_ERROR action', () => {
    expectedState = {
      isFetching: false,
      business: false,
      error: 'action.error'
    };
    const { FETCHING_BUSINESS_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESS_ERROR,
      error: 'action.error'
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_BUSINESSES_ERROR action', () => {
    expectedState = {
      isFetching: false,
      businesses: null,
      error: null
    };
    const { CLEAR_BUSINESSES_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: CLEAR_BUSINESSES_ERROR,
      details: {
        toClear: 'listings',
        payload: {
          isFetching: false,
          businesses: null,
          error: null
        }
      }
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_BUSINESSES_ERROR action', () => {
    expectedState = {
      add: {
        isFetching: false,
        businesses: null,
        error: null
      }
    };
    const { CLEAR_BUSINESSES_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: CLEAR_BUSINESSES_ERROR,
      details: {
        toClear: 'add',
        payload: {
          isFetching: false,
          businesses: null,
          error: null
        }
      }
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_BUSINESSES_ERROR action', () => {
    initialState = {
      isFetching: false,
      businesses: [],
      error: null
    };
    expectedState = {
      isFetching: false,
      businesses: [],
      error: null
    };
    const { CLEAR_BUSINESSES_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: CLEAR_BUSINESSES_ERROR
    })).toEqual(expectedState);
  });

  it('should handle ADDING_BUSINESS_REVIEW action', () => {
    expectedState = {
      addReview: {
        isFetching: true,
        review: null,
        error: null
      }
    };
    const { ADDING_BUSINESS_REVIEW } = actionTypes;
    expect(businessReducer(initialState, {
      type: ADDING_BUSINESS_REVIEW
    })).toEqual(expectedState);
  });

  it('should handle ADDING_BUSINESS_REVIEW_SUCCESS action', () => {
    expectedState = {
      addReview: {
        isFetching: false,
        review: {
          name: 'named',
          message: 'xcvbnm'
        },
        error: null
      }
    };
    const { ADDING_BUSINESS_REVIEW_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: ADDING_BUSINESS_REVIEW_SUCCESS,
      review: {
        name: 'named',
        message: 'xcvbnm'
      }
    })).toEqual(expectedState);
  });

  it('should handle ADDING_BUSINESS_REVIEW_ERROR action', () => {
    expectedState = {
      addReview: {
        isFetching: false,
        review: null,
        error: 'we did it again..'
      }
    };
    const { ADDING_BUSINESS_REVIEW_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: ADDING_BUSINESS_REVIEW_ERROR,
      error: 'we did it again..'
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESS_REVIEWS action', () => {
    expectedState = {
      reviews: {
        isFetching: true,
        reviews: null,
        error: null,
        count: null
      }
    };
    const { FETCHING_BUSINESS_REVIEWS } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESS_REVIEWS
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESS_REVIEWS_SUCCESS action', () => {
    expectedState = {
      reviews: {
        isFetching: false,
        count: 1,
        reviews: [
          {
            name: 'named',
            message: 'xcvbnm'
          }
        ],
        error: null
      }
    };
    const { FETCHING_BUSINESS_REVIEWS_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESS_REVIEWS_SUCCESS,
      count: 1,
      reviews: [
        {
          name: 'named',
          message: 'xcvbnm'
        }
      ]
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_BUSINESS_REVIEWS_ERROR action', () => {
    expectedState = {
      reviews: {
        isFetching: false,
        reviews: null,
        count: null,
        error: 'call to action.error'
      }
    };
    const { FETCHING_BUSINESS_REVIEWS_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: FETCHING_BUSINESS_REVIEWS_ERROR,
      error: 'call to action.error'
    })).toEqual(expectedState);
  });

  it('should handle QUERY_BUSINESS action', () => {
    expectedState = {
      queries: {
        isFetching: true,
        businesses: null,
        error: null,
        count: null
      }
    };
    const { QUERY_BUSINESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: QUERY_BUSINESS
    })).toEqual(expectedState);
  });

  it('should handle QUERY_BUSINESS_SUCCESS action', () => {
    expectedState = {
      queries: {
        isFetching: false,
        businesses: [],
        count: 0,
        error: null
      }
    };
    const { QUERY_BUSINESS_SUCCESS } = actionTypes;
    expect(businessReducer(initialState, {
      type: QUERY_BUSINESS_SUCCESS,
      businesses: {
        business: [],
        count: 0
      }
    })).toEqual(expectedState);
  });

  it('should handle QUERY_BUSINESS_ERROR action', () => {
    expectedState = {
      queries: {
        isFetching: false,
        businesses: null,
        count: null,
        error: 'not found'
      }
    };
    const { QUERY_BUSINESS_ERROR } = actionTypes;
    expect(businessReducer(initialState, {
      type: QUERY_BUSINESS_ERROR,
      error: 'not found'
    })).toEqual(expectedState);
  });
});
