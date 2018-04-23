import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import JwModal from 'jw-react-modal';

import Users from '../containers/Users'

import Header from '../components/Header';
import Listings from '../components/Listings';
import BizProfile from '../components/BizProfile';
import Query from '../components/Query';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // openLogin() {
  //   JwModal.open('user-login')
  // }
  closeLogin(event) {
    return JwModal.close('user-login')(event)
  }
  openSignUp(event) {
    return JwModal.open('user-sign-up')(event)
  }
  closeSignUp() {
    JwModal.close('user-sign-up')
  }
  render() {
    const { url } = this.props.match;
    return (
      <div className="flex flex-column">
      <Route render={props => <Header {...props}
        openLogin={event => JwModal.open('user-login')(event)}
        // closeLogin={event => JwModal.close('user-login')(event)}
        // openSignUp={event => JwModal.open('user-sign-up')(event)}
      />}
      />
        <Switch>
          <Route exact path={`${url}/filter`}
            render={props => (<Query {...props}/>)}/>
          <Route path={`${url}/:businessId`}
            render={props => (<BizProfile {...props}/>)}/>
          <Route exact path={`${url}`}
            render={props => (<Listings {...props}/>)}/>
        </Switch>
        <Route render={props => Users.showLogin(JwModal,
          this.closeLogin.bind(this),
          this.openSignUp.bind(this)
          )}/>
        <Route render={props => Users.showSignUp(JwModal)}/>
      </div>
    );
  }
}

export default Businesses;
