import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import Profile from '../components/Profile.jsx';

class Users extends Component {
  static showLogin(JwModal, closeLogin, openSignUp) {
    return (
      <JwModal id="user-login">
        <Login closeLogin={closeLogin} openSignUp={openSignUp}/>
      </JwModal>
    );
  }
  static showSignUp(JwModal, closeSignUp, openLogin) {
    return (
      <JwModal id="user-sign-up">
        <SignUp closeSignUp={closeSignUp} openLogin={openLogin}/>
      </JwModal>
    );
  }
  render() {
    const { url } = this.props.match;
    return (
      <div>
        <Route exact path={`${url}/profile`} render={
          props => <Profile {...props} />
        }/>
      </div>
    );
  }
}
export default Users;
