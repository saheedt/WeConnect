import React from 'react';
import { Route } from 'react-router-dom';

import Profile from '../components/Profile.jsx';

const Users = (props) => {
  const { url } = props.match;
  const {
    openLogin,
    closeLogin
  } = props;
  return (
    <Route exact path={`${url}/profile`} render={
      (properties) => {
        return (
          <Profile {...properties}
            openLogin={openLogin}
            closeLogin={closeLogin}
          />
        );
      }
    }/>
  );
};
export default Users;
