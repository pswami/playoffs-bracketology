/* global $ */

import React from 'react';
import { graphql, compose } from "react-apollo";

import { CURRENT_USER_QUERY, JOIN_GROUP_MUTATION, LEAVE_GROUP_MUTATION } from '../../queries';

class SettingsModal extends React.Component {

  toggleModal = () => $('#groupSettingsModal').modal('toggle');

  render() {
    const { group } = this.props;

    return (
      <div
        className="modal fade"
        id="groupSettingsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="groupSettingsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="groupSettingsModalLabel">
                Group Settings
              </h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="font-weight-bolder">Points for Correct Team</label>
                <div className="ml-1">
                  {group.teamPoints}
                </div>
              </div>
              <div className="form-group">
                <label className="font-weight-bolder">Points for Correct Games</label>
                <div className="ml-1">
                  {group.gamePoints}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


export default compose(
  graphql(JOIN_GROUP_MUTATION, { name: 'joinGroup' }),
  graphql(LEAVE_GROUP_MUTATION, { name: 'leaveGroup' }),
  graphql(CURRENT_USER_QUERY, { name: 'currentUserQuery' })
)(SettingsModal);
