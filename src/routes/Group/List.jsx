import React from 'react';
import PropTypes from 'prop-types';

const TeamTable = () => (
  <table className="table table-light">
    <thead className="thead-light">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">1st Pts</th>
        <th scope="col">Semi Pts</th>
        <th scope="col">Conference Pts</th>
        <th scope="col">Finals Pts</th>
        <th scope="col">Total Pts</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
);

const List = ({ children }) => (
  <TeamTable />
);

List.propTypes = {
  children: PropTypes.node,
};

export default List;