import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './containers/Main';

import './css/styles.scss';

render(
  <Provider>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
);
