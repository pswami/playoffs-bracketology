import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import MyPicks from './MyPicks';
import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';
import { CURRENT_USER_QUERY } from '../../queries';


class Me extends React.Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data: { currentUser } }) => (
          <div className="row">
            <div className="col-lg-6">
              <Card.Container>
                <Card.Header>
                  <span className="h4">
                    <i className="fas fa-home mr-3" />
                    My Groups
                  </span>
                </Card.Header>
                <Card.Body>
                  <React.Fragment>
                    {currentUser ? <GroupsTable groups={currentUser.groups} /> : null}
                  </React.Fragment>
                </Card.Body>
              </Card.Container>
              <br />
            </div>
            <div className="col-lg-6">
              {currentUser ? <MyPicks  {...{ currentUser }} /> : null}
            </div>
          </div>
        )}
      </Query>
    );
  }
}

export default withRouter(Me);