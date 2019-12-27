import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');

  const findOrganization = async input => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${input}+type:org`
      );
      const json = await response.json();

      const { items: organizations } = json;
      const organization = organizations[0];

      setOrganizationName(organization.login);

      getOrganizationUsers(organization.login);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrganizationUsers = async organizationName => {
    try {
      const response = await fetch(
        `https://api.github.com/orgs/${organizationName}/members`
      );
      const json = await response.json();

      const users = json.map(user => ({
        id: user.id,
        login: user.login
      }));
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <span>Organization: {organizationName}</span>
      <Search findOrganization={findOrganization} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
