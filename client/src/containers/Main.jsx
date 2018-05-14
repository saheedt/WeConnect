import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwModal from 'jw-react-modal';

import Users from '../containers/Users.jsx';
import Businesses from './Businesses.jsx';
// import Login from '../components/Login.jsx';
// import SignUp from '../components/SignUp.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openLogin = this.openLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.closeSignUp = this.closeSignUp.bind(this);
  }
  openLogin(event) {
    return JwModal.open('user-login')(event);
  }
  closeLogin(event) {
    return JwModal.close('user-login')(event);
  }
  openSignUp(event) {
    return JwModal.open('user-sign-up')(event);
  }
  closeSignUp(event) {
    return JwModal.close('user-sign-up')(event);
  }
  render() {
    return (
      <section id="entry">
        {/* <Route exact path="/login" render={props =>
          (<Login />)} />
        <Route exact path="/signup" render={pros => <SignUp />}/> */}
        <Route path="/businesses" render={(props) => {
          return (
            <Businesses
              {...props}
              openLogin={this.openLogin}
              closeLogin={this.closeLogin}
              openSignUp={this.openSignUp}
              closeSignUp={this.closeSignUp}
            />
          );
        }
        }/>
        <Route exact path="/" render={() => (<Redirect to="/businesses"/>)}/>
        <Route
          render={ () => {
            return (
              Users.showLogin(
                JwModal,
                this.closeLogin,
                this.openSignUp
              )
            );
          }
          }
        />
        <Route
          render={() => {
            return (
              Users.showSignUp(
                JwModal,
                this.closeSignUp,
                this.openLogin
              )
            );
          }
          }
        />
      </section>
    );
  }
}

export default Main;
