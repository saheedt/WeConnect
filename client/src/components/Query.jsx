import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';

import { removeQueryError, query } from '../actions/businessesActions';
import Error from './Error.jsx';
import Business from './Business.jsx';
import Spinner from './Spinner.jsx';
import Helper from '../helper/Helper';

const defaultImage = Helper.defaultImageUrl();

/**
 * @description Lists queried businesses
 * @class Query
 * @extends {Component}
 * @export
 */
export class Query extends Component {
  /**
   * @description Creates an instance of Query
   * @param {Object} props
   * @memberof Query
   */
  constructor(props) {
    super(props);
    this.state = {
      queries: null,
      current: 1
    };
    this.searchInput = null;
    this.selectInput = null;
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   * @description Fires before component is mounted into the dom
   * @memberof Query
   */
  componentWillMount() {
    const { clearQueryError } = this.props;
    clearQueryError();
    // if (businesses) { businesses,
    //   return this.genQueryListing(businesses);
    // }
  }
  /**
   * @description Fires when component is mounted into the dom
   * @memberof Query
   */
  componentDidMount() {
    this.searchInput = document.getElementById('listings-search-input');
    this.selectInput = document.getElementById('search-select');
  }
  /**
   * @description Fires when component props changes
   * @param {Object} nextProps
   * @return {Function}
   * @memberof Query
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.businesses &&
      nextProps.businesses !== this.props.businesses) {
      return this.genQueryListing(nextProps.businesses);
    }
  }
  /**
   * @description Generates business cards for Query componemt
   * @param {Array} businesses
   * @memberof Query
   */
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
  /**
   * @description Handles change event for pagination
   * @param {Number} page
   * @memberof Query
   */
  onPageChange(page) {
    const { searchInput, selectInput } = this;
    const { doQuery } = this.props;
    this.setState(
      { current: page },
      () => doQuery(selectInput.value, searchInput.value, page)
    );
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Query
   */
  render() {
    const { isFetching, error, count } = this.props;
    const display = error ? 'none' : 'block';
    const { onPageChange } = this;
    const { current } = this.state;
    return (
      <section id="listings" className="header-margin">
        {isFetching && <Spinner spinnerColor={'#7fc6c8'} />}
        <center><Error error={error} /></center>
        <div style={{ display }} className="header-title">
          <h3 className="padding-15">Result</h3>
        </div>
        <div id="listings-list"
          className="collection flex flex-wrap justify-center flex-row">
          {this.state.queries}
        </div>
        <div id="paginator">
          <Pagination onChange={onPageChange}
            current={current}
            total={count}
            showLessItems
          />
        </div>
      </section>
    );
  }
}

Query.propTypes = {
  businesses: PropTypes.arrayOf(PropTypes.object),
  clearQueryError: PropTypes.func,
  doQuery: PropTypes.func,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  count: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    ...state.businesses.queries
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    clearQueryError: () => dispatch(removeQueryError()),
    doQuery: (by, queryData, pageOffset) =>
      dispatch(query(by, queryData, pageOffset))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Query);
