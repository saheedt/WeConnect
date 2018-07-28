import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Header from '../components/Header.jsx';
import Listings from '../components/Listings.jsx';
import BizProfile from '../components/BizProfile.jsx';
import Query from '../components/Query.jsx';
import Add from '../components/Add.jsx';
import Update from '../components/Update.jsx';
// import Profile from '../components/Profile.jsx';

const Businesses = (props) => {
  const { url } = props.match;
  const {
    openLogin,
    closeLogin,
    openSignUp,
    closeSignUp
  } = props;
  return (
    <div className="flex flex-column">
      {/* <Route render={props => <Header {...props}
          openLogin={event => this.props.openLogin(event)}
        />}
        /> */}
      <Switch>
        <Route exact path={`${url}/filter`}
          render={properties => (<Query {...properties}/>)} />

        <Route exact path={`${url}/update/:businessId`}
          render={ (properties) => {
            return (
              <Update {...properties}
                openLogin={openLogin}
                closeLogin={closeLogin}
                openSignUp={openSignUp}
                closeSignUp={closeSignUp}
              />
            );
          }
          }/>

        <Route exact path={`${url}/add`}
          render={ (properties) => {
            return (
              <Add {...properties}
                openLogin={openLogin}
                closeLogin={closeLogin}
                openSignUp={openSignUp}
                closeSignUp={closeSignUp}
              />
            );
          }
          }/>

        <Route path={`${url}/:businessId`}
          render={properties => (<BizProfile {...properties}/>)} />

        <Route exact path={`${url}`}
          render={properties => (<Listings {...properties}/>)} />

      </Switch>
    </div>
  );
};

export default Businesses;
