import React from 'react';
import { Link } from 'react-router-dom';

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
          <img src={image} />
        </Link>
      </div>
      <div className="card-content">
        <Link to={`/businesses/${id}`}>
          <p className="business-name">{name}</p>
        </Link>
        <p className="business-category">{category}</p>
        <p className="business-address">{address}</p>
      </div>
    </div>
  );
};
export default Business;
