import React from 'react';
import PropTypes from 'prop-types';

import { readGroups } from '../../firebase';

import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';


class Search extends React.Component {
  state = {
    groups: [],
  };

  componentDidMount() {
    const { appState: { user } } = this.props;

    if (user) {
      readGroups().then(groups =>
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

export default Search;
