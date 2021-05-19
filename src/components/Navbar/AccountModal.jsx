/* global $ */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import GoogleLogin from 'react-google-login';

import Loading from '../Loading';
import Alert from '../Alert';

import { LOGIN_MUTATION, CURRENT_USER_QUERY, SIGNUP_MUTATION, GOOGLE_SSO_MUTATION } from '../../queries';

class LoginTab extends React.Component {
  state = {
    loading: false,
    errors: [],
  };

  setLoadingOff = (errors) => {
    setTimeout(() => (
      this.setState({ loading: false, errors })
    ), 500);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { login, toggleModal, history } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    this.setState({ loading: true }, () => {
      login({
        variables: { email, password },
      }).then(({ data }) => {
        // console.log('logged in', data);
        // console.log('token set', data.login.token);

        localStorage.setItem('token', data.login.token);
        this.props.data.refetch();
        this.setLoadingOff([]);

        toggleModal();
        history.push('/me');
      }).catch(error => {
        this.setLoadingOff(error.graphQLErrors);
      });
    })
  };

  handleGoogleSuccess = res => {
    console.log(res)
    const { googleSSO, toggleModal, history } = this.props;
    const email = res.profileObj.email;
    const password = res.profileObj.googleId;

    this.setState({ loading: true }, () => {
      googleSSO({
        variables: { email, password, info: res.profileObj },
      }).then(({ data }) => {
        console.log('logged in', data);
        // console.log('token set', data.login.token);

        localStorage.setItem('token', data.googleSSO.token);
        this.props.data.refetch();
        this.setLoadingOff([]);

        toggleModal();
        history.push('/me');
      }).catch(error => {
        this.setLoadingOff(error.graphQLErrors);
      });
    })
  };

  render() {
    const { loading, errors } = this.state;

    return (
      <div id="login-form" className="tab-pane in active">
        <Loading isLoading={loading} light>
          {errors.length > 0 &&
            <Alert>
              {errors.map(error => (
                <div key={error.message}>{error.message}</div>
              ))}
            </Alert>
          }
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                ref={input => (this.email = input)}
                type="email"
                className="form-control"
                placeholder="Enter email"
                required="required"
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
                required="required"
              />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" name="remember" /> Remember me</label>
            </div>
            <div className="modal-footer">
              <button onSubmit={this.handleSubmit} type="submit" className="btn btn-primary btn-block">Login</button>
            </div>
            <h4 class="text-divider"><span>OR</span></h4>
            <GoogleLogin
              clientId="125252181070-ed8bl8u571c4mtf4sqpcu08lp9e1kob5.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.handleGoogleSuccess}
              onFailure={(res) => console.log('res', res)}
              cookiePolicy={'single_host_origin'}
              className="google-btn"
            />
          </form>
        </Loading>
      </div>
    );
  }
}

class SignupTab extends React.Component {
  state = {
    loading: false,
    errors: [],
  };

  setLoadingOff = (errors) => {
    setTimeout(() => (
      this.setState({ loading: false, errors })
    ), 500);
  }

  handleSubmit = e => {
    e.preventDefault();

    const { signup, toggleModal, history } = this.props;
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;

    this.setState({ loading: true }, () => {
      signup({
        variables: { email, password, username },
      }).then(({ data }) => {
        // console.log('signed up', data);
        // console.log('token set', data.signup.token);

        localStorage.setItem('token', data.signup.token);
        this.props.data.refetch();
        this.setLoadingOff([]);

        toggleModal();
        history.push('/me');
      }).catch(error => {
        this.setLoadingOff(error.graphQLErrors);
      });
    });
  }

  render() {
    const { loading, errors } = this.state;

    return (
      <div id="registration-form" className="tab-pane fade">
        <Loading isLoading={loading} light>
          {errors.length > 0 &&
            <Alert>
              {errors.map(error => (
                <div key={error.message}>{error.message}</div>
              ))}
            </Alert>
          }
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
              <button onSubmit={this.handleSubmit} type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
          </form>
        </Loading>
      </div>
    );
  }
}

const Login = compose(
  graphql(LOGIN_MUTATION, { name: 'login' }),
  graphql(GOOGLE_SSO_MUTATION, { name: 'googleSSO' }),
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
