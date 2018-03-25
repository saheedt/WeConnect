import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <h1>BUSINESSES</h1>
    );
  }
}

export default Businesses;
