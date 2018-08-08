import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../../src/components/Header.jsx';
import { Menu } from '../../../src/components/Menu.jsx';

describe('<Header />', () => {
  const props = {
    queryBusinesses: jest.fn(),
    queryErrored: jest.fn(),
    clearQueryError: jest.fn(),
    openLogin: jest.fn(),
    history: {
      push: jest.fn()
    },
    location: {},
    token: 'pjhyrteruyty7656ytg'
  };
  it('calls componentWillMount', () => {
    const compWillMount = jest.spyOn(Header.prototype, 'componentWillMount');
    shallow(<Header {...props} />);
    expect(compWillMount).toHaveBeenCalled();
  });

  it('calls componentDidMount', () => {
    const compDidMount = jest.spyOn(Header.prototype, 'componentDidMount');
    shallow(<Header {...props} />);
    expect(compDidMount).toHaveBeenCalled();
  });

  it('should call goBack', () => {
    const comp = shallow(<Header {...props} />);
    const goBack = jest.spyOn(comp.instance(), 'goBack');
    comp.setState({ display: 'flex' }, () => {
      comp.instance().goBack({ preventDefault() {} });
      expect(goBack).toHaveBeenCalled();
    });
  });

  it('calls componentWillReceiveProps', () => {
    const comp = shallow(<Header {...props} />);
    const compWillrecProps =
        jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const token = '456khbd47gt87rtrfhjkt7';
    comp.setProps({ token });
    expect(compWillrecProps).toHaveBeenCalled();
  });

  it('calls queryBusinesses', () => {
    const comp = shallow(<Header {...props} />);
    comp.instance().doQuery('x', 'y');
    expect(props.queryBusinesses).toHaveBeenCalled();
  });
  it('calls isQueryPage', () => {
    const comp = shallow(<Header {...props} />);
    const isQueryPage = jest.spyOn(comp.instance(), 'isQueryPage');
    comp.instance().handleQuery({ keyCode: 13 });
    expect(isQueryPage).toHaveBeenCalled();
  });
  it('calls handleQuery', () => {
    const comp = shallow(<Header {...props} />);
    const handleQuery = jest.spyOn(comp.instance(), 'handleQuery');
    comp.instance().handleQuery({ keyCode: 13 });
    expect(handleQuery).toHaveBeenCalled();
  });
  it('calls clearQueryError', () => {
    const comp = shallow(<Header {...props} />);
    comp.instance().props.clearQueryError();
    expect(props.clearQueryError).toHaveBeenCalled();
  });
  it('search-select exists', () => {
    const comp = shallow(<Header {...props} />);
    expect(comp.exists('#search-select')).toBe(true);
  });
  it('renders <Menu />', () => {
    const comp = shallow(<Header {...props} />);
    expect(comp.exists(<Menu />)).toBe(true);
  });
});
