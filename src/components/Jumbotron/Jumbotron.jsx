import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Jumbotron = ({ children }) => (
  <div className="jumbotron">{children}</div>
);

Jumbotron.propTypes = {
  children: PropTypes.node
};

export default Jumbotron;
