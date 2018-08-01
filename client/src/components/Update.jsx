import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary';
import PropTypes from 'prop-types';

import Error from './Error.jsx';
import Success from './Success.jsx';
import ImagePreview from './ImagePreview.jsx';
import Spinner from './Spinner.jsx';

import Helper from '../helper/Helper';

import {
  clearAllBusinessesError,
  businessUpdate,
  updateBusinessError,
  updateBusiness
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
    this.state = {
      updateSuccessMsg: null
    };
    this.imageFromPreview = this.imageFromPreview.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.doImageUpload = this.doImageUpload.bind(this);
  }
  componentWillMount() {
    const {
      isFetching,
      business,
      clearBusinessErrors,
      error
    } = this.props;
    const { cloudinaryConfig } = Helper;
    const { existing } = this.props;
    if (existing) {
      this.setState(existing, () => {
        const {
          name,
          address,
          category,
          employees,
          location,
          phonenumber,
          image_url // eslint-disable-line
        } = this.state;
        const updateDetails = {
          name,
          address,
          category,
          employees,
          location,
          phonenumber,
          image_url // eslint-disable-line
        };
        if (error) {
          clearBusinessErrors({
            toClear: 'update',
            payload: {
              isFetching,
              business,
              error: null,
              existing: updateDetails
            }
          });
        }
      });
      cloudinaryConfig(cloudinary);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      token,
      clearUserError,
      clearBusinessErrors,
    } = this.props;

    const {
      name,
      address,
      category,
      employees,
      location,
      phonenumber,
      image_url // eslint-disable-line
    } = this.state;

    const updateDetails = {
      name,
      address,
      category,
      employees,
      location,
      phonenumber,
      image_url // eslint-disable-line
    };

    if (nextProps.token) {
      if (nextProps.token !== token) {
        clearUserError({
          token: nextProps.token,
          user: nextProps.user
        });
        clearBusinessErrors({
          toClear: 'update',
          payload: {
            isFetching: nextProps.isFetching,
            business: nextProps.business,
            error: null,
            existing: updateDetails
          }
        });
      }
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
            updateSuccessMsg: 'business profile successfully updated',
            existing: null
          },
          () => setTimeout(() => {
            const { updateSuccessMsg } = this.state;
            const { clearInputs, showToast } = Helper;
            clearInputs({ isAuth: false });
            showToast({ html: updateSuccessMsg }, 2000);
            window.$$cachedEventForProfile$$ = this.cachedEvent;
            setTimeout(() => this.props.history.push('/users/profile'), 2000);
          }, 0)
        );
      }
      return nextProps.closeLogin(this.cachedEvent);
    }
    if (!nextProps.token) {
      // clearUserError({
      //   token: null,
      //   user: null
      // });
      clearBusinessErrors({
        toClear: 'update',
        payload: {
          isFetching: nextProps.isFetching,
          business: nextProps.business,
          error: null,
          existing: updateDetails
        }
      });
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
  /**
   * @description handles cancel button click event
   * @param {object} event
   * @memberof Update
   */
  goBack(event) {
    event.persist();
    event.preventDefault();
    window.$$cachedEventForProfile$$ = event;
    window.history.back();
  }
  /**
   * @description handles change event on form values
   * @param {object} event
   * @memberof Update
   */
  handleOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  /**
   * @description Handles image upload to cloudinary
   * @param {Object} updateDetails
   * @memberof Update
   */
  doImageUpload(updateDetails) {
    const { businessId } = this.props.match.params;
    const { cachedEvent } = this;
    const { isTokenExpired } = Helper;
    const {
      doBusinessUpdate,
      doUpdateBusinessError,
      token,
      doLoginError,
      openLogin,
      updatingBusiness
    } = this.props;
    const { image } = this.state;
    if (!token) {
      doLoginError('sign in to update business profile');
      setTimeout(() => openLogin(cachedEvent), 100);
      return;
    }
    if (isTokenExpired(token)) {
      doLoginError('access token expired, please re-authenticate');
      setTimeout(() => openLogin(cachedEvent), 100);
      return;
    }
    if (image) {
      updatingBusiness();
      cloudinary.uploader.upload(image, (result) => {
        /* eslint-disable */
        const { secure_url, error } = result;
        if (error) {
          doUpdateBusinessError('error!.. check supplied details and try again');
          return;
        }
        if (secure_url) {
          const updatedDetails = {
            ...updateDetails,
            image_url: secure_url
          };
          doBusinessUpdate(businessId, updatedDetails, token);
          return;
        }
      });
      return;
    }
    updatingBusiness();
    doBusinessUpdate(businessId, updateDetails, token);
  }
  updateBusiness(event) {
    event.persist();
    event.preventDefault();
    const { doImageUpload } = this;
    const {
      token,
      user,
      isFetching,
      business,
      openLogin,
      clearUserError,
      doLoginError,
      clearBusinessErrors,
    } = this.props;
    const {
      name,
      address,
      category,
      employees,
      location,
      phonenumber,
      image_url // eslint-disable-line
    } = this.state;
    if (token) {
      clearUserError({ token, user });
    }
    const updateDetails = {
      name,
      address,
      category,
      employees,
      location,
      phonenumber,
      image_url // eslint-disable-line
    };
    clearBusinessErrors({
      toClear: 'update',
      payload: {
        isFetching,
        business,
        error: null,
        existing: updateDetails
      }
    });
    if (!token) {
      doLoginError('sign in to update business profile');
      this.cachedEvent = event;
      return setTimeout(() => openLogin(event), 100);
    }
    this.cachedEvent = event;
    return setTimeout(() => doImageUpload(updateDetails), 100);
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
   * @memberof Update
   */
  render() {
    const { imageFromPreview, handleOnChange } = this;
    const { isFetching } = this.props;
    const {
      name,
      address,
      category,
      employees,
      location,
      phonenumber
    } = this.state;
    return (
      <div className="flex vertical-after-header-update">
        <Error error={this.props.error} />
        <Success message={this.state.updateSuccessMsg} />
        {isFetching && <Spinner spinnerColor={"#7fc6c8"} />}
        <section id="update-business-container"
          className="flex holder-60-shadow padding-20">
          <div className="row">
            <form onSubmit={this.updateBusiness} className="col s12">
              <div className="row">
                <ImagePreview imageFromPreview={imageFromPreview}/>
                <div className="input-field col s12 ">
                  <input id="company-name" type="text" className="validate"
                    value={name} name="name" onChange={handleOnChange} />
                  <label forhtml="company-name">Company name</label>
                </div>
                <div className="input-field col s12">
                  <input id="address" type="text" className="validate"
                    value={address} name="address" onChange={handleOnChange} />
                  <label forhtml="address">Address</label>
                </div>
                <div className="input-field col s12  ">
                  <input id="state" type="text" className="validate"
                    value={location} name="location"
                    onChange={handleOnChange} />
                  <label forhtml="state">State</label>
                </div>
                <div className="input-field col s12 ">
                  <input id="employees" type="number" className="validate"
                    value={employees} name="employees"
                    onChange={handleOnChange} />
                  <label forhtml="employees">Employees</label>
                </div>
                <div className="input-field col s12 ">
                  <input id="category" type="text" className="validate"
                    value={category} name="category"
                    onChange={handleOnChange} />
                  <label forhtml="category">Category</label>
                </div>
                <div className="input-field col s12 ">
                  <input id="phone-number" type="number" className="validate"
                    value={phonenumber} name="phonenumber"
                    onChange={handleOnChange} />
                  <label forhtml="phone-number">Phone number</label>
                </div>
              </div>
              <input type="submit" id="update-business-btn"
                className="primary-green col s12 pointer-cursor"
                value="Update Business Profile" />
              <button onClick={this.goBack} id="update-business-cancel-btn"
                className="col s12">
                cancel
                <i className="material-icons">cancel</i>
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

Update.propTypes = {
  business: PropTypes.object,
  error: PropTypes.string,
  existing: PropTypes.object,
  isFetching: PropTypes.bool,
  doBusinessUpdate: PropTypes.func,
  clearBusinessErrors: PropTypes.func,
  clearUserError: PropTypes.func,
  doLoginError: PropTypes.func,
  doUpdateBusinessError: PropTypes.func
};

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
    doLoginError: errorMessage => dispatch(loginError(errorMessage)),
    doUpdateBusinessError: errorMessage => dispatch(updateBusinessError(errorMessage)),
    updatingBusiness: () => dispatch(updateBusiness())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Update);
