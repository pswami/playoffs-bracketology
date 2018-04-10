import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { iconNBALink, roundNames } from '../../utils';
import { readMatchups, setMatchups } from '../../firebase';

import data from '../../data/mock.json';
import teams from '../../data/teams.json';

import './style.scss';

const isSeriesLocked = series => !series.isScheduleAvailable || (series.gameNumber > 0 && !series.isGameLive);

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

    return (
      <div className={cx('form-group form-row flex align-items-center', { 'disabled': isSeriesLocked(series) })}>
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
          className="form-control col-md-4"
          onChange={this.handleWinChange}
          value={this.state.winIn}
        >
          <option disabled selected>Select Games</option>
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
      picks: {}
    };

    this.options = [];
  }

  componentDidMount() {
    const { appState: { user }, group } = this.props;

    console.log(this.options);
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { appState, group } = this.props;

    const matchups = Object.keys(this.options).reduce((acc, seriesID) => {
      if (this.options[seriesID].isComplete()) {
        acc.push({ ...this.options[seriesID].mapData() });
      }

      return acc;
    }, [])

    console.log(appState)
    console.log(matchups)

    setMatchups({
      uid: appState.user.uid,
      groupId: group.id,
      matchups,
    }).then(res => console.log(res))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {data.series.map((singleSeries, idx) => {
            const conferenceChanged = idx === 0 || (data.series[idx - 1] && (singleSeries.roundNum !== data.series[idx - 1].roundNum));

            return (
              <React.Fragment key={singleSeries.seriesId}>
                {conferenceChanged && <h2>{roundNames[singleSeries.roundNum]}</h2>}
                <TeamOption
                  ref={option => (this.options[singleSeries.seriesId] = option)}
                  series={singleSeries}
                  pick={this.state.picks[singleSeries.seriesId]}
                />
              </React.Fragment>
            );
          })}
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

MyPicks.propTypes = {
  children: PropTypes.node,
};

export default MyPicks;