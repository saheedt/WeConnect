import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from './Error.jsx';
import Success from './Success.jsx';
import Helper from '../helper/Helper';
import { signupError, wipeUserError, doSignup } from '../actions/userActions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.didSignUp = false;
  }
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
      return doSignupError('email cannot be empty or null');
    }
    if (!Helper.isEmail(email)) {
      return doSignupError('email address supplied is invalid');
    }
    if (!Helper.isPasswordValid(password)) {
      return doSignupError('password should be 6 characters or longer');
    }
    clearUserError({ token: null, user: null });
    const userData = {
      email,
      password
    };
    this.cachedEvent = event;
    this.didSignUp = true;
    return setTimeout(() => signUp(userData), 100);
  }
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
      return doSignupError('supplied passwords do not match');
    }
    return clearUserError({ token, user });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching) {
      this.emailInput.disabled = true;
      this.passwordInput1.disabled = true;
      this.passwordInput2.disabled = true;
      if (this.signUpBtn.classList.contains('teal')) {
        this.signUpBtn.classList.remove('teal');
        this.signUpBtn.classList.add('light-grey');
      }
    }
    if (!nextProps.isFetching) {
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
        Helper.clearInputs({ isAuth: true });
        this.didSignUp = false;
        setTimeout(() => nextProps.closeSignUp(this.cachedEvent), 3000);
      });
    }
  }
  componentDidMount() {
    this.emailInput = document.getElementById('signup-email');
    this.passwordInput1 = document.getElementById('signup-password-1');
    this.passwordInput2 = document.getElementById('signup-password-2');
    this.signUpBtn = document.getElementById('signup-btn');
    this.passwordInput2.addEventListener('keyup', this.checkPasswordMatch);
  }
  componentWillUnmount() {
    this.passwordInput2.removeEventListener('keyup', this.checkPasswordMatch);
  }
  render() {
    return (
      <section id="sign-up" className="auth flex">
        <Error error={this.props.error} />
        <Success message={this.state.signUpSuccessMsg} />
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
                  <input id="signup-password-2" type="password"
                    className="validate"/>
                  <label htmlFor="signup-password-2">Re-type Password</label>
                </div>
              </div>
              <button id="signup-btn" onClick={this.onSignupClick}
                className="teal col s12 m12">
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
