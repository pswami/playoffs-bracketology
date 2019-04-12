import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import AccountModal from './AccountModal';

import { CURRENT_USER_QUERY } from '../../queries';
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
        const expanded = this.collapseButton.current.getAttribute('aria-expanded');
        if (expanded == 'true') {
          this.collapseButton.current.click();
        }
      }
    }
  }

  logout = (client) => () => {
    const { history } = this.props;

    client.resetStore();
    localStorage.removeItem('token');
    history.push('/');
  }

  // toggleModal = () => $('#addMemberModal').modal('toggle');

  render() {
    return (
      <React.Fragment>
        <AccountModal />
        <nav className="navbar navbar-expand-lg navbar-dark navbar-blue" ref={this.navbar}>
          <Link className="navbar-brand title-block" to="/">
            <span className="bracket-sign left">{'['}</span> {i18n.bracketology} <span className="bracket-sign right">{']'}</span>
          </Link>
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
            <Query query={CURRENT_USER_QUERY} skip={!localStorage.getItem('token')}>
              {({ loading, error, data, client }) => {
                let currentUser;

                try {
                  currentUser = data.currentUser;
                } catch(e) {
                  currentUser = undefined;
                }

                return (
                  <React.Fragment>
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/browse">Browse</Link>
                      </li>
                      <li className="nav-item">
                        {currentUser ?
                          <Link className="nav-link" to="/me">My Picks</Link> :
                          <a className="nav-link"  href="#login-form" data-toggle="modal" data-target="#login-register-modal">My Picks</a>
                        }
                      </li>
                      <li className="nav-item">
                        {currentUser ?
                          <Link className="nav-link" to="/group/create">Create Group</Link> :
                          <a className="nav-link"  href="#login-form" data-toggle="modal" data-target="#login-register-modal">Create Group</a>
                        }
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" onClick={() => alert('work in progress')}>Leaderboard</a>
                      </li>
                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                      {currentUser ?
                        <a className="btn btn-danger text-white" onClick={this.logout(client)}>Logout</a> :
                        <a className="btn btn-primary" href="#login-form" data-toggle="modal" data-target="#login-register-modal">Login/Register</a>
                      }
                    </div>
                  </React.Fragment>
                );
              }}
            </Query>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
