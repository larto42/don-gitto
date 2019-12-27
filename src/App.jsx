import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import UsersList from './components/UsersList';
import { findOrganization, getOrganizationUsers } from './utils/GithubApiUtils';

function App() {
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');

  const searchOrganization = async input => {
    const orgName = await findOrganization(input);
    const orgUsers = await getOrganizationUsers(orgName);

    setOrganizationName(orgName);
    setUsers(orgUsers);
  };

  return (
    <div className="App">
      <span>Organization: {organizationName}</span>
      <Search searchOrganization={searchOrganization} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
