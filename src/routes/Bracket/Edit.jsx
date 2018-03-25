import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import data from '../../mock.json';

console.log(data);
const TeamOption = ({ series }) => (
  <div className={cx('form-row mx-auto w-50', { 'disabled': !series.isScheduleAvailable })}>
    <select id="team" className="form-control col-md-7">
      <option value={series.bottomRow.teamId}>{series.bottomRow.teamId}</option>
      <option value={series.topRow.teamId}>{series.topRow.teamId}</option>
    </select>
    <span> in </span>
    <select id="games" className="form-control col-md-4">
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
    </select>
  </div>
);

const Edit = ({ children }) => (
  <div>
    Series
    <form>
      {data.series.map(series => (
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