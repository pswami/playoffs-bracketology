import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const Loading = ({ variant, children, isLoading, light }) => (
  isLoading ?
  <div className="loading-container min-300-height">
    <div className={cx('loading-inner-container', { light })}>
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
  light: false,
};

Loading.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  light: PropTypes.boolean,
};

export default Loading;
