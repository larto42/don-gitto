import React from 'react';
import PropTypes from 'prop-types';

export default function UsersPagination({ pagination }) {
  const { prev, next } = pagination;
  const handlePrevClick = async () => {
    // load previous page of users
  };

  const handleNextClick = async () => {
    // load next page of users
  };

  return (
    <div>
      {prev && <button onClick={handlePrevClick}>Previous page</button>}
      {next && <button onClick={handleNextClick}>Next page</button>}
    </div>
  );
}

UsersPagination.propTypes = {
  pagination: PropTypes.object.isRequired
};
