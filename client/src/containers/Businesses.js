import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Header from '../components/Header';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>BUSINESSES</h1>
        <Header />
      </div>
    );
  }
}

export default Businesses;
