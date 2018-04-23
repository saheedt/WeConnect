import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import JwModal from 'jw-react-modal';

import Users from '../containers/Users'

import Header from '../components/Header';
import Listings from '../components/Listings';
import BizProfile from '../components/BizProfile';
import Query from '../components/Query';
// import Login from '../components/Login';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openLogin() {
    JwModal.open('user-login')
  }
  closeLogin() {
    JwModal.close('user-login')
  }
  render() {
    const { url } = this.props.match;
    return (
      <div className="flex flex-column">
      <Route render={props => <Header {...props}
        openLogin={event => JwModal.open('user-login')(event)}
        closeLogin={this.closeLogin.bind(this)}
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
        {/* <Route render={props =>
          <JwModal id={"user-login"}>
            <Login />
          </JwModal>
        }/> */}
        <Route render={props => Users.showLogin(JwModal)}/>
      </div>
    );
  }
}

export default Businesses;
