import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Listings from '../components/Listings';
import BizProfile from '../components/BizProfile';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (

      <div className="flex flex-column">
        <Header path={this.props.match.url}/>
        <Switch>
          <Route exact path={`${this.props.match.url}/:businessId`}
            render={props => (<BizProfile {...props}/>)}/>
          <Route exact path={`${this.props.match.url}`}
            render={props => (<Listings {...props}/>)}/>
        </Switch>
      </div>
    );
  }
}

export default Businesses;
