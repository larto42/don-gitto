import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');

  return (
    <div className="App">
      <span>Organization: {organizationName}</span>
      <Search setUsers={setUsers} setOrganizationName={setOrganizationName} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
