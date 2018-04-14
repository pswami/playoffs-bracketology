import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children }) => (
  <div className="card">{children}</div>
);

export const Body = ({ children }) => (
  <div className="card-body">{children}</div>
);

export const Header = ({ children }) => (
  <div className="card-header bg-light">{children}</div>
);

Container.propTypes = { children: PropTypes.node };
Body.propTypes = { children: PropTypes.node };
Header.propTypes = { children: PropTypes.node };