import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const EmployeeLeaveHistory = () => {
  // Support both `/employee/:id/leave-history` and `?id=12`
  const { id: paramId } = useParams();
  const location = useLocation();
  const queryId = new URLSearchParams(location.search).get('id');
  const employeeId = Number(paramId || queryId);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const token = localStorage.getItem('token');

  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

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
      <td className="px-5 py-6 text-sm font-medium text-gray-900">{item.LeaveType}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <img 
            src={item.AvatarUrl || '/images/img_ellipse_26.png'} 
            alt="avatar" 
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-medium text-gray-900">{item.By}</span>
        </div>
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {new Date(item.From).toLocaleDateString()}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {new Date(item.To).toLocaleDateString()}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">{item.Reason}</td>
      <td className="px-4 py-6">{getStatusBadge(item.Status)}</td>
    </tr>
  );

  useEffect(() => {
    if (!employeeId || Number.isNaN(employeeId)) {
      setErrMsg('Invalid employee ID in URL');
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();
    async function loadLeaveHistory() {
      try {
        setLoading(true);
        setErrMsg('');
        const res = await fetch(`${API}/employee/${employeeId}/leave-history`, {
          headers: {
            'Accept': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: ctrl.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`API ${res.status}: ${text || res.statusText}`);
        }
        const data = await res.json();
        setLeaveData(data.items || []);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErrMsg(e.message || 'Failed to load leave history');
        }
      } finally {
        setLoading(false);
      }
    }

    loadLeaveHistory();
    return () => ctrl.abort();
  }, [employeeId, API, token]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (errMsg) return <div className="text-center py-10 text-red-500">{errMsg}</div>;

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
              {leaveData.length > 0 ? leaveData.map(renderTableRow) : (
                <tr>
                  <td colSpan="6" className="px-5 py-6 text-center text-gray-500">No leave records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">
            Showing data {leaveData.length} of {leaveData.length} entries
          </span>
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
