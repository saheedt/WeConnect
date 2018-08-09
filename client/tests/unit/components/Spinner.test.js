import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../../../src/components/Spinner.jsx';

describe('Spinner component', () => {
  const comp = shallow(<Spinner />);
  it('should contain .spinner-overlay', () => {
    expect(comp.hasClass('spinner-overlay')).toBeTruthy();
  });
  it('should contain .spinner-container', () => {
    expect(comp.exists('spinner-container')).toBeTruthy();
  });
  it('should render spinner correctly', () => {
    expect(comp.html())
      .toEqual('<div class="show-spinner spinner-overlay"><div class="spinner-container"><div class="spinner" style="border-top:16px solid #3498db"></div></div></div>');
  });
});
