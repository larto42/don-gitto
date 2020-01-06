import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import UsersList from './components/UsersList';
import UsersPagination from './components/UsersPagination';
import {
  findOrganization,
  getOrganizationUsers,
  getUserLastActivity,
  checkLimits
} from './utils/GithubApiUtils';

function App() {
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState(false);
  const [limitsRespawnDate, setLimitsRespawnDate] = useState(null);
  const [pagination, setPagination] = useState({
    prev: null,
    next: null
  });

  const searchOrganization = async input => {
    try {
      const orgName = await findOrganization(input);
      setOrganizationName(orgName);
      await searchOrganizationUsers(orgName);
      setError(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = async error => {
    console.error('error handling', error);
    setError(true);
    const limits = await checkLimits();
    const date = limits === null ? null : limits.toLocaleString();
    setLimitsRespawnDate(date);
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
        try {
          const activity = await getUserLastActivity(user.login);
          setUsers(prevState => {
            const newState = [...prevState];
            newState[index] = { ...newState[index], activity };
            return newState;
          });
        } catch (error) {
          handleError(error);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <Header
        searchOrganization={searchOrganization}
        error={error}
        limitsRespawnDate={limitsRespawnDate}
      />
      {organizationName && (
        <h2 className="organization">Organization: {organizationName}</h2>
      )}
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
