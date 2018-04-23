import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props)
    }
    render() {
      return(
        <section id="register-modal" className="generic-modal flex">
          <div className="generic-modal-content">
                {/* <span id="close-register-modal"><i className="material-icons">close</i></span> */}
            <center><h3>sign up</h3></center>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12 m12">
                    <input id="email" type="text" className="validate" />
                    <label forhtml="email">Email</label>
                  </div>
                  <div className="input-field col s12 m12">
                    <input id="password-1" type="text" className="validate" />
                    <label forhtml="password-1">Password</label>
                  </div>
                  <div className="input-field col s12 m12">
                    <input id="password-2" type="text" className="validate" />
                    <label forhtml="password-2">Re-type Password</label>
                   </div>
                </div>
                <button id="signup-btn" className="teal col s12 m12">Sign up</button>
                <center><a href="#" id="landing-reg-btn">Login</a></center>
              </form>
            </div>
           </div>          
        </section>
        );
    }
}

export default SignUp
