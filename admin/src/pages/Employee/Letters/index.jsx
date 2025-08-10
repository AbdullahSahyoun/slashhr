import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeLettersPage = () => {
  // Read ?id= from query string (consistent with Personal page)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const employeeId = Number(params.get('id'));

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!employeeId || Number.isNaN(employeeId)) {
      setErrMsg('Invalid employee ID in URL');
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setErrMsg('');
        const res = await fetch(`${API}/employee/${employeeId}/letter-history`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: ctrl.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`API ${res.status}: ${text || res.statusText}`);
        }
        const data = await res.json();
        setRaw(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('Failed to fetch letter history:', e);
          setErrMsg('Failed to load letter history.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ctrl.abort();
  }, [employeeId, API, token, location.search]);

  const letters = useMemo(() => {
    return raw.map((r) => ({
      Lettertype: r.Lettertype ?? '',
      By: r.By ?? '',
      Date: r.Date ? new Date(r.Date) : null,
      Purpose: r.Purpose ?? '',
      Recipient: r.Recipient ?? '',
      Information: r.Information ?? '',
      Status: r.Status ?? '',
    }));
  }, [raw]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status || '—'}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (errMsg) {
    return (
      <div className="text-center py-10 text-red-500">
        {errMsg}
        <br />
        <span className="text-sm text-gray-600">Employee ID: {employeeId || 'Unknown'}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Letter History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                {['Letter type','By','Date','Purpose','Recipient','Information','Status'].map((h, i) => (
                  <th key={i} className={`text-sm font-medium text-gray-500 pb-3 ${i === 0 ? 'pl-4' : 'px-2'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {letters.length ? (
                letters.map((l, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="pl-4 py-5 text-sm text-gray-900">{l.Lettertype || '—'}</td>
                    <td className="px-2 py-5 text-sm text-gray-900">{l.By || '—'}</td>
                    <td className="px-2 py-5 text-sm text-gray-900">{l.Date ? l.Date.toLocaleDateString() : '—'}</td>
                    <td className="px-2 py-5 text-sm text-gray-900">{l.Purpose || '—'}</td>
                    <td className="px-2 py-5 text-sm text-gray-900">{l.Recipient || '—'}</td>
                    <td className="px-2 py-5 text-sm text-gray-900">{l.Information || '—'}</td>
                    <td className="px-2 py-5">{getStatusBadge(l.Status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No letters found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">Showing {letters.length} of {letters.length} entries</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLettersPage;
