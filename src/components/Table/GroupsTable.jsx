/* global swal */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import Table from '../../components/Table';
import { CURRENT_USER_QUERY } from '../../queries';
import { checkUserInGroup } from '../../utils';

const GroupsTable = ({ showCount, groups, history, singleTable }) => {
  const handleSubmit = groupId => () => {
    history.push(`/group/${groupId}`);
  };

  const handleRequest = groupId => () => {
    swal(
      'Request Access?',
      'Work in Progress',
    );
  };

  if (singleTable) {
    return (
      <Table.Container hoverable>
          <Table.Head>
            <Table.Row>
              <Table.Header>Name</Table.Header>
              {showCount &&
                <Table.Header className="text-center" style={{ width: '102px' }}>Members</Table.Header>
              }
            </Table.Row>
          </Table.Head>
          <tbody>
            {groups.map(group =>
              <Table.Row key={group.id} onClick={handleSubmit(group.id)}>
                <Table.Col>{group.name}</Table.Col>
                {showCount &&
                  <Table.Col className="text-center">{group.users.length}</Table.Col>
                }
              </Table.Row>
            )}
          </tbody>
        </Table.Container>
    );
  }

  return (
    <React.Fragment>
      <h5>Public Groups</h5>
      <Table.Container hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            {showCount &&
              <Table.Header className="text-center" style={{ width: '102px' }}>Members</Table.Header>
            }
          </Table.Row>
        </Table.Head>
        <tbody>
          {groups.map(group =>
            !group.private &&
              <Table.Row key={group.id} onClick={handleSubmit(group.id)}>
                <Table.Col>{group.name}</Table.Col>
                {showCount &&
                  <Table.Col className="text-center">{group.users.length}</Table.Col>
                }
              </Table.Row>
          )}
        </tbody>
      </Table.Container>
      <h5 className="mt-4">Private Groups</h5>
      <Table.Container hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            {showCount &&
              <Table.Header className="text-center" style={{ width: '102px' }}>Members</Table.Header>
            }
          </Table.Row>
        </Table.Head>
        <tbody>
        <Query query={CURRENT_USER_QUERY}>
          {({ loading, error, data }) => {
            let currentUser;

            try {
              currentUser = data.currentUser;
            } catch(e) {
              currentUser = undefined;
            }

            return (
              groups.map(group =>
                group.private &&
                  <Table.Row key={group.id} onClick={checkUserInGroup(currentUser, group.users) ? handleSubmit(group.id) : handleRequest(group.id)}>
                    <Table.Col>{group.name}</Table.Col>
                    {showCount &&
                      <Table.Col className="text-center">{group.users.length}</Table.Col>
                    }
                  </Table.Row>
              )
            );
          }}
        </Query>
        </tbody>
      </Table.Container>
    </React.Fragment>
  );
};

GroupsTable.propTypes = {
  showCount: PropTypes.bool,
  groups: PropTypes.array,
  history: PropTypes.object,
}

export default withRouter(GroupsTable);