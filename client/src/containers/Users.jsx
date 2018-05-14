import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';

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
}
export default Users;
