import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loader from 'react-loader';

import { fetchBusinesses } from '../actions/businessesActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    return this.props.fetchAllBusinesses();
  }
  componentWillReceiveProps(nextProps) {
    console.log('Profile WillReceiveProps: ', nextProps);
  }
  render() {
    return (
      <section className="header-margin">
        <div>
          <h3>Profile</h3>
        </div>
        <div></div>
      </section>
    );
  }
}

// export default Profile;
const mapStateToProps = (state) => {
  return {
    businesses: state.businesses.businesses,
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    fetchAllBusinesses: () => dispatch(fetchBusinesses()),
    // fetchReviews: () => dispatch()
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Profile);
