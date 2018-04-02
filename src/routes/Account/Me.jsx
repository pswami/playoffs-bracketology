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
          <Table.Header>Total Pts</Table.Header>
        </Table.Row>
      </Table.Head>
      <tbody>
        {groups.map(group =>
          <Table.Row onClick={handleSubmit(group.id)}>
            <Table.Header>{group.name}</Table.Header>
            <Table.Col>{group.points}</Table.Col>
          </Table.Row>
        )}
      </tbody>
    </Table.Container>
  );
};

const Me = ({ children, ...rest }) => {
  return (
    <div>
      <Card.Container>
        <Card.Header>
          My Brackets
        </Card.Header>
        <Card.Body>
          <GroupsTable
            groups={[{
              id: 123,
              name: 'Bracket 123',
              points: 10,
            }, {
              id: 123,
              name: 'Bracket 123',
              points: 10,
            }]}
            {...rest}
          />
        </Card.Body>
      </Card.Container>
    </div>
  );
}

Me.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Me);