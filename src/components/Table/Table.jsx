import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/* Container */

export const Container = ({ children, light, hoverable }) => (
  <table className={cx('table', {
    'table-hover': hoverable
  })}>
    {children}
  </table>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  hoverable: PropTypes.bool,
};

Container.defaultProps = {
  light: true,
  hoverable: false,
};

/* Head */

export const Head = ({ children, light }) => (
  <thead className={cx({ 'thead-light': light })}>
    {children}
  </thead>
);

Head.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
};

Head.defaultProps = {
  light: true,
};


/* Row */

export const Row = ({ children }) => (
  <tr>{children}</tr>
);

/* Header */

export const Header = ({ children }) => (
  <th>{children}</th>
);

/* Col */

export const Col = ({ children }) => (
  <td>{children}</td>
);