import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  findOrganization,
  getOrganizationUsers,
  getUserLastActivity
} from '../utils/GithubApiUtils';

export default function Search(props) {
  const [searchVal, setSearchVal] = useState('');

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
      //Display error msg
      console.error(error);
      return false;
    }
  };

  return (
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
  );
}

Search.propTypes = {
  setUsers: PropTypes.func.isRequired,
  setOrganizationName: PropTypes.func.isRequired
};
