import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

/* Container */

export const Container = ({ children, light, hoverable, fixed, className,...rest }) => (
  <table  {...rest} className={cx('table', className, {
    'table-hover': hoverable,
    'table-fixed': fixed,
  })}>
    {children}
  </table>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  hoverable: PropTypes.bool,
  fixed: PropTypes.bool,
};

Container.defaultProps = {
  className: undefined,
  light: true,
  hoverable: false,
  fixed: false,
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