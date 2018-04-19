import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { loadState, saveState } from './store/loadState';

import Main from './containers/Main';

import './css/styles.scss';

const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

render(
  <Provider store={store} >
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
);
