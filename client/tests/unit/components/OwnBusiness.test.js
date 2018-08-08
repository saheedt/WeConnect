import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { OwnBusiness } from '../../../src/components/OwnBusiness.jsx';

describe('<OwnBusiness />', () => {
  let props;
  beforeEach(() => {
    props = {
      name: 'x',
      image_url: 'https://x.y.com',
      createdAt: '24 March 2018T898787',
      deleteBusiness: jest.fn()
    };
  });
  it('should contain expexted nodes', () => {
    const comp = shallow(<MemoryRouter>
      <OwnBusiness name={props.name} image_url={props.image_url}
        createdAt={props.createdAt} deleteBusiness={props.deleteBusiness}
      />
    </MemoryRouter>);
    const com = comp.find(OwnBusiness);
    com.dive();
    // com.setProps(props);
    expect(com.exists('.collection-item')).toBe(true);
  });
});
