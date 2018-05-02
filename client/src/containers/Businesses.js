import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Listings from '../components/Listings';
import BizProfile from '../components/BizProfile';
import Query from '../components/Query';
import Add from '../components/Add';
import Update from '../components/Update';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {  
    const { url } = this.props.match;
    return (
      <div className="flex flex-column">
      <Route render={props => <Header {...props}
        openLogin={event => this.props.openLogin(event)}
      />}
      />
        <Switch>
          <Route exact path={`${url}/filter`}
            render={props => (<Query {...props}/>)} />
          
          <Route exact path={`${url}/update/:businessId`}
            render={props => (<Update {...props}/>)} />

          <Route exact path={`${url}/add`}
            render={props => {
              return(
                <Add {...props}
                  openLogin={this.props.openLogin}
                  closeLogin={this.props.closeLogin}
                  openSignUp={this.props.openSignUp}
                  closeSignUp={this.props.closeSignUp}
                />
              )
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
