import React, { Component } from 'react';
import { connect } from 'react-redux';


class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: null
    };
  }
  componentWillMount() {
  }
  componentWillReceiveProps() {
  }
  render() {
    return (
      <div className="loader-holder">
        <div className="loader"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.businesses
  };
};

export default connect(mapStateToProps)(Loader);
