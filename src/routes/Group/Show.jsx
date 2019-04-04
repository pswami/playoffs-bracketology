import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query, graphql, compose } from "react-apollo";

import MyPicks from './MyPicks';
import AllPicks from './AllPicks';
import AddMemberModal from './AddMemberModal';

import Table from '../../components/Table';
import Card from '../../components/Card';

import { getWinner } from '../../utils';

import { NBA_BRACKETS_QUERY, CURRENT_USER_QUERY, GROUP_QUERY, PICKS_QUERY } from '../../queries';

class TeamRow extends React.Component {
  render() {
    const { group, user, brackets } = this.props;
    const { teamPoints, gamePoints } = group;

    return(
      <Query query={PICKS_QUERY} variables={{
        userIds: [user.id],
        type: "round-by-round",
        sport: "nba",
        year: 2019,
      }}>
        {({ loading, error, data }) => {
          const { picks } = data;

          if (picks) {
            const picksMap = picks.reduce((acc, pick) => {
              return { ...acc, ...{ [pick.seriesId]: pick } };
            }, {});

            const pointsMap = brackets.reduce((acc, series) => {
              let points = 0;
              let myPick = picksMap[series.seriesId];
              let winner = getWinner(series);

              if (myPick) {
                if (winner.team === myPick.team) {
                  points += teamPoints;

                  if (winner.games == myPick.wins) {
                    points += gamePoints;
                  }
                }
                return { ...acc, [`round${series.roundNum}`]: acc[`round${series.roundNum}`] + points }
              }

              return acc;
            }, {
              round1: 0,
              round2: 0,
              round3: 0,
              round4: 0,
            });

            const totalPoints = pointsMap.round1 + pointsMap.round2 + pointsMap.round3 + pointsMap.round4;

            return (
              <Table.Row key={user.id}>
                <Table.Header>1</Table.Header>
                <Table.Col>{user.username}</Table.Col>
                <Table.Col>{pointsMap.round1}</Table.Col>
                <Table.Col>{pointsMap.round2}</Table.Col>
                <Table.Col>{pointsMap.round3}</Table.Col>
                <Table.Col>{pointsMap.round4}</Table.Col>
                <Table.Col>{totalPoints}</Table.Col>
              </Table.Row>
            );
          }

          return null;
        }}
      </Query>
    );
  }
}


const TeamTable = ({ group, users, brackets }) => (
  <div className="table-responsive">
    <Table.Container>
      <Table.Head>
        <Table.Row>
          <Table.Header>#</Table.Header>
          <Table.Header>Name</Table.Header>
          <Table.Header>1st</Table.Header>
          <Table.Header>Semi</Table.Header>
          <Table.Header>Conf.</Table.Header>
          <Table.Header>Finals</Table.Header>
          <Table.Header>Total</Table.Header>
        </Table.Row>
      </Table.Head>
      <tbody>
        {users.map(user => (
          <TeamRow
            key={user.id}
            user={user}
            group={group}
            users={users}
            brackets={brackets}
          />
        ))}
      </tbody>
    </Table.Container>
  </div>
);

class Show extends React.Component {

  render() {
    const { currentUserQuery, bracketQuery, match } = this.props;
    const { groupId } = match.params;

    return (
      <Query query={GROUP_QUERY} variables={{ id: groupId }}>
        {({ loading, error, data }) => {
          if (!error && !loading && currentUserQuery.currentUser && bracketQuery.NBABracket) {
            const { group } = data;
            const { users } = group;
            const isUserInGroup = currentUserQuery.currentUser && users.some(user => user.email == currentUserQuery.currentUser.email);

            return (
              <React.Fragment>
                <AddMemberModal group={group} />
                <Card.Container>
                  <Card.Header>
                    {group.name}
                    {/* {isUserInGroup &&
                      <button
                        type="button"
                        className="badge btn btn-primary btn-sm float-right"
                        data-toggle="modal"
                        data-target="#addMemberModal"
                      >
                        <span>+ Add</span>
                      </button>
                    } */}
                  </Card.Header>
                  <Card.Body>
                    {Object.keys(users).length > 0 &&
                      <TeamTable
                        users={users}
                        group={group}
                        brackets={bracketQuery.NBABracket}
                      />
                    }
                  </Card.Body>
                </Card.Container>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    {<AllPicks {...{ group, users }} />}
                    <br />
                  </div>
                  <div className="col-lg-6">
                    {isUserInGroup && <MyPicks  {...{ group, users, currentUser: currentUserQuery.currentUser }} />}
                  </div>
                </div>
              </React.Fragment>
            );
          }

          return null;
        }}
      </Query>
    );
  }
}

Show.propTypes = {
  children: PropTypes.node,
};

export default compose(
  graphql(CURRENT_USER_QUERY, { name: 'currentUserQuery' }),
  graphql(NBA_BRACKETS_QUERY, { name: 'bracketQuery' }),
)(withRouter(Show));
