import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../components/Card';
import Table from '../../components/Table';

const TeamTable = () => (
  <Table.Container hoverable>
    <Table.Head>
      <Table.Row>
        <Table.Header>Name</Table.Header>
        <Table.Header>Total Pts</Table.Header>
      </Table.Row>
    </Table.Head>
    <tbody>
      <Table.Row>
        <Table.Header>Bracket A</Table.Header>
        <Table.Col>0</Table.Col>
      </Table.Row>
      <Table.Row>
        <Table.Header>Bracket B</Table.Header>
        <Table.Col>0</Table.Col>
      </Table.Row>
      <Table.Row>
        <Table.Header>Bracket C</Table.Header>
        <Table.Col>0</Table.Col>
      </Table.Row>
    </tbody>
  </Table.Container>
);

const Me = ({ children }) => (
  <div>
    <Card.Container>
      <Card.Header>
        My Brackets
      </Card.Header>
      <Card.Body>
        <TeamTable />
      </Card.Body>
    </Card.Container>
  </div>
);

Me.propTypes = {
  children: PropTypes.node,
};

export default Me;