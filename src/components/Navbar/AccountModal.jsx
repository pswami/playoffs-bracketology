import React from 'react';

const LoginTab = () => (
  <div id="login-form" class="tab-pane in active">
    <form action="/">
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" placeholder="Enter email" />
      </div>
      <div class="form-group">
        <label for="pwd">Password</label>
        <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd" />
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox" name="remember" /> Remember me</label>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
);

const SignupTab = () => (
  <div id="registration-form" class="tab-pane fade">
    <form action="/">
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your name" name="name" />
      </div>
      <div class="form-group">
        <label for="newemail">Email</label>
        <input type="email" class="form-control" id="newemail" placeholder="Enter new email" name="newemail" />
      </div>
      <div class="form-group">
        <label for="newpwd">Password</label>
        <input type="password" class="form-control" id="newpwd" placeholder="New password" name="newpwd" />
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
);

const AccountModal = () => (
  <div class="modal fade login-register-form" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#login-form">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#registration-form">Register</a>
            </li>
          </ul>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="tab-content">
            <LoginTab />
            <SignupTab />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AccountModal;
