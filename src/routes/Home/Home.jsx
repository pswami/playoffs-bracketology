import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import pencil from './pencil.svg';
import trophy from './trophy.svg';
import group from './group.svg';
// import bracket from './bracket.svg';
import Card from '../../components/Card';

import './style.scss';

const i18n = {
  bracketology: 'Bracketology'
};

const Home = () => (
  <div>
    <div class="row justify-content-between mb-4">
      <div className="col-lg">
        <Card.Container className="news-card-body">
          <Card.Body className="text-center">
            <React.Fragment>
              <p className="title-block welcome-title-block"><span className="bracket-sign left">{'['}</span> {i18n.bracketology} <span className="bracket-sign right">{']'}</span></p>
              <p className="mt-4 h3">Create brackets on a round-by-round basis</p>
            </React.Fragment>
          </Card.Body>
        </Card.Container>
        <br />
      </div>
      {/* <div className="col-lg-6 d-sm-none d-md-none d-lg-block">
        <Card.Container className="news-card-body">
          <Card.Header>News</Card.Header>
          <Card.Body>
            <ul>
              <li className="h5">
                Google SSO now available
              </li>
            </ul>
          </Card.Body>
        </Card.Container>
      </div> */}
    </div>
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