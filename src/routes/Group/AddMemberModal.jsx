import React from 'react';

import { auth } from '../../firebase';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class AddMemberModal extends React.Component {
  state = {
    email: '',
  };

  handleEmailChange = (e) => {
    const email = e.target.value;

    if (validateEmail(email)) {
      auth.fetchSignInMethodsForEmail(email).then((providers, d) => {
        console.log(providers, d )

        if (providers.length > 0) {

        }
      });
    }

    this.setState({ email });
  }

  render() {
    const isDisabled = this.state.email.length === 0;

    return (
      <div className="modal fade" id="addMemberModal" tabIndex="-1" role="dialog" aria-labelledby="addMemberModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMemberModalLabel">Add Member</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" onChange={this.handleEmailChange} placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">Email must already be signed up</small>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AddMemberModal;