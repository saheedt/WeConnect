import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
   * @description Renders Spinner component to the dom
   * @returns {object} JSX object
   * @param {object} props
   */
const Spinner = ({ spinnerColor }) => {
  const displayColor = spinnerColor || '#3498db';
  const displaySpinner = classnames({
    'show-spinner': 1,
    'spinner-overlay': 1
  });
  return (
    <div className={displaySpinner}>
      <div className="spinner-container">
        <div className="spinner" style={
          { borderTop: `16px solid ${displayColor}` }
        }></div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  spinnerColor: PropTypes.string,
};

export default Spinner;
