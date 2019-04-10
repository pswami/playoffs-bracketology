import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query, graphql, compose } from "react-apollo";

import AllPicks from './AllPicks';
import Insights from './Insights';
import AddMemberModal from './AddMemberModal';
import SettingsModal from './SettingsModal';

import Alert from '../../components/Alert';
import Table from '../../components/Table';
import Card from '../../components/Card';
import PageLoading from '../../components/Loading/PageLoading';

import { checkSeriesLocked, getWinner } from '../../utils';

import { NBA_BRACKETS_QUERY, CURRENT_USER_QUERY, GROUP_QUERY } from '../../queries';


const i18n = {
  private_group_message: <div>To share private group (Temporary Solution): Send <a href={window.location}>group URL</a> to friends and click "Join"</div>,
};

const getPointsPerUser = (user, group, brackets) => {
  const { picks } = user;
  const { teamPoints, gamePoints } = group;
  const initialState = {
    user,
    round1: 0,
    round2: 0,
    round3: 0,
    round4: 0,
    total: 0,
  };

  if (picks) {
    const picksMap = picks.reduce((acc, pick) => {
      return { ...acc, ...{ [pick.seriesId]: pick } };
    }, {});

    return brackets.reduce((acc, series) => {
      let points = 0;
      let myPick = picksMap[series.seriesId];
      let winner = getWinner(series);

      if (myPick) {
        if (winner.team === myPick.team) {
          points += teamPoints;

          if (parseInt(winner.games, 10) === parseInt(myPick.wins, 10)) {
            points += gamePoints;
          }
        }
        return {
          ...acc,
          user,
          [`round${series.roundNum}`]: acc[`round${series.roundNum}`] + points,
          total: acc.total + points,
        }
      }

      return acc;
    }, initialState);
  }

  return { ...initialState };
};

const TeamTable = ({ group, users, brackets }) => {
  const picksMap = users.map(user => getPointsPerUser(user, group, brackets));
  const picksMapSorted = picksMap.sort((a, b) => b.total - a.total);

  return (
    <div className="team-table table-responsive table-sticky-header">
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
          {picksMapSorted.map((row, idx) => (
            <Table.Row key={row.user.id}>
              <Table.Col>{idx + 1}</Table.Col>
              <Table.Col>{row.user.username}</Table.Col>
              <Table.Col>{row.round1}</Table.Col>
              <Table.Col>{row.round2}</Table.Col>
              <Table.Col>{row.round3}</Table.Col>
              <Table.Col>{row.round4}</Table.Col>
              <Table.Col>{row.total}</Table.Col>
            </Table.Row>
          ))}
        </tbody>
      </Table.Container>
    </div>
  );
};

class Show extends React.Component {
  mappedByRound = () => {
    const { NBABracket } = this.props.bracketQuery;

    if (NBABracket) {
      return NBABracket.reduce((acc, series) => {
        if (checkSeriesLocked(series)) {
          acc[series.roundNum].push(series);
        }
        return acc;
      }, { 1: [], 2: [], 3: [], 4: [] });
    }

    return { 1: [], 2: [], 3: [], 4: [] };
  }

  render() {
    const { currentUserQuery, bracketQuery, match } = this.props;
    const { groupId } = match.params;

    return (
      <Query query={GROUP_QUERY} variables={{ id: groupId }}>
        {(groupQuery) => {
          const { loading, error, data } = groupQuery;

          if (loading) {
            return (
              <PageLoading isLoading={loading} />
            );
          }
          if (!error && !loading && bracketQuery.NBABracket) {
            const bracketMap = this.mappedByRound();
            const { group } = data;
            const { users } = group;
            const isUserInGroup = currentUserQuery.currentUser && users.some(user => user.email === currentUserQuery.currentUser.email);

            return (
              <React.Fragment>
                {currentUserQuery.currentUser &&
                  <AddMemberModal isUserInGroup={isUserInGroup} groupQuery={groupQuery} />
                }
                <SettingsModal group={group} />
                {group.private &&
                  <Alert>
                    {i18n.private_group_message}
                  </Alert>
                }
                <Card.Container>
                  <Card.Header>
                    <span className="h4">
                      <i className="fas fa-users mr-3"></i>
                      {group.name}
                    </span>
                    <div className="float-right">
                      {currentUserQuery.currentUser &&
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-toggle="modal"
                          data-target="#addMemberModal"
                        >
                          {isUserInGroup ? <span>Leave</span> : <span>+ Join</span>}
                        </button>
                      }
                      <button
                        type="button"
                        className="btn btn-success btn-sm ml-2"
                        data-toggle="modal"
                        data-target="#groupSettingsModal"
                      >
                        <i className="fas fa-info-circle" />
                      </button>
                    </div>
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
                    <AllPicks {...{ group, users, bracketMap }} />
                    <br />
                  </div>
                  <div className="col-lg-6">
                    {<Insights  {...{ users, bracketMap }} />}
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
