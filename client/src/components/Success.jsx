import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
   * @description Renders Success component to the dom
   * @returns {object} JSX object
   * @param {object} props
   */
const Success = ({
  message
}) => {
  if (message === null ||
    message === undefined) {
    return null;
  }
  const containerStyles = classnames({ 'notify-container': 1 });
  const successStyles = classnames({ 'success-style': 1 });
  return (
    <div id="success-container" className={containerStyles}>
      <div className={successStyles}>{message}</div>
    </div>
  );
};
Success.propTypes = {
  message: PropTypes.string,
};
export default Success;
