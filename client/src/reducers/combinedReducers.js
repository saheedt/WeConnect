import { combineReducers } from 'redux';

import businesses from './businessesReducer';

const rootReducers = combineReducers({
  businesses
});

export default rootReducers;
