import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader'

import Error from './Error';
import Helper from '../helper/Helper';

class Query extends Component {
    constructor(props) {
        super(props);
        this.state = {
          queries: null
        }
    }
    componentWillMount() {
      const { businesses } = this.props;
      if (businesses) {
        return this.genQueryListing(businesses);
      }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.businesses &&
            nextProps.businesses !== this.props.businesses) {
          return this.genQueryListing(nextProps.businesses);
        }
    }
    genQueryListing(businesses) {
        const queries = businesses.map((business, index) => {
          const unique = `${business.name}-${index}`;
          return (
            <li key={unique} className="collection-item">
              <div className="listings-list-groupings flex" >
                <div className="listings-list-groupings-items-left flex">
                  <i className="material-icons circle">business_center</i>
                </div>
                <div className="listings-list-groupings-items-right">
                  <h4>
                    <Link to={`/businesses/${business.id}`}>
                      <span className="title">{business.name}</span>
                    </Link>
                  </h4>
                </div>
              </div>
    
              <div className="listings-list-groupings flex">
                <div className="listings-list-groupings-items-left flex">
                  <i className="material-icons circle">place</i>
                </div>
                <div className="listings-list-groupings-items-right">
                  <p>{business.address}</p>
                </div>
              </div>
    
              <div className="listings-list-groupings flex">
                <div className="listings-list-groupings-items-left flex">
                  <i className="material-icons circle">description</i>
                </div>
                <div className="listings-list-groupings-items-right">
                  <p>{business.category}</p>
                </div>
              </div>
            </li>
          );
        });
        this.setState({ queries });
      }
    render() {
        const { isFetching, error } = this.props;
        const display = error ? 'none': 'block';
        
      return (
        <Loader loaded={!isFetching} options={Helper.loaderOptions}>
          <section id="listings" className="header-margin">
            <center><Error error={error} /></center>
            <div style={{display}} className="header-title">
              <h3 className="padding-15">Result</h3>
            </div>
            <ul id="listings-list" className="collection max630">
              {this.state.queries}
            </ul>
          </section>
        </Loader>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      ...state.businesses.queries
    };
};
export default connect(
  mapStateToProps,
  null
)(Query);
  