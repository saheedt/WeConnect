import React from 'react';
import { shallow } from 'enzyme';
import Pagination from 'rc-pagination';


import { Listings } from '../../../src/components/Listings.jsx';
import Business from '../../../src/components/Business.jsx';
import Spinner from '../../../src/components/Spinner.jsx';

describe('Listings component', () => {
  const props = {
    fetchBusinesses: jest.fn(),
    businesses: [
      {
        name: 'test 1',
        image_url: 'https://t1@test.com'
      },
      {
        name: 'test 2',
        image_url: 'https://t2@test.com'
      },
    ],
    count: 2,
    history: {
      push: jest.fn()
    }
  };

  it('calls componentWillMount', () => {
    const willMount = jest.spyOn(Listings.prototype, 'componentWillMount');
    shallow(<Listings {...props} />);
    expect(willMount).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps', () => {
    const comp = shallow(<Listings {...props} />);
    const willReceive =
        jest.spyOn(comp.instance(), 'componentWillReceiveProps');
    const count = 5;
    comp.setProps({ count });
    expect(willReceive).toHaveBeenCalled();
  });

  it('calls genListing', () => {
    const comp = shallow(<Listings {...props} />);
    const genListing =
        jest.spyOn(comp.instance(), 'genListing');
    const businesses = [
      {
        name: 'test 3',
        image_url: 'https://t3@test.com'
      }
    ];
    comp.setProps({ businesses });
    expect(genListing).toHaveBeenCalled();
  });

  it('should call props.history.push', () => {
    const comp = shallow(<Listings {...props} />);
    comp.instance().onAddBtnClick();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should call onAddBtnClick', () => {
    const comp = shallow(<Listings {...props} />);
    const onAddBtn = jest.spyOn(comp.instance(), 'onAddBtnClick');
    comp.instance().onAddBtnClick();
    expect(onAddBtn).toHaveBeenCalled();
  });

  it('should change state and call fetchBusinesses', () => {
    const comp = shallow(<Listings {...props} />);
    const newCurrent = 6;
    comp.instance().onPageChange(newCurrent);
    expect(props.fetchBusinesses).toHaveBeenCalled();
    expect(comp.state().current).toEqual(newCurrent);
  });

  it('should have Business component', () => {
    const comp = shallow(<Listings {...props} />);
    const businesses = [
      {
        name: 'test 4',
        image_url: 'https://t4@test.com'
      },
      {
        name: 'test 5',
        image_url: 'https://t5@test.com'
      }
    ];
    comp.setProps({ businesses });
    expect(comp.exists(<Business />)).toBe(true);
  });

  it('calls fetchBusinesses', () => {
    shallow(<Listings {...props} />);
    expect(props.fetchBusinesses).toHaveBeenCalled();
  });

  it('should render Spinner component', () => {
    const comp = shallow(<Listings {...props} />);
    expect(comp.exists(<Spinner />)).toBe(true);
  });

  it('should render Pagination component', () => {
    const comp = shallow(<Listings {...props} />);
    expect(comp.exists(<Pagination />)).toBe(true);
  });
});
