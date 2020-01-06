import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from './LoadingIcon';

export default function UsersList({ users, organization }) {
  return (
    <React.Fragment>
      {!!users.length && <h3>User list</h3>}
      {!!organization && !users.length && (
        <h3>The organization has no users</h3>
      )}
      <ul className="user-list">
        {users.map(({ id, login, activity }) => (
          <li className="user" key={id}>
            <span className="user-login">{login}</span>
            <div className="user-activity">
              {activity && <span>activity: {activity.type}</span>}
              {activity && <span>repository: {activity.repo}</span>}
              {activity && <span>date: {activity.date}</span>}
              {activity === null && <span>User has no public activity</span>}
              {!activity && activity !== null && <LoadingIcon />}
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  organization: PropTypes.string.isRequired
};
