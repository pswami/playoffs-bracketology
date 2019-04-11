/* global swal */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Query, graphql, compose } from "react-apollo";

import { iconNBALink, roundNames } from '../../utils';

import Card from '../../components/Card';
import Loading from '../../components/Loading';

import teams from '../../data/teams.json';
import { checkSeriesLocked } from '../../utils';
import { NBA_BRACKETS_QUERY, PICKS_QUERY, PICK_MUTATION } from '../../queries';

import './style.scss';

class TeamOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.pick ? props.pick.id : undefined,
      team: props.pick ? props.pick.team : undefined,
      wins: props.pick ? props.pick.wins : undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pick } = nextProps;

    if (pick) {
      this.setState({
        id: pick ? pick.id : undefined,
        team: pick ? pick.team : undefined,
        wins: pick ? pick.wins : undefined,
      });
    }
  }

  mapData = () => ({
    id: this.state.id,
    team: this.state.team,
    wins: parseInt(this.state.wins, 10),
    seriesId: parseInt(this.props.series.seriesId, 10),
    round: parseInt(this.props.series.roundNum, 10),
    type: 'round-by-round',
    sport: 'nba',
    year: 2019,
  })

  isFilled = () => !!(this.state.team && this.state.wins)

  handleTeamChange = (e) => {
    this.setState({ team: e.target.value });
  }

  handleWinChange = (e) => {
    this.setState({ wins: e.target.value });
  }

  render() {
    const { series } = this.props;
    const isSeriesLocked = checkSeriesLocked(series);
    const classNames = cx(
      'form-group',
      'form-row',
      'flex',
      'align-items-center',
      'justify-content-center',
      'py-2',
      { disabled: isSeriesLocked }
    );

    return (
      <div className={classNames}>
        <fieldset>
          <div className="form-check form-check-inline">
            <label className="form-check-label  team-option">
              <input
                type="radio"
                className="form-check-input"
                name={`series-${series.seriesId}`}
                value={teams[series.bottomRow.teamId].tricode}
                checked={this.state.team === teams[series.bottomRow.teamId].tricode}
                onChange={this.handleTeamChange}
                hidden
              />
              <img alt="icon" className="icon" src={iconNBALink(teams[series.bottomRow.teamId].tricode)} />
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label  team-option">
              <input
                type="radio"
                className="form-check-input"
                name={`series-${series.seriesId}`}
                value={teams[series.topRow.teamId].tricode}
                checked={this.state.team === teams[series.topRow.teamId].tricode}
                onChange={this.handleTeamChange}
                hidden
              />
              <img alt="icon" className="icon" src={iconNBALink(teams[series.topRow.teamId].tricode)} />
            </label>
          </div>
        </fieldset>
        <span> in <br /></span>
        {isSeriesLocked ?
          <div className="form-control gamesSelect"> {this.state.wins}</div> :
          <select
            className="form-control gamesSelect"
            onChange={this.handleWinChange}
            value={this.state.wins}
          >
            <option disabled selected>_</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
        }
      </div>
    );
  }
}

class MyPicks extends React.Component {
  constructor(props) {
    super(props);

    this.options = [];
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { setPick, currentUser } = this.props;

    const matchups = Object.keys(this.options).reduce((acc, seriesID) => {
      if (this.options[seriesID].isFilled()) {
        acc.push({ ...this.options[seriesID].mapData() });
      }

      return acc;
    }, [])

    setPick({
      variables: {
        data: matchups
      },
      refetchQueries: [{
        query: PICKS_QUERY,
        variables: {
          userIds: [currentUser.id],
          type: "round-by-round",
          sport: "nba",
          year: 2019,
        },
      }]
    })
    .then(() => {
      swal('Sucessfully Updated', '', 'success');
    })
    .catch(() => swal('Failed', 'Please try again', 'error'))
  }

  mappedByRound = () => {
    const { NBABracket } = this.props.bracketQuery;

    if (NBABracket) {
      return NBABracket.reduce((acc, series) => {
        if (!checkSeriesLocked(series)) {
          acc[series.roundNum].push(series);
        }
        return acc;
      }, { 1: [], 2: [], 3: [], 4: [] });
    }

    return { 1: [], 2: [], 3: [], 4: [] };
  }

  getPickBySeries = picks => {
    return picks.reduce((acc, pick) => {
      acc[pick.seriesId] = pick;

      return acc;
    }, {});
  }

  render() {
    const { currentUser } = this.props;
    const bracketMap = this.mappedByRound();

    return (
      <Card.Container>
        <Card.Header>
          <span>
            <i className="far fa-hand-pointer mr-3"></i>
            My Picks
          </span>
        </Card.Header>
        <Card.Body>
          <Query query={PICKS_QUERY} fetchPolicy="network-only" variables={{
            userIds: [currentUser.id],
            type: "round-by-round",
            sport: "nba",
            year: 2019,
          }}>
            {({ loading, error, data }) => {
              const { picks } = data;

                return (
                  <Loading isLoading={loading}>
                    {(
                      <React.Fragment>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                          <form onSubmit={this.handleSubmit}>
                            {Object.keys(bracketMap).map(roundNum => {
                              const seriesArr = bracketMap[roundNum];
                              const pickBySeries = picks ? this.getPickBySeries(picks) : {};

                              return (
                                <React.Fragment key={`round-${roundNum}`}>
                                  {seriesArr.length > 0 && <h2 className="roundHeader text-center">{roundNames[roundNum]}</h2>}
                                  {seriesArr.map(series => (
                                    series.isScheduleAvailable &&
                                      <TeamOption
                                        key={series.seriesId}
                                        ref={option => (this.options[series.seriesId] = option)}
                                        series={series}
                                        pick={pickBySeries[series.seriesId]}
                                      />
                                  ))}
                                </React.Fragment>
                              );
                            })}
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg btn-block mt-5"
                            >
                              Update
                            </button>
                          </form>
                      </React.Fragment>
                    )}
                  </Loading>
                );
            }}
          </Query>
        </Card.Body>
      </Card.Container>
    );
  }
}

MyPicks.propTypes = {
  children: PropTypes.node,
};

export default compose(
  graphql(NBA_BRACKETS_QUERY, { name: 'bracketQuery', options: { fetchPolicy: 'network-only' } }),
  graphql(PICK_MUTATION, { name: 'setPick' }),
)(MyPicks);