import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import AccountModal from './AccountModal';

import { auth } from '../../firebase';
import './style.scss';

const i18n = {
  bracketology: 'Bracketology'
};


class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.navbar = React.createRef();
    this.collapseButton = React.createRef();
  }

  componentDidMount() {
    this.navbar.current.onclick = (e) => {
      if (e.target.tagName.toLowerCase() === 'a') {
        this.collapseButton.current.click();
      }
    }
  }

  logout = () => {
    const { actions, history } = this.props;

    auth.signOut().then(() => {
      actions.setUser(null);
      history.push('/');
    });
  }

  render() {
    const { appState } = this.props;

    return (
      <React.Fragment>
        <AccountModal />
        <nav className="navbar navbar-expand-lg navbar-dark navbar-blue" ref={this.navbar}>
          <a className="navbar-brand" href="#1">
            <span className="bracket-sign left">{'['}</span> {i18n.bracketology} <span className="bracket-sign right">{']'}</span>
          </a>
          <button
            ref={this.collapseButton}
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/me">Me</Link>
                </li>
            </ul>
            <div className="form-inline my-2 my-lg-0">
              {appState.user ?
                <a className="btn btn-danger text-white" onClick={this.logout}>Logout</a> :
                <a className="btn btn-primary" href="#login-form" data-toggle="modal" data-target="#login-register-modal">Login/Register</a>
              }
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
