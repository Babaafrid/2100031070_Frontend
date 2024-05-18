import React from 'react';
import './ColumnFilter.css';

export const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <span className="filter-container">
      Search: {' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Search...`}
        className="filter-input"
      />
    </span>
  );
};
