import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import { removeQueryError } from '../actions/businessesActions';
import Error from './Error.jsx';
import Business from './Business.jsx';
import Helper from '../helper/Helper';

const defaultImage = Helper.defaultImageUrl();

class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: null
    };
    this.loaderOptions = Helper.loaderOptions();
  }
  componentWillMount() {
    const { businesses, clearQueryError } = this.props;
    clearQueryError();
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
  // <Business /> component to display quried businesses..
  genQueryListing(businesses) {
    const queries = businesses.map((business, index) => {
      const unique = `${business.name}-${index}`;
      const image = business.image_url ? business.image_url : defaultImage;
      return (
        <Business
          key={unique}
          image={image}
          name={business.name}
          category={business.category}
          address={business.address}
          id={business.id}
        />
      );
    });
    this.setState({ queries });
  }
  render() {
    const { isFetching, error } = this.props;
    const display = error ? 'none' : 'block';
    const { loaderOptions } = this;
    return (
      <Loader loaded={!isFetching} options={loaderOptions}>
        <section id="listings" className="header-margin">
          <center><Error error={error} /></center>
          <div style={{ display }} className="header-title">
            <h3 className="padding-15">Result</h3>
          </div>
          <div id="listings-list"
            className="collection flex flex-wrap justify-center flex-row">
            {this.state.queries}
          </div>
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
const mapDispatchedToProps = (dispatch) => {
  return {
    clearQueryError: () => dispatch(removeQueryError())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Query);
