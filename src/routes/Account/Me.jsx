import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { readGroups } from '../../firebase';

import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';


class Me extends React.Component {
  state = {
    groups: [],
  };

  componentDidMount() {
    const { appState: { currentUser } } = this.props;

    if (currentUser) {
      readGroups({ uid: currentUser.uid }).then(groups =>
        this.setState({ groups })
      )
    }
  }

  render() {
    const { groups } = this.state;
    const { children, ...rest } = this.props;

    return (
      <Card.Container>
        <Card.Header>My Groups</Card.Header>
        <Card.Body>
          <GroupsTable {...rest} groups={groups} />
        </Card.Body>
      </Card.Container>
    );
  }
}

Me.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Me);