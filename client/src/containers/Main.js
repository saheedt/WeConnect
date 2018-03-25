import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
      </section>
    );
  }
}

export default Main;
