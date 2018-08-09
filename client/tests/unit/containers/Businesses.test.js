import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Businesses from '../../../src/containers/Businesses.jsx';
// import { Query } from '../../../src/components/Query.jsx';

const initialState = {
  businesses: {
    queries: [],
    reviews: {
      count: 1
    }
  },
  users: {
    token: 'jdnf8u3w97rubviwskjdb',
    user: {
      email: 'x@y.com',
      id: 1
    }
  }
};
const mockStore = configureStore([thunk]);

describe('Businesses container component', () => {
  let props, store;
  beforeEach(() => {
    props = {
      openLogin: jest.fn(),
      closeLogin: jest.fn(),
      openSignUp: jest.fn(),
      closeSignUp: jest.fn(),
      match: {
        url: 'businesses',
        params: 1
      }
    };
    store = mockStore((initialState));
  });

  it('should render query component', () => {
    const path = 'businesses/filter';
    const comp =
    shallow(<MemoryRouter
      initialEntries={[path]} initialIndex={0}>
      <Router>
        <Provider store={store}>
          <Businesses {...props} />
        </Provider>
      </Router>
    </MemoryRouter>);
    comp.html();
    const renderedPath = comp.instance().history.location.pathname;
    expect(renderedPath).toEqual(path);
  });
  it('should render Update component', () => {
    const path = 'businesses/update/1';
    const comp =
    shallow(<MemoryRouter
      initialEntries={[path]} initialIndex={0}>
      <Router>
        <Provider store={store}>
          <Businesses {...props} />
        </Provider>
      </Router>
    </MemoryRouter>);
    comp.html();
    const renderedPath = comp.instance().history.location.pathname;
    expect(renderedPath).toEqual(path);
  });
  it('should render Add component', () => {
    const path = 'businesses/add';
    const comp =
    shallow(<MemoryRouter
      initialEntries={[path]} initialIndex={0}>
      <Router>
        <Provider store={store}>
          <Businesses {...props} />
        </Provider>
      </Router>
    </MemoryRouter>);
    comp.html();
    const renderedPath = comp.instance().history.location.pathname;
    expect(renderedPath).toEqual(path);
  });
  it('should render BizProfile component', () => {
    const path = 'businesses/1';
    const comp =
    shallow(<MemoryRouter
      initialEntries={[path]} initialIndex={0}>
      <Router>
        <Provider store={store}>
          <Businesses {...props} />
        </Provider>
      </Router>
    </MemoryRouter>);
    comp.html();
    const renderedPath = comp.instance().history.location.pathname;
    expect(renderedPath).toEqual(path);
  });
  it('should render Businesses component', () => {
    const path = 'businesses';
    const comp =
    shallow(<MemoryRouter
      initialEntries={[path]} initialIndex={0}>
      <Router>
        <Provider store={store}>
          <Businesses {...props} />
        </Provider>
      </Router>
    </MemoryRouter>);
    comp.html();
    const renderedPath = comp.instance().history.location.pathname;
    expect(renderedPath).toEqual(path);
  });
});
