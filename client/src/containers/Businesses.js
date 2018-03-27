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
      <div className="flex fill flex-column">
        <Header />
        <h1>BUSINESSES</h1>
      </div>
    );
  }
}

export default Businesses;
