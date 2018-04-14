import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MyPicks from './MyPicks';
import AddMemberModal from './AddMemberModal';

import Table from '../../components/Table';
import Card from '../../components/Card';

import teams from '../../data/teams.json';

import { readMatchups, readGroups, getUserProfile } from '../../firebase';

const getWinner = (series) => {
  let winner = {};

  if (series.topRow.isSeriesWinner) {
    winner = series.topRow;
  }

  if (series.bottomRow.isSeriesWinner) {
    winner = series.bottomRow;
  }

  return {
    team: (teams[winner.teamId] || {}).tricode,
    games: winner.wins
  };
};

class TeamRow extends React.Component {
  state = {
    round1: 0,
    round2: 0,
    round3: 0,
    round4: 0,
  };

  componentDidMount() {
    const { group, uid, brackets } = this.props;
    const { teamPoints, gamePoints } = group.rules;

    readMatchups({
      uid: uid,
      groupId: group.id,
    }).then((picks) => {
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

              if (winner.games === myPick.winIn) {
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

        this.setState({ ...pointsMap });
      }
    })
  }

  render() {
    const { uid, users } = this.props;
    const { round1, round2, round3, round4 } = this.state;
    const totalPoints = round1 + round2 + round3 + round4;

    return(
      <Table.Row key={uid}>
        <Table.Header>1</Table.Header>
        <Table.Col>{users[uid] ? users[uid].name : uid}</Table.Col>
        <Table.Col>{this.state.round1}</Table.Col>
        <Table.Col>{this.state.round2}</Table.Col>
        <Table.Col>{this.state.round3}</Table.Col>
        <Table.Col>{this.state.round4}</Table.Col>
        <Table.Col>{totalPoints}</Table.Col>
      </Table.Row>
    );
  }
}


const TeamTable = ({ group, users, brackets }) => (
  <div className="table-responsive-sm">
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
        {group.users.map(uid => (
          <TeamRow
            key={uid}
            uid={uid}
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
  state = {
    group: undefined,
    users: {}
  };

  componentDidMount() {
    const { appState: { user }, match } = this.props;
    const { groupId } = match.params;

    if (user) {
      readGroups({ uid: user.uid }).then(groups => {
        const group = groups.find(group => (group.id === groupId));
        this.setState({ group });

        group.users.forEach((uid) => {
          getUserProfile(uid).then((user) => {
            this.setState((curState) => ({
              users: {...curState.users, [uid]: user }
            }));
          })
        });
      })
    }
  }

  render() {
    const { appState: { brackets } } = this.props;
    const { group, users } = this.state;

    if (brackets.length > 0 && group) {
      return (
        <React.Fragment>
          <AddMemberModal group={group} />
          <Card.Container>
            <Card.Header>
              {group.name}
              <button
                type="button"
                className="badge btn btn-primary btn-sm float-right"
                data-toggle="modal"
                data-target="#addMemberModal"
              >
                <span>+ Add</span>
              </button>
            </Card.Header>
            <Card.Body>
              {Object.keys(users).length > 0 &&
                <TeamTable
                  users={users}
                  group={group}
                  brackets={brackets}
                />
              }
            </Card.Body>
          </Card.Container>
          <br />
          {<MyPicks group={group} {...this.props} />}
        </React.Fragment>
      );
    }

    return null;
  }
}

Show.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Show);