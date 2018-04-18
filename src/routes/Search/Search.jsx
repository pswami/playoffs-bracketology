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
    const { appState: { currentUser } } = this.props;

    if (currentUser) {
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
        <Card.Header>
          <span>My Groups</span>
          <form className="float-right">
            <div class="form-group m-0">
              <input
                type="email"
                class="form-control form-control-sm m-0"
                placeholder="Search Groups"
              />
            </div>
          </form>
        </Card.Header>
        <Card.Body>
          <GroupsTable {...rest} groups={groups} />
        </Card.Body>
      </Card.Container>
    );
  }
}

export default Search;
