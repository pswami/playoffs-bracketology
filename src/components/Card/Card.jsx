import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children, className, variant }) => (
  <div className={`card text-white bg-${variant}`}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Container.defaultProps = {
  variant: 'dark',
};

// ==============================================================

export const Body = ({ children, className }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// ==============================================================

export const Header = ({ children, className }) => (
  <div className="card-header text-dark bg-light">{children}</div>
);

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};