import { combineReducers } from 'redux';

import businesses from './businessesReducer';
import users from './userReducer';

const rootReducers = combineReducers({
  businesses,
  users
});

export default rootReducers;
