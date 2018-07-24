import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loader from 'react-loader';
import OwnBusiness from './OwnBusiness.jsx';

import { fetchUserBusinesses } from '../actions/userActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownBusinesses: null
    };
    this.doOwnBusinesses = this.doOwnBusinesses.bind(this);
  }
  componentWillMount() {
    const { id } = this.props.user;
    const { doFetchUserBusinesses } = this.props;
    return doFetchUserBusinesses(id);
  }
  doOwnBusinesses(businesses) {
    const ownBusinesses = businesses.map((business, index) => {
      const { name, createdAt, image_url, id } = business; /* eslint-disable-line */
      const unique = `${name}-${index}`;
      return (
        <OwnBusiness
          key={unique}
          name={name}
          createdAt={createdAt}
          image_url={image_url} /* eslint-disable-line */
          businessId={id}
        />
      );
    });
    this.setState({ ownBusinesses });
  }
  componentWillReceiveProps(nextProps) {
    const { businesses } = nextProps;
    const { doOwnBusinesses } = this;
    if (businesses) {
      doOwnBusinesses(businesses);
    }
  }
  render() {
    const { ownBusinesses } = this.state;
    console.log(this.state);
    return (
      <section className="header-margin flex flex-column profile-container">
        <div className="flex profile-header">
          <h3>Profile</h3>
        </div>
        <div className="max630 own-business">
          <ul className="collection with-header">
            <li className="collection-header"><h5><b>Own Business</b></h5></li>
            {ownBusinesses}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    ...state.users.profile
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doFetchUserBusinesses: userId => dispatch(fetchUserBusinesses(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Profile);
