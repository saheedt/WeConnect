import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from '../reducers/combinedReducers';

/**
 * @param {any} initialState initial application state data
 * @returns {Object} data to write into store
 */
export default function configureStore(initialState = undefined) {
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
}
