import React from 'react';
import PropTypes from 'prop-types';

export default function UsersPagination({
  pagination,
  searchOrganizationUsers,
  orgName,
  error
}) {
  const { prev, next } = pagination;
  const handlePrevClick = async () => {
    searchOrganizationUsers(orgName, prev);
    // load previous page of users
  };

  const handleNextClick = async () => {
    searchOrganizationUsers(orgName, next);
    // load next page of users
  };

  return (
    <div>
      {prev && (
        <button
          className="pagination-btn"
          onClick={handlePrevClick}
          disabled={error}
        >
          Previous page
        </button>
      )}
      {next && (
        <button
          className="pagination-btn"
          onClick={handleNextClick}
          disabled={error}
        >
          Next page
        </button>
      )}
    </div>
  );
}

UsersPagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  searchOrganizationUsers: PropTypes.func.isRequired,
  orgName: PropTypes.string,
  error: PropTypes.bool
};
