import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ 
  headers = [], 
  data = [], 
  className = '',
  onRowClick,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  ...props 
}) => {
  const handleRowSelect = (rowIndex, isSelected) => {
    if (onRowSelect) {
      onRowSelect(rowIndex, isSelected);
    }
  };

  const handleSelectAll = (isSelected) => {
    if (onRowSelect) {
      const allIndexes = data.map((_, index) => index);
      onRowSelect(isSelected ? allIndexes : [], isSelected);
    }
  };

  const isAllSelected = selectedRows.length === data.length && data.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

  return (
    <div className={`overflow-x-auto ${className}`} {...props}>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row, rowIndex)}
              className={`
                ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${selectedRows.includes(rowIndex) ? 'bg-blue-50' : ''}
              `}
            >
              {selectable && (
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={(e) => handleRowSelect(rowIndex, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
              )}
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  className: PropTypes.string,
  onRowClick: PropTypes.func,
  selectable: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  onRowSelect: PropTypes.func,
};

export default Table;