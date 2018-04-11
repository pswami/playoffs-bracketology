/* global $ */

import React from 'react';
import Select from 'react-select';

import { findUsers, addUsersToGroup } from '../../firebase';

class AddMemberModal extends React.Component {
  state = {
    users: [],
    selectedUsers: [],
  };

  handleChange = user => {
    this.setState(curState =>({
      selectedUsers: [...curState.users, ...user]
    }))
  };

  getUsers (input, callback) {
    findUsers(input).then(users => {
      if (users) {
        var data = {
          options: users,
          complete: users.length <= 10,
        };
        callback(null, data);
      }
    });
  }

  handleSubmit = () => {
    const { group } = this.props;

    addUsersToGroup({
      groupId: group.id,
      users: this.state.selectedUsers.map(user => (user.uid)),
    }).then(success => {
      if (success) {
        $('#addMemberModal').modal('toggle')
      }
    })
  }

  render() {
    const isDisabled = this.state.selectedUsers.length === 0;

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
                <label>Username</label>
                <Select.Async
                  multi={true}
                  value={this.state.selectedUsers}
                  onChange={this.handleChange}
                  onValueClick={this.gotoContributor}
                  valueKey="uid"
                  labelKey="name"
                  loadOptions={this.getUsers}
                />
                <input type="text" className="form-control" onChange={this.handleQueryChange} placeholder="Enter Username" />
                <small id="emailHelp" className="form-text text-muted">User must already be signed up</small>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AddMemberModal;