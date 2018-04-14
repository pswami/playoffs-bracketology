import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

/* Container */

export const Container = ({ children, light, hoverable, fixed, bordered, className,...rest }) => (
  <table  {...rest} className={cx('table table-dark', className, {
    'table-hover': hoverable,
    'table-fixed': fixed,
    'table-bordered': bordered,
  })}>
    {children}
  </table>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
  fixed: PropTypes.bool,
  bordered: PropTypes.bool,
};

Container.defaultProps = {
  className: undefined,
  hoverable: false,
  fixed: false,
  bordered: false,
};

/* Head */

export const Head = ({ children, light, className, ...rest }) => (
  <thead className={cx('bg-secondary', className)}  {...rest}>
    {children}
  </thead>
);

Head.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
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