import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import pencil from './pencil.svg';
import trophy from './trophy.svg';
import group from './group.svg';
import Card from '../../components/Card';
import Jumbotron from '../../components/Jumbotron';

import './style.scss';

const Home = () => (
  <div>
    <div className="row">
      <div className="col-lg-4">
        <Link to="/me" className="hover-grow no-underline">
          <Card.Container variant="primary">
            <Card.Body className="text-center">
              <React.Fragment>
                <img alt="pencil" className="welcome-image" src={pencil} />
                <div className="h1 mt-3">Make Picks</div>
              </React.Fragment>
            </Card.Body>
          </Card.Container>
        </Link>
      </div>
      <div className="col-lg-4">
        <Link to="/browse" className="hover-grow no-underline">
          <Card.Container variant="danger">
            <Card.Body className="text-center">
              <React.Fragment>
                <img alt="group" className="welcome-image" src={group} />
                <div className="h1 mt-3">Join Groups</div>
              </React.Fragment>
            </Card.Body>
          </Card.Container>
        </Link>
      </div>
      <div className="col-lg-4">
        <Card.Container variant="success">
          <Card.Body className="text-center">
            <React.Fragment>
              <img alt="trophy" className="welcome-image" src={trophy} />
              <div className="h1 mt-3">Win</div>
            </React.Fragment>
          </Card.Body>
        </Card.Container>
      </div>
      {/* <Link className="btn btn-primary btn-lg" to="/me" role="button">My Stuff</Link> */}
    </div>
  </div>
);

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;