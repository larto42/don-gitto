import React from 'react';
import PropTypes from 'prop-types';

export default function UsersList({ users }) {
  return (
    <ul>
      {users.map(({ id, login }) => (
        <li key={id}>{login}</li>
      ))}
    </ul>
  );
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
