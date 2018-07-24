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
          <img src={image} height="180px"/>
        </Link>
      </div>
      <div className="card-content">
        <Link to={`/businesses/${id}`}>
          <p className="business-name"><h5><b>{name}</b></h5></p>
        </Link>
        <p className="business-category"><h6><b>{category}</b></h6></p>
        <p className="business-address"><h7><i>{address}</i></h7></p>
      </div>
    </div>
  );
};
export default Business;
