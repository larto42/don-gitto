import React from 'react';
import PropTypes from 'prop-types';

export default function UsersList({ users }) {
  return (
    <React.Fragment>
      {!!users.length && <h3>User list</h3>}
      <ul className="user-list">
        {users.map(({ id, login, activity }) => (
          <li className="user" key={id}>
            <span className="user-login">{login}</span>
            <div className="user-activity">
              {activity && <span>activity: {activity.type}</span>}
              {activity && <span>repository: {activity.repo}</span>}
              {activity && <span>date: {activity.date}</span>}
              {!activity && <span>User has no public activity</span>}
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
