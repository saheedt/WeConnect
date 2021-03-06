import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Users from '../containers/Users.jsx';
import Businesses from './Businesses.jsx';
import Header from '../components/Header.jsx'; // eslint-disable-line

const Main = (props) => {
  const {
    openLogin,
    closeLogin,
    openSignUp,
    closeSignUp
  } = props;
  return (
    <section id="entry">
      <Route render={properties => <Header {...properties}
        openLogin={event => openLogin(event)}
      />}
      />
      <Route path="/businesses" render={(properties) => {
        return (
          <Businesses
            {...properties}
            openLogin={openLogin}
            closeLogin={closeLogin}
            openSignUp={openSignUp}
            closeSignUp={closeSignUp}
          />
        );
      }}/>
      <Route path="/users" render={(properties) => {
        return (
          <Users
            {...properties}
            openLogin={openLogin}
            closeLogin={closeLogin}
            openSignUp={openSignUp}
            closeSignUp={closeSignUp}
          />
        );
      }}/>
      <Route exact path="/" render={() => (<Redirect to="/businesses"/>)}/>
    </section>
  );
};

export default Main;
