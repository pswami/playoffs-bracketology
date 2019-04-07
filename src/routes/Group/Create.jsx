/* global swal */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { CURRENT_USER_QUERY, CREATE_GROUP_MUTATION } from '../../queries';

import Card from '../../components/Card';

class Create extends React.Component {
  state = {
    groupName: undefined,
    type: 'round-by-round',
    gamePoints: 1,
    teamPoints: 1,
    private: false,
  };

  handleNameChange       = (e) => this.setState({ groupName: e.target.value })
  handleTypeChange       = (e) => this.setState({ type: e.target.value })
  handleGamePointsChange = (e) => this.setState({ gamePoints: e.target.value })
  handleTeamPointsChange  = (e) => this.setState({ teamPoints: e.target.value })
  handleAccessChange     = (e) => this.setState({ private: e.target.value })

  handleSubmit = (e) => {
    e.preventDefault();

    const { createGroup, currentUserQuery, history } = this.props;

    if (currentUserQuery.currentUser) {
      createGroup({
        variables: {
          data: {
            name: this.state.groupName,
            private: this.state.private,
            gamePoints: parseInt(this.state.gamePoints, 10),
            teamPoints: parseInt(this.state.teamPoints, 10),
            type: this.state.type,
            users: {
              connect: [{
                id: currentUserQuery.currentUser.id
              }]
            }
          }
        }
      }).then(({ data }) => {
        const { createGroup: group } = data;

        currentUserQuery.refetch();
        swal('Sucessfully Created Group', group.name, 'success');
        history.push(`/group/${group.id}`);
      })
    }
  }

  render() {
    return(
      <Card.Container>
        <Card.Header>
          <span className="h4">
            <i class="far fa-sticky-note mr-3" />
            Create Group
          </span>
        </Card.Header>
        <Card.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="group-name-input">Group Name</label>
              <input
                type="text"
                className="form-control"
                id="group-name-input"
                aria-describedby="group-name-help"
                placeholder="Enter Name"
                value={this.state.groupName}
                onChange={this.handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="group-type-input">Type</label>
              <select
                className="form-control"
                id="group-type-input"
                aria-describedby="group-type-help"
                value={this.state.type}
                onChange={this.handleTypeChange}
              >
                <option disabled value="round-by-round">Round by Round</option>
                <option disabled value="single-entry">Single Entry</option>
                <option disabled value="">...</option>
              </select>
              <small id="group-type-help" className="form-text text-muted">
                Only Round By Round exists at the moment
              </small>
            </div>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label htmlFor="validationDefault01">Points for correct team</label>
                <input
                  type="number"
                  className="form-control"
                  id="validationDefault01"
                  value={this.state.gamePoints}
                  onChange={this.handleGamePointsChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationDefault02">Points for # of wins</label>
                <input
                  type="number"
                  className="form-control"
                  id="validationDefault02"
                  value={this.state.teamPoints}
                  onChange={this.handleTeamPointsChange}
                  required
                />
              </div>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                aria-describedby="group-access-help"
                id="private-group-input"
                value={this.state.private}
                onChange={this.handleAccessChange}
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="private-group-input"
              >
                Private Group
              </label>
              <small
                id="group-access-help"
                className="form-text text-muted"
              >
                All groups are public currently
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </Card.Body>
      </Card.Container>
    );
  }
}

Create.propTypes = {
  children: PropTypes.node,
};

export default compose(
  graphql(CREATE_GROUP_MUTATION, { name: 'createGroup' }),
  graphql(CURRENT_USER_QUERY, { name: 'currentUserQuery' }),
)(withRouter(Create));;