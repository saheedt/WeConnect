import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from './Error'
import Helper from '../helper/Helper'
import { signupError, wipeUserError, doSignup } from '../actions/userActions'

class SignUp extends Component {
    constructor(props) {
      super(props)
      this.onLoginClick = this.onLoginClick.bind(this);
      this.onSignupClick = this.onSignupClick.bind(this);
      this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
      this.options = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        scale: 1.00,
        corners: 1,
        color: '#fff',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
      }
    }
    onLoginClick(event) {
      event.preventDefault();
      this.props.wipeUserError();
      this.props.closeSignUp(event)
      this.props.openLogin(event)
    }
    onSignupClick(event) {
      event.preventDefault();
      const { doSignup, signupError } = this.props;
      const email = this.emailInput.value
      const password = this.passwordInput1.value
      const passwordRetype = this.passwordInput2.value

      if (Helper.isEmptyOrNull(email)) {
        return signupError('email cannot be empty or null')
      }
      if (!Helper.isEmail(email)) {
        return signupError('email address supplied is invalid')
      }
      if (!Helper.isPasswordValid(this.passwordInput1)) {
        return signupError('password should be 6 characters or longer')
      }
      const userData = {
        email,
        password
      };
      return doSignup(userData);
    }
    checkPasswordMatch(event) {
      event.preventDefault()
      let pass1 = this.passwordInput1.value;
      let pass2 = this.passwordInput2.value;
      if (pass1 !== pass2) {
        return signupError('supplied passwords do not match')
      }
      return wipeUserError()
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.isFetching === true) {
        this.emailInput.disabled = true;
        this.passwordInput1.disabled = true;
        this.passwordInput2.disabled = true;
      }
      if (nextProps.isFetching === false) {
        this.emailInput.disabled = true;
        this.passwordInput1.disabled = true;
        this.passwordInput2.disabled = true;
      }
      if (nextProps.token === true) {
        nextProps.closeSignUp();
      }
    }
    componentDidMount() {
      this.emailInput = document.getElementById('signup-email');
      this.passwordInput1 = document.getElementById('signup-password-1');
      this.passwordInput2 = document.getElementById('signup-password-2');
       
      this.passwordInput2.addEventListener('keyup', this.checkPasswordMatch)
    }
    componentWillUnmount() {
      this.passwordInput2.removeEventListener('keyup', this.checkPasswordMatch)
    }
    render() {
      return(
        <section id="sign-up" className="auth flex">
          <Error error={this.props.users.error} />
          <div className="max480 auth-raise white-bg">
                {/* <span id="close-register-modal"><i className="material-icons">close</i></span> */}
            <center><h3>sign up</h3></center>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12 m12">
                    <input id="signup-email" type="email" className="validate" />
                    <label forhtml="signup-email">Email</label>
                  </div>
                  <div className="input-field col s12 m12">
                    <input id="signup-password-1" type="password" className="validate" />
                    <label forhtml="signup-password-1">Password</label>
                  </div>
                  <div className="input-field col s12 m12">
                    <input id="signup-password-2" type="password" className="validate" />
                    <label forhtml="signup-password-2">Re-type Password</label>
                  </div>
                </div>
                <button id="signup-btn" className="teal col s12 m12">Sign up</button>
                <center><a className="pointer-cursor" onClick={this.onLoginClick.bind(this)} id="signup-login-btn">Login</a></center>
              </form>
            </div>
           </div>          
        </section>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    ...state.users.users
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doSignup: (userData) => dispatch(doSignup(userData)),
    signupError: (error) => dispatch(signupError(error)),
    wipeUserError: () => dispatch(wipeUserError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(SignUp)
