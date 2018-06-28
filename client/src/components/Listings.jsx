import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import Loader from 'react-loader';

import Helper from '../helper/Helper';

import { fetchBusinesses } from '../actions/businessesActions';

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
    const dom = listings.map((listing, index) => {
      const unique = `${listing.name}-${index}`;
      return (
        <li key={unique} className="collection-item">
          <div className="listings-list-groupings flex" >
            <div className="listings-list-groupings-items-left flex">
              <i className="material-icons circle">business_center</i>
            </div>
            <div className="listings-list-groupings-items-right">
              <h4>
                <Link to={`/businesses/${listing.id}`}>
                  <span className="title">{listing.name}</span>
                </Link>
              </h4>
            </div>
          </div>

          <div className="listings-list-groupings flex">
            <div className="listings-list-groupings-items-left flex">
              <i className="material-icons circle">place</i>
            </div>
            <div className="listings-list-groupings-items-right">
              <p>{listing.address}</p>
            </div>
          </div>

          <div className="listings-list-groupings flex">
            <div className="listings-list-groupings-items-left flex">
              <i className="material-icons circle">description</i>
            </div>
            <div className="listings-list-groupings-items-right">
              <p>{listing.category}</p>
            </div>
          </div>
        </li>
      );
    });
    this.setState({ display: dom });
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
          <ul id="listings-list" className="collection max630">
            {this.state.display}
            <div id="paginator">
              <Pagination onChange={this.onPageChange}
                current={this.state.current}
                total={count}
                showLessItems
              />
            </div>
          </ul>
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
