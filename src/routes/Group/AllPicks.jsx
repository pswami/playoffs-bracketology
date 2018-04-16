  import React from 'react';
import PropTypes from 'prop-types';

import { readMatchups } from '../../firebase';

import Card from '../../components/Card';
import Table from '../../components/Table';
import { checkSeriesLocked } from '../../utils';

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
          <div className="table-responsive">
            <Table.Container className="picksTable" centered bordered fixed hoverable>
              <Table.Head>
                {Object.keys(users).length > 0 &&
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
                          {picks.map(pick => (
                            <Table.Col key={pick.id} style={{ background: teams_by_tri[pick.team].teamColor }}>{pick.team} in {pick.winIn}</Table.Col>
                          ))}
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