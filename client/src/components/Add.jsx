import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary';
import PropTypes from 'prop-types';

import Error from './Error.jsx';
import Success from './Success.jsx';
import ImagePreview from './ImagePreview.jsx';
import Spinner from './Spinner.jsx';

import {
  addBusiness,
  addBusinessError,
  clearAllBusinessesError
} from '../actions/businessesActions';
import {
  wipeUserError,
  loginError
} from '../actions/userActions';
import Helper from '../helper/Helper';

/**
 * @description Displays Add business page
 * @class Add
 * @extends {Component}
 * @export
 */
export class Add extends Component {
  /**
   * @description Creates an instance of Add
   * @param {Object} props
   * @memberof Add
   */
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      shouldRegBusiness: false
    };
    this.registerBusiness = this.registerBusiness.bind(this);
    this.imageFromPreview = this.imageFromPreview.bind(this);
    this.doImageUpload = this.doImageUpload.bind(this);
  }
  componentWillMount() {
    const {
      clearBusinessErrors,
      isFetching,
      business,
      error
    } = this.props;
    const { cloudinaryConfig } = Helper;
    if (error) {
      clearBusinessErrors({
        toClear: 'add',
        payload: {
          isFetching,
          business,
          error: null
        }
      });
    }
    cloudinaryConfig(cloudinary);
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
    const {
      doLoginError,
      openLogin,
      token,
      error,
      business,
      clearBusinessErrors,
      closeLogin
    } = nextProps;

    if (token) {
      if (error && error === 'invalid token') {
        doLoginError('access token expired, kindly re-authenticate');
        openLogin(this.cachedEvent);
        return;
      }
      if (token && error === 'unauthorized user') {
        doLoginError('un-authorized to perform action, sign-in/sign-up');
        openLogin(this.cachedEvent);
        return;
      }
      if (token &&
        error === 'error!.. check supplied details and try again') {
        return;
      }
      if (business) {
        Helper.clearInputs({ isAuth: false });
        if (error) {
          clearBusinessErrors({
            toClear: 'add',
            payload: {
              isFetching: nextProps.isFetching,
              business: nextProps.business,
              error: null
            }
          });
        }
        this.setState(
          {
            addSuccessMsg: 'business profile successfully added',
            image: null
          },
          () => this.props.history.push('/businesses')
        );
        return;
      }
      closeLogin(this.cachedEvent);
      return;
    }
    if (!token) {
      if (error && error === 'invalid token') {
        doLoginError('you appear offline, kindly sign-in/sign-up');
        openLogin(this.cachedEvent);
        return;
      }
      if (error && error === 'unauthorized user') {
        doLoginError('you appear offline, kindly sign-in/sign-up');
        openLogin(this.cachedEvent);
        return;
      }
      if (business) {
        doLoginError('you appear offline, kindly sign-in/sign-up');
        openLogin(this.cachedEvent);
      }
    }
  }
  /**
   * @description Handles image upload to cloudinary
   * @param {Object} businessDetails
   * @memberof Add
   */
  doImageUpload(businessDetails) {
    const { doAddBusiness, doAddBusinessError, token } = this.props;
    const { image } = this.state;
    if (image) {
      cloudinary.uploader.upload(image, (result) => {
        /* eslint-disable */
        const { secure_url, error } = result;
        if (error) {
          doAddBusinessError('error!.. check supplied details and try again');
          return;
        }
        if (secure_url) {
          const updateDetails = {
            ...businessDetails,
            image_url: secure_url
          };
          doAddBusiness(updateDetails, token);
          return;
        }
      });
      return;
    }
    doAddBusiness(businessDetails, token);
  }
  /**
   * @description Handles register business button click event
   * @param {Object} event
   * @memberof Add
   */
  registerBusiness(event) {
    event.persist();
    event.preventDefault();
    const {
      token,
      openLogin,
      clearUserError,
      clearBusinessErrors,
      doLoginError,
      user,
      isFetching,
      business
    } = this.props;
    const { doImageUpload } = this;
    if (token) {
      clearUserError({ token, user });
    }
    clearBusinessErrors({
      toClear: 'add',
      payload: {
        isFetching: (!isFetching ? false : isFetching),
        business: (!business ? null : business),
        error: null
      }
    });
    if (!token) {
      doLoginError('sign in to create business profile');
      this.cachedEvent = event;
      return openLogin(event)
    }
    const businessDetails = {
      name: this.businessName.value,
      address: this.businessAddress.value,
      location: this.businessLocation.value,
      phonenumber: this.businessPhoneNumber.value,
      employees: this.staffStrength.value,
      category: this.businessCategory.value
    };
    this.cachedEvent = event;
    return doImageUpload(businessDetails);
  }
  /**
   * @description sets raw image data from ImagePreview to state
   * @param {String} image
   * @memberof Add
   */
  imageFromPreview(image) {
    this.setState({ image });
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Add
   */
  render() {
    const { imageFromPreview } = this;
    const { isFetching } = this.props;
    return (
      <div>
      {isFetching && <Spinner spinnerColor={"#7fc6c8"} />}
        <div className="flex vertical-after-header">
          <Error error={this.props.error} />
          <Success message={this.state.addSuccessMsg} />
          <section id="add-business-container"
            className="flex holder-60-shadow padding-20">
            <div className="row">
              <form onSubmit={this.registerBusiness} id="add-form"
                className="col s12 m12 l12">
                <div className="row">
                  <ImagePreview imageFromPreview={imageFromPreview} />
                  <div className="input-field col s12 m12 l12">
                    <input id="company-name" type="text" className="validate"
                      required/>
                    <label forhtml="company-name">Company name</label>
                  </div>
                  <div className="input-field col s12 m12 l12 ">
                    <input id="address" type="text" className="validate"
                      required/>
                    <label forhtml="address">Address</label>
                  </div>
                  <div className="input-field col s12 m12 l12 ">
                    <input id="state" type="text" className="validate"
                      required/>
                    <label forhtml="state">State</label>
                  </div>
                  <div className="input-field col s12 m12 l12">
                    <input id="employees" type="number" className="validate"
                      required/>
                    <label forhtml="employees">Employees</label>
                  </div>
                  <div className="input-field col s12 m12 l12">
                    <input id="category" type="text" className="validate"
                      required/>
                    <label forhtml="category">Category</label>
                  </div>
                  <div className="input-field col s12 m12 l12">
                    <input id="phone-number" type="number" className="validate"
                      required/>
                    <label forhtml="phone-number">Phone number</label>
                  </div>
                </div>
                <input type="submit" id="add-business-btn"
                  className="primary-green col s12 pointer-cursor" value="Register Business" />
              </form>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user: state.users.user,
    ...state.businesses.add
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doAddBusiness: (details, token) => dispatch(addBusiness(details, token)),
    doAddBusinessError: (errorMsg) => dispatch(addBusinessError(errorMsg)),
    clearBusinessErrors: details => dispatch(clearAllBusinessesError(details)),
    clearUserError: userDetails => dispatch(wipeUserError(userDetails)),
    doLoginError: errorMessage => dispatch(loginError(errorMessage))
  };
};

Add.propTypes = {
  user: PropTypes.object,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  business: PropTypes.object,
  token: PropTypes.string,
  doAddBusiness: PropTypes.func,
  doAddBusinessError: PropTypes.func,
  clearBusinessErrors: PropTypes.func,
  clearUserError: PropTypes.func,
  doLoginError: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Add);
