import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Footer = ({ }) => (
  <footer className="page-footer font-small text-light navbar-blue mt-5">
    <div className="footer-copyright text-center py-1">
      © 2019 Bracketology
    </div>
  </footer>
);

Footer.defaultProps = {
  variant: 'primary',
};

Footer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default Footer;
