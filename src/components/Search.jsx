import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from './ErrorAlert';
import SearchIcon from './SearchIcon';

export default function Search(props) {
  const [searchVal, setSearchVal] = useState('');

  const { searchOrganization, error, limitsRespawnDate } = props;

  const handleInput = e => {
    setSearchVal(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    searchOrganization(searchVal);
  };

  return (
    <React.Fragment>
      <form className="search-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="Find GitHub organization"
          value={searchVal}
          onChange={handleInput}
          required
        />
        <button className="search-button" type="submit">
          <SearchIcon />
        </button>
      </form>
      {error && (
        <ErrorAlert>
          You have exceded request limits. They will be renewed on{' '}
          {limitsRespawnDate}
        </ErrorAlert>
      )}
    </React.Fragment>
  );
}

Search.propTypes = {
  searchOrganization: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  limitsRespawnDate: PropTypes.string
};
