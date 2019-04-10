import React from 'react';
import { Query } from "react-apollo";

import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { GroupsTable } from '../../components/Table';

import { GROUPS_QUERY } from '../../queries';

class Search extends React.Component {
  state = {
    query: '',
  };

  handleQueryChange = (e) => this.setState({ query: e.target.value })

  filterGroups = (groups) => (
    groups.filter(
      group =>
        group.name.toLowerCase().includes(this.state.query.toLowerCase()) &&
        !group.private
    )
  )

  render() {
    return (
      <Card.Container>
        <Card.Header>
          <span className="h4">
            <i className="fas fa-search mr-3" />
            Browse Groups
          </span>
          <div className="form-group m-0 float-right">
            <input
              onChange={this.handleQueryChange}
              className="form-control form-control-sm m-0 border-primary"
              placeholder="Search Groups"
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Query query={GROUPS_QUERY} fetchPolicy="network-only">
            {({ loading, error, data }) => {
              if (loading) {
                return(
                  <Loading isLoading={loading} />
                );
              }
              if (!error && !loading) {
                const filteredGroups = this.filterGroups(data.groups);

                return (
                  <GroupsTable
                    groups={filteredGroups}
                    showCount
                  />
                );
              }

              return null;
            }}
          </Query>
        </Card.Body>
      </Card.Container>
    );
  }
}

export default Search;
