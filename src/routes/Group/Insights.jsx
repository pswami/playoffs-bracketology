import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql, compose, Query } from 'react-apollo';

import { CURRENT_USER_QUERY, PICKS_QUERY } from '../../queries';
import { checkSeriesLocked, roundNames } from '../../utils';

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

class Insights extends React.Component {
  getPercent = (picksTable) => {
    const keys = Object.keys(picksTable);
    let percentMap = {};

    keys.forEach(key => {
      const seriesArr = picksTable[key];

      seriesArr.forEach(series => {
        if (isObject(series)) {
          if (!percentMap[series.seriesId]) {
            percentMap[series.seriesId] = {};
          }

          if (!percentMap[series.seriesId][series.team]) {
            percentMap[series.seriesId][series.team] = 0;
          }

          if (!percentMap[series.seriesId].total) {
            percentMap[series.seriesId].total = 0;
          }

          percentMap[series.seriesId][series.team] += 1
          percentMap[series.seriesId].total += 1
        }
      }, {});
    });

    return percentMap;
  }

  render() {
    const { users, bracketMap } = this.props;

    return(
      <Card.Container>
        <Card.Header>
          <span className="h4">
            <i className="fas fa-chart-bar mr-3" />
            Insights
          </span>
        </Card.Header>
        <Card.Body>
          <Query query={PICKS_QUERY} fetchPolicy="network-only" variables={{
            userIds: users.map(user => user.id),
            type: "round-by-round",
            sport: "nba",
            year: 2019
          }}>
          {({ loading, error, data }) => {
            if (data.picks) {

              return (
                <div className="insights-container">
                  {Object.keys(bracketMap).map(roundNum => {
                    const seriesArr = bracketMap[roundNum];
                    const picksTable = getUsersPicks(data.picks, users);
                    const percentTable = this.getPercent(picksTable);

                    return (
                      <React.Fragment key={`round-${roundNum}`}>
                        {seriesArr.length > 0 &&
                          <h3 className="text-center roundTitle">{roundNames[roundNum]}</h3>
                        }
                        <React.Fragment>
                          {seriesArr.map(series => {
                            const percentItem = percentTable[series.seriesId];

                            if (percentItem && checkSeriesLocked(series)) {
                              const namesArr = Object.keys(percentItem);

                              return (
                                <div className="pick-meter-container" key={`pick-${series.seriesId}`}>
                                  <div className="d-flex justify-content-between">
                                    {namesArr.map(name => (
                                      name !== 'total' && <div key={name} className="ml-1">{name}</div>
                                    ))}
                                  </div>
                                  <div className="progress" style={{ height: '25px' }}>
                                    {namesArr.map(name => {
                                      if (name === 'total') return null;

                                      const total = parseInt(percentItem['total'], 10);
                                      const teamCount = parseInt(percentItem[name], 10);
                                      const percent = (teamCount/total) * 100;

                                      return(
                                        <div
                                          key={`progress-${name}`}
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
                            }

                            return null;
                          })}
                        </React.Fragment>
                      </React.Fragment>
                    );
                  })}
                </div>
              );
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