import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../../src/components/Login.jsx';
import Spinner from '../../../src/components/Spinner.jsx';

describe('<Login />', () => {
  let props;
  beforeEach(() => {
    props = {
      doUserLogin: jest.fn(),
      doLoginError: jest.fn(),
      clearUserError: jest.fn(),
      token: 'pkwn4973wuhrnu9w8',
      closeLogin: jest.fn(),
      openSignUp: jest.fn()
    };
  });

  it('calls componentDidMount', () => {
    const compDidMount = jest.spyOn(Login.prototype, 'componentDidMount');
    shallow(<Login {...props} />);
    expect(compDidMount).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps', () => {
    const comp = shallow(<Login {...props} />);
    const compRecProp =
        jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const token = '456khbd47gt87rtrfhjkt7';
    comp.setProps({ token });
    expect(compRecProp).toHaveBeenCalled();
  });

  it('state.loginSuccessMsg should contain Welcome back..', () => {
    const comp = shallow(<Login {...props} />);
    const loginState = 'Welcome back..';
    const token = 'kjezbfouwhrougwsnbfhjkt7';
    comp.instance().didLogin = true;
    comp.setProps({ token });
    expect(comp.state().loginSuccessMsg).toEqual(loginState);
  });

  it('calls clearUserError', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().onSignUpClick({ preventDefault() {} });
    expect(props.clearUserError).toHaveBeenCalled();
  });

  it('calls closeLogin', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().onSignUpClick({ preventDefault() {} });
    expect(props.closeLogin).toHaveBeenCalled();
  });

  it('calls openSignUp', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().onSignUpClick({ preventDefault() {} });
    expect(props.openSignUp).toHaveBeenCalled();
  });

  it('calls doLoginError when email is null', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().didLogin = false;
    comp.instance().emailInput = {
      value: null
    };
    comp.instance().passwordInput = {
      value: 'test'
    };
    comp.instance().onLoginClick({ persist() {}, preventDefault() {} });
    expect(props.doLoginError).toHaveBeenCalled();
  });

  it('calls doLoginError when email is invalid', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().didLogin = false;
    comp.instance().emailInput = {
      value: 'test'
    };
    comp.instance().passwordInput = {
      value: 'test'
    };
    comp.instance().onLoginClick({ persist() {}, preventDefault() {} });
    expect(props.doLoginError).toHaveBeenCalled();
  });

  it('calls doLoginError when password is invalid', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().didLogin = false;
    comp.instance().emailInput = {
      value: 'test@test.com'
    };
    comp.instance().passwordInput = {
      value: 'test'
    };
    comp.instance().onLoginClick({ persist() {}, preventDefault() {} });
    expect(props.doLoginError).toHaveBeenCalled();
  });

  it('calls doUserLogin when email & password are valid', () => {
    const comp = shallow(<Login {...props} />);
    comp.instance().didLogin = false;
    comp.instance().emailInput = {
      value: 'test@test.com'
    };
    comp.instance().passwordInput = {
      value: 'testtesttest'
    };
    comp.instance().onLoginClick({ persist() {}, preventDefault() {} });
    expect(props.doUserLogin).toHaveBeenCalled();
  });
  it('should render <Spinner />', () => {
    const comp = shallow(<Login {...props} />);
    expect(comp.exists(<Spinner />)).toBe(true);
  });
});
