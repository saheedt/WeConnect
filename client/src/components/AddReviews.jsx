import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchReviews } from '../actions/businessesActions';

/**
 * @description Diplay review input
 * @class AddReviews
 * @extends {Component}
 * @export
 */
class AddReviews extends Component {
  /**
   * @description Creates an instance of AddReviews
   * @param {Object} props
   * @memberof AddReviews
   */
  constructor(props) {
    super(props);
    this.doAddReview = this.doAddReview.bind(this);
    this.count = 0;
    this.state = {
      review: null
    };
  }
  /**
   * @description Handles add review click event
   * @param {Object} event
   * @memberof AddReviews
   */
  doAddReview(event) {
    event.preventDefault();
    const name = this.name.value;
    const review = this.review.value;
    const { businessId, addReview } = this.props;
    addReview(businessId, { name, review });
  }
  /**
   * @description Fires when component is mounted into the dom
   * @memberof AddReviews
   */
  componentDidMount() {
    this.name = document.getElementById('reviewer-name-input');
    this.review = document.getElementById('review-input');
    this.addReviewBtn = document.getElementById('post-review');
  }
  /**
   * @description Fires when component props changes
   * @param {Object} nextProps
   * @memberof AddReviews
   */
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
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof AddReviews
   */
  render() {
    const { doAddReview } = this;
    return (
      <section
        className="profile-reviews-maker-holder holder-60 padding-20 flex">
        <div className="header-title"><h3>Add Review</h3></div>
        <div id="review-input-holder">
          <div className="row">
            <form onSubmit={doAddReview} className="col s12 m12 l12">
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <textarea id="reviewer-name-input"
                    className="materialize-textarea">
                  </textarea>
                  <label htmlFor="reviewer-name-input">Name</label>
                </div>
                <div className="input-field col s12 m12 l12">
                  <textarea id="review-input" className="materialize-textarea"
                    required>
                  </textarea>
                  <label htmlFor="review-input">Review Business</label>
                </div>
              </div>
              <div id="post-review-holder">
                <input type="submit" id="post-review"
                  className="primary-green right flex" value="Add review" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

AddReviews.propTypes = {
  isFetching: PropTypes.bool,
  review: PropTypes.object,
  error: PropTypes.string,
  fetchReviews: PropTypes.func
};

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
