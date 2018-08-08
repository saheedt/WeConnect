import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Businesses from '../../../src/containers/Businesses.jsx';
// import { Query } from '../../../src/components/Query.jsx';

const store = configureStore([thunk])();

describe('<Businesses />', () => {
  let props;
  beforeEach(() => {
    props = {
      openLogin: jest.fn(),
      closeLogin: jest.fn(),
      openSignUp: jest.fn(),
      closeSignUp: jest.fn(),
      match: {
        url: 'businesses'
      }
    };
  });

  it('should render correctly', () => {
    const comp =
    shallow(<Provider store={store}>
      <MemoryRouter
        initialEntries={['businesses/filter']} initialIndex={0}>
        <Router>
          <Businesses {...props} />
        </Router>
      </MemoryRouter>
    </Provider>);
    // console.log(comp.html());
    expect(comp).toBeDefined();
  });
//   it('should have <Query />', () => {
//     const comp = mount(<Businesses {...props} />);
//     expect(comp.find(<Query />)).toBeDefined();
//   });
});
