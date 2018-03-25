import React from 'react';
import PropTypes from 'prop-types';

const Create = ({ children }) => (
  <div>{children}</div>
);

Create.propTypes = {
  children: PropTypes.node,
};

export default Create;