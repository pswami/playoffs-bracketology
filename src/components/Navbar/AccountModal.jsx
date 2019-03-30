/* global $ */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { LOGIN_MUTATION, CURRENT_USER_QUERY, SIGNUP_MUTATION } from '../../queries';

class LoginTab extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { login, toggleModal, history } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    login({
      variables: { email, password },
    }).then(({ data }) => {
      console.log('logged in', data);
      console.log('token set', data.login.token);

      localStorage.setItem('token', data.login.token);
      this.props.data.refetch();
      toggleModal();
      history.push('/me');
    }).catch(error => {
      console.error(error.code, error.message);
    });
  };

  render() {
    return (
      <div id="login-form" className="tab-pane in active">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              ref={input => (this.email = input)}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              ref={input => (this.password = input)}
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="pwd"
            />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="remember" /> Remember me</label>
          </div>
          <div className="modal-footer">
            <button onSubmit={this.handleSubmit} type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

class SignupTab extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { signup, toggleModal, history } = this.props;
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;

    signup({
      variables: { email, password, username },
    }).then(({ data }) => {
      console.log('signed up', data);
      console.log('token set', data.signup.token);

      localStorage.setItem('token', data.signup.token);
      this.props.data.refetch();
      toggleModal();
      history.push('/me');
    }).catch(error => {
      console.error(error.code, error.message);
    });
  }

  render() {
    return (
      <div id="registration-form" className="tab-pane fade">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              ref={input => (this.username = input)}
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              ref={input => (this.email = input)}
              type="email"
              className="form-control"
              placeholder="Enter new email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              ref={input => (this.password = input)}
              type="password"
              className="form-control"
              placeholder="New password"
            />
          </div>
          <div className="modal-footer">
            <button onSubmit={this.handleSubmit} type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

const Login = compose(
  graphql(LOGIN_MUTATION, { name: 'login' }),
  graphql(CURRENT_USER_QUERY),
)(withRouter(LoginTab));

const Signup = compose(
  graphql(SIGNUP_MUTATION, { name: 'signup' }),
  graphql(CURRENT_USER_QUERY),
)(withRouter(SignupTab));

export default class AccountModal extends React.Component {
  toggleModal = () => {
    $('#login-register-modal').modal('hide')
  }

  render() {
    return (
      <div
        id="login-register-modal"
        className="modal fade"
        ref={modal => (this.modal = modal)}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#login-form">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#registration-form">Register</a>
                </li>
              </ul>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="tab-content">
                <Login toggleModal={this.toggleModal} />
                <Signup toggleModal={this.toggleModal}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
