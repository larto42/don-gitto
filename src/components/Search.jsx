import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from './ErrorAlert';

export default function Search(props) {
  const [searchVal, setSearchVal] = useState('');

  const { searchOrganization, error } = props;

  const handleInput = e => {
    setSearchVal(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    searchOrganization(searchVal);
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
  searchOrganization: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};
