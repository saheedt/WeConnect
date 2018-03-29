import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBusiness, fetchReviews } from '../actions/businessesActions';

class BizProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: null,
      reviews: null
    };
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
    if (nextProps.reviews && nextProps.reviews !== this.props.reviews) {
      this.genReviews(nextProps.reviews);
    }
  }
  generateProfile(profile) {
    return (
      <section id="business-profile"
        className="holder-60-shadow padding-20 flex">
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
  genReviews(reviews) {
    const bizReviews = reviews.map((review, index) => {
      const unique = `${index}--${index}`;
      return (
        <div key={unique} className="profile-review flex padding-20">
          <div className="review-date-time">
            <span className="right">{review.createdAt.split('T')[0]}</span>
          </div>
          <div className="reviewer">
            <ul className="collection">
              <li className="collection-item avatar">
                <i className="material-icons circle">contacts</i>
                <h5>{review.name}</h5>
              </li>
            </ul>
          </div>
          <div className="review padding-left-20">
            {review.review}
          </div>
        </div>
      );
    });
    this.setState({ reviews: bizReviews });
  }
  render() {
    return (
      <div className="flex vertical-after-header">
        {this.state.business}
        <section
          className="profile-reviews-maker-holder holder-60 padding-20 flex">
          <div className="header-title"><h3>Reviews</h3></div>
          {this.state.reviews}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.businesses,
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    fetchBusiness: businessId => dispatch(fetchBusiness(businessId)),
    fetchReviews: businessId => dispatch(fetchReviews(businessId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(BizProfile);