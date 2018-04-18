/* global swal */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { iconNBALink, roundNames } from '../../utils';
import { readMatchups, setMatchups } from '../../firebase';

import Card from '../../components/Card';

import teams from '../../data/teams.json';
import { checkSeriesLocked } from '../../utils';

import './style.scss';

class TeamOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: undefined,
      winIn: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pick } = nextProps;

    if (pick) {
      this.setState({
        team: pick.team,
        winIn: pick.winIn,
      });
    }
  }

  mapData = () => ({
    team: this.state.team,
    winIn: this.state.winIn,
    seriesId: this.props.series.seriesId,
    roundNum: this.props.series.roundNum,
  })

  isFilled = () => !!(this.state.team && this.state.winIn)

  handleTeamChange = (e) => {
    this.setState({ team: e.target.value });
  }

  handleWinChange = (e) => {
    this.setState({ winIn: e.target.value });
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
          <div className="form-control gamesSelect"> {this.state.winIn}</div> :
          <select
            className="form-control gamesSelect"
            onChange={this.handleWinChange}
            value={this.state.winIn}
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

    this.state = {
      picks: {},
      message: undefined,
      error: undefined,
    };

    this.options = [];
  }

  componentDidMount() {
    const { appState: { currentUser }, group } = this.props;

    if (currentUser) {
      readMatchups({
        uid: currentUser.uid,
        groupId: group.id,
      }).then((myPicks) => {
        if (myPicks) {
          const picks = myPicks.reduce((acc, pick) => {
            acc[pick.seriesId] = pick;

            return acc;
          }, {});

          this.setState({ picks });
        }
      })
    }
  }

  setStateAndHide = (startState, endState, time) => {
    const callback = () => setTimeout(() => this.setState(endState), time);

    this.setState(
      startState,
      callback,
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { appState, group } = this.props;

    const matchups = Object.keys(this.options).reduce((acc, seriesID) => {
      if (this.options[seriesID].isFilled()) {
        acc.push({ ...this.options[seriesID].mapData() });
      }

      return acc;
    }, [])


    setMatchups({
      uid: appState.currentUser.uid,
      groupId: group.id,
      matchups,
    })
    .then(() => swal('Sucessfully Updated', '', 'success'))
    .catch(() => swal('Failed', 'Please try again', 'error'))
  }

  render() {
    const { appState: { brackets } } = this.props;
    const { message, error } = this.state;

    return (
      <Card.Container>
        <Card.Header>My Picks</Card.Header>
        <Card.Body>
          {message && <div className="alert alert-primary" role="alert">{message}</div>}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={this.handleSubmit}>
            {brackets.map((series, idx) => {
              const conferenceChanged = idx === 0 || (brackets[idx - 1] && (series.roundNum !== brackets[idx - 1].roundNum));

              if (series.isScheduleAvailable) {
                return (
                  <React.Fragment key={series.seriesId}>
                    {conferenceChanged && <h2 className="roundHeader text-center">{roundNames[series.roundNum]}</h2>}
                    <TeamOption
                      ref={option => (this.options[series.seriesId] = option)}
                      series={series}
                      pick={this.state.picks[series.seriesId]}
                    />
                  </React.Fragment>
                );
              }
              return null;
            })}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block mt-5"
            >
              Update
            </button>
          </form>
        </Card.Body>
      </Card.Container>
    );
  }
}

MyPicks.propTypes = {
  children: PropTypes.node,
};

export default MyPicks;