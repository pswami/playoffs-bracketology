import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import data from '../../data/mock.json';
import teams from '../../data/teams.json';

// import './style.scss';

const iconLink = tricode => `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${tricode}.svg`

const TeamOption = ({ series }) => (
  <div className={cx('form-group form-row flex align-items-center', { 'disabled': !series.isScheduleAvailable })}>
    <fieldset>
      <div className="form-check form-check-inline">
        <label className="form-check-label  team-option">
          <input
            type="radio"
            className="form-check-input"
            name={`series-${series.seriesId}`}
            value={teams[series.bottomRow.teamId].tricode}
            hidden
          />
          <img alt="icon" className="icon" src={iconLink(teams[series.bottomRow.teamId].tricode)} />
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label  team-option">
          <input
            type="radio"
            className="form-check-input"
            name={`series-${series.seriesId}`}
            value={teams[series.topRow.teamId].tricode}
            hidden
          />
          <img alt="icon" className="icon" src={iconLink(teams[series.topRow.teamId].tricode)} />
        </label>
      </div>
    </fieldset>
    <span> in <br/></span>
    <select id="games" className="form-control col-md-4">
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
    </select>
  </div>
);

const Edit = ({ brackets, children }) => (
  <div>
    Series
    <form>
      {brackets.map(series => (
        <TeamOption series={series} />
      ))}
      <button type="submit">Update</button>
    </form>
  </div>
);

Edit.propTypes = {
  children: PropTypes.node,
};

export default Edit;