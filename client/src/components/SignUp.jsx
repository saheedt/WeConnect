import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from './Error.jsx';
import Helper from '../helper/Helper';
import { signupError, wipeUserError, doSignup } from '../actions/userActions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }
  onLoginClick(event) {
    event.preventDefault();
    const {
      clearUserError,
      closeSignUp,
      openLogin
    } = this.props;
    clearUserError();
    closeSignUp(event);
    openLogin(event);
  }
  onSignupClick(event) {
    event.persist();
    event.preventDefault();
    const {
      signUp,
      doSignupError,
      clearUserError,
      token,
      user
    } = this.props;
    const email = this.emailInput.value;
    const password = this.passwordInput1.value;

    if (Helper.isEmptyOrNull(email)) {
      return doSignupError('email cannot be empty or null');
    }
    if (!Helper.isEmail(email)) {
      return doSignupError('email address supplied is invalid');
    }
    if (!Helper.isPasswordValid(password)) {
      return doSignupError('password should be 6 characters or longer');
    }
    clearUserError({ token, user });
    const userData = {
      email,
      password
    };
    this.cachedEvent = event;
    return setTimeout(() => signUp(userData), 100);
  }
  checkPasswordMatch(event) {
    event.preventDefault();
    const pass1 = this.passwordInput1.value;
    const pass2 = this.passwordInput2.value;
    const {
      token,
      user
    } = this.props;
    if (pass1 !== pass2) {
      return doSignupError('supplied passwords do not match');
    }
    return clearUserError({ token, user });
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
      nextProps.closeSignUp(this.cachedEvent);
    }
  }
  componentDidMount() {
    this.emailInput = document.getElementById('signup-email');
    this.passwordInput1 = document.getElementById('signup-password-1');
    this.passwordInput2 = document.getElementById('signup-password-2');
    this.passwordInput2.addEventListener('keyup', this.checkPasswordMatch);
  }
  componentWillUnmount() {
    this.passwordInput2.removeEventListener('keyup', this.checkPasswordMatch);
  }
  render() {
    return (
      <section id="sign-up" className="auth flex">
        <Error error={this.props.error} />
        <div className="max480 auth-raise white-bg">
          <center><h3>sign up</h3></center>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12 m12">
                  <input id="signup-email" type="email" className="validate" />
                  <label forhtml="signup-email">Email</label>
                </div>
                <div className="input-field col s12 m12">
                  <input id="signup-password-1" type="password"
                    className="validate" />
                  <label forhtml="signup-password-1">Password</label>
                </div>
                <div className="input-field col s12 m12">
                  <input id="signup-password-2" type="password"
                    className="validate" />
                  <label forhtml="signup-password-2">Re-type Password</label>
                </div>
              </div>
              <button id="signup-btn" className="teal col s12 m12">
              Sign up
              </button>
              <center>
                <a className="pointer-cursor"
                  onClick={this.onLoginClick.bind(this)} id="signup-login-btn">
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
