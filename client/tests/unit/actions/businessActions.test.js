import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as businessesActions from '../../../src/actions/businessesActions';
import * as actionTypes from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Businesses Actions', () => {
  let business, review;
  beforeEach(() => {
    business = {
      name: 'not so testy',
      address: 'Andela epic towers',
      phonenumber: '4567765',
      state: 'lagos',
      category: 'pro testers'
    };
    review = {
      name: 'test reviewer',
      review: 'test review'
    };
  });
  it('handles ADDING_BUSINESS', () => {
    const { ADDING_BUSINESS } = actionTypes;
    const { addingBusiness } = businessesActions;
    expect(addingBusiness().type).toEqual(ADDING_BUSINESS);
  });
  it('handles ADDING_BUSINESS_SUCCESS', () => {
    const { ADDING_BUSINESS_SUCCESS } = actionTypes;
    const { addingBusinessSuccess } = businessesActions;
    expect(addingBusinessSuccess(business).type)
      .toEqual(ADDING_BUSINESS_SUCCESS);
    expect(addingBusinessSuccess(business).business)
      .toEqual(business);
  });
  it('handles ADDING_BUSINESS_SUCCESS ', () => {
    const { ADDING_BUSINESS_SUCCESS } = actionTypes;
    const { addingBusinessSuccess } = businessesActions;
    expect(addingBusinessSuccess(business).type)
      .toEqual(ADDING_BUSINESS_SUCCESS);
    expect(addingBusinessSuccess(business).business)
      .toEqual(business);
  });
  it('handles ADDING_BUSINESS_ERROR ', () => {
    const { ADDING_BUSINESS_ERROR } = actionTypes;
    const { addingBusinessError } = businessesActions;
    const err = addingBusinessError('errored');
    expect(err.type).toEqual(ADDING_BUSINESS_ERROR);
    expect(err.error).toEqual('errored');
  });
  it('handles UPDATE_BUSINESS_PREP ', () => {
    const { UPDATE_BUSINESS_PREP } = actionTypes;
    const { businessUpdatePrep } = businessesActions;
    const prep = businessUpdatePrep(business);
    expect(prep.type).toEqual(UPDATE_BUSINESS_PREP);
    expect(prep.businessData.category).toEqual('pro testers');
  });
  it('handles UPDATE_BUSINESS ', () => {
    const { UPDATE_BUSINESS } = actionTypes;
    const { updateBusiness } = businessesActions;
    const update = updateBusiness();
    expect(update.type).toEqual(UPDATE_BUSINESS);
  });
  it('handles UPDATE_BUSINESS_SUCCESS ', () => {
    const { UPDATE_BUSINESS_SUCCESS } = actionTypes;
    const { updateBusinessSuccess } = businessesActions;
    const update = updateBusinessSuccess(business);
    expect(update.type).toEqual(UPDATE_BUSINESS_SUCCESS);
    expect(update.business.name).toEqual(business.name);
  });
  it('handles UPDATE_BUSINESS_ERROR ', () => {
    const { UPDATE_BUSINESS_ERROR } = actionTypes;
    const { updateBusinessError } = businessesActions;
    const update = updateBusinessError('update error');
    expect(update.type).toEqual(UPDATE_BUSINESS_ERROR);
    expect(update.error).toEqual('update error');
  });
  it('handles FETCHING_BUSINESSES ', () => {
    const { FETCHING_BUSINESSES } = actionTypes;
    const { getBusinesses } = businessesActions;
    const get = getBusinesses();
    expect(get.type).toEqual(FETCHING_BUSINESSES);
  });
  it('handles FETCHING_BUSINESS ', () => {
    const { FETCHING_BUSINESS } = actionTypes;
    const { getBusiness } = businessesActions;
    const get = getBusiness();
    expect(get.type).toEqual(FETCHING_BUSINESS);
  });
  it('handles FETCHING_BUSINESS_REVIEWS ', () => {
    const { FETCHING_BUSINESS_REVIEWS } = actionTypes;
    const { getBusinessReviews } = businessesActions;
    const get = getBusinessReviews();
    expect(get.type).toEqual(FETCHING_BUSINESS_REVIEWS);
  });
  it('handles FETCHING_BUSINESS_REVIEWS ', () => {
    const { FETCHING_BUSINESS_REVIEWS } = actionTypes;
    const { getBusinessReviews } = businessesActions;
    const get = getBusinessReviews();
    expect(get.type).toEqual(FETCHING_BUSINESS_REVIEWS);
  });
  it('handles FETCHING_BUSINESSES_SUCCESS ', () => {
    const { FETCHING_BUSINESSES_SUCCESS } = actionTypes;
    const { getBusinessesSuccess } = businessesActions;
    business.count = 400;
    const get = getBusinessesSuccess(business);
    expect(get.type).toEqual(FETCHING_BUSINESSES_SUCCESS);
    expect(get.count).toEqual(business.count);
  });
  it('handles FETCHING_BUSINESS_SUCCESS ', () => {
    const { FETCHING_BUSINESS_SUCCESS } = actionTypes;
    const { getBusinessSuccess } = businessesActions;
    const get = getBusinessSuccess(business);
    expect(get.type).toEqual(FETCHING_BUSINESS_SUCCESS);
  });
  it('handles FETCHING_BUSINESS_REVIEWS_SUCCESS ', () => {
    const { FETCHING_BUSINESS_REVIEWS_SUCCESS } = actionTypes;
    const { getBusinessReviewsSuccess } = businessesActions;
    const get = getBusinessReviewsSuccess(review);
    expect(get.type).toEqual(FETCHING_BUSINESS_REVIEWS_SUCCESS);
    expect(get.review).toEqual(review.review);
  });
  it('handles FETCHING_BUSINESSES_ERROR ', () => {
    const { FETCHING_BUSINESSES_ERROR } = actionTypes;
    const { getBusinessesError } = businessesActions;
    const get = getBusinessesError('errored');
    expect(get.type).toEqual(FETCHING_BUSINESSES_ERROR);
    expect(get.error).toEqual('errored');
  });
  it('handles FETCHING_BUSINESS_ERROR ', () => {
    const { FETCHING_BUSINESS_ERROR } = actionTypes;
    const { getBusinessError } = businessesActions;
    const get = getBusinessError('errored again');
    expect(get.type).toEqual(FETCHING_BUSINESS_ERROR);
    expect(get.error).toEqual('errored again');
  });
  it('handles FETCHING_BUSINESS_REVIEWS_ERROR ', () => {
    const { FETCHING_BUSINESS_REVIEWS_ERROR } = actionTypes;
    const { getBusinessReviewsError } = businessesActions;
    const get = getBusinessReviewsError('errored again again');
    expect(get.type).toEqual(FETCHING_BUSINESS_REVIEWS_ERROR);
    expect(get.error).toEqual('errored again again');
  });
  it('handles ADDING_BUSINESS_REVIEW ', () => {
    const { ADDING_BUSINESS_REVIEW } = actionTypes;
    const { addingBusinessReview } = businessesActions;
    const add = addingBusinessReview();
    expect(add.type).toEqual(ADDING_BUSINESS_REVIEW);
  });
  it('handles ADDING_BUSINESS_REVIEW_SUCCESS ', () => {
    const { ADDING_BUSINESS_REVIEW_SUCCESS } = actionTypes;
    const { addingBusinessReviewSuccess } = businessesActions;
    const add = addingBusinessReviewSuccess(review);
    expect(add.type).toEqual(ADDING_BUSINESS_REVIEW_SUCCESS);
    expect(add.review.name).toEqual(review.name);
  });
  it('handles ADDING_BUSINESS_REVIEW_ERROR ', () => {
    const { ADDING_BUSINESS_REVIEW_ERROR } = actionTypes;
    const { addingBusinessReviewError } = businessesActions;
    const add = addingBusinessReviewError('another error');
    expect(add.type).toEqual(ADDING_BUSINESS_REVIEW_ERROR);
    expect(add.error).toEqual('another error');
  });
  it('handles CLEAR_BUSINESSES_ERROR ', () => {
    const { CLEAR_BUSINESSES_ERROR } = actionTypes;
    const { clearBusinessesError } = businessesActions;
    const details = {
      add: {
        isFetching: true,
        businesses: null,
        error: null
      }
    };
    const clear = clearBusinessesError(details);
    expect(clear.type).toEqual(CLEAR_BUSINESSES_ERROR);
    expect(clear.details.add.error).toBeNull();
  });
  it('handles QUERY_BUSINESS ', () => {
    const { QUERY_BUSINESS } = actionTypes;
    const { queryBusiness } = businessesActions;
    const query = queryBusiness();
    expect(query.type).toEqual(QUERY_BUSINESS);
  });
  it('handles QUERY_BUSINESS_SUCCESS ', () => {
    const { QUERY_BUSINESS_SUCCESS } = actionTypes;
    const { queryBusinessSuccess } = businessesActions;
    const query = queryBusinessSuccess([business]);
    expect(query.type).toEqual(QUERY_BUSINESS_SUCCESS);
    expect(query.businesses[0].name).toEqual(business.name);
  });
  it('handles QUERY_BUSINESS_ERROR ', () => {
    const { QUERY_BUSINESS_ERROR } = actionTypes;
    const { queryBusinessError } = businessesActions;
    const query = queryBusinessError('yet another error');
    expect(query.type).toEqual(QUERY_BUSINESS_ERROR);
    expect(query.error).toEqual('yet another error');
  });
  it('handles CLEAR_QUERY_ERROR ', () => {
    const { CLEAR_QUERY_ERROR } = actionTypes;
    const { clearQueryError } = businessesActions;
    const clear = clearQueryError('yet another error');
    expect(clear.type).toEqual(CLEAR_QUERY_ERROR);
  });

  describe('async calls', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe('Add businesses', () => {
      it('should create business', () => {
        moxios.stubRequest('/api/v1/businesses', {
          status: 200,
          response: {
            message: 'business successfully added',
            business
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.ADDING_BUSINESS
          },
          {
            type: actionTypes.ADDING_BUSINESS_SUCCESS,
            business
          }
        ];
        const store = mockStore({ add: {} });
        return store.dispatch(businessesActions.addBusiness(business, 'k9fyuy'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end

      it('should not create business on server error', () => {
        const errorMsg = {
          message: 'error creating business'
        };
        moxios.stubRequest('/api/v1/businesses', {
          status: 400,
          response: {
            message: errorMsg
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.ADDING_BUSINESS
          },
          {
            type: actionTypes.ADDING_BUSINESS_ERROR,
            error: errorMsg
          }
        ];
        const store = mockStore({ add: {} });
        return store.dispatch(businessesActions.addBusiness(business, '935uy'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end

      it('should not create business on network error', () => {
        const errorMsg = 'network error, try later';
        moxios.stubRequest('/api/v1/businesses', {
          status: 400,
          response: {
            error: errorMsg
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.ADDING_BUSINESS
          },
          {
            type: actionTypes.ADDING_BUSINESS_ERROR,
            error: errorMsg
          }
        ];
        const store = mockStore({ add: {} });
        return store.dispatch(businessesActions.addBusiness(business, '935uy'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // end add business

    describe('update business', () => {
      it('should update business', () => {
        const businessId = 1;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: {
            message: 'business successfully updated',
            business
          }
        });
        const expectedActions = [
          {
            type: actionTypes.UPDATE_BUSINESS
          },
          {
            type: actionTypes.UPDATE_BUSINESS_SUCCESS,
            business
          }
        ];
        const store = mockStore({ update: {} });
        return store
          .dispatch(businessesActions
            .businessUpdate(businessId, business, 'iwby8'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end

      it('should not update business on server error', () => {
        const errorMsg = {
          message: 'error updating business'
        };
        const businessId = 1;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 400,
          response: {
            message: errorMsg,
          }
        });
        const expectedActions = [
          {
            type: actionTypes.UPDATE_BUSINESS
          },
          {
            type: actionTypes.UPDATE_BUSINESS_ERROR,
            error: errorMsg
          }
        ];
        const store = mockStore({ update: {} });
        return store
          .dispatch(businessesActions
            .businessUpdate(businessId, business, 'iwby8'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end

      it('should not update business on network error', () => {
        const errorMsg = 'network error, try later';
        const businessId = 1;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 400,
          response: {
            error: errorMsg,
          }
        });
        const expectedActions = [
          {
            type: actionTypes.UPDATE_BUSINESS
          },
          {
            type: actionTypes.UPDATE_BUSINESS_ERROR,
            error: errorMsg
          }
        ];
        const store = mockStore({ update: {} });
        return store
          .dispatch(businessesActions
            .businessUpdate(businessId, business, 'iwby8'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // end update business

    describe('fetch businesses', () => {
      it('should fetch businesses', () => {
        const page = 1;
        const count = 1;
        moxios.stubRequest(`/api/v1/businesses?page=${page}`, {
          status: 200,
          response: {
            businesses: business,
            count
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_BUSINESSES_SUCCESS,
            businesses: business,
            count
          }
        ];
        const store = mockStore({ businesses: {} });
        return store
          .dispatch(businessesActions.fetchBusinesses(page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch on businesses error', () => {
        const page = 1;
        const error = 'fetch errored';
        moxios.stubRequest(`/api/v1/businesses?page=${page}`, {
          status: 200,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_BUSINESSES_ERROR,
            error
          }
        ];
        const store = mockStore({ businesses: {} });
        return store
          .dispatch(businessesActions.fetchBusinesses(page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch on server error', () => {
        const page = 1;
        const error = {
          message: 'fetch errored'
        };
        moxios.stubRequest(`/api/v1/businesses?page=${page}`, {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_BUSINESSES_ERROR,
            error
          }
        ];
        const store = mockStore({ businesses: {} });
        return store
          .dispatch(businessesActions.fetchBusinesses(page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch on network error', () => {
        const page = 1;
        const error = 'network error, try later';
        moxios.stubRequest(`/api/v1/businesses?page=${page}`, {
          status: 400,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESSES
          },
          {
            type: actionTypes.FETCHING_BUSINESSES_ERROR,
            error
          }
        ];
        const store = mockStore({ businesses: {} });
        return store
          .dispatch(businessesActions.fetchBusinesses(page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // end fetch businesses

    describe('fetch business', () => {
      it('should fetch business', () => {
        const businessId = 1;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: {
            business
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_SUCCESS,
            business
          }
        ];
        const store = mockStore({ business: {} });
        return store
          .dispatch(businessesActions.fetchBusiness(businessId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch on business error', () => {
        const businessId = 1;
        const error = 'fetch errored';
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_ERROR,
            error
          }
        ];
        const store = mockStore({ business: {} });
        return store
          .dispatch(businessesActions.fetchBusiness(businessId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch business on server error', () => {
        const businessId = 1;
        const error = { message: 'fetch errored' };
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_ERROR,
            error
          }
        ];
        const store = mockStore({ business: {} });
        return store
          .dispatch(businessesActions.fetchBusiness(businessId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch business on network error', () => {
        const businessId = 1;
        const error = 'network error, try later';
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 400,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_ERROR,
            error
          }
        ];
        const store = mockStore({ business: {} });
        return store
          .dispatch(businessesActions.fetchBusiness(businessId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // fetch business end

    describe('fetch reviews', () => {
      it('should fetch reviews', () => {
        const businessId = 1;
        const page = 1;
        const reviews = {
          count: 2,
          reviews: [
            {
              name: 'anonymous',
              review: 'review 1'
            },
            {
              name: 'test',
              review: 'review 2'
            }
          ]
        };
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?page=${page}`, {
          status: 200,
          response: {
            ...reviews
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS_SUCCESS,
            ...reviews
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.fetchReviews(businessId, page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch reviews on fetch error', () => {
        const businessId = 1;
        const page = 1;
        const fetchError = 'fetch error...';
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?page=${page}`, {
          status: 200,
          response: {
            error: fetchError
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS_ERROR,
            error: fetchError
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.fetchReviews(businessId, page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch reviews on server error', () => {
        const businessId = 1;
        const page = 1;
        const fetchError = { message: 'fetch error...' };
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?page=${page}`, {
          status: 400,
          response: {
            message: fetchError
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS_ERROR,
            error: fetchError
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.fetchReviews(businessId, page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch reviews on network error', () => {
        const businessId = 1;
        const page = 1;
        const fetchError = 'network error, try later';
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?page=${page}`, {
          status: 400,
          response: {
            error: fetchError
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_BUSINESSES_ERROR,
            details: undefined
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS
          },
          {
            type: actionTypes.FETCHING_BUSINESS_REVIEWS_ERROR,
            error: fetchError
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.fetchReviews(businessId, page))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // fetch reviews end

    describe('query business', () => {
      const count = 1;
      it('should query businesses', () => {
        const by = 'category';
        const queryData = 'test business';
        const pageOffset = 5;
        moxios.stubRequest(`/api/v1/businesses?${by}=${queryData}&page=${pageOffset}`, {
          status: 200,
          response: {
            business,
            count
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_QUERY_ERROR
          },
          {
            type: actionTypes.QUERY_BUSINESS
          },
          {
            type: actionTypes.QUERY_BUSINESS_SUCCESS,
            businesses: {
              business,
              count
            },
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.query(by, queryData, pageOffset))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch query on query error', () => {
        const by = 'category';
        const queryData = 'test business';
        const pageOffset = 5;
        const queryError = 'query error...';
        moxios.stubRequest(`/api/v1/businesses?${by}=${queryData}&page=${pageOffset}`, {
          status: 200,
          response: {
            error: queryError
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_QUERY_ERROR
          },
          {
            type: actionTypes.QUERY_BUSINESS
          },
          {
            type: actionTypes.QUERY_BUSINESS_ERROR,
            error: queryError
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.query(by, queryData, pageOffset))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch query on server error', () => {
        const by = 'category';
        const queryData = 'test business';
        const pageOffset = 5;
        const queryError = { message: 'query error...' };
        moxios.stubRequest(`/api/v1/businesses?${by}=${queryData}&page=${pageOffset}`, {
          status: 400,
          response: {
            message: queryError
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_QUERY_ERROR
          },
          {
            type: actionTypes.QUERY_BUSINESS
          },
          {
            type: actionTypes.QUERY_BUSINESS_ERROR,
            error: queryError
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.query(by, queryData, pageOffset))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not fetch query on network error', () => {
        const by = 'category';
        const queryData = 'test business';
        const pageOffset = 5;
        const queryError = 'network error, try later';
        moxios.stubRequest(`/api/v1/businesses?${by}=${queryData}&page=${pageOffset}`, {
          status: 400,
          response: {
            error: queryError
          }
        });
        const expectedActions = [
          {
            type: actionTypes.CLEAR_QUERY_ERROR
          },
          {
            type: actionTypes.QUERY_BUSINESS
          },
          {
            type: actionTypes.QUERY_BUSINESS_ERROR,
            error: queryError
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.query(by, queryData, pageOffset))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // query business end

    describe('Add business review', () => {
      it('should review business', () => {
        const businessId = 1;
        const message = 'business sucessfully reviewed';
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
          status: 200,
          response: {
            message,
            review
          }
        });
        const expectedActions = [
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW
          },
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW_SUCCESS,
            review
          }
        ];
        const store = mockStore({ reviews: {} });
        return store
          .dispatch(businessesActions.addBusinessReview(businessId, review))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not review business on review error', () => {
        const businessId = 1;
        const error = 'business sucessfully reviewed';
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
          status: 200,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW
          },
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW_ERROR,
            error
          }
        ];
        const store = mockStore({ review: {} });
        return store
          .dispatch(businessesActions.addBusinessReview(businessId, review))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not review business on server error', () => {
        const businessId = 1;
        const error = { message: 'business sucessfully reviewed' };
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
          status: 400,
          response: {
            message: error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW
          },
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW_ERROR,
            error
          }
        ];
        const store = mockStore({ review: {} });
        return store
          .dispatch(businessesActions.addBusinessReview(businessId, review))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
      it('should not review business on network error', () => {
        const businessId = 1;
        const error = 'network error, try later';
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
          status: 400,
          response: {
            error
          }
        });
        const expectedActions = [
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW
          },
          {
            type: actionTypes.ADDING_BUSINESS_REVIEW_ERROR,
            error
          }
        ];
        const store = mockStore({ review: {} });
        return store
          .dispatch(businessesActions.addBusinessReview(businessId, review))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }); // end
    }); // add review end
  });
});
