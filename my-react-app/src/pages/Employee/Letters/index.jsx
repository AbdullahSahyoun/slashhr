import React, { useState } from 'react';

const EmployeeLettersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const tableHeaders = [
    'Letter type',
    'By',
    'Date',
    'Purpose',
    'Recipient',
    'Information',
    'Status'
  ];

  const tableData = [
    [
      'Work Certificate',
      <div key="user1" className="flex items-center gap-4">
        <img
          src="/images/img_ellipse_26.png"
          alt="Manale Battache"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm font-medium text-gray-900">Manale Battache</span>
      </div>,
      '27 Dec 2025',
      '-',
      '-',
      '-',
      <span key="status1" className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
        Pending
      </span>
    ],
    [
      'Work Certificate',
      <div key="user2" className="flex items-center gap-4">
        <img
          src="/images/img_ellipse_26.png"
          alt="Manale Battache"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm font-medium text-gray-900">Manale Battache</span>
      </div>,
      '27 Dec 2025',
      '-',
      '-',
      '-',
      <span key="status2" className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
        Approved
      </span>
    ],
    [
      'Work Certificate',
      <div key="user3" className="flex items-center gap-4">
        <img
          src="/images/img_ellipse_26.png"
          alt="Manale Battache"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm font-medium text-gray-900">Manale Battache</span>
      </div>,
      '27 Dec 2025',
      '-',
      '-',
      '-',
      <span key="status3" className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
        Rejected
      </span>
    ]
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Letter History</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`text-sm font-medium text-gray-500 pb-3 ${index === 0 ? 'pl-4' : 'px-2'}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`py-5 ${cellIndex === 0 ? 'pl-4' : 'px-2'} text-sm text-gray-900`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">Showing data 3 of 3 entries</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-sm text-gray-600 disabled:opacity-50"
            >
              &lt;
            </button>
            <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm">1</button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-sm text-gray-600 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLettersPage;
