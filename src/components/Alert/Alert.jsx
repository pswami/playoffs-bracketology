import React from 'react';
import PropTypes from 'prop-types';

// import './style.scss';

const Alert = ({ variant, children }) => (
  <div className={`alert alert-${variant}`} role="alert">
    {children}
  </div>
);

Alert.defaultProps = {
  variant: 'primary',
};

Alert.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default Alert;
