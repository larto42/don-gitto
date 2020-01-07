import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';

export default function Header({
  searchOrganization,
  error,
  limitsRespawnDate
}) {
  return (
    <header className="header">
      <h1 className="title">Don Gitto</h1>
      <Search
        searchOrganization={searchOrganization}
        error={error}
        limitsRespawnDate={limitsRespawnDate}
      />
    </header>
  );
}

Header.propTypes = {
  searchOrganization: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  limitsRespawnDate: PropTypes.string
};
