import userReducer from '../../../src/reducers/userReducer';
import * as actionTypes from '../../../src/actions/actionTypes';

describe('user reducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {};
  });

  it('should return empty object as initial state', () => {
    expect(userReducer(undefined, {})).toEqual({});
  });

  it('should handle USER_LOGIN action', () => {
    expectedState = {
      isFetching: true,
      error: null,
      token: null,
      user: null
    };
    const { USER_LOGIN } = actionTypes;
    expect(userReducer(initialState, {
      type: USER_LOGIN,
    })).toEqual(expectedState);
  });

  it('should handle USER_LOGIN_SUCCESS action', () => {
    expectedState = {
      isFetching: false,
      user: {
        email: 'a@b.com',
        id: 1
      },
      token: '1234567890',
      error: null
    };
    const { USER_LOGIN_SUCCESS } = actionTypes;
    expect(userReducer(initialState, {
      type: USER_LOGIN_SUCCESS,
      user: {
        user: {
          email: 'a@b.com',
          id: 1
        },
        token: '1234567890'
      }
    })).toEqual(expectedState);
  });

  it('should handle USER_LOGIN_ERROR action', () => {
    expectedState = {
      isFetching: false,
      error: 'login error',
      user: null,
      token: null
    };
    const { USER_LOGIN_ERROR } = actionTypes;
    expect(userReducer(initialState, {
      type: USER_LOGIN_ERROR,
      error: 'login error'
    })).toEqual(expectedState);
  });

  it('should handle USER_SIGNUP action', () => {
    expectedState = {
      isFetching: true,
      error: null,
      token: null,
      user: null
    };
    const { USER_SIGNUP } = actionTypes;
    expect(userReducer(initialState, {
      type: USER_SIGNUP
    })).toEqual(expectedState);
  });

  it('should handle USER_SIGNUP_SUCCESS action', () => {
    expectedState = {
      isFetching: false,
      user: {
        email: 'b@c.com',
        id: 2
      },
      token: '0987654321',
      error: null
    };
    const { USER_SIGNUP_SUCCESS } = actionTypes;
    expect(userReducer(initialState, {
      type: USER_SIGNUP_SUCCESS,
      user: {
        user: {
          email: 'b@c.com',
          id: 2
        },
        token: '0987654321'
      }
    })).toEqual(expectedState);
  });

  it('should handle USER_SIGNUP_ERROR action', () => {
    expectedState = {
      isFetching: false,
      error: 'signup error',
      user: null,
      token: null
    };
    const { USER_SIGNUP_ERROR } = actionTypes;
    expect(userReducer(initialState, {
      type: USER_SIGNUP_ERROR,
      error: 'signup error'
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_USER_BUSINESSES action', () => {
    expectedState = {
      profile: {
        isFetching: true,
        error: null,
        businesses: null,
        message: null,
      }
    };
    const { FETCHING_USER_BUSINESSES } = actionTypes;
    expect(userReducer(initialState, {
      type: FETCHING_USER_BUSINESSES
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_USER_BUSINESSES_SUCCESS action', () => {
    expectedState = {
      profile: {
        isFetching: false,
        error: null,
        businesses: [
          {
            name: 'test',
            location: 'test',
            employees: 200,
            address: 'test',
            phonenumber: 1234567890,
            category: 'testing',
            userId: 1,
            image_url: 'http://test.com'
          }
        ],
        message: null,
      }
    };
    const { FETCHING_USER_BUSINESSES_SUCCESS } = actionTypes;
    expect(userReducer(initialState, {
      type: FETCHING_USER_BUSINESSES_SUCCESS,
      businesses: [
        {
          name: 'test',
          location: 'test',
          employees: 200,
          address: 'test',
          phonenumber: 1234567890,
          category: 'testing',
          userId: 1,
          image_url: 'http://test.com'
        }
      ]
    })).toEqual(expectedState);
  });

  it('should handle FETCHING_USER_BUSINESSES_ERROR action', () => {
    expectedState = {
      profile: {
        isFetching: false,
        error: 'fetching user businesses error',
        businesses: null,
        message: null,
      }
    };
    const { FETCHING_USER_BUSINESSES_ERROR } = actionTypes;
    expect(userReducer(initialState, {
      type: FETCHING_USER_BUSINESSES_ERROR,
      error: 'fetching user businesses error'
    })).toEqual(expectedState);
  });

  it('should handle DELETE_BUSINESS action', () => {
    expectedState = {
      profile: {
        isFetching: true,
        message: null,
        error: null
      }
    };
    const { DELETE_BUSINESS } = actionTypes;
    expect(userReducer(initialState, {
      type: DELETE_BUSINESS
    })).toEqual(expectedState);
  });

  it('should handle DELETE_BUSINESS_ERROR action', () => {
    expectedState = {
      profile: {
        isFetching: false,
        message: null,
        error: 'error deleting user business'
      }
    };
    const { DELETE_BUSINESS_ERROR } = actionTypes;
    expect(userReducer(initialState, {
      type: DELETE_BUSINESS_ERROR,
      error: 'error deleting user business'
    })).toEqual(expectedState);
  });

  it('should handle DELETE_BUSINESS_SUCCESS action', () => {
    expectedState = {
      profile: {
        isFetching: false,
        message: 'successfully deleted user business',
        error: null
      }
    };
    const { DELETE_BUSINESS_SUCCESS } = actionTypes;
    expect(userReducer(initialState, {
      type: DELETE_BUSINESS_SUCCESS,
      message: 'successfully deleted user business'
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_USER_ERROR action', () => {
    expectedState = {
      isFetching: false,
      error: null,
      token: '1234567890',
      user: {
        email: 'a@b.com',
        id: 1
      }
    };
    const { CLEAR_USER_ERROR } = actionTypes;
    expect(userReducer(initialState, {
      type: CLEAR_USER_ERROR,
      token: '1234567890',
      user: {
        email: 'a@b.com',
        id: 1
      }
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_USER_TOKEN action', () => {
    expectedState = {
      isFetching: false,
      error: null,
      token: null,
      user: null
    };
    const { CLEAR_USER_TOKEN } = actionTypes;
    expect(userReducer(initialState, {
      type: CLEAR_USER_TOKEN
    })).toEqual(expectedState);
  });
});
