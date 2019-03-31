import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import MyPicks from './MyPicks';
import AllPicks from './AllPicks';
import AddMemberModal from './AddMemberModal';

import Table from '../../components/Table';
import Card from '../../components/Card';

import { getWinner } from '../../utils';

// import { readMatchups, readGroup, getUserProfile } from '../../firebase';
import { CURRENT_USER_QUERY, GROUP_QUERY, PICKS_QUERY } from '../../queries';

class TeamRow extends React.Component {
  state = {
    round1: 0,
    round2: 0,
    round3: 0,
    round4: 0,
  };

  // componentDidMount() {
  //   const { group, uid, brackets } = this.props;
  //   const { teamPoints, gamePoints } = group;

  //   readMatchups({
  //     uid: uid,
  //     groupId: group.id,
  //   }).then((picks) => {
  //     if (picks) {
  //       const picksMap = picks.reduce((acc, pick) => {
  //         return { ...acc, ...{ [pick.seriesId]: pick } };
  //       }, {});

  //       const pointsMap = brackets.reduce((acc, series) => {
  //         let points = 0;
  //         let myPick = picksMap[series.seriesId];
  //         let winner = getWinner(series);

  //         if (myPick) {
  //           if (winner.team === myPick.team) {
  //             points += teamPoints;

  //             // console.log(winner.games, myPick.winIn);
  //             if (winner.games === myPick.winIn) {
  //               points += gamePoints;
  //             }
  //           }

  //           return { ...acc, [`round${series.roundNum}`]: acc[`round${series.roundNum}`] + points }
  //         }

  //         return acc;
  //       }, {
  //         round1: 0,
  //         round2: 0,
  //         round3: 0,
  //         round4: 0,
  //       });

  //       this.setState({ ...pointsMap });
  //     }
  //   })
  // }

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
        {group.users.map(user => (
          <TeamRow
            key={user.id}
            uid={user.id}
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
    const { groupId } = this.props.match.params;


    console.log(this.props)
    return (
      <Query query={GROUP_QUERY} variables={{ id: groupId }}>
        {({ loading, error, data }) => {

          if (!error && !loading) {
            console.log('data - group', data.group, data.group.users);
            const { group } = data;
            // const isUserInGroup = currentUser && !!users[currentUser.uid];

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
                    {Object.keys(group.users).length > 0 &&
                      <TeamTable
                        users={group.users}
                        group={group}
                        brackets={[]}
                      />
                    }
                  </Card.Body>
                </Card.Container>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    {<AllPicks {...{ ...this.props, group, users: group.users }} />}
                    <br />
                  </div>
                  {/* <div className="col-lg-6">
                    {isUserInGroup && <MyPicks  {...{ ...this.props, group }} />}
                  </div> */}
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

export default withRouter(Show);