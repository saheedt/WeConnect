import React from 'react';
import { shallow } from 'enzyme';

import Business from '../../../src/components/Business.jsx';

describe('Business component', () => {
  const props = {
    image: 'https://tests.com',
    name: 'test',
    category: 'test',
    address: 'test avenue',
    id: 1
  };
  const comp = shallow(<Business {...props} />);
  it('contains h6 tag', () => {
    expect(comp
      .exists('<h6 className="business-category"><p><b>test</b></p></h6>'))
      .toBe(true);
  });
  it('contains img tag', () => {
    expect(comp.exists('<img src="https://tests.com" height="180px"/>'))
      .toBe(true);
  });
});
