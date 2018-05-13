import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader' 

import Error from '../components/Error'

import { doLogin, loginError, wipeUserError } from '../actions/userActions';
import Helper from '../helper/Helper'; 

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this)
    this.onSignUpClick = this.onSignUpClick.bind(this)
  }
  componentDidMount() {
    this.emailInput = document.getElementById('login-email');
    this.passwordInput = document.getElementById('login-password');
    this.loginBtn = document.getElementById('login-btn');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching === true) {
      this.emailInput.disabled = true;
      this.passwordInput.disabled = true;
      this.loginBtn.disabled = true;
      if (this.loginBtn.classList.contains('teal')) {
        this.loginBtn.classList.remove('teal')
        console.log(this.loginBtn.style.color)
      }
    }
    if (nextProps.isFetching === false) {
      this.emailInput.disabled = false;
      this.passwordInput.disabled = false;
      this.loginBtn.disabled = false;
      if (!this.loginBtn.classList.contains('teal')) {
        this.loginBtn.classList.add('teal')
      }
    }
  }
  onSignUpClick(event) {
    event.preventDefault();
    const {
      clearUserError,
      closeLogin,
      openSignUp
    } = this.props;
    clearUserError({
      token: null,
      user: null
    });
    closeLogin(event);
    openSignUp(event);
  }
  onLoginClick(event) {
    event.preventDefault();
    const {
      loginError,
      doLogin,
      clearUserError,
      token,
      user
    } = this.props;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    if (Helper.isEmptyOrNull(email)) {
      return loginError('email cannot be empty or null');
    }
    if (!Helper.isEmail(email)) {
      return loginError('email address is invalid');
    }
    if (!Helper.isPasswordValid(password)) {
      return loginError('password should be 6 characters or longer');
    }
    clearUserError({token, user});
    const userData = {
      email,
      password
    };
    return doLogin(userData);
  }
  render() {
    return(
        <section id="login" className="auth flex">
        <Error error={this.props.error} />
          <div id="landing-login-wrapper" className="max480 auth-raise white-bg">
          <center><h3>sign in</h3></center>
          <div className="row">
            <form className="col s12 m12 l12">
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <input id="login-email" type="email" className="validate" />
                  <label htmlFor="login-email">Email</label>
                </div>
                <div className="input-field col s12 m12 l12">
                  <input id="login-password" type="password" className="validate"/>
                  <label htmlFor="login-password">Password</label>
                </div>
              </div>
              <button id="login-btn" onClick={this.onLoginClick} className="teal flex">Sign in</button>
              <center><a className="pointer-cursor" onClick={this.onSignUpClick } id="login-signup-btn">Sign up</a></center>
            </form>
        </div>
        </div>
        </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.users
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doLogin: (userData) => dispatch(doLogin(userData)),
    loginError: (error) => dispatch(loginError(error)),
    clearUserError: (userDetails) => dispatch(wipeUserError(userDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Login)
