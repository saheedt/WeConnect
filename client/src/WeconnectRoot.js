import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import JwModal from 'jw-react-modal';

import configureStore from './store/configureStore';
import { loadState, saveState } from './store/loadState';

import Main from './containers/Main.jsx';

import SignUp from '../src/components/SignUp.jsx';
import Login from '../src/components/Login.jsx';

import { wipeUserError } from '../src/actions/userActions';

import './css/styles.scss';


const persistedState = loadState();
const store = configureStore(persistedState);

const openLogin = (event) => {
  wipeUserError({ token: null, user: null });
  return JwModal.open('user-login')(event);
};
const closeLogin = (event) => {
  return JwModal.close('user-login')(event);
};
const openSignUp = (event) => {
  wipeUserError({ token: null, user: null });
  return JwModal.open('user-sign-up')(event);
};
const closeSignUp = (event) => {
  return JwModal.close('user-sign-up')(event);
};

store.subscribe(() => {
  saveState(store.getState());
});

render(
  <Provider store={store} >
    <Router>
      <div>
        <Main
          openLogin={openLogin}
          closeLogin={closeLogin}
          openSignUp={openSignUp}
          closeSignUp={closeSignUp}
        />
        <JwModal id="user-sign-up">
          <SignUp closeSignUp={closeSignUp} openLogin={openLogin}/>
        </JwModal>
        <JwModal id="user-login">
          <Login closeLogin={closeLogin} openSignUp={openSignUp}/>
        </JwModal>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
