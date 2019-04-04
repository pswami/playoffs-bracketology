/* global $ */

import React from 'react';
import { graphql, compose } from "react-apollo";

import { CURRENT_USER_QUERY, JOIN_GROUP_MUTATION, GROUP_QUERY } from '../../queries';

class AddMemberModal extends React.Component {

  toggleModal = () => $('#addMemberModal').modal('toggle');

  handleSubmit = () => {
    const { currentUser, joinGroup, groupQuery } = this.props;
    const { data } = groupQuery;

    joinGroup({
      variables: {
        groupId: data.group.id,
        userId: currentUser.id,
      }
    }).then(() => {
      this.toggleModal();

      groupQuery.refetch();
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
  graphql(CURRENT_USER_QUERY)
)(AddMemberModal);
