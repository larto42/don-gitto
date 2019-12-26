import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
  const [searchVal, setSearchVal] = useState('');

  const handleInput = e => {
    setSearchVal(e.target.value);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchVal}+type:org`
      );
      const json = await response.json();

      const { items: organizations } = json;
      const organization = organizations[0];

      const { setOrganizationName } = props;

      setOrganizationName(organization.login);
    } catch (error) {
      console.error(error);
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
  setUserList: PropTypes.func.isRequired,
  setOrganizationName: PropTypes.func.isRequired
};
