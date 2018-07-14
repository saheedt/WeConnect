import React from 'react';
import { Route } from 'react-router-dom';

import Profile from '../components/Profile.jsx';

const Users = (props) => {
  const { url } = props.match;
  return (
    <Route exact path={`${url}/profile`} component={Profile} />
  );
};
export default Users;
