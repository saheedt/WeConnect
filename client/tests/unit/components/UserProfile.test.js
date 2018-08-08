import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../../../src/components/Profile.jsx';
import OwnBusiness from '../../../src/components/OwnBusiness.jsx'; // eslint-disable-line
import Spinner from '../../../src/components/Spinner.jsx';

jest.mock('sweetalert', () => { return { swal: jest.fn() }; });
// () => { return { then: jest.fn() }; })

// const swal = new s();

describe('<Profile />', () => {
  let props;
  beforeEach(() => {
    props = {
      doFetchUserBusinesses: jest.fn(),
      deleteBusiness: jest.fn(),
      prepForUpdate: jest.fn(),
      doLoginError: jest.fn(),
      openLogin: jest.fn(),
      closeLogin: jest.fn(),
      history: {
        push(a) {
          return a;
        }
      },
      user: {
        id: 1
      },
      token: 'oj3esirdh20qi4encoqwnejdcn',
      isFetching: null
    };
  });

  it('calls componentWillMount', () => {
    const willMount = jest.spyOn(Profile.prototype, 'componentWillMount');
    shallow(<Profile {...props} />);
    expect(willMount).toHaveBeenCalled();
  });
  it('invalid token calls doLoginError & openLogin', () => {
    const comp = shallow(<Profile {...props} />);
    const willRec = jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const error = 'invalid token';
    comp.setProps({ error });
    expect(willRec).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('unauthorized user error calls doLoginError & openLogin', () => {
    const comp = shallow(<Profile {...props} />);
    const willRec = jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const error = 'unauthorized user';
    comp.setProps({ error });
    expect(willRec).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('valid token with no errors calls doOwnBusinesses', () => {
    const comp = shallow(<Profile {...props} />);
    const willRec = jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const doOwnBusinesses = jest.spyOn(comp.instance(), 'doOwnBusinesses');
    const businesses = [{
      name: 't',
      address: 'e',
    }, {
      name: 's',
      address: 't',
    }];
    comp.setProps({ businesses });
    expect(willRec).toHaveBeenCalled();
    expect(doOwnBusinesses).toHaveBeenCalled();
  });
  it('null token & invalid token error calls doLoginError & openLogin', () => {
    const comp = shallow(<Profile {...props} />);
    const willRec = jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const error = 'invalid token';
    const token = null;
    comp.setProps({ error, token });
    expect(willRec).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('null token&unauthorized user error calls doLoginError&openLogin', () => {
    const comp = shallow(<Profile {...props} />);
    const willRec = jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const error = 'unauthorized user';
    const token = null;
    comp.setProps({ error, token });
    expect(willRec).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('null token & businesses object calls doLoginError & openLogin', () => {
    const comp = shallow(<Profile {...props} />);
    const willRec = jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const token = null;
    const businesses = [{
      name: 't',
      address: 'e',
    }, {
      name: 's',
      address: 't',
    }];
    comp.setProps({ businesses, token });
    expect(willRec).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doFetchUserBusinesses', () => {
    shallow(<Profile {...props} />);
    expect(props.doFetchUserBusinesses).toHaveBeenCalled();
  });
  it('sets ownBuisnesses to state', () => {
    const comp = shallow(<Profile {...props} />);
    const businesses = [{
      name: 't',
      address: 'e',
    }, {
      name: 's',
      address: 't',
    }];
    comp.instance().doOwnBusinesses(businesses);
    expect(comp.state().ownBusinesses).toBeDefined();
  });
  it('renders <OwnBuisnesses />', () => {
    const comp = shallow(<Profile {...props} />);
    const businesses = [{
      name: 't',
      address: 'e',
    }, {
      name: 's',
      address: 't',
    }];
    comp.instance().doOwnBusinesses(businesses);
    expect(comp.state().ownBusinesses).toBeDefined();
    expect(comp.find(<OwnBusiness />)).toBeTruthy();
  });
  it('renders <Spinner />', () => {
    const comp = shallow(<Profile {...props} />);
    const isFetching = true;
    comp.setProps({ isFetching });
    expect(comp.instance().props.isFetching).toEqual(isFetching);
    expect(comp.find(<Spinner />)).toBeTruthy();
  });
});
