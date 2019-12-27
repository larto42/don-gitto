import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
  const [searchVal, setSearchVal] = useState('');

  const handleInput = e => {
    setSearchVal(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    props.searchOrganization(searchVal);
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
  searchOrganization: PropTypes.func.isRequired
};
