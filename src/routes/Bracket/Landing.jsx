import React from 'react';
import PropTypes from 'prop-types';

const Landing = ({ children }) => (
  <div>{children}</div>
);

Landing.propTypes = {
  children: PropTypes.node,
};

export default Landing;