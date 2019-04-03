import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../components/Card';

class Create extends React.Component {
  state = {
    groupName: undefined,
    type: 'round-by-round',
    gamePoints: 1,
    winPoints: 1,
    private: false,
  };

  handleNameChange       = (e) => this.setState({ name: e.target.value })
  handleTypeChange       = (e) => this.setState({ type: e.target.value })
  handleGamePointsChange = (e) => this.setState({ gamePoints: e.target.value })
  handleWinPointsChange  = (e) => this.setState({ winPoints: e.target.value })
  handleAccessChange     = (e) => this.setState({ private: e.target.value })

  render() {
    return(
      <Card.Container>
        <Card.Header>Create Group</Card.Header>
        <Card.Body>
          <form>
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
                  value={this.state.winPoints}
                  onChange={this.handleWinPointsChange}
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Card.Body>
      </Card.Container>
    );
  }
}

Create.propTypes = {
  children: PropTypes.node,
};

export default Create;