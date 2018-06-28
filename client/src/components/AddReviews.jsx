import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchReviews } from '../actions/businessesActions';

class AddReviews extends Component {
  constructor(props) {
    super(props);
    this.doAddReview = this.doAddReview.bind(this);
    this.count = 0;
    this.state = {
      review: null
    };
  }
  doAddReview(event) {
    event.preventDefault();
    const name = this.name.value;
    const review = this.review.value;
    const { businessId } = this.props;
    this.props.addReview(businessId, { name, review });
  }
  componentDidMount() {
    this.name = document.getElementById('reviewer-name-input');
    this.review = document.getElementById('review-input');
    this.addReviewBtn = document.getElementById('post-review');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching) {
      this.name.readonly = true;
      this.review.readonly = true;
      this.addReviewBtn.disable = true;
    }
    if (!nextProps.isFetching) {
      this.name.readonly = false;
      this.review.readonly = false;
      this.addReviewBtn.disable = false;
    }
    if (nextProps.review && nextProps.review.createdAt) {
      this.setState({ review: this.review.value }, () => {
        this.name.value = '';
        this.review.value = '';
        nextProps.fetchReviews(nextProps.businessId);
      });
    }
  }
  render() {
    return (
      <section
        className="profile-reviews-maker-holder holder-60 padding-20 flex">
        <div className="header-title"><h3>Add Review</h3></div>
        <div id="review-input-holder">
          <div className="row">
            <form className="col s12 m12 l12">
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <textarea id="reviewer-name-input"
                    className="materialize-textarea">
                  </textarea>
                  <label htmlFor="reviewer-name-input">Name</label>
                </div>
                <div className="input-field col s12 m12 l12">
                  <textarea id="review-input" className="materialize-textarea">
                  </textarea>
                  <label htmlFor="review-input">Review Business</label>
                </div>
              </div>
              <div id="post-review-holder">
                <a href="" id="post-review"
                  onClick={this.doAddReview}
                  className="teal right flex">
                  Add review
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.businesses.addReview
  };
};

const mapDispatchedToProps = (dispatch) => {
  return {
    fetchReviews: (businessId, page) =>
      dispatch(fetchReviews(businessId, page))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(AddReviews);
