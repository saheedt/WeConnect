import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    onSignUpClick(event){
      this.props.closeLogin(event)
      this.props.openSignUp(event)
    }
    render() {
      return(
        <section id="landing-section-b">
          <div id="landing-login-wrapper">
          <center><h3>sign in</h3></center>
          <div className="row">
            <form className="col s12 m12 l12">
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <input id="email" type="text" className="validate" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12 m12 l12">
                  <input id="password" type="text" className="validate"/>
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12 m12 l12">
                  <input id="password" type="text" className="validate"/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button id="login-btn" className="teal flex">Sign in</button>
              <center><a onClick={this.onSignUpClick.bind(this)} id="landing-reg-btn">Sign up</a></center>
            </form>
        </div>
        </div>
        </section>
      )
    }
}

export default Login
