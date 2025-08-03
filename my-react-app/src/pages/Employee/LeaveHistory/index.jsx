import React, { useState } from 'react';

const EmployeeLeaveHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const leaveData = [
    {
      leaveType: 'Vacation',
      by: {
        name: 'Manale Battache',
        avatar: '/images/img_ellipse_26.png'
      },
      from: '27 Dec 2025',
      to: '30 Dec 2025',
      reason: "Friend's wedding celebration",
      status: 'Pending'
    },
    {
      leaveType: 'Vacation',
      by: {
        name: 'Manale Battache',
        avatar: '/images/img_ellipse_26.png'
      },
      from: '27 Dec 2025',
      to: '30 Dec 2025',
      reason: "Friend's wedding celebration",
      status: 'Approved'
    },
    {
      leaveType: 'Vacation',
      by: {
        name: 'Manale Battache',
        avatar: '/images/img_ellipse_26.png'
      },
      from: '27 Dec 2025',
      to: '30 Dec 2025',
      reason: "Friend's wedding celebration",
      status: 'Rejected'
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const renderTableRow = (item, index) => (
    <tr key={index} className="border-b border-gray-100">
      <td className="px-5 py-6 text-sm font-medium text-gray-900">
        {item.leaveType}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <img 
            src={item.by.avatar} 
            alt="avatar" 
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-medium text-gray-900">
            {item.by.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {item.from}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {item.to}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {item.reason}
      </td>
      <td className="px-4 py-6">
        {getStatusBadge(item.status)}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8">
      <div className="w-full max-w-7xl mx-auto bg-white border border-gray-200 rounded-[14px] shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 pb-4 text-sm font-medium text-gray-500">Leave type</th>
                <th className="px-4 pb-4 text-sm font-medium text-gray-500">By</th>
                <th className="px-4 pb-4 text-sm font-medium text-gray-500">From</th>
                <th className="px-4 pb-4 text-sm font-medium text-gray-500">To</th>
                <th className="px-4 pb-4 text-sm font-medium text-gray-500">Reason</th>
                <th className="px-4 pb-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((item, index) => renderTableRow(item, index))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">Showing data 3 of 3 entries</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">&lt;</button>
            <button className="w-8 h-8 text-sm text-white bg-blue-600 rounded">1</button>
            <button className="w-8 h-8 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveHistory;
