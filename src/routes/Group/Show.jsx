import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table';

const TeamTable = () => (
  <Table.Container>
    <Table.Head>
      <Table.Row>
        <Table.Header>#</Table.Header>
        <Table.Header>Name</Table.Header>
        <Table.Header>1st Pts</Table.Header>
        <Table.Header>Semi Pts</Table.Header>
        <Table.Header>Conference Pts</Table.Header>
        <Table.Header>Finals Pts</Table.Header>
        <Table.Header>Total Pts</Table.Header>
      </Table.Row>
    </Table.Head>
    <tbody>
      <Table.Row>
        <Table.Header>1</Table.Header>
        <Table.Col>Mark</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
      </Table.Row>
      <Table.Row>
        <Table.Header>2</Table.Header>
        <Table.Col>Jacob</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
      </Table.Row>
      <Table.Row>
        <Table.Header>3</Table.Header>
        <Table.Col>Larry</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
        <Table.Col>0</Table.Col>
      </Table.Row>
    </tbody>
  </Table.Container>
);

const Show = ({ children }) => (
  <TeamTable />
);

Show.propTypes = {
  children: PropTypes.node,
};

export default Show;