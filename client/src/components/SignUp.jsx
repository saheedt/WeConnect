import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner.jsx';

import Error from './Error.jsx';
import Helper from '../helper/Helper';
import { signupError, wipeUserError, doSignup } from '../actions/userActions';

/**
 * @description Displays Signup
 * @class SignUp
 * @extends {Component}
 * @export
 */
export class SignUp extends Component {
  /**
   * @description Creates an instance of SignUp
   * @param {Object} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.didSignUp = false;
  }
  /**
   * @description Handles login button click event
   * @param {Object} event
   * @memberof SignUp
   */
  onLoginClick(event) {
    event.preventDefault();
    const {
      clearUserError,
      closeSignUp,
      openLogin,
      token,
      user
    } = this.props;
    clearUserError({ token, user });
    closeSignUp(event);
    openLogin(event);
  }
  /**
   * @description Handles signup button click event
   * @param {Object} event
   * @memberof SignUp
   */
  onSignupClick(event) {
    event.persist();
    event.preventDefault();
    const {
      signUp,
      doSignupError,
      clearUserError
    } = this.props;
    const email = this.emailInput.value;
    const password = this.passwordInput1.value;

    if (Helper.isEmptyOrNull(email)) {
      doSignupError('email cannot be empty or null');
      return;
    }
    if (!Helper.isEmail(email)) {
      doSignupError('email address supplied is invalid');
      return;
    }
    if (!Helper.isPasswordValid(password)) {
      doSignupError('password should be 6 characters or longer');
      return;
    }
    clearUserError({ token: null, user: null });
    const userData = {
      email,
      password
    };
    this.cachedEvent = event;
    this.didSignUp = true;
    signUp(userData);
  }
  /**
   * @description Handles keyup event for password match validation
   * @param {Object} event
   * @memberof SignUp
   */
  checkPasswordMatch(event) {
    event.preventDefault();
    const pass1 = this.passwordInput1.value;
    const pass2 = this.passwordInput2.value;
    const {
      token,
      user,
      clearUserError,
      doSignupError
    } = this.props;
    if (pass1 !== pass2) {
      doSignupError('supplied passwords do not match');
      return;
    }
    clearUserError({ token, user });
  }
  /**
   * @description Fires when component props changes
   * @param {Object} nextProps
   * @memberof SignUp
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching === true) {
      this.emailInput.disabled = true;
      this.passwordInput1.disabled = true;
      this.passwordInput2.disabled = true;
      if (this.signUpBtn.classList.contains('teal')) {
        this.signUpBtn.classList.remove('teal');
        this.signUpBtn.classList.add('light-grey');
      }
    }
    if (nextProps.isFetching === false) {
      this.emailInput.disabled = false;
      this.passwordInput1.disabled = false;
      this.passwordInput2.disabled = false;
      if (this.signUpBtn.classList.contains('light-grey')) {
        this.signUpBtn.classList.remove('light-grey');
        this.signUpBtn.classList.add('teal');
      }
    }
    if (nextProps.token && this.didSignUp) {
      this.setState({
        signUpSuccessMsg: 'user account successfully created'
      }, () => {
        const { signUpSuccessMsg } = this.state;
        const { clearInputs, showToast } = Helper;
        clearInputs({ isAuth: true });
        this.didSignUp = false;
        showToast({ html: signUpSuccessMsg }, 3000);
        nextProps.closeSignUp(this.cachedEvent);
      });
    }
  }
  /**
   * @description Fires when component is mounted into the dom
   * @memberof SignUp
   */
  componentDidMount() {
    this.emailInput = document.getElementById('signup-email');
    this.passwordInput1 = document.getElementById('signup-password-1');
    this.passwordInput2 = document.getElementById('signup-password-2');
    this.signUpBtn = document.getElementById('signup-btn');
    // this.passwordInput2.addEventListener('keyup', this.checkPasswordMatch);
  }
  /**
   * @description Fires when component is unmounted from the dom
   * @memberof SignUp
   */
  // componentWillUnmount() {
  // this.passwordInput2.removeEventListener('keyup', this.checkPasswordMatch);
  // }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof SignUp
   */
  render() {
    const { error, isFetching } = this.props;
    const { checkPasswordMatch } = this;
    return (
      <section id="sign-up" className="auth flex">
        {isFetching && <Spinner spinnerColor={'#7fc6c8'} />}
        <Error error={error} />
        <div className="max480 auth-raise white-bg">
          <center><h3>sign up</h3></center>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12 m12">
                  <input id="signup-email" type="email" className="validate"/>
                  <label htmlFor="signup-email">Email</label>
                </div>
                <div className="input-field col s12 m12">
                  <input id="signup-password-1" type="password"
                    className="validate"/>
                  <label htmlFor="signup-password-1">Password</label>
                </div>
                <div className="input-field col s12 m12">
                  <input id="signup-password-2"
                    onKeyUp={checkPasswordMatch} type="password"
                    className="validate"/>
                  <label htmlFor="signup-password-2">Re-type Password</label>
                </div>
              </div>
              <button id="signup-btn" onClick={this.onSignupClick}
                className="primary-green col s12 m12">
              Sign up
              </button>
              <center>
                <a className="pointer-cursor"
                  onClick={this.onLoginClick} id="signup-login-btn">
                Login
                </a>
              </center>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

SignUp.propTypes = {
  token: PropTypes.string,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
  signUp: PropTypes.func,
  doSignupError: PropTypes.func,
  clearUserError: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    ...state.users
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    signUp: userData => dispatch(doSignup(userData)),
    doSignupError: error => dispatch(signupError(error)),
    clearUserError: userDetails => dispatch(wipeUserError(userDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(SignUp);
