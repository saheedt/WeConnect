import React from 'react';
import { shallow } from 'enzyme';

import Success from '../../../src/components/Success.jsx';

describe('<Success />', () => {
  const props = {
    message: 'testing...'
  };
  it('render correct message', () => {
    const comp = shallow(<Success {...props} />);
    expect(comp.find('.success-style').text()).toEqual(props.message);
  });
  it('renders null', () => {
    const comp = shallow(<Success message={null} />);
    expect(comp.type()).toBeNull();
  });
});
