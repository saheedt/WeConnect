import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import OwnBusiness from './OwnBusiness.jsx';
import Spinner from './Spinner.jsx';

import { fetchUserBusinesses, deleteOwnBusiness } from '../actions/userActions';
/**
 * @description Displays user profile page
 * @class Profile
 * @extends {Component}
 * @export
 */

class Profile extends Component {
  /**
   * @description Creates an instance of Profile
   * @param {Object} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      ownBusinesses: null
    };
    this.doOwnBusinesses = this.doOwnBusinesses.bind(this);
    this.doDeleteBusiness = this.doDeleteBusiness.bind(this);
  }
  componentWillMount() {
    const { id } = this.props.user;
    const { doFetchUserBusinesses } = this.props;
    return doFetchUserBusinesses(id);
  }
  /**
   * @description Handles own business generation
   * @param {Array} businesses
   * @memberof Profile
   */
  doOwnBusinesses(businesses) {
    const ownBusinesses = businesses.map((business, index) => {
      const { name, createdAt, image_url, id } = business; /* eslint-disable-line */
      const unique = `${name}-${index}`;
      const { doDeleteBusiness } = this;
      return (
        <OwnBusiness
          key={unique}
          name={name}
          createdAt={createdAt}
          image_url={image_url} /* eslint-disable-line */
          businessId={id}
          deleteBusiness={doDeleteBusiness}
        />
      );
    });
    this.setState({ ownBusinesses });
  }
  /**
   * @description Handles delete business button click event
   * @param {Object} event
   * @memberof Profile
   */
  doDeleteBusiness(event) {
    const { businessId } = event.currentTarget.dataset;
    const { deleteBusiness, token } = this.props;
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this business!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          return deleteBusiness(token, businessId);
        }
      });
  }
  componentWillReceiveProps(nextProps) {
    const { businesses, message, doFetchUserBusinesses } = nextProps;
    const { id } = nextProps.user;
    const { doOwnBusinesses } = this;
    if (businesses) {
      doOwnBusinesses(businesses);
    }
    if (message) {
      doFetchUserBusinesses(id);
    }
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Profile
   */
  render() {
    const { ownBusinesses } = this.state;
    const { isFetching } = this.props;
    const { email } = this.props.user;
    return (
      <section className="header-margin flex flex-column profile-container">
        {isFetching && <Spinner spinnerColor={'#7fc6c8'} />}
        <div className="flex profile-header">
          <h3>Profile</h3>
        </div>
        <div className="max630 own-business">
          <ul className="collection with-header">
            <li className="collection-header with-profile-mail">
              <h5 className="half-way"><b>Own Business</b></h5>
              <div id="profile-email-holder"
                className="half-way flex flex-row justify-end align-end">
                <i className="material-icons">account_circle</i>
                {email}
              </div>
            </li>
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
    token: state.users.token,
    ...state.users.profile
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doFetchUserBusinesses: userId => dispatch(fetchUserBusinesses(userId)),
    deleteBusiness: (token, businessId) =>
      dispatch(deleteOwnBusiness(token, businessId))
  };
};

Profile.propTypes = {
  user: PropTypes.object,
  businesses: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string,
  isFetching: PropTypes.bool,
  message: PropTypes.string,
  error: PropTypes.string,
  doFetchUserBusinesses: PropTypes.func,
  deleteBusiness: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Profile);
