import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Businesses from './Businesses';
import Login from '../components/Login'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id="entry">
      <Route path="/login" render={props =>
          (<Login />)} />
        <Route path="/businesses" render={props =>
          (<Businesses {...props}/>)} />
        <Route exact path="/" render={() => (<Redirect to="/businesses"/>)}/>
      </section>
    );
  }
}

export default Main;
