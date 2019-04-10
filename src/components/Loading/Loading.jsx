import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Loading = ({ variant, children, isLoading }) => (
  isLoading ?
  <div className="loading-container">
    <div className="loading-inner-container">
      <div className={`spinner-border text-${variant}`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    {children}
  </div> :
  children
);

Loading.defaultProps = {
  variant: 'primary',
};

Loading.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default Loading;
