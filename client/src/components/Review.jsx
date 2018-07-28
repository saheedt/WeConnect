import React from 'react';
import PropTypes from 'prop-types';

/**
   * @description Renders Review component to the dom
   * @returns {object} JSX object
   * @param {object} props
   */
const Review = ({ createdAt, name, review }) => {
  return (
    <div className="profile-review flex padding-20">
      <div className="review-date-time">
        <span className="right">{createdAt.split('T')[0]}</span>
      </div>
      <div className="reviewer">
        <ul className="collection">
          <li className="collection-item avatar">
            <i className="material-icons circle">contacts</i>
            <h5>{name}</h5>
          </li>
        </ul>
      </div>
      <div className="review padding-left-20">
        {review}
      </div>
    </div>
  );
};

Review.propTypes = {
  createdAt: PropTypes.string,
  name: PropTypes.string,
  review: PropTypes.string
};

export default Review;
