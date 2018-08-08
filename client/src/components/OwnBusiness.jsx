import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Helper from '../helper/Helper';

/**
   * @description Renders OwnBusiness component to the dom
   * @param {Object} props
   * @returns {object} JSX object
   */
export const OwnBusiness = (props) => {
  const { name, image_url, createdAt, businessId, deleteBusiness, editBusiness, all } = props; /* eslint-disable-line */
  const { defaultImageUrl } = Helper;
  const defaultImage = defaultImageUrl();
  const image = image_url ? image_url : defaultImage /* eslint-disable-line */
  return (
    <li className="collection-item flex justify-space-between align-center">
      <img src={image} alt="business_img" className="circle
      own-business-image" />
      <div><b><Link to={`/businesses/${businessId}`}>{name}</Link></b></div>
      <div>{createdAt.split('T')[0]}</div>
      <div>
        <button data-business-id={businessId}
          className="secondary-content profile-delete-modify"
          onClick={deleteBusiness}>
          <i className="material-icons">delete</i>
        </button>
        <button data-business-id={businessId} data-all={JSON.stringify(all)}
          className="secondary-content profile-delete-modify"
          onClick={editBusiness}>
          <i className="material-icons">edit</i>
        </button>
      </div>
    </li>
  );
};

OwnBusiness.propTypes = {
  name: PropTypes.string,
  image_url: PropTypes.string,
  createdAt: PropTypes.string,
  businessId: PropTypes.number,
  deleteBusiness: PropTypes.func,
  editBusiness: PropTypes.func
};

export default OwnBusiness;
