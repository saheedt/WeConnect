import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Error = ({ error }) => {
  if (error === null ||
      error === undefined) {
    return null;
  }
  const containerStyles = classnames({
    'notify-container': 1,
    'error-support': 1
  });
  const errorStyles = classnames({ 'error-style': 1 });
  return (
    <div id="error-container" className={containerStyles}>
      <div className={errorStyles}>{error}</div>
    </div>
  );
};
Error.propTypes = {
  error: PropTypes.string,
};
export default Error;
