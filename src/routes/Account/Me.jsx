import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';
import { CURRENT_USER_QUERY } from '../../queries';


class Me extends React.Component {
  render() {
    return (
      <Card.Container>
        <Card.Header>My Groups</Card.Header>
        <Card.Body>
          <Query query={CURRENT_USER_QUERY}>
            {({ loading, error, data: { currentUser } }) => (
              currentUser ? <GroupsTable groups={currentUser.groups} /> : null
            )}
          </Query>
        </Card.Body>
      </Card.Container>
    );
  }
}

export default withRouter(Me);