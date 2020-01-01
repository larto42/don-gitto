import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import UsersList from './components/UsersList';
import UsersPagination from './components/UsersPagination';
import {
  findOrganization,
  getOrganizationUsers,
  getUserLastActivity
} from './utils/GithubApiUtils';

function App() {
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    prev: null,
    next: null
  });

  const searchOrganization = async input => {
    try {
      const orgName = await findOrganization(input);
      setOrganizationName(orgName);
      await searchOrganizationUsers(orgName);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const searchOrganizationUsers = async (orgName, page = 1) => {
    try {
      const { users: orgUsers, links } = await getOrganizationUsers(
        orgName,
        page
      );

      setUsers(orgUsers);
      if (links !== null) setPagination(links);

      orgUsers.forEach(async (user, index) => {
        const activity = await getUserLastActivity(user.login);
        setUsers(prevState => {
          const newState = [...prevState];
          newState[index] = { ...newState[index], activity };
          return newState;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <span>Organization: {organizationName}</span>
      <Search searchOrganization={searchOrganization} error={error} />
      <UsersList users={users} />
      <UsersPagination
        pagination={pagination}
        orgName={organizationName}
        searchOrganizationUsers={searchOrganizationUsers}
      />
    </div>
  );
}

export default App;
