import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwModal from 'jw-react-modal';

import Users from '../containers/Users';
import Businesses from './Businesses';
import Login from '../components/Login'
import SignUp from '../components/SignUp'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openLogin(event) {
    return JwModal.open('user-login')(event)
  }
  closeLogin(event) {
    return JwModal.close('user-login')(event)
  }
  openSignUp(event) {
    return JwModal.open('user-sign-up')(event)
  }
  closeSignUp(event) {
    return JwModal.close('user-sign-up')(event)
  }
  render() {
    return (
      <section id="entry">
        {/* <Route exact path="/login" render={props =>
          (<Login />)} />
        <Route exact path="/signup" render={pros => <SignUp />}/> */}
        <Route path="/businesses" render={(props) => {
          return(
            <Businesses
              {...props}
              openLogin={this.openLogin.bind(this)}
              closeLogin={this.closeLogin.bind(this)}
              openSignUp={this.openSignUp.bind(this)}
              closeSignUp={this.closeSignUp.bind(this)}
            />
          )
        }
          }/>
        <Route exact path="/" render={() => (<Redirect to="/businesses"/>)}/>
        <Route
          render={(props) => {
           return(
            Users.showLogin(
              JwModal,
              this.closeLogin.bind(this),
              this.openSignUp.bind(this)
            )
           )}
          }
        />
        <Route
          render={(props) => {
           return(
            Users.showSignUp(
              JwModal,
              this.closeSignUp.bind(this),
              this.openLogin.bind(this)
            )
           )}
          }
        />
      </section>
    );
  }
}

export default Main;
