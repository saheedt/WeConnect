import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../../src/actions/userActions';
import * as actionTypes from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  let user, token, authDetails;
  beforeEach(() => {
    user = {
      email: 'test@test.com',
      id: 1
    };
    authDetails = {
      email: 'test@test.com',
      password: 'testing'
    };
    token = 'ihwkajlnovwrn787';
  });
  describe('sync calls', () => {
    it('handles USER_LOGIN', () => {
      const { USER_LOGIN } = actionTypes;
      const { userLogin } = userActions;
      expect(userLogin().type).toEqual(USER_LOGIN);
    });

    it('handles USER_LOGIN_SUCCESS', () => {
      const { USER_LOGIN_SUCCESS } = actionTypes;
      const { userLoginSuccess } = userActions;
      expect(userLoginSuccess().type).toEqual(USER_LOGIN_SUCCESS);
    });

    it('handles USER_LOGIN_ERROR', () => {
      const { USER_LOGIN_ERROR } = actionTypes;
      const { userLoginError } = userActions;
      expect(userLoginError().type).toEqual(USER_LOGIN_ERROR);
    });

    it('handles USER_SIGNUP', () => {
      const { USER_SIGNUP } = actionTypes;
      const { userSignup } = userActions;
      expect(userSignup().type).toEqual(USER_SIGNUP);
    });

    it('handles USER_SIGNUP_SUCCESS', () => {
      const { USER_SIGNUP_SUCCESS } = actionTypes;
      const { userSignupSuccess } = userActions;
      expect(userSignupSuccess().type).toEqual(USER_SIGNUP_SUCCESS);
    });

    it('handles USER_SIGNUP_ERROR', () => {
      const { USER_SIGNUP_ERROR } = actionTypes;
      const { userSignupError } = userActions;
      expect(userSignupError().type).toEqual(USER_SIGNUP_ERROR);
    });

    it('handles CLEAR_USER_TOKEN', () => {
      const { CLEAR_USER_TOKEN } = actionTypes;
      const { clearUserToken } = userActions;
      expect(clearUserToken().type).toEqual(CLEAR_USER_TOKEN);
    });

    it('handles CLEAR_USER_ERROR', () => {
      const { CLEAR_USER_ERROR } = actionTypes;
      const { clearUserError } = userActions;
      expect(clearUserError({ user, token }).type).toEqual(CLEAR_USER_ERROR);
    });

    it('handles FETCHING_USER_BUSINESSES', () => {
      const { FETCHING_USER_BUSINESSES } = actionTypes;
      const { fetchingUserBusinesses } = userActions;
      expect(fetchingUserBusinesses().type).toEqual(FETCHING_USER_BUSINESSES);
    });

    it('handles FETCHING_USER_BUSINESSES_SUCCESS', () => {
      const { FETCHING_USER_BUSINESSES_SUCCESS } = actionTypes;
      const { fetchingUserBusinessesSuccess } = userActions;
      expect(fetchingUserBusinessesSuccess().type)
        .toEqual(FETCHING_USER_BUSINESSES_SUCCESS);
    });

    it('handles FETCHING_USER_BUSINESSES_ERROR', () => {
      const { FETCHING_USER_BUSINESSES_ERROR } = actionTypes;
      const { fetchingUserBusinessesError } = userActions;
      expect(fetchingUserBusinessesError().type)
        .toEqual(FETCHING_USER_BUSINESSES_ERROR);
    });

    it('handles DELETE_BUSINESS', () => {
      const { DELETE_BUSINESS } = actionTypes;
      const { deletingBusiness } = userActions;
      expect(deletingBusiness().type).toEqual(DELETE_BUSINESS);
    });

    it('handles DELETE_BUSINESS_SUCCESS', () => {
      const { DELETE_BUSINESS_SUCCESS } = actionTypes;
      const { deletingBusinessSuccess } = userActions;
      expect(deletingBusinessSuccess().type).toEqual(DELETE_BUSINESS_SUCCESS);
    });

    it('handles DELETE_BUSINESS_ERROR', () => {
      const { DELETE_BUSINESS_ERROR } = actionTypes;
      const { deletingBusinessError } = userActions;
      expect(deletingBusinessError().type).toEqual(DELETE_BUSINESS_ERROR);
    });
  }); // sync calls end

  describe('async calls', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe('fetch user businesses', () => {
      const userId = 1;
      const businesses = [{
        name: 'test',
        address: 'test too'
      }, {
        name: 'test eh',
        address: 'test too eh'
      }];
      it('should fetch user businesses', () => {
        moxios.stubRequest(`/api/v1/businesses/${userId}/businesses`, {
          status: 200,
          response: {
            message: 'user businesses successfully retrieved',
            businesses
          }
        });
        const expectedActions = [
          {
            type: actionTypes.FETCHING_USER_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_USER_BUSINESSES_SUCCESS,
            businesses
          }
        ];
        const store = mockStore({ business: {} });
        return store.dispatch(userActions.fetchUserBusinesses(userId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch user businesses on error', () => {
        const error = 'errored';
        moxios.stubRequest(`/api/v1/businesses/${userId}/businesses`, {
          status: 200,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.FETCHING_USER_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_USER_BUSINESSES_ERROR,
            error
          }
        ];
        const store = mockStore({ business: {} });
        return store.dispatch(userActions.fetchUserBusinesses(userId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch user businesses on server error', () => {
        const error = { message: 'errored' };
        moxios.stubRequest(`/api/v1/businesses/${userId}/businesses`, {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.FETCHING_USER_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_USER_BUSINESSES_ERROR,
            error
          }
        ];
        const store = mockStore({ business: {} });
        return store.dispatch(userActions.fetchUserBusinesses(userId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch user businesses on network error', () => {
        const error = 'network error, try later';
        moxios.stubRequest(`/api/v1/businesses/${userId}/businesses`, {
          status: 400,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.FETCHING_USER_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_USER_BUSINESSES_ERROR,
            error
          }
        ];
        const store = mockStore({ business: {} });
        return store.dispatch(userActions.fetchUserBusinesses(userId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    });// fetch user businesses end

    describe('login', () => {
      it('should successfully sign user in ', () => {
        moxios.stubRequest('/api/v1/auth/login', {
          status: 200,
          response: {
            message: 'login successful',
            user,
            token
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_USER_TOKEN
          },
          {
            type: actionTypes.USER_LOGIN
          },
          {
            type: actionTypes.USER_LOGIN_SUCCESS,
            user: {
              user,
              token
            }
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.doLogin(authDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not successfully sign user in on error', () => {
        const error = { message: 'login unsuccessful' };
        moxios.stubRequest('/api/v1/auth/login', {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_USER_TOKEN
          },
          {
            type: actionTypes.USER_LOGIN
          },
          {
            type: actionTypes.USER_LOGIN_ERROR,
            error
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.doLogin(authDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not successfully sign user in on network error', () => {
        const error = 'network error, please try later';
        moxios.stubRequest('/api/v1/auth/login', {
          status: 400,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_USER_TOKEN
          },
          {
            type: actionTypes.USER_LOGIN
          },
          {
            type: actionTypes.USER_LOGIN_ERROR,
            error
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.doLogin(authDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // login end

    describe('delete own business', () => {
      const businessId = 1;
      const message = 'business sucessfully deleted';
      it('should successfully delete own business', () => {
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: {
            message
          }
        });
        const expectedActions = [
          {
            type: actionTypes.DELETE_BUSINESS
          },
          {
            type: actionTypes.DELETE_BUSINESS_SUCCESS,
            message
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.deleteOwnBusiness(token, businessId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not successfully delete own business on error', () => {
        const error = { message: 'error deleting..' };
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.DELETE_BUSINESS
          },
          {
            type: actionTypes.DELETE_BUSINESS_ERROR,
            error
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.deleteOwnBusiness(token, businessId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // delete business end

    describe('sign up', () => {
      it('should successfully sign user up', () => {
        const message = 'user registered successfully';
        moxios.stubRequest('/api/v1/auth/signup', {
          status: 200,
          response: {
            message,
            user,
            token
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_USER_TOKEN
          },
          {
            type: actionTypes.USER_SIGNUP
          },
          {
            type: actionTypes.USER_SIGNUP_SUCCESS,
            user: {
              user,
              token
            }
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.doSignup(authDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not successfully sign user up on error', () => {
        const error = { message: 'user registered unsuccessfully' };
        moxios.stubRequest('/api/v1/auth/signup', {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_USER_TOKEN
          },
          {
            type: actionTypes.USER_SIGNUP
          },
          {
            type: actionTypes.USER_SIGNUP_ERROR,
            error
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.doSignup(authDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not successfully sign user up on network error', () => {
        const error = 'network error, please try later';
        moxios.stubRequest('/api/v1/auth/signup', {
          status: 400,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_USER_TOKEN
          },
          {
            type: actionTypes.USER_SIGNUP
          },
          {
            type: actionTypes.USER_SIGNUP_ERROR,
            error
          }
        ];
        const store = mockStore({ user: {} });
        return store.dispatch(userActions.doSignup(authDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    });
  }); // asyn calls end
});
