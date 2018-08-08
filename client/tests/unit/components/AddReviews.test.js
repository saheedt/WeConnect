import React from 'react';
import { shallow } from 'enzyme';

import { AddReviews } from '../../../src/components/AddReviews.jsx';
import Spinner from '../../../src/components/Spinner.jsx';

describe('<AddReviews />', () => {
  const props = {
    fetchReviews: jest.fn(jest.fn()),
    addReview: jest.fn(),
    businessId: 1
  };

  it('calls componentDidMount', () => {
    const compDidMount = jest.spyOn(AddReviews.prototype, 'componentDidMount');
    shallow(<AddReviews {...props} />);
    expect(compDidMount).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps', () => {
    const compRecProps =
        jest.spyOn(AddReviews.prototype, 'componentWillReceiveProps');
    const comp = shallow(<AddReviews {...props} />);
    comp.instance().name = {
      readonly: false
    };
    comp.instance().review = {
      readonly: false
    };
    comp.instance().addReviewBtn = {
      disable: true
    };
    const review = { createdAt: '456khbd47gt87rtrfhjkt7' };
    comp.setProps({ review });
    expect(compRecProps).toHaveBeenCalled();
    expect(props.fetchReviews).toHaveBeenCalled();
    comp.setProps({ isFetching: true });
  });

  it('sets state', () => {
    const comp = shallow(<AddReviews {...props} />);
    comp.setState({
      review: {
        name: 'fake',
        review: 'rev'
      }
    });
    expect(comp.state().review.name).toEqual('fake');
    expect(comp.state().review.review).toEqual('rev');
  });

  it('should render <Spinner />', () => {
    const comp = shallow(<AddReviews {...props} />);
    expect(comp.exists(<Spinner />)).toBe(true);
  });
  it('should call addReview', () => {
    const comp = shallow(<AddReviews {...props} />);
    comp.instance().name = { value: 'o' };
    comp.instance().review = { value: 'p' };
    comp.instance().doAddReview({ preventDefault() {} });
    expect(props.addReview).toHaveBeenCalled();
  });
});
