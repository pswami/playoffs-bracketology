/* global $ */

import React from 'react';
import { graphql, compose } from "react-apollo";

import { CURRENT_USER_QUERY, JOIN_GROUP_MUTATION, LEAVE_GROUP_MUTATION } from '../../queries';

class AddMemberModal extends React.Component {

  toggleModal = () => $('#addMemberModal').modal('toggle');

  handleSubmit = () => {
    const { currentUserQuery, joinGroup, leaveGroup, groupQuery, isUserInGroup } = this.props;
    const { currentUser } = currentUserQuery;
    const { data: groupOptions } = groupQuery;
    const toggleMethod = isUserInGroup ? leaveGroup : joinGroup;

    toggleMethod({
      variables: {
        groupId: groupOptions.group.id,
        userId: currentUser.id,
      }
    }).then(() => {
      this.toggleModal();

      groupQuery.refetch().then(() => {
        currentUserQuery.refetch();
      });
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <div
        className="modal fade"
        id="addMemberModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addMemberModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMemberModalLabel">Join Group</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure?
            </div>
            <div className="modal-footer">
              <button
                onClick={this.handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Yes
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
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
)(AddMemberModal);
