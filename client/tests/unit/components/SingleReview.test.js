import React from 'react';
import { shallow } from 'enzyme';
import { Review } from '../../../src/components/Review.jsx';

describe('<Review />', () => {
  let props;
  beforeEach(() => {
    props = {
      createdAt: '20 march 2018T57578473',
      name: 'test',
      review: 'testing tester'
    };
  });
  it('renders right name', () => {
    const comp = shallow(<Review {...props} />);
    const name = comp.find('h5').text();
    expect(name).toEqual(props.name);
  });
  it('renders right review', () => {
    const comp = shallow(<Review {...props} />);
    const review = comp.find('.review').text();
    expect(review).toEqual(props.review);
  });
});
