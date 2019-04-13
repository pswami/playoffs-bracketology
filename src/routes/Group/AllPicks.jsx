import React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippy.js/react';
import cx from 'classnames';
import { graphql, compose, Query } from 'react-apollo';

import Loading from '../../components/Loading';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { checkSeriesLocked, getWinner, roundNames } from '../../utils';

import teams_by_tri from '../../data/teams_by_tri.json';
import { NBA_BRACKETS_QUERY, PICKS_QUERY } from '../../queries';

import './style.scss';

const getUsersPicks = (picks, users) => {
  const picksTable = {};
  const userOrder = mapById(users);

  picks.forEach(pick => {
    if (pick) {
      if (!picksTable[pick.seriesId]) {
        picksTable[pick.seriesId] = Array(users.length).fill(0);
      }
      picksTable[pick.seriesId][userOrder[pick.user.id]] = pick;
    }
  });

  return picksTable;
};

const mapById = (items) => (
  items.reduce((acc, item, idx) => {
    acc[item.id] = idx;

    return acc;
  }, {})
);

class AllPicks extends React.Component {
  renderPicks(picks, numUsers) {
    const { users, bracketMap } = this.props;
    const picksTable = getUsersPicks(picks, users);
    const seriesIds = Object.keys(picksTable || {});

    return (
      seriesIds.length > 0 &&
        <tbody>
          {Object.keys(bracketMap).map(roundNum => {
            const seriesArr = bracketMap[roundNum];

            return (
              <React.Fragment key={`round-${roundNum}`}>
                {seriesArr.length > 0 &&
                  <Table.Row>
                    <Table.Header style={{ height: '42px' }} colSpan={numUsers}>
                      <div className="roundName">
                        {roundNames[roundNum]}
                      </div>
                    </Table.Header>
                  </Table.Row>
                }
                {seriesArr.map(series => {
                  const picks = picksTable[series.seriesId];

                  if (checkSeriesLocked(series) && picks) {
                    return (
                      <Table.Row key={series.seriesId}>
                        {picks.map((pick, idx) => {
                          if (pick) {
                            const winner = getWinner(series);
                            const isTeamCorrect = pick.team === winner.team;
                            const areGamesCorrect = parseInt(pick.wins, 10) === parseInt(winner.games, 10);

                            return (
                              <Table.Col
                                key={pick.id}
                                className="pickColumn"
                                style={{ background: teams_by_tri[pick.team].teamColor }}
                              >
                                <span className={cx('team', { highlightBox: series.isSeriesCompleted && isTeamCorrect })}>{pick.team}</span>
                                <span> in </span>
                                <span className={cx('games', { highlightBox: series.isSeriesCompleted && isTeamCorrect && areGamesCorrect })}>{pick.wins}</span>
                              </Table.Col>
                            );
                          } else {
                            return (
                              <Table.Col
                                key={`pick-${idx}`}
                                className="pickColumn"
                              >
                                -
                              </Table.Col>
                            );
                          }
                        })}
                      </Table.Row>
                    );
                  }

                  return null;
                })}
              </React.Fragment>
            );
          })}
        </tbody>
    );
  }

  render() {
    const { users } = this.props;
    const numUsers = Object.keys(users).length;

    return (
      <Card.Container>
        <Card.Header>
          <span>
            <i className="far fa-hand-pointer mr-3"></i>
            Picks
          </span>
          <div className="float-right">
            <Tippy content="Picks will be visible once series have started">
              <i className="fas fa-info-circle" />
            </Tippy>
          </div>
        </Card.Header>
        <Card.Body>
          <Query query={PICKS_QUERY} fetchPolicy="network-only" variables={{
            userIds: users.map(user => user.id),
            type: "round-by-round",
            sport: "nba",
            year: 2019
          }}>
            {({ loading, error, data }) => {
              if (loading) {
                return(
                  <Loading isLoading={loading} />
                );
              }

              return (
                <div className="table-responsive">
                  <Table.Container className="picksTable" centered bordered fixed hoverable>
                    <Table.Head>
                      {numUsers > 0 &&
                        <Table.Row>
                          {users.map(user =>
                            <Table.Header key={user.id}>{user.username}</Table.Header>
                          )}
                        </Table.Row>
                      }
                    </Table.Head>
                    {data.picks && this.renderPicks(data.picks, numUsers)}
                  </Table.Container>
                </div>
              );
            }}
          </Query>
        </Card.Body>
      </Card.Container>
    );
  }
}

AllPicks.propTypes = {
  children: PropTypes.node,
};

export default compose(
  graphql(NBA_BRACKETS_QUERY),
)(AllPicks);