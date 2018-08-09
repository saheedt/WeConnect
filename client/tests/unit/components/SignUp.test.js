import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from '../../../src/components/SignUp.jsx';

const rand = () =>
  Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
const valGen = () => {
  return {
    value: rand(),
    disabled: false,
    classList: {
      contains: jest.fn(),
      add: jest.fn(),
      remove: jest.fn()
    },
  };
};
describe('SignUp component', () => {
  let props;
  beforeEach(() => {
    props = {
      doUserLogin: jest.fn(),
      doSignupError: jest.fn(),
      clearUserError: jest.fn(),
      signUp: jest.fn(),
      token: 'pkwn4973wuhrnu9w8',
      openLogin: jest.fn(),
      closeSignUp: jest.fn()
    };
  });

  it('calls componentDidMount', () => {
    const compDidMount = jest.spyOn(SignUp.prototype, 'componentDidMount');
    const comp = shallow(<SignUp {...props} />);
    comp.instance().emailInput = valGen();
    comp.instance().passwordInput1 = valGen();
    comp.instance().passwordInput2 = valGen();
    comp.instance().signUpBtn = jest.fn();
    comp.instance().passwordInput2 = valGen();
    comp.instance().cachedEvent = jest.fn();
    expect(compDidMount).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps', () => {
    const compRec =
      jest.spyOn(SignUp.prototype, 'componentWillReceiveProps');
    const comp = shallow(<SignUp {...props} />);
    comp.instance().emailInput = valGen();
    comp.instance().passwordInput1 = valGen();
    comp.instance().passwordInput2 = valGen();
    comp.instance().signUpBtn = {
      classList: {
        contains: jest.fn()
      }
    };
    comp.instance().passwordInput2 = valGen();
    comp.instance().cachedEvent = jest.fn();
    comp.instance().didSignUp = true;
    const token = 'pewjmivnwilkw';
    const isFetching = true;
    comp.setProps({ token, isFetching });
    expect(comp.state().signUpSuccessMsg)
      .toEqual('user account successfully created');
    expect(compRec).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps with changing props', () => {
    const compRec =
      jest.spyOn(SignUp.prototype, 'componentWillReceiveProps');
    const comp = shallow(<SignUp {...props} />);
    comp.instance().emailInput = valGen();
    comp.instance().passwordInput1 = valGen();
    comp.instance().passwordInput2 = valGen();
    comp.instance().signUpBtn = {
      classList: {
        contains: jest.fn()
      }
    };
    comp.instance().passwordInput2 = valGen();
    comp.instance().cachedEvent = jest.fn();
    comp.instance().didSignUp = true;
    const token = 'pepkovnwilkw';
    const isFetching = false;
    comp.setProps({ token, isFetching });
    expect(comp.state().signUpSuccessMsg)
      .toEqual('user account successfully created');
    expect(compRec).toHaveBeenCalled();
  });

  it('calls onLoginClick', () => {
    const loginClick = jest.spyOn(SignUp.prototype, 'onLoginClick');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    comp.find('#signup-login-btn').simulate('click', event);
    expect(loginClick).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.clearUserError).toHaveBeenCalled();
    expect(props.closeSignUp).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });

  it('calls doSignupError if email is empty or null', () => {
    const signInClick = jest.spyOn(SignUp.prototype, 'onLoginClick');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
    };
    comp.instance().emailInput = {
      value: ''
    };
    comp.instance().passwordInput1 = {
      value: 'tester'
    };
    comp.find('#signup-btn').simulate('click', event);
    expect(signInClick).toHaveBeenCalled();
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.doSignupError).toHaveBeenCalled();
  });

  it('calls doSignupError if email is invalid', () => {
    const signInClick = jest.spyOn(SignUp.prototype, 'onLoginClick');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
    };
    comp.instance().emailInput = {
      value: 'test'
    };
    comp.instance().passwordInput1 = {
      value: 'tester'
    };
    comp.find('#signup-btn').simulate('click', event);
    expect(signInClick).toHaveBeenCalled();
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.doSignupError).toHaveBeenCalled();
  });

  it('calls doSignupError if password is invalid', () => {
    const signInClick = jest.spyOn(SignUp.prototype, 'onLoginClick');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
    };
    comp.instance().emailInput = {
      value: 'test@test.com'
    };
    comp.instance().passwordInput1 = {
      value: 'test'
    };
    comp.find('#signup-btn').simulate('click', event);
    expect(signInClick).toHaveBeenCalled();
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.doSignupError).toHaveBeenCalled();
  });

  it('calls clearUserError & signUp if credentials are valid', () => {
    const signInClick = jest.spyOn(SignUp.prototype, 'onLoginClick');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
    };
    comp.instance().emailInput = {
      value: 'test@test.com'
    };
    comp.instance().passwordInput1 = {
      value: 'testing'
    };
    comp.find('#signup-btn').simulate('click', event);
    expect(signInClick).toHaveBeenCalled();
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.clearUserError).toHaveBeenCalled();
    expect(props.signUp).toHaveBeenCalled();
  });

  it('calls doSignupError if passwords do not natch', () => {
    const passMatch = jest.spyOn(SignUp.prototype, 'checkPasswordMatch');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    comp.instance().passwordInput1 = {
      value: 'testing'
    };
    comp.instance().passwordInput2 = {
      value: 'test'
    };
    comp.find('#signup-password-2').simulate('keyup', event);
    expect(passMatch).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.doSignupError).toHaveBeenCalled();
  });

  it('calls doSignupError if passwords do not natch', () => {
    const passMatch = jest.spyOn(SignUp.prototype, 'checkPasswordMatch');
    const comp = shallow(<SignUp {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    comp.instance().passwordInput1 = {
      value: 'testing'
    };
    comp.instance().passwordInput2 = {
      value: 'testing'
    };
    comp.find('#signup-password-2').simulate('keyup', event);
    expect(passMatch).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.clearUserError).toHaveBeenCalled();
  });
});
