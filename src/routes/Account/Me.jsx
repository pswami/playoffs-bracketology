/* global $ */
import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import MyPicks from './MyPicks';
import Card from '../../components/Card';
import { GroupsTable } from '../../components/Table';
import { CURRENT_USER_QUERY } from '../../queries';

const MyProfile = ({ currentUser }) => (
  <Card.Container>
    <Card.Header>
      <span>
        <i className="fas fa-user mr-3" />
        Me
      </span>
    </Card.Header>
    <Card.Body>
      <React.Fragment>
        <div className="form-group">
          <label className="font-weight-bolder">Email</label>
          <div className="ml-1">
            {currentUser.email}
          </div>
        </div>
        <div className="form-group">
          <label className="font-weight-bolder">Username</label>
          <div className="ml-1">
            {currentUser.username}
          </div>
        </div>
      </React.Fragment>
    </Card.Body>
  </Card.Container>
);

class Me extends React.Component {
  toggleModal = () => {
    $('#login-register-modal').modal('toggle')
  }

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data }) => {
          if (!loading && !error) {
            const { currentUser } = data;

            return (
              <div className="row">
                <div className="col-lg-6">
                  {currentUser &&
                    <MyProfile currentUser={currentUser} />
                  }
                  <br />
                  <Card.Container>
                    <Card.Header>
                      <span>
                        <i className="fas fa-home mr-3" />
                        My Groups
                      </span>
                    </Card.Header>
                    <Card.Body>
                      <React.Fragment>
                        {currentUser ? <GroupsTable groups={currentUser.groups} singleTable /> : null}
                      </React.Fragment>
                    </Card.Body>
                  </Card.Container>
                  <br />
                </div>
                <div className="col-lg-6">
                  {currentUser ? <MyPicks  {...{ currentUser }} /> : null}
                </div>
              </div>
            );
          } else if (error) {
            const { history } = this.props;

            history.push('/');
            this.toggleModal();

            return null;
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}

export default withRouter(Me);