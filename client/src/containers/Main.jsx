import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwModal from 'jw-react-modal';

import Users from '../containers/Users.jsx';
import Businesses from './Businesses.jsx';
import Header from '../components/Header.jsx';
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
        <Route render={props => <Header {...props}
          openLogin={event => this.openLogin(event)}
        />}
        />
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
        }}/>
        <Route path="/users" render={props => <Users {...props} />}/>
        <Route exact path="/" render={() => (<Redirect to="/businesses"/>)}/>
        {Users.showSignUp(
          JwModal,
          this.closeSignUp,
          this.openLogin
        )}
        {Users.showLogin(
          JwModal,
          this.closeLogin,
          this.openSignUp
        )}
      </section>
    );
  }
}

export default Main;
