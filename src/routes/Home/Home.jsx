import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Jumbotron from '../../components/Jumbotron';

const Home = () => (
  <Jumbotron>
    <div className="display-4 mb-3">Create a Bracket</div>
    <div>
      <div className="lead">
        <div>Finally, a ...</div>
        <div>All the features ...</div>
        <div>Join the ...</div>
      </div>
      <div>
        <img alt="chip" style={{
          bottom: '65px',
          right: '85px',
          height: '100px',
        }} src="https://png2.kisspng.com/sh/1a4994bf4ddf0f5ffc0acc869b6fc738/L0KzQYm3VcA4N5D5iZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TfF4aaNpRdV1aYCwccP7TcVibmI2UasCZUm0QYe6TsAzQGM4Uak8MUW1RYi8UME3P2o6TKk3cH7q/kisspng-computer-icons-award-clip-art-5af11997e91163.0282397315257501679547.png"></img>
      </div>
    </div>
    {/* <Link className="btn btn-primary btn-lg" to="/me" role="button">My Stuff</Link> */}
  </Jumbotron>
);

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;