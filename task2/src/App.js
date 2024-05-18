import React, { useMemo } from 'react';
import InteractiveTable from './InteractiveTable';
import { ColumnFilter } from './ColumnFilter';
import './App.css';

const App = () => {
  const data = useMemo(
    () => [
      { col1: 'Hello', col2: 'World' },
      { col1: 'React', col2: 'Django' },
      { col1: 'Javascript', col2: 'Nodejs' },
      { col1: 'Python', col2: 'Ruby' },
      { col1: 'C', col2: 'Java' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
        Filter: ColumnFilter
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
        Filter: ColumnFilter
      },
    ],
    []
  );

  return (
    <div className="app-container">
      <InteractiveTable columns={columns} data={data} />
    </div>
  );
};

export default App;
