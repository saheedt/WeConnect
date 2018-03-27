import React, { Component } from 'react';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id="listings" className="header-margin">
        <ul id="listings-list" className="collection max630">
        </ul>
      </section>
    );
  }
}

export default Listings;
