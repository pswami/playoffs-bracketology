  import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import { iconNBALink, roundNames } from '../../utils';
import { readMatchups } from '../../firebase';

import Card from '../../components/Card';
import Table from '../../components/Table';

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
        picks.forEach(pick => {
          if (pick) {
            picksTable[pick.seriesId] = (picksTable[pick.seriesId] || []).concat(pick);
          }
        })
      })
    });

    Promise.all(promises).then(values => {
      this.setState({ ...picksTable })
    });
  }

  render() {
    const { group, users, appState: { brackets } } = this.props;
    const seriesIds = Object.keys(this.state || {});

    return (
      <Card.Container>
        <Card.Header>Picks Table</Card.Header>
        <Card.Body>
          <div className="table-responsive-sm">
            <Table.Container hoverable>
              <Table.Head>
                {Object.keys(users).length > 0 &&
                  <Table.Row>
                    {group.users.map(uid =>
                      <Table.Header>{users[uid].name}</Table.Header>
                    )}
                  </Table.Row>
                }
              </Table.Head>
              {seriesIds.length > 0 &&
                <tbody>
                  {brackets.map(series => {
                    const picks = this.state[series.seriesId];

                    if (picks) {
                      return (
                        <Table.Row>
                          {picks.map(pick => (
                            pick.isSeriesCompleted &&
                              <Table.Header>{pick.team} in {pick.winIn}</Table.Header>
                          ))}
                        </Table.Row>
                      );
                    }
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