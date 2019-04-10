import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const PageLoading = ({ variant, children, isLoading }) => (
  isLoading ?
  <div className="page-loading-container">
    <div className="loading-inner-container">
      <div className={`spinner-border text-${variant}`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    {children}
  </div> :
  children
);

PageLoading.defaultProps = {
  variant: 'primary',
};

PageLoading.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default PageLoading;
