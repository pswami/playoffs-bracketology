/* global swal */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql, compose, Query } from 'react-apollo';

import { CURRENT_USER_QUERY, PICKS_QUERY } from '../../queries';
import { roundNames } from '../../utils';

import teams_by_tri from '../../data/teams_by_tri.json';

import Card from '../../components/Card';

import './style.scss';

function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

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

const mapPicksByRound = (picks) => {
  if (picks) {
    return picks.reduce((acc, series) => {
      acc[series.round].push(series);

      return acc;
    }, { 1: [], 2: [], 3: [], 4: [] });
  }

  return { 1: [], 2: [], 3: [], 4: [] };
}

class Insights extends React.Component {
  getPercent = (picksTable) => {
    const keys = Object.keys(picksTable);

    return keys.map(key => {
      const seriesArr = picksTable[key];

      return seriesArr.reduce((acc, series) => {
        if (isObject(series)) {
          if (!acc[series.team]) {
            acc[series.team] = 0;
          }

          acc[series.team] += 1
          acc.total += 1
        }
        return acc;
      }, { total: 0 });
    });
  }

  render() {
    const { users } = this.props;

    return(
      <Card.Container>
        <Card.Header><span className="h4">Insights</span></Card.Header>
        <Card.Body>
          <Query query={PICKS_QUERY} fetchPolicy="network-only" variables={{
            userIds: users.map(user => user.id),
            type: "round-by-round",
            sport: "nba",
            year: 2019
          }}>
          {({ loading, error, data }) => {
            if (data.picks) {
              const pickRoundMap = mapPicksByRound(data.picks);

              return Object.keys(pickRoundMap).map(round => {
                const picks = pickRoundMap[round];
                const picksTable = getUsersPicks(picks, users);
                const seriesArr = this.getPercent(picksTable);

                return(
                  <div className="insights-container">
                    {picks.length > 0 &&
                      <h3 className="text-center roundTitle">{roundNames[round]}</h3>
                    }
                    {seriesArr.map(series => {
                      const namesArr = Object.keys(series);
                      return (
                        <div className="pick-meter-container">
                          <div className="d-flex justify-content-between">
                            {namesArr.map(name => (
                              name !== 'total' && <div className="ml-1">{name}</div>
                            ))}
                          </div>
                          <div className="progress" style={{ height: '25px' }}>
                            {namesArr.map(name => {
                              if (name === 'total') return;

                              const total = parseInt(series['total']);
                              const teamCount = parseInt(series[name]);
                              const percent = (teamCount/total) * 100;

                              return(
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${percent}%`, background: teams_by_tri[name].teamColor }}
                                  aria-valuenow={percent}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {`${Math.round(percent)}%`}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              });

              console.log(pickRoundMap);
            }
            return null;
          }}
          </Query>
        </Card.Body>
      </Card.Container>
    );
  }
}

Insights.propTypes = {
  children: PropTypes.node,
};

export default compose(
  graphql(CURRENT_USER_QUERY, { name: 'currentUserQuery' }),
)(withRouter(Insights));;