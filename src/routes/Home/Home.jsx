import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ children, appState }) => (
  <div>
    {console.log(appState)}
    <button className="btn btn-primary">Create Group</button>
  </div>
);

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;