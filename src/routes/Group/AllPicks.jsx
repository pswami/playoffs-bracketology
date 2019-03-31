import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { graphql, compose } from 'react-apollo';

import Card from '../../components/Card';
import Table from '../../components/Table';
import { checkSeriesLocked, getWinner, roundNames } from '../../utils';

import teams_by_tri from '../../data/teams_by_tri.json';
import { NBA_BRACKETS_QUERY, PICKS_QUERY } from '../../queries';

import './style.scss';

class MyPicks extends React.Component {
  componentDidMount() {
    this.getUsersPicks();
  }

  getUsersPicks = () => {
    const { picksQuery } = this.props;
    const picksTable = {};

    //TODO: fix, shouldn't refetch
    picksQuery.refetch().then(({ data }) => {
      const { picks } = data;

      picks.forEach(pick => {
        if (pick) {
          // TODO: fix, missing picks will distort the order of picks
          // user_1 | user_2
          //  ClE   |
          //  LAL   |
          // LAL belongs to user_2 (user_1 didn't make pick)
          picksTable[pick.seriesId] = (picksTable[pick.seriesId] || []).concat(pick);
        }
      });

      this.setState({ ...picksTable })
    })
  }

  mappedByRound = () => {
    const { NBABracket } = this.props.data;

    if (NBABracket) {
      return NBABracket.reduce((acc, series) => {
        if (checkSeriesLocked(series)) {
          acc[series.roundNum].push(series);
        }
        // console.log(series, roundNames[series.roundNum]);
        return acc;
      }, { 1: [], 2: [], 3: [], 4: [] });
    }

    return { 1: [], 2: [], 3: [], 4: [] };
  }

  render() {
    const { users } = this.props;
    const seriesIds = Object.keys(this.state || {});
    const numUsers = Object.keys(users).length;
    const bracketMap = this.mappedByRound();

    return (
      <Card.Container>
        <Card.Header>Picks Table</Card.Header>
        <Card.Body>
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
              {seriesIds.length > 0 &&
                <tbody>
                  {Object.keys(bracketMap).map(roundNum => {
                    const seriesArr = bracketMap[roundNum];

                    return (
                      <React.Fragment key={`round-${roundNum}`}>
                        {seriesArr.length > 0 &&
                          <Table.Row>
                            <Table.Header colSpan={numUsers}>{roundNames[roundNum]}</Table.Header>
                          </Table.Row>
                        }
                        {seriesArr.map(series => {
                          const picks = this.state[series.seriesId];

                          if (checkSeriesLocked(series) && picks) {
                            return (
                              <Table.Row key={series.seriesId}>
                                {picks.map(pick => {
                                  const winner = getWinner(series);
                                  const isTeamCorrect = pick.team === winner.team;
                                  const areGamesCorrect = pick.wins === winner.games;

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
              }
            </Table.Container>
          </div>
        </Card.Body>
      </Card.Container>
    );
  }
}

MyPicks.propTypes = {
  children: PropTypes.node,
};

export default compose(
  graphql(NBA_BRACKETS_QUERY),
  graphql(PICKS_QUERY, { options: { variables: {
    userIds: ["cjsqfhjj9000507508nq6dgt4", "cjsqfk6qf00110750pzasxrk5"],
    groupId: "cjsqlg8fm00260750m91vebsi"
  } }, name: 'picksQuery' }),
)(MyPicks);