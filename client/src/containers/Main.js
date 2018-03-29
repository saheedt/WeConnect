import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Businesses from './Businesses';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id="entry">
        <Route path="/businesses" render={props =>
          (<Businesses {...props}/>)} />
        <Route exact path="/" render={() => (<Redirect to="/businesses"/>)}/>
      </section>
    );
  }
}

export default Main;
