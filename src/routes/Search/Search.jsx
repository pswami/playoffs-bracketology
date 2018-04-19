import React from 'react';
import PropTypes from 'prop-types';

import { readGroups } from '../../firebase';

import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';


class Search extends React.Component {
  state = {
    groups: [],
    searchedGroups: [],
    query: '',
  };

  componentDidMount() {
    readGroups({ public_access: true }).then(groups =>
      groups && this.setState({ groups })
    )
  }

  handleQueryChange = (e) => this.setState({ query: e.target.value })

  filterGroups = () => (
    this.state.groups.filter(
      group => group.name.toLowerCase().includes(this.state.query.toLowerCase())
    )
  );

  render() {
    const { groups } = this.state;
    const { children, ...rest } = this.props;
    const filteredGroups = this.filterGroups(groups);

    return (
      <Card.Container>
        <Card.Header>
          <span>Search Groups</span>
          <div className="form-group m-0 float-right">
            <input
              onChange={this.handleQueryChange}
              className="form-control form-control-sm m-0 border-primary"
              placeholder="Search Groups"
            />
          </div>
        </Card.Header>
        <Card.Body>
          <GroupsTable {...rest} groups={filteredGroups} />
        </Card.Body>
      </Card.Container>
    );
  }
}

export default Search;
