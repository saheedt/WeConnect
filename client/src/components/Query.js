import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from 'react-loader'

class Query extends Component {
    constructor(props) {
        super(props);
        this.state = {
          queries: null
        }
        this.options = {
            lines: 13,
            length: 20,
            width: 10,
            radius: 30,
            scale: 1.00,
            corners: 1,
            color: '#fff',
            opacity: 0.25,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 20,
            zIndex: 2e9,
            top: '50%',
            left: '50%',
            shadow: false,
            hwaccel: false,
            position: 'absolute'
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
        const { isFetching } = this.props;
      return (
        <Loader loaded={true} options={this.options}>
            <section id="listings" className="header-margin">
                <div className="header-title"><h3 className="padding-15">Result</h3></div>
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
  