import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchBusinesses } from '../actions/businessesActions';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: null
    };
  }
  componentWillMount() {
    this.props.fetchBusinesses();
  }
  componentWillReceiveProps() {
    if (Array.isArray(this.props.businesses)) {
      this.setState({ businesses: this.props.businesses });
    }
  }
  render() {
    return (
      <section id="listings" className="header-margin">
        <ul id="listings-list" className="collection max630">
          {this.state.businesses}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.businesses
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    fetchBusinesses: () => dispatch(fetchBusinesses())
  };
};
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchedToProps
// ))(Listings);
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Listings);
