import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

/* Container */

export const Container = ({ children, light, hoverable, ...rest }) => (
  <table  {...rest} className={cx('table', {
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

export const Head = ({ children, light, ...rest }) => (
  <thead className={cx({ 'thead-light': light })}  {...rest}>
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

export const Row = ({ children, ...rest }) => (
  <tr {...rest}>{children}</tr>
);

/* Header */

export const Header = ({ children, ...rest }) => (
  <th {...rest}>{children}</th>
);

/* Col */

export const Col = ({ children, ...rest }) => (
  <td {...rest}>{children}</td>
);