import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

/* Container */

export const Container = ({
  children,
  light,
  hoverable,
  fixed,
  bordered,
  centered,
  className,
  ...rest
}) => (
  <table  {...rest} className={cx('table table-dark  table-striped', className, {
    'table-hover': hoverable,
    'table-fixed': fixed,
    'table-bordered': bordered,
    'table-centered': centered,
  })}>
    {children}
  </table>
);

Container.defaultProps = {
  className: undefined,
  hoverable: false,
  fixed: false,
  bordered: false,
  centered: false,
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
  fixed: PropTypes.bool,
  bordered: PropTypes.bool,
  centered: PropTypes.bool,
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