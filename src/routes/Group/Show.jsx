import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MyPicks from './MyPicks';
import AddMemberModal from './AddMemberModal';

import Table from '../../components/Table';
import Card from '../../components/Card';

import { readGroups } from '../../firebase';

const TeamTable = ({ group }) => (
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
      {group.users.map(user => (
        <Table.Row key={user}>
          <Table.Header>1</Table.Header>
          <Table.Col>{user}</Table.Col>
          <Table.Col>0</Table.Col>
          <Table.Col>0</Table.Col>
          <Table.Col>0</Table.Col>
          <Table.Col>0</Table.Col>
          <Table.Col>0</Table.Col>
        </Table.Row>
      ))}
    </tbody>
  </Table.Container>
);

class Show extends React.Component {
  state = {
    group: undefined,
  };

  componentDidMount() {
    const { appState: { user }, match } = this.props;
    const { groupId } = match.params;

    if (user) {
      readGroups({ uid: user.uid }).then(groups => {
        const group = groups.find(group => (group.id === groupId));

        this.setState({ group });
      })
    }
  }

  render() {
    const { group } = this.state;

    return (
      <React.Fragment>
        <AddMemberModal />
        <Card.Container>
          <Card.Header>
            Bracket 123
            <button
              type="button"
              className="btn btn-primary float-right"
              data-toggle="modal"
              data-target="#addMemberModal"
            >
              <span>+ Add Member</span>
            </button>
          </Card.Header>
          <Card.Body>
            {group && <TeamTable group={group} />}
          </Card.Body>
        </Card.Container>
        <br />
        <Card.Container>
          <Card.Header>My Picks</Card.Header>
          <Card.Body>
            {<MyPicks />}
          </Card.Body>
        </Card.Container>
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Show);