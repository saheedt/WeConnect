import React from 'react';
import { shallow } from 'enzyme';

import Error from '../../../src/components/Error.jsx';

describe('Error components', () => {
  let props;
  beforeEach(() => {
    props = {
      error: 'errored!!!'
    };
  });
  it('renders #error-container', () => {
    const comp = shallow(<Error {...props} />);
    expect(comp.exists('#error-container')).toBe(true);
  });
  it('render null', () => {
    props.error = null;
    const comp = shallow(<Error {...props} />);
    expect(comp.type()).toBeNull();
  });
});
