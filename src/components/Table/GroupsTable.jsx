import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Card from '../../components/Card';
import Table from '../../components/Table';

const GroupsTable = ({ groups, history }) => {
  const handleSubmit = groupId => () => {
    history.push(`group/${groupId}`);
  };

  return (
    <Table.Container hoverable>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
        </Table.Row>
      </Table.Head>
      <tbody>
        {groups.map(group =>
          <Table.Row key={group.id} onClick={handleSubmit(group.id)}>
            <Table.Header>{group.name}</Table.Header>
          </Table.Row>
        )}
      </tbody>
    </Table.Container>
  );
};

GroupsTable.propTypes = {
  groups: PropTypes.object,
  history: PropTypes.object,
}

export default withRouter(GroupsTable);