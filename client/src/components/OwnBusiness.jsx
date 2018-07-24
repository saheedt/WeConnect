import React from 'react';

import Helper from '../helper/Helper';

const OwnBusiness = (props) => {
  const { name, image_url, createdAt } = props; /* eslint-disable-line */
  const { defaultImageUrl } = Helper;
  const defaultImage = defaultImageUrl();
  const image = image_url ? image_url : defaultImage /* eslint-disable-line */
  return (
    <li className="collection-item flex justify-space-between align-center">
      <img src={image} alt="business_img" className="circle
      own-business-image" />
      <div><b>{name}</b></div>
      <div>{createdAt.split('T')[0]}</div>
      <div>
        <a href="#!" className="secondary-content">
          <i className="material-icons">delete</i>
        </a>
      </div>
    </li>
  );
};

export default OwnBusiness;
