import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './css/styles.scss';

render(
  <Provider>
    <Router>
    </Router>
  </Provider>,
  document.getElementById('app')
);
