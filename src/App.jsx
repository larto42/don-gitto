import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import UsersList from './components/UsersList';
import UsersPagination from './components/UsersPagination';

function App() {
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');
  const [pagination, setPagination] = useState({
    prev: null,
    next: null
  });

  return (
    <div className="App">
      <span>Organization: {organizationName}</span>
      <Search
        setUsers={setUsers}
        setOrganizationName={setOrganizationName}
        setPagination={setPagination}
      />
      <UsersList users={users} />
      <UsersPagination pagination={pagination} />
    </div>
  );
}

export default App;
