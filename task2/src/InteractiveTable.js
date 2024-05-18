import React from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
import './InteractiveTable.css';

const InteractiveTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="header-row">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="header-cell">
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="body-row">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="body-cell">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="pagination-button">First</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination-button">Previous</button>
        <span className="pagination-info">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination-button">Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="pagination-button">Last</button>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="page-size-select"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default InteractiveTable;
