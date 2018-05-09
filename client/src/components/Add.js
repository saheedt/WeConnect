import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from './Error';
import Success from './Success'

import { addBusiness, clearAllBusinessesError } from '../actions/businessesActions';
import { wipeUserError, loginError } from '../actions/userActions';
class Add extends Component {
  constructor(props) {
      super(props)
      this.state = {}
      this.registerBusiness = this.registerBusiness.bind(this)
  }
  componentWillMount() {
    this.props.clearBusinessErrors();
  }
  componentDidMount() {
    // this.addBusinessBtn = document.getElementById('add-business-btn');

    this.businessName = document.getElementById('company-name');
    this.businessAddress = document.getElementById('address');
    this.businessLocation = document.getElementById('state');
    this.staffStrength = document.getElementById('employees');
    this.businessCategory = document.getElementById('category');
    this.businessPhoneNumber = document.getElementById('phone-number');
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
      if (nextProps.token) {
        if (nextProps.error &&
          (nextProps.error === 'invalid token'
            || nextProps.error === 'unauthorized user')) {
              nextProps.loginError(nextProps.error);
              return nextProps.openLogin(this.cachedEvent);
        }
        if (nextProps.business) {
          console.log('created..')
          this.setState({
            successMsg: 'business profile successfully added'
          },
          () => setTimeout(()=> this.props.history.push('/businesses'), 3000)
          );
        }
        return nextProps.closeLogin(this.cachedEvent)
      }
      // TODO: Scenario for no token with unauth
      // return nextProps.closeLogin(this.cachedEvent)
  }
  registerBusiness(event) {
    event.persist()
    event.preventDefault()
    const {
      token,
      openLogin,
      doAddBusiness,
      clearUserError,
      loginError
    } = this.props;
    clearUserError()
    const businessDetails = {
      name: this.businessName.value,
      address: this.businessAddress.value,
      location: this.businessLocation.value,
      phonenumber: this.businessPhoneNumber.value,
      employees: this.staffStrength.value,
      category: this.businessCategory.value
    };
    if (!token) {
      loginError('sign in to create business profile');
      this.cachedEvent = event;
      return setTimeout(() => openLogin(event), 100);
    }
    this.cachedEvent = event;
    return setTimeout(() => doAddBusiness(businessDetails, token), 100);
  }
  render() {
      return(
        <div className="flex vertical-after-header">
        <Error error={this.props.error} />
        <Success message={this.state.successMsg} />
          <section id="add-business-container" className="flex holder-60-shadow padding-20">
            <div className="row">
              <form className="col s12 m12 l12">
                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input id="company-name" type="text" className="validate" />
                    <label forhtml="company-name">Company name</label>
                  </div>
                  <div className="input-field col s12 m12 l12 ">
                    <input id="address" type="text" className="validate"/>
                    <label forhtml="address">Address</label>
                  </div>
                  <div className="input-field col s12 m12 l12 ">
                    <input id="state" type="text" className="validate"/>
                    <label forhtml="state">State</label>
                  </div>
                  <div className="input-field col s12 m12 l12">
                    <input id="employees" type="number" className="validate"/>
                    <label forhtml="employees">Employees</label>
                  </div>
                  {/* <div className="input-field col s12 m12 l12">
                    <input id="description" type="text" className="validate"/>
                    <label forhtml="description">Short description</label>
                  </div> */}
                  <div className="input-field col s12 m12 l12">
                    <input id="category" type="text" className="validate"/>
                    <label forhtml="category">Category</label>
                  </div>
                  <div className="input-field col s12 m12 l12">
                    <input id="phone-number" type="number" className="validate"/>
                    <label forhtml="phone-number">Phone number</label>
                  </div>
                </div>
                <button onClick={this.registerBusiness} id="add-business-btn" className="teal col s12 pointer-cursor">Register Business</button>
              </form>
            </div>
          </section>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    token: state.users.token,
    ...state.businesses.add
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doAddBusiness: (details, token) => dispatch(addBusiness(details, token)),
    clearBusinessErrors: () => dispatch(clearAllBusinessesError()),
    clearUserError: () => dispatch(wipeUserError()),
    loginError: (errorMessage) => dispatch(loginError(errorMessage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Add)
