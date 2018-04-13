import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { readGroups } from '../../firebase';

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
          <Table.Row onClick={handleSubmit(group.id)}>
            <Table.Header>{group.name}</Table.Header>
          </Table.Row>
        )}
      </tbody>
    </Table.Container>
  );
};

class Me extends React.Component {
  state = {
    groups: [],
  };

  componentDidMount() {
    const { appState: { user } } = this.props;

    if (user) {
      readGroups({ uid: user.uid }).then(groups =>
        this.setState({ groups })
      )
    }
  }

  render() {
    const { groups } = this.state;
    const { children, ...rest } = this.props;

    return (
      <div>
        <Card.Container>
          <Card.Header>My Groups</Card.Header>
          <Card.Body>
            <GroupsTable {...rest} groups={groups} />
          </Card.Body>
        </Card.Container>
      </div>
    );
  }
}

Me.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Me);