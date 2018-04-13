import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ children, appState }) => (
  <div className="jumbotron">
    <h1 className="display-4">Welcome!</h1>
    <p className="lead">App is currently in beta...</p>
    <hr className="my-4" />
    <p className="lead">
      <a className="btn btn-primary btn-lg" href="" role="button">Learn more</a>
    </p>
  </div>
);

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;