import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from './Error';

import { clearAllBusinessesError, businessUpdate } from '../actions/businessesActions';
import { wipeUserError, loginError } from '../actions/userActions';
class Update extends Component {
  constructor(props) {
    super(props)
    this.updateBusiness = this.updateBusiness.bind(this)  
  }
  componentDidMount() {
    this.updateBusinessBtn = document.getElementById('update-business-btn');
    this.updateBusinessCancelBtn = document.getElementById('update-business-cancel-btn');

    this.businessName = document.getElementById('company-name');
    this.businessAddress = document.getElementById('address');
    this.businessLocation = document.getElementById('state');
    this.staffStrength = document.getElementById('employees');
    this.businessCategory = document.getElementById('category');
    this.businessPhoneNumber = document.getElementById('phone-number');
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  updateBusiness(event) {
      event.persist()
      event.preventDefault()
  }
  render() {
    return(
        <div className="flex vertical-after-header">
        <Error error={this.props.error} />
        <section id="update-business-container" className="flex holder-60-shadow padding-20">
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
                    {/* <div className="input-field col s12 ">
                        <input id="description" type="text" className="validate" />
                        <label forhtml="description">Short description</label>
                    </div> */}
                    <div className="input-field col s12 ">
                        <input id="category" type="text" className="validate" />
                        <label forhtml="category">Category</label>
                    </div>
                    <div className="input-field col s12 ">
                        <input id="phone-number" type="number" className="validate" />
                        <label forhtml="phone-number">Phone number</label>
                    </div>
                    </div>
                    <button id="update-business-btn" className="teal col s12 ">Update Business Profile</button>
                    <button id="update-business-cancel-btn" className="teal col s12 ">cancel</button>
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
    token: state.users.users,
    ...state.businesses.update
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doBusinessUpdate: (businessId, updateDetails, token) => dispatch(businessUpdate(businessId, updateDetails, token)),
    clearBusinessErrors: () => dispatch(clearAllBusinessesError()),
    clearUserError: () => dispatch(wipeUserError()),
    loginError: (errorMessage) => dispatch(loginError(errorMessage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Update)
