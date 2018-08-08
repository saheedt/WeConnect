import React from 'react';
import { shallow } from 'enzyme';

import Error from '../../../src/components/Error.jsx';

describe('<Error />', () => {
  const props = {
    error: null
  };
  const comp = shallow(<Error {...props} />);

  it('renders #error-container', () => {
    expect(comp.exists('#error-container')).toBe(true);
  });
  it('render null', () => {
    expect(comp.type()).toBeNull();
  });
});
