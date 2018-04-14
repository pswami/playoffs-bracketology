import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Terminal = ({ children }) => (
  <div className="shell-wrap">
    <p className="shell-top-bar">DEV LOG</p>
    <ul className="shell-body">
      {children}
    </ul>
  </div>
);

Terminal.propTypes = {
  children: PropTypes.node,
};

export default Terminal;