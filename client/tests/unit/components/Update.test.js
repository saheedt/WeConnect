import React from 'react';
import { shallow } from 'enzyme';

import { Update } from '../../../src/components/Update.jsx';


describe('Update component', () => {
  let props;
  beforeEach(() => {
    props = {
      doBusinessUpdate: jest.fn(),
      doUpdateBusinessError: jest.fn(),
      clearUserError: jest.fn(),
      clearBusinessErrors: jest.fn(),
      doLoginError: jest.fn(),
      openLogin: jest.fn(),
      closeLogin: jest.fn(),
      isFetching: true,
      business: {
        name: 'business',
        address: 'lane',
        category: 'category',
        employees: 2,
        location: 'location',
        phonenumber: 9046672
      },
      history: {
        push: jest.fn()
      },
      token: 'ojaeojqej5i5fm',
      user: {
        email: 'test@test.com',
        id: 1
      },
      updatingBusiness: jest.fn(),
      existing: {
        name: 'test business',
        address: 'test lane',
        category: 'test category',
        employees: 12,
        location: 'test location',
        phonenumber: 665244526672
      },
      match: {
        params: {
          businessId: 1
        }
      },
    };
  });

  it('calls componentWillMount', () => {
    const willMount = jest.spyOn(Update.prototype, 'componentWillMount');
    const comp = shallow(<Update {...props} />);
    expect(willMount).toHaveBeenCalled();
    expect(comp.state().name).toEqual(props.existing.name);
  });
  it('calls componentWillReceiveProps && clearBusinessErrors', () => {
    const willRec = jest.spyOn(Update.prototype, 'componentWillReceiveProps');
    const comp = shallow(<Update {...props} />);
    comp.setProps({ token: 'jdknndwnkdnwis9920nbd' });
    expect(willRec).toHaveBeenCalled();
    expect(props.clearUserError).toHaveBeenCalled();
  });
  it('calls clearBusinessErrors on null token', () => {
    const comp = shallow(<Update {...props} />);
    comp.setProps({ token: null });
    expect(props.clearBusinessErrors).toHaveBeenCalled();
  });
  it('calls doLoginError && openLogin when error is invalid token', () => {
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.setProps({ error: 'invalid token' });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doLoginError&openLogin on error invalid token + null token', () => {
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.setProps({ error: 'invalid token', token: null });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doLoginError & openLogin when error is unauthorized user', () => {
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.setProps({ error: 'unauthorized user' });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it(
    'calls doLoginError&openLogin on error is unauthorized user + null token',
    () => {
      const comp = shallow(<Update {...props} />);
      comp.instance().cachedEvent = jest.fn();
      comp.setProps({ error: 'unauthorized user', token: null });
      expect(props.doLoginError).toHaveBeenCalled();
      expect(props.openLogin).toHaveBeenCalled();
    }
  );
  it('calls closeLogin', () => {
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.setProps({ business: null });
    expect(props.closeLogin).toHaveBeenCalled();
  });
  it('calls clearBusinessErrors on error', () => {
    props.error = 'just errored';
    const comp = shallow(<Update {...props} />);
    expect(props.clearBusinessErrors).toHaveBeenCalled();
    expect(comp.instance().props.error).toEqual(props.error);
  });
  it('calls go back on back button click', () => {
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
    };
    const comp = shallow(<Update {...props} />);
    comp.find('#update-business-cancel-btn').simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.persist).toHaveBeenCalledTimes(1);
  });
  it('sets form input value to state', () => {
    const event = {
      target: {
        name: 'me testing',
        value: 'me tested'
      }
    };
    const comp = shallow(<Update {...props} />);
    comp.find('#company-name').simulate('change', event);
    expect(comp.state()['me testing']).toBeDefined();
    expect(comp.state()['me testing']).toEqual(event.target.value);
  });
  it('calls doImageUpload, doLoginError & openLogin', () => {
    props.token = null;
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.instance().doImageUpload({ name: 'x' });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls doImageUpload, doLoginError & openLogin on token expire', () => {
    props.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhamlidWx1c2FoZWVkQGdtYWlsLmNvbSIsImlhdCI6MTUzMjk2MzAxNywiZXhwIjoxNTMzMDQ5NDE3fQ.eVL_fawMR-isAL9e7CD9nisLmzu9AywqE7ZAUClZXC8'; // eslint-disable-line
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.instance().doImageUpload({ name: 'x' });
    expect(props.doLoginError).toHaveBeenCalled();
    expect(props.openLogin).toHaveBeenCalled();
  });
  it('calls updateBusiness, doLoginError & openLogin', () => {
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn()
    };
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.instance().updateBusiness(event);
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.clearUserError).toHaveBeenCalled();
    expect(props.clearBusinessErrors).toHaveBeenCalled();
  });
  it('calls clearUserError on token', () => {
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn()
    };
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.instance().updateBusiness(event);
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.clearUserError).toHaveBeenCalled();
    expect(props.clearBusinessErrors).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
  });
  it('calls updateBusiness, doLoginError & openLogin on token null', () => {
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn()
    };
    props.token = null;
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.instance().updateBusiness(event);
    expect(event.persist).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(props.clearBusinessErrors).toHaveBeenCalled();
    expect(props.doLoginError).toHaveBeenCalled();
  });
  it('sets state on imageFromPreview', () => {
    const image = 'http://test.com';
    const comp = shallow(<Update {...props} />);
    comp.instance().cachedEvent = jest.fn();
    comp.instance().imageFromPreview(image);
    expect(comp.state().image).toEqual(image);
  });
});
