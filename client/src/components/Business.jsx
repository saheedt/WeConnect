import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
   * @description Renders Business component to the dom
   * @param {Object} {...}
   * @returns {object} JSX object
   */
const Business = ({
  image,
  name,
  category,
  address,
  id
}) => {
  return (
    <div className="card business-card">
      <div className="card-image">
        <Link to={`/businesses/${id}`}>
          <img src={image} height="180px"/>
        </Link>
      </div>
      <div className="card-content">
        <Link to={`/businesses/${id}`}>
          <h5 className="business-name"><b>{name}</b></h5>
        </Link>
        <h6 className="business-category"><p><b>{category}</b></p></h6>
        <h6 className="business-address"><p><i>{address}</i></p></h6>
      </div>
    </div>
  );
};
Business.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  category: PropTypes.string,
  address: PropTypes.string
};
export default Business;
