import React from 'react';
import { shallow } from 'enzyme';
import { Query } from '../../../src/components/Query.jsx';
import Spinner from '../../../src/components/Spinner.jsx';

describe('Query component', () => {
  let props;
  beforeEach(() => {
    props = {
      businesses: [{
        image_url: 'http://x.y.com',
        name: 'x',
        category: 'y',
        address: 'xyz',
        id: 1
      }, {
        image_url: 'http://a.b.com',
        name: 'a',
        category: 'b',
        address: 'abc',
        id: 2
      }],
      doQuery: jest.fn(),
      error: null,
      count: 2,
      isFetching: false,
      clearQueryError: jest.fn()
    };
  });
  it('calls componentWillMount', () => {
    const willMount = jest.spyOn(Query.prototype, 'componentWillMount');
    shallow(<Query {...props} />);
    expect(willMount).toHaveBeenCalled();
  });
  it('calls componentDidMount', () => {
    const didMount = jest.spyOn(Query.prototype, 'componentDidMount');
    shallow(<Query {...props} />);
    expect(didMount).toHaveBeenCalled();
  });
  it('calls genQueryListing', () => {
    const comp = shallow(<Query {...props} />);
    const willRec = jest.spyOn(Query.prototype, 'componentWillReceiveProps');
    const genQuery = jest.spyOn(comp.instance(), 'genQueryListing');
    const businesses = [
      {
        image_url: 'http://x.y.com',
        name: 'x',
        category: 'y',
        address: 'xyz',
        id: 1
      }
    ];
    comp.setProps({ businesses });
    expect(willRec).toHaveBeenCalled();
    expect(genQuery).toHaveBeenCalled();
  });
  it('sets queries to state', () => {
    const comp = shallow(<Query {...props} />);
    // const willRec = jest.spyOn(Query.prototype, 'componentWillReceiveProps');
    const genQuery = jest.spyOn(comp.instance(), 'genQueryListing');
    const businesses = [
      {
        image_url: 'http://x.y.com',
        name: 'x',
        category: 'y',
        address: 'xyz',
        id: 1
      }
    ];
    comp.instance().genQueryListing(businesses);
    expect(comp.state().queries).toBeTruthy();
    expect(genQuery).toHaveBeenCalled();
  });
  it('sets page to state', () => {
    const comp = shallow(<Query {...props} />);
    const onPageChange = jest.spyOn(comp.instance(), 'onPageChange');
    comp.instance().searchInput = {
      value: 'testing'
    };
    comp.instance().selectInput = {
      value: 'tester'
    };
    comp.instance().onPageChange(2);
    expect(comp.state().current).toEqual(2);
    expect(onPageChange).toHaveBeenCalled();
    expect(props.doQuery).toHaveBeenCalled();
  });
  it('renders Spinner component', () => {
    const comp = shallow(<Query {...props} />);
    const isFetching = true;
    comp.setProps({ isFetching });
    expect(comp.instance().props.isFetching).toEqual(isFetching);
    expect(comp.children().find(<Spinner />)).toBeTruthy();
  });
});
