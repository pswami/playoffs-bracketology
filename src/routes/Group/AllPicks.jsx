import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { readMatchups } from '../../firebase';

import Card from '../../components/Card';
import Table from '../../components/Table';
import { checkSeriesLocked, getWinner } from '../../utils';

import teams_by_tri from '../../data/teams_by_tri.json';

import './style.scss';

class MyPicks extends React.Component {
  componentDidMount() {
    this.getUsersPicks();
  }

  getUsersPicks = () => {
    const { group } = this.props;
    const picksTable = {};

    const promises = group.users.map(uid => {
      return readMatchups({ uid, groupId: group.id }).then(picks => {
        if (picks) {
          picks.forEach(pick => {
            if (pick) {
              picksTable[pick.seriesId] = (picksTable[pick.seriesId] || []).concat(pick);
            }
          })
        }
      })
    });

    Promise.all(promises).then(values => {
      this.setState({ ...picksTable })
    });
  }

  render() {
    const { group, users, appState: { brackets } } = this.props;
    const seriesIds = Object.keys(this.state || {});
    const numUsers = Object.keys(users).length;

    return (
      <Card.Container>
        <Card.Header>Picks Table</Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table.Container className="picksTable" centered bordered fixed hoverable>
              <Table.Head>
                {numUsers > 0 &&
                  <Table.Row >
                    {group.users.map(uid =>
                      <Table.Header key={uid}>{users[uid].name}</Table.Header>
                    )}
                  </Table.Row>
                }
              </Table.Head>
              {seriesIds.length > 0 &&
                <tbody>
                  {brackets.map(series => {
                    const picks = this.state[series.seriesId];

                    if (checkSeriesLocked(series) && picks) {
                      return (
                        <Table.Row key={series.seriesId}>
                          {picks.map(pick => {
                            const winner = getWinner(series);
                            const isTeamCorrect = (pick.team === winner.team);
                            const areGamesCorrect = (pick.winIn === winner.games);

                            console.log(pick.team, winner.team, isTeamCorrect);
                            return (
                              <Table.Col
                                key={pick.id}
                                class="pickColumn"
                                style={{ background: teams_by_tri[pick.team].teamColor }}
                              >
                                <span className={cx('team', { highlightBox: series.isSeriesCompleted && isTeamCorrect})}>{pick.team}</span>
                                <span> in </span>
                                <span className={cx('games', { highlightBox: series.isSeriesCompleted && areGamesCorrect })}>{pick.winIn}</span>
                              </Table.Col>
                            );
                          })}
                        </Table.Row>
                      );
                    }

                    return null;
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

export default MyPicks;