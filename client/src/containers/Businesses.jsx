import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Header from '../components/Header.jsx';
import Listings from '../components/Listings.jsx';
import BizProfile from '../components/BizProfile.jsx';
import Query from '../components/Query.jsx';
import Add from '../components/Add.jsx';
import Update from '../components/Update.jsx';
// import Profile from '../components/Profile.jsx';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { url } = this.props.match;
    return (
      <div className="flex flex-column">
        {/* <Route render={props => <Header {...props}
          openLogin={event => this.props.openLogin(event)}
        />}
        /> */}
        <Switch>
          <Route exact path={`${url}/filter`}
            render={props => (<Query {...props}/>)} />

          <Route exact path={`${url}/update/:businessId`}
            render={ (props) => {
              return (
                <Update {...props}
                  openLogin={this.props.openLogin}
                  closeLogin={this.props.closeLogin}
                  openSignUp={this.props.openSignUp}
                  closeSignUp={this.props.closeSignUp}
                />
              );
            }
            }/>

          <Route exact path={`${url}/add`}
            render={ (props) => {
              return (
                <Add {...props}
                  openLogin={this.props.openLogin}
                  closeLogin={this.props.closeLogin}
                  openSignUp={this.props.openSignUp}
                  closeSignUp={this.props.closeSignUp}
                />
              );
            }
            }/>

          <Route path={`${url}/:businessId`}
            render={props => (<BizProfile {...props}/>)} />

          <Route exact path={`${url}`}
            render={props => (<Listings {...props}/>)} />

        </Switch>
      </div>
    );
  }
}

export default Businesses;
