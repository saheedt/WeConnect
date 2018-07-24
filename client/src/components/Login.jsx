import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Error from '../components/Error.jsx';
// import Success from './Success.jsx';

import { doLogin, loginError, wipeUserError } from '../actions/userActions';
import Helper from '../helper/Helper';

/**
 * @description Displays Login
 * @class Login
 * @extends {Component}
 * @export
 */
class Login extends Component {
  /**
   * @description Creates an instance of Login
   * @param {Object} props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.didLogin = false;
  }
  /**
   * @description Fires when component is mounted into the dom
   * @memberof Login
   */
  componentDidMount() {
    this.emailInput = document.getElementById('login-email');
    this.passwordInput = document.getElementById('login-password');
    this.loginBtn = document.getElementById('login-btn');
  }
  /**
   * @description Fires when component props changes
   * @param {Object} nextProps
   * @memberof Login
   */
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
        loginSuccessMsg: 'Welcome back..'
      }, () => {
        const { loginSuccessMsg } = this.state;
        const { clearInputs, showToast } = Helper;
        clearInputs({ isAuth: true });
        this.didLogin = false;
        showToast({ html: loginSuccessMsg }, 3000);
        nextProps.closeLogin(this.cachedEvent);
      });
    }
  }
  /**
   * @description Handles signup button click event
   * @param {Object} event
   * @memberof Login
   */
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
  /**
   * @description Handles login button click event
   * @param {Object} event
   * @memberof Login
   */
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
      doLoginError('email cannot be empty or null');
      return;
    }
    if (!Helper.isEmail(email)) {
      doLoginError('email address is invalid');
      return;
    }
    if (!Helper.isPasswordValid(password)) {
      doLoginError('password should be 6 characters or longer');
      return;
    }
    clearUserError({ token: null, user: null });
    const userData = {
      email,
      password
    };
    this.cachedEvent = event;
    this.didLogin = true;
    setTimeout(() => doUserLogin(userData), 100);
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Login
   */
  render() {
    const { error } = this.props;
    // const { loginSuccessMsg } = this.state;
    const { onLoginClick, onSignUpClick } = this;
    return (
      <section id="login" className="auth flex">
        <Error error={error} />
        {/* <Success message={loginSuccessMsg} /> */}
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
              <button id="login-btn" onClick={onLoginClick}
                className="primary-green flex">
                Sign in
              </button>
              <center>
                <a className="pointer-cursor"
                  onClick={onSignUpClick }
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

Login.propTypes = {
  token: PropTypes.string,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
  doUserLogin: PropTypes.func,
  doLoginError: PropTypes.func,
  clearUserError: PropTypes.func
};
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
