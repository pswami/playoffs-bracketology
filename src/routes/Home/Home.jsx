import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="jumbotron">
    <h1 className="display-4">Welcome!</h1>
    <p className="lead">App is currently in beta...</p>
    <hr className="my-4" />
    <p className="lead">
      <Link className="btn btn-primary btn-lg" to="/me" role="button">My Stuff</Link>
    </p>
  </div>
);

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;