import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  findOrganization,
  getOrganizationUsers,
  getUserLastActivity
} from '../utils/GithubApiUtils';
import ErrorAlert from './ErrorAlert';

export default function Search(props) {
  const [searchVal, setSearchVal] = useState('');
  const [error, setError] = useState(false);

  const { setUsers, setOrganizationName } = props;

  const handleInput = e => {
    setSearchVal(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    searchOrganization(searchVal);
  };

  const searchOrganization = async input => {
    try {
      const orgName = await findOrganization(input);
      const orgUsers = await getOrganizationUsers(orgName);

      setUsers(orgUsers);

      orgUsers.forEach(async (user, index) => {
        const activity = await getUserLastActivity(user.login);
        setUsers(prevState => {
          const newState = [...prevState];
          newState[index] = { ...newState[index], activity };
          return newState;
        });
      });

      setOrganizationName(orgName);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Find GitHub organization"
          value={searchVal}
          onChange={handleInput}
        />
        <button type="submit">Find</button>
      </form>
      {error && <ErrorAlert>An error occurred. Try again.</ErrorAlert>}
    </React.Fragment>
  );
}

Search.propTypes = {
  setUsers: PropTypes.func.isRequired,
  setOrganizationName: PropTypes.func.isRequired
};
