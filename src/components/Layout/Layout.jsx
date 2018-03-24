import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div class="container">{children}</div>
);

Container.PropTypes = {
  children: PropTypes.node,
};

export default { Container };