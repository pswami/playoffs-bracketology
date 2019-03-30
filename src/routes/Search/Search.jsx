import React from 'react';
import { Query } from "react-apollo";

import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';

import { GROUPS_QUERY } from '../../queries';

class Search extends React.Component {
  state = {
    query: '',
  };

  handleQueryChange = (e) => this.setState({ query: e.target.value })

  filterGroups = (groups) => (
    groups.filter(
      group => group.name.toLowerCase().includes(this.state.query.toLowerCase())
    )
  )

  render() {
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
        <Query query={GROUPS_QUERY}>
          {({ loading, error, data }) => {
            console.log('data - groups', loading)

            if (!error && !loading) {
              const filteredGroups = this.filterGroups(data.groups);

              return (
                <Card.Body>
                  <GroupsTable groups={filteredGroups} />
                </Card.Body>
              );
            }

            return null;
          }}
        </Query>
      </Card.Container>
    );
  }
}

export default Search;
