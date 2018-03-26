/* global $ */

import React from 'react';

import { auth } from '../../firebase';

class LoginTab extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { toggleModal } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    console.log(e)

    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        toggleModal();
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode, errorMessage);
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
            <label for="pwd">Password</label>
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

    const { toggleModal } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    console.log('here');

    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('user created', res);
        toggleModal();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  render() {
    return (
      <div id="registration-form" className="tab-pane fade">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="newemail">Email</label>
            <input
              ref={input => (this.email = input)}
              type="email"
              className="form-control"
              id="newemail"
              placeholder="Enter new email"
            />
          </div>
          <div className="form-group">
            <label for="newpwd">Password</label>
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

export default class AccountModal extends React.Component {
  toggleModal = () => {
    debugger;
    this.modal.modal('toggle');
  }

  render() {
    return (
      <div
        id="login-register-form"
        className="modal fade"
        ref={modal => (this.modal = modal)}
        tabindex="-1"
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
                <LoginTab toggleModal={this.toggleModal} />
                <SignupTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
