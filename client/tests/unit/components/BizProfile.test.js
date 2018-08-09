import React from 'react';
import { shallow } from 'enzyme';
import Pagination from 'rc-pagination';

import { BizProfile } from '../../../src/components/BizProfile.jsx';
import Spinner from '../../../src/components/Spinner.jsx';
import Error from '../../../src/components/Error.jsx';

describe('BizProfile component', () => {
  const props = {
    fetchReviews: jest.fn(jest.fn()),
    fetchBusiness: jest.fn(jest.fn()),
    business: {
      name: 'a',
      category: 'b',
      address: 'c',
      location: 'd',
      employees: 2345,
      phonenumber: 1234567890
    },
    match: {
      params: {
        businessId: 1
      }
    },
    reviews: {
      count: 1
    }
  };

  it('calls componentWillMount', () => {
    const willMount = jest.spyOn(BizProfile.prototype, 'componentWillMount');
    shallow(<BizProfile {...props} />);
    expect(willMount).toHaveBeenCalled();
    expect(props.fetchReviews).toHaveBeenCalled();
    expect(props.fetchBusiness).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps', () => {
    const comp = shallow(<BizProfile {...props} />);
    const genProfile = jest.spyOn(comp.instance(), 'generateProfile');
    const business = {
      name: 'aaaa',
      category: 'bbbb',
      address: 'cccc',
      location: 'ddddd',
      employees: 27887345,
      phonenumber: 1289867890
    };
    comp.setProps({ business });
    expect(genProfile).toHaveBeenCalled();
  });
  it('calls genReviews', () => {
    const comp = shallow(<BizProfile {...props} />);
    const genReviews = jest.spyOn(comp.instance(), 'genReviews');
    const reviews = {
      reviews: [{
        name: 'aaaa',
        review: 'hhgfgdfs'
      }],
      count: 1289867890
    };
    comp.setProps({ reviews });
    expect(genReviews).toHaveBeenCalled();
  });
  it('should render Spinner component', () => {
    const comp = shallow(<BizProfile {...props} />);
    expect(comp.exists(<Spinner />)).toBe(true);
  });
  it('should render <Error />', () => {
    const comp = shallow(<BizProfile {...props} />);
    expect(comp.exists(<Error />)).toBe(true);
  });
  it('should render Pagination component', () => {
    const comp = shallow(<BizProfile {...props} />);
    expect(comp.exists(<Pagination />)).toBe(true);
  });
});
