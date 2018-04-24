import React, { Component } from 'react';

class Add extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
          <div className="flex vertical-after-header">
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
                    <div className="input-field col s12 m12 l12">
                      <input id="description" type="text" className="validate"/>
                      <label forhtml="description">Short description</label>
                    </div>
                    <div className="input-field col s12 m12 l12">
                      <input id="category" type="text" className="validate"/>
                      <label forhtml="category">Category</label>
                    </div>
                    <div className="input-field col s12 m12 l12">
                      <input id="phone-number" type="number" className="validate"/>
                      <label forhtml="phone-number">Phone number</label>
                    </div>
                  </div>
                  <button id="add-business-btn" className="teal col s12">Register Business</button>
                </form>
              </div>
            </section>
          </div>
        );
    }
}

export default Add;
