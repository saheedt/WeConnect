import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from '../components/Error.jsx';
import Success from './Success.jsx';

import { doLogin, loginError, wipeUserError } from '../actions/userActions';
import Helper from '../helper/Helper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.didLogin = false;
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
        this.loginBtn.classList.remove('teal');
        this.loginBtn.classList.add('light-grey');
      }
    }
    if (nextProps.isFetching === false) {
      this.emailInput.disabled = false;
      this.passwordInput.disabled = false;
      this.loginBtn.disabled = false;
      if (this.loginBtn.classList.contains('light-grey')) {
        this.loginBtn.classList.remove('light-grey');
        this.loginBtn.classList.add('teal');
      }
    }
    if (nextProps.token && this.didLogin) {
      this.setState({
        loginSuccessMsg: 'Log in success'
      }, () => {
        Helper.clearInputs({ isAuth: true });
        this.didLogin = false;
        setTimeout(() => nextProps.closeLogin(this.cachedEvent), 2000);
      });
    }
  }
  onSignUpClick(event) {
    event.preventDefault();
    const {
      clearUserError,
      closeLogin,
      openSignUp,
      token,
      user
    } = this.props;
    clearUserError({
      token,
      user
    });
    closeLogin(event);
    openSignUp(event);
  }
  onLoginClick(event) {
    event.persist();
    event.preventDefault();
    this.didLogin = true;
    const {
      doLoginError,
      doUserLogin,
      clearUserError
    } = this.props;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    if (Helper.isEmptyOrNull(email)) {
      return doLoginError('email cannot be empty or null');
    }
    if (!Helper.isEmail(email)) {
      return doLoginError('email address is invalid');
    }
    if (!Helper.isPasswordValid(password)) {
      return doLoginError('password should be 6 characters or longer');
    }
    clearUserError({ token: null, user: null });
    const userData = {
      email,
      password
    };
    this.cachedEvent = event;
    this.didLogin = true;
    return setTimeout(() => doUserLogin(userData), 100);
  }
  render() {
    return (
      <section id="login" className="auth flex">
        <Error error={this.props.error} />
        <Success message={this.state.loginSuccessMsg} />
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
                  <input id="login-password" type="password"
                    className="validate"/>
                  <label htmlFor="login-password">Password</label>
                </div>
              </div>
              <button id="login-btn" onClick={this.onLoginClick}
                className="teal flex">
                Sign in
              </button>
              <center>
                <a className="pointer-cursor" onClick={this.onSignUpClick }
                  id="login-signup-btn">
                  Sign up
                </a>
              </center>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.users
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doUserLogin: userData => dispatch(doLogin(userData)),
    doLoginError: error => dispatch(loginError(error)),
    clearUserError: userDetails => dispatch(wipeUserError(userDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Login);
