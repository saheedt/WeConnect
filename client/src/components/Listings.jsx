import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';

import Helper from '../helper/Helper';
import Spinner from './Spinner.jsx';
import Business from '../components/Business.jsx';

import { fetchBusinesses } from '../actions/businessesActions';

const defaultImage = Helper.defaultImageUrl();
/**
 * @description Lists all registered businesses
 * @class Listings
 * @extends {Component}
 * @export
 */
export class Listings extends Component {
  /**
   * @description Creates an instance of Listings
   * @param {Object} props
   * @memberof Listings
   */
  constructor(props) {
    super(props);
    this.state = {
      businesses: null,
      current: 1
    };
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   * @description Fires before component is mounted into the dom
   * @memberof Listings
   */
  componentWillMount() {
    this.props.fetchBusinesses();
  }
  /**
   * @description Fires when component props changes
   * @param {Object} nextProps
   * @return {Function}
   * @memberof Listings
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.businesses &&
        nextProps.businesses !== this.props.businesses) {
      return this.genListing(nextProps.businesses);
    }
  }
  /**
   * @description Handles floating add button click event
   * @return {Function}
   * @memberof Listings
   */
  onAddBtnClick() {
    return this.props.history.push('/businesses/add');
  }
  /**
   * @description Generates business cards for Listings component
   * @param {Array} listings
   * @memberof Listings
   */
  genListing(listings) {
    const businesses = listings.map((listing, index) => {
      const unique = `${listing.name}-${index}`;
      const image = listing.image_url ? listing.image_url : defaultImage;
      return (
        <Business
          key={unique}
          image={image}
          name={listing.name}
          category={listing.category}
          address={listing.address}
          id={listing.id}
        />
      );
    });
    this.setState({ businesses });
  }
  /**
   * @description Handles change event for pagination
   * @param {Number} page
   * @memberof Listings
   */
  onPageChange(page) {
    this.setState(
      { current: page },
      () => this.props.fetchBusinesses(page)
    );
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Listings
   */
  render() {
    const { isFetching, count } = this.props;
    const { businesses, current } = this.state;
    const { onPageChange, onAddBtnClick } = this;
    return (
      <section id="listings" className="header-margin">
        {isFetching && <Spinner spinnerColor={'#7fc6c8'} />}
        <div id="listings-list"
          className="collection flex flex-wrap justify-center flex-row">
          {businesses}
        </div>
        <div id="paginator">
          <Pagination onChange={onPageChange}
            current={current}
            total={count}
            showLessItems
          />
        </div>
        <div className="add-btn-float">
          <a onClick={onAddBtnClick}
            className="btn-floating btn-large waves-effect waves-light">
            <i className="material-icons">add</i>
          </a>
        </div>
      </section>
    );
  }
}

Listings.propTypes = {
  isFetching: PropTypes.bool,
  count: PropTypes.number,
  businesses: PropTypes.arrayOf(PropTypes.object),
  fetchBusinesses: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    ...state.businesses
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    fetchBusinesses: page => dispatch(fetchBusinesses(page))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Listings);
