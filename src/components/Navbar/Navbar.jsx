import React from 'react';

import AccountModal from './AccountModal';

const i18n = {
  nba_playoffs_bracketology: 'NBA Playoffs Bracketology'
};

export default class Navbar extends React.Component {
  render() {
    return ([
      <AccountModal />,
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          {i18n.nba_playoffs_bracketology}
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
              </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <a class="btn btn-primary" href="#login-form" data-toggle="modal" data-target=".login-register-form">Login</a>
          </div>
        </div>
      </nav>
    ]);
  }
}