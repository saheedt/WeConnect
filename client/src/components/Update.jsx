import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from './Error.jsx';
import Success from './Success.jsx';

import {
  clearAllBusinessesError,
  businessUpdate
} from '../actions/businessesActions';
import {
  wipeUserError,
  loginError
} from '../actions/userActions';

/**
 * @description Displays Update business page
 * @class Add
 * @extends {Component}
 * @export
 */
class Update extends Component {
  /**
   * @description Creates an instance of Update
   * @param {Object} props
   * @memberof Update
   */
  constructor(props) {
    super(props);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount() {
    this.businessName = document.getElementById('company-name');
    this.businessAddress = document.getElementById('address');
    this.businessLocation = document.getElementById('state');
    this.staffStrength = document.getElementById('employees');
    this.businessCategory = document.getElementById('category');
    this.businessPhoneNumber = document.getElementById('phone-number');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      if (nextProps.error &&
        nextProps.error === 'invalid token') {
        nextProps.doLoginError('access token expired, kindly re-authenticate');
        return nextProps.openLogin(this.cachedEvent);
      }
      if (nextProps.token &&
          nextProps.error === 'unauthorized user') {
        nextProps
          .doLoginError('un-authorized to perform action, sign-in/sign-up');
        return nextProps.openLogin(this.cachedEvent);
      }
      if (nextProps.business) {
        Helper.clearInputs({ isAuth: false });
        return this.setState(
          {
            updateSuccessMsg: 'business profile successfully updated'
          },
          () => setTimeout(() => this.props.history.push('/user/profile'), 3000)
        );
      }
      return nextProps.closeLogin(this.cachedEvent);
    }
    if (!nextProps.token) {
      if (nextProps.error &&
        nextProps.error === 'invalid token') {
        nextProps.doLoginError('you appear offline, kindly sign-in/sign-up');
        return nextProps.openLogin(this.cachedEvent);
      }
      if (nextProps.error &&
        nextProps.error === 'unauthorized user') {
        nextProps.doLoginError('you appear offline, kindly sign-in/sign-up');
        return nextProps.openLogin(this.cachedEvent);
      }
      if (nextProps.business) {
        nextProps.doLoginError('you appear offline, kindly sign-in/sign-up');
        return nextProps.openLogin(this.cachedEvent);
      }
    }
  }
  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
  updateBusiness(event) {
    event.persist();
    event.preventDefault();
    const {
      token,
      user,
      openLogin,
      doBusinessUpdate,
      clearUserError,
      doLoginError
    } = this.props;
    const { businessId } = this.props.match.params;
    if (token) {
      clearUserError({ token, user });
    }
    const updateDetails = {
      name: this.businessName.value,
      address: this.businessAddress.value,
      location: this.businessLocation.value,
      phonenumber: this.businessPhoneNumber.value,
      employees: this.staffStrength.value,
      category: this.businessCategory.value
    };
    if (!token) {
      doLoginError('sign in to update business profile');
      this.cachedEvent = event;
      return setTimeout(() => openLogin(event), 100);
    }
    this.cachedEvent = event;
    return setTimeout(() => doBusinessUpdate(businessId, updateDetails, token));
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Update
   */
  render() {
    return (
      <div className="flex vertical-after-header">
        <Error error={this.props.error} />
        <Success message={this.state.updateSuccessMsg} />
        <section id="update-business-container"
          className="flex holder-60-shadow padding-20">
          <div className="row">
            <form className="col s12 ">
              <div className="row">
                <div className="input-field col s12 ">
                  <input id="company-name" type="text" className="validate" />
                  <label forhtml="company-name">Company name</label>
                </div>
                <div className="input-field col s12  ">
                  <input id="address" type="text" className="validate" />
                  <label forhtml="address">Address</label>
                </div>
                <div className="input-field col s12  ">
                  <input id="state" type="text" className="validate" />
                  <label forhtml="state">State</label>
                </div>
                <div className="input-field col s12 ">
                  <input id="employees" type="number" className="validate" />
                  <label forhtml="employees">Employees</label>
                </div>
                <div className="input-field col s12 ">
                  <input id="category" type="text" className="validate" />
                  <label forhtml="category">Category</label>
                </div>
                <div className="input-field col s12 ">
                  <input id="phone-number" type="number" className="validate" />
                  <label forhtml="phone-number">Phone number</label>
                </div>
              </div>
              <button onClick={this.updateBusiness} id="update-business-btn"
                className="teal col s12 ">
              Update Business Profile
              </button>
              <button onClick={this.goBack} id="update-business-cancel-btn"
                className="teal col s12 ">
                cancel
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user: state.users.user,
    ...state.businesses.update
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doBusinessUpdate: (businessId, updateDetails, token) =>
      dispatch(businessUpdate(businessId, updateDetails, token)),
    clearBusinessErrors: () => dispatch(clearAllBusinessesError()),
    clearUserError: token => dispatch(wipeUserError(token)),
    doLoginError: errorMessage => dispatch(loginError(errorMessage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Update);
