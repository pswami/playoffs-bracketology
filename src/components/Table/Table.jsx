import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children }) => (
  <table className="table table-light">{children}</table>
);

export const Head = ({ children }) => (
  <thead className="thead-light">{children}</thead>
);

export const Row = ({ children }) => (
  <tr>{children}</tr>
);

export const Header = ({ children }) => (
  <th>{children}</th>
);

export const Col = ({ children }) => (
  <td>{children}</td>
);