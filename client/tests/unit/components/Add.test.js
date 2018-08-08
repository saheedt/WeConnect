import React from 'react';
import { shallow } from 'enzyme';

import { Add } from '../../../src/components/Add.jsx';
import Error from '../../../src/components/Error.jsx';
import Success from '../../../src/components/Success.jsx';
import ImagePreview from '../../../src/components/ImagePreview.jsx';

// const xpect = expect;

describe('<Add />', () => {
  let props;
  beforeEach(() => {
    props = {
      closeLogin: jest.fn(jest.fn()),
      openLogin: jest.fn(jest.fn()),
      token: 'khbd47g7efbueh8',
      clearUserError: jest.fn(),
      doAddBusiness: jest.fn(),
      doAddBusinessError: jest.fn(),
      clearBusinessErrors: jest.fn(),
      doLoginError: jest.fn(),
      history: {
        push: jest.fn()
      }
    };
  });
  it('calls componentWillMount', () => {
    const willMount = jest.spyOn(Add.prototype, 'componentWillMount');
    shallow(<Add {...props} />);
    expect(willMount).toHaveBeenCalled();
    // expect(props.clearBusinessErrors).toHaveBeenCalled();
  });
  it('calls componentDidMount', () => {
    const compDidMount = jest.spyOn(Add.prototype, 'componentDidMount');
    shallow(<Add {...props} />);
    expect(compDidMount).toHaveBeenCalled();
  });
  it('calls componentWillReceiveProps', () => {
    const comp = shallow(<Add {...props} />);
    const compRecProps =
        jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const token = '456khbd47gt87rtrfhjkt7';
    comp.setProps({ token });
    expect(compRecProps).toHaveBeenCalled();
  });
  it('calls doLoginError on unauthorized user error', () => {
    const comp = shallow(<Add {...props} />);
    const error = 'unauthorized user';
    const token = '456khbd47gt87rtrfhjkt7';
    comp.setProps({ token, error });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls clearBusinessErrors on business registration', () => {
    const comp = shallow(<Add {...props} />);
    const business = {
      name: 'test',
      address: 'test location'
    };
    const error = 'previous error';
    comp.setProps({ business, error });
    expect(props.clearBusinessErrors).toHaveBeenCalled();
    expect(comp.state().addSuccessMsg).toBeDefined();
    expect(props.history.push).toHaveBeenCalled();
  });
  it('calls doLoginError & openLogin in componentWillReceiveProps', () => {
    const comp = shallow(<Add {...props} />);
    const token = '456khbd47gt87rtrfhjkt7';
    const error = 'invalid token';
    comp.setProps({ token, error });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doLoginError & openLogin on invalid token', () => {
    props.token = null;
    const comp = shallow(<Add {...props} />);
    const error = 'invalid token';
    comp.setProps({ error });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doLoginError & openLogin on unauthorized user', () => {
    props.token = null;
    const comp = shallow(<Add {...props} />);
    const error = 'unauthorized user';
    comp.setProps({ error });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doLoginError & openLogin on missing token', () => {
    props.token = null;
    const comp = shallow(<Add {...props} />);
    const business = {
      name: 'test',
      address: 'test location'
    };
    comp.setProps({ business });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls imageFromPreview', () => {
    const comp = shallow(<Add {...props} />);
    const imUpld = jest.spyOn(comp.instance(), 'imageFromPreview');
    comp.instance().imageFromPreview('lnebsjbsjdnj');
    expect(imUpld).toHaveBeenCalled();
  });
  it('calls doAddBusiness', () => {
    const comp = shallow(<Add {...props} />);
    const imUpld = comp.instance().doImageUpload;
    imUpld();
    expect(props.doAddBusiness).toHaveBeenCalled();
  });
  it('calls registerBusiness', () => {
    const comp = shallow(<Add {...props} />);
    const registerBusiness = jest.spyOn(comp.instance(), 'registerBusiness');
    comp.instance().businessName = { value: 'x' };
    comp.instance().businessAddress = { value: 'y' };
    comp.instance().businessLocation = { value: 'z' };
    comp.instance().businessPhoneNumber = { value: 'a' };
    comp.instance().staffStrength = { value: 'a' };
    comp.instance().businessCategory = { value: 'a' };
    comp.instance().registerBusiness({ preventDefault() {}, persist() {} });
    expect(registerBusiness).toHaveBeenCalled();
  });
  it('calls doLoginError if token on null', () => {
    props.token = null;
    const comp = shallow(<Add {...props} />);
    // const registerBusiness = jest.spyOn(comp.instance(), 'registerBusiness');
    comp.instance().businessName = { value: 'x' };
    comp.instance().businessAddress = { value: 'y' };
    comp.instance().businessLocation = { value: 'z' };
    comp.instance().businessPhoneNumber = { value: 'a' };
    comp.instance().staffStrength = { value: 'a' };
    comp.instance().businessCategory = { value: 'a' };
    comp.instance().registerBusiness({ preventDefault() {}, persist() {} });
    expect(props.doLoginError).toHaveBeenCalled();
  });
  it('should render <Error />', () => {
    const comp = shallow(<Add {...props} />);
    expect(comp.exists(<Error />)).toBe(true);
  });
  it('should render <Success />', () => {
    const comp = shallow(<Add {...props} />);
    expect(comp.exists(<Success />)).toBe(true);
  });
  it('should render <ImagePreview />', () => {
    const comp = shallow(<Add {...props} />);
    expect(comp.exists(<ImagePreview />)).toBe(true);
  });
});
