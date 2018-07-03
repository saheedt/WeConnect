import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import Loader from 'react-loader';

import Helper from '../helper/Helper';

import Business from '../components/Business.jsx';

import { fetchBusinesses } from '../actions/businessesActions';

const defaultImage = Helper.defaultImageUrl();

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: null,
      current: 1
    };
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentWillMount() {
    return this.props.fetchBusinesses();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.businesses &&
        nextProps.businesses !== this.props.businesses) {
      return this.genListing(nextProps.businesses);
    }
  }
  onAddBtnClick() {
    return this.props.history.push('/businesses/add');
  }
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
  onPageChange(page) {
    this.setState(
      { current: page },
      () => this.props.fetchBusinesses(page)
    );
  }
  render() {
    const { isFetching, count } = this.props;
    return (
      <Loader loaded={!isFetching} options={Helper.loaderOptions()} >
        <section id="listings" className="header-margin">
          <div id="listings-list"
            className="collection flex flex-wrap justify-center flex-row">
            {this.state.businesses}
          </div>
          <div id="paginator">
            <Pagination onChange={this.onPageChange}
              current={this.state.current}
              total={count}
              showLessItems
            />
          </div>
          <div className="add-btn-float">
            <a onClick={this.onAddBtnClick}
              className="btn-floating btn-large waves-effect waves-light">
              <i className="material-icons">add</i>
            </a>
          </div>
        </section>
      </Loader>
    );
  }
}

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
