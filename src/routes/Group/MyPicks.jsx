import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { iconNBALink, roundNames } from '../../utils';
import { readMatchups, setMatchups } from '../../firebase';

import data from '../../data/mock.json';
import teams from '../../data/teams.json';

import './style.scss';

const isSeriesLocked = series => !series.isScheduleAvailable || (series.gameNumber > 1 && !series.isGameLive);

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

  isComplete = () => !!(this.state.team && this.state.winIn)

  handleTeamChange = (e) => {
    this.setState({ team: e.target.value });
  }

  handleWinChange = (e) => {
    this.setState({ winIn: e.target.value });
  }

  render() {
    const { series } = this.props;
    const classNames = cx(
      'form-group',
      'form-row',
      'flex',
      'align-items-center',
      'justify-content-center',
      'py-2',
      { 'disabled': isSeriesLocked(series) }
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
        <select
          className="form-control col-md-4 gamesSelect"
          onChange={this.handleWinChange}
          value={this.state.winIn}
        >
          <option disabled selected>_</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </select>
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
    const { appState: { user }, group } = this.props;

    if (user) {
      readMatchups({
        uid: user.uid,
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
      if (this.options[seriesID].isComplete()) {
        acc.push({ ...this.options[seriesID].mapData() });
      }

      return acc;
    }, [])


    setMatchups({
      uid: appState.user.uid,
      groupId: group.id,
      matchups,
    })
    .then(() => this.setStateAndHide({ message: 'Sucessfully Updated' }, { message: undefined }, 3000))
    .catch(() => this.setStateAndHide({ error: 'Failed, please try again' }, { error: undefined }, 3000))
    .then(() => window.scrollTo(0, 0))
  }

  render() {
    const { message, error } = this.state;

    return (
      <div>
        {message && <div className="alert alert-primary" role="alert">{message}</div>}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={this.handleSubmit}>
          {data.series.map((singleSeries, idx) => {
            const conferenceChanged = idx === 0 || (data.series[idx - 1] && (singleSeries.roundNum !== data.series[idx - 1].roundNum));

            if (singleSeries.isScheduleAvailable) {
              return (
                <React.Fragment key={singleSeries.seriesId}>
                  {conferenceChanged && <h2 className="roundHeader text-center">{roundNames[singleSeries.roundNum]}</h2>}
                  <TeamOption
                    ref={option => (this.options[singleSeries.seriesId] = option)}
                    series={singleSeries}
                    pick={this.state.picks[singleSeries.seriesId]}
                  />
                </React.Fragment>
              );
            }
          })}
          <button type="submit" className="btn btn-primary btn-lg btn-block">Update</button>
        </form>
      </div>
    );
  }
}

MyPicks.propTypes = {
  children: PropTypes.node,
};

export default MyPicks;