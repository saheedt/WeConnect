import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';

import Error from './Error.jsx';
import Review from './Review.jsx';
import AddReviews from './AddReviews.jsx';
import Spinner from './Spinner.jsx';

import {
  fetchBusiness,
  fetchReviews,
  addBusinessReview
} from '../actions/businessesActions';

/**
 * @description Displays business profile page
 * @class BizProfile
 * @extends {Component}
 * @export
 */
class BizProfile extends Component {
  /**
   * @description Creates an instance of BizProfile
   * @param {Object} props
   * @memberof BizProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      business: null,
      reviews: null,
      current: 1
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentWillMount() {
    const { businessId } = this.props.match.params;
    this.props.fetchBusiness(businessId);
    this.props.fetchReviews(businessId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.business && nextProps.business !== this.props.business) {
      this.setState({ business: this.generateProfile(nextProps.business) });
    }
    if (nextProps.reviews.reviews &&
        nextProps.reviews.reviews !== this.props.reviews.reviews) {
      this.genReviews(nextProps.reviews.reviews);
    }
  }
  /**
   * @description Handles pagination onChange event
   * @param {Number} page
   * @memberof BizProfile
   */
  onPageChange(page) {
    const { businessId } = this.props.match.params;
    this.setState(
      { current: page },
      () => this.props.fetchReviews(businessId, page)
    );
  }
  /**
   * @description Handles business profile generation
   * @param {Object} profile
   * @return JSX element
   * @memberof BizProfile
   */
  generateProfile(profile) {
    return (
      <section id="business-profile"
        className="holder-60-shadow padding-20 flex white">
        <div id="business-name-emph"><h3>{profile.name}</h3></div>
        <div id="business-profile-details" className="flex">
          <div className="profile-grouping flex">
            <div className="title bold flex">Company Name</div>
            <div className="detail flex">{profile.name}</div>
          </div>
          <div className="profile-grouping flex">
            <div className="title bold flex">Category</div>
            <div className="detail flex">{profile.category}</div>
          </div>
          <div className="profile-grouping flex">
            <div className="title bold flex">Address</div>
            <div className="detail flex">{profile.address}</div>
          </div>
          <div className="profile-grouping flex">
            <div className="title bold flex">State</div>
            <div className="detail flex">{profile.location}</div>
          </div>
          <div className="profile-grouping flex">
            <div className="title bold flex">Employees</div>
            <div className="detail flex">{profile.employees}</div>
          </div>
          <div className="profile-grouping flex">
            <div className="title bold flex">Phone</div>
            <div className="detail flex">{profile.phonenumber}</div>
          </div>
        </div>
      </section>
    );
  }
  /**
   * @description Handles business reviews generation
   * @param {Array} reviews
   * @memberof BizProfile
   */
  genReviews(reviews) {
    const bizReviews = reviews.map((review, index) => {
      const unique = `${index}--${index}`;
      return (
        <Review key={unique} createdAt={review.createdAt}
          name={review.name} review={review.review}/>
      );
    });
    this.setState({ reviews: bizReviews });
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof BizProfile
   */
  render() {
    const { isFetching } = this.props;
    const { count } = this.props.reviews;
    const reviewError = this.props.reviews ? this.props.reviews.error : null;
    const displayPagination = this.props.reviews.reviews ? 'block' : 'none';
    const { businessId } = this.props.match.params;
    return (
      <div className="flex vertical-after-header">
        {isFetching && <Spinner spinnerColor={'#7fc6c8'}/>}
        {this.state.business}
        <section
          className="profile-reviews-maker-holder holder-60 padding-20 flex
          white">
          <div className="header-title"><h3>Reviews</h3></div>
          <Error background={'#FFF'} color={'#000'}
            error={reviewError} />
          {this.state.reviews}
          <div style={{ display: displayPagination }} id="paginator">
            <Pagination onChange={this.onPageChange}
              current={this.state.current}
              total={count}
              pageSize={5}
              showLessItems
            />
          </div>
          <AddReviews
            addReview={this.props.addBusinessReview}
            businessId={businessId}
          />
        </section>
      </div>
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
    fetchBusiness: businessId => dispatch(fetchBusiness(businessId)),
    fetchReviews: (businessId, page) =>
      dispatch(fetchReviews(businessId, page)),
    addBusinessReview: (businessId, review) =>
      dispatch(addBusinessReview(businessId, review))
  };
};
BizProfile.propTypes = {
  isFetching: PropTypes.bool,
  business: PropTypes.object,
  reviews: PropTypes.object,
  fetchBusiness: PropTypes.func,
  fetchReviews: PropTypes.func,
  addBusinessReview: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(BizProfile);
