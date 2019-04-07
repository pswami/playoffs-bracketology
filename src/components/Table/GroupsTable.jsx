import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Table from '../../components/Table';

const GroupsTable = ({ showCount, groups, history }) => {
  const handleSubmit = groupId => () => {
    history.push(`/group/${groupId}`);
  };

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
};

GroupsTable.propTypes = {
  showCount: PropTypes.bool,
  groups: PropTypes.array,
  history: PropTypes.object,
}

export default withRouter(GroupsTable);