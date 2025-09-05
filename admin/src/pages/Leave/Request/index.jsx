// src/pages/LeavePage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { LeaveCreate, LeaveUpdate, LeaveDelete } from '@/components/modals/leave';

const LEAVES_API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/leaves`
  : '/api/leaves';

const EMPLOYEE_API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/employee`
  : '/api/employee'; // <-- for /employee/:id/name

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  const ct = res.headers.get('content-type') || '';
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}\n${text.slice(0, 300)}`);
  }
  if (!ct.includes('application/json')) {
    const text = await res.text().catch(() => '');
    throw new Error(`Expected JSON, got ${ct}\n${text.slice(0, 300)}`);
  }
  return res.json();
}

export default function LeavePage() {
  const employeeId = 12; // Example EmployeeID (exists in DB)
  const [employeeName, setEmployeeName] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  // Filters
  const [from, setFrom] = useState('');
  const [until, setUntil] = useState('');
  const [status, setStatus] = useState('All');

  // Modals
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const loadLeaves = async () => {
    setError('');
    try {
      const data = await fetchJson(`${LEAVES_API}/employee/${employeeId}`);
      setLeaves(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
      setLeaves([]);
    }
  };

  const loadEmployeeName = async () => {
    try {
      const j = await fetchJson(`${EMPLOYEE_API}/${employeeId}/name`);
      setEmployeeName(j?.EmployeeName || '');
    } catch (e) {
      // Don’t block the page if the name lookup fails; just leave it blank
      console.warn('Failed to load employee name:', e.message);
      setEmployeeName('');
    }
  };

  useEffect(() => {
    loadLeaves();
    loadEmployeeName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const a = from ? new Date(from) : null;
    const b = until ? new Date(until) : null;
    return leaves.filter(l => {
      const s = new Date(l.StartTime);
      const okDate = (!a || s >= a) && (!b || s <= b);
      const okStatus = status === 'All' ? true : (l.Status === status);
      return okDate && okStatus;
    });
  }, [leaves, from, until, status]);

  const onEdit = (l) => {
    setSelectedLeave({
      id: l.LeaveID,
      EmployeeID: l.EmployeeID,
      StartTime: l.StartTime?.slice(0,10),
      EndTime: l.EndTime?.slice(0,10),
      Purpose: l.Purpose,
      Status: l.Status
    });
    setOpenUpdate(true);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Leave Requests {employeeName ? `— ${employeeName}` : ''} (Employee #{employeeId})
        </h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="px-4 py-2 rounded bg-gray-900 text-white"
        >
          + New Leave
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input type="date" value={from}
            onChange={(e)=>setFrom(e.target.value)}
            className="mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium">Until</label>
          <input type="date" value={until}
            onChange={(e)=>setUntil(e.target.value)}
            className="mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)}
            className="mt-1 px-3 py-2 border rounded-lg">
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {error && <div className="rounded border border-red-300 bg-red-50 text-red-700 p-3 text-sm whitespace-pre-wrap">{error}</div>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">EmployeeID</th>
              <th className="p-2 text-left">Start</th>
              <th className="p-2 text-left">End</th>
              <th className="p-2 text-left">Purpose</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.LeaveID} className="border-t hover:bg-gray-50">
                <td className="p-2">{l.EmployeeID}</td>
                <td className="p-2">{new Date(l.StartTime).toLocaleDateString()}</td>
                <td className="p-2">{new Date(l.EndTime).toLocaleDateString()}</td>
                <td className="p-2">{l.Purpose || '—'}</td>
                <td className="p-2">
                  <span className={
                    "px-2 py-1 rounded text-xs " +
                    (l.Status === 'Approved' ? 'bg-green-100 text-green-700' :
                     l.Status === 'Rejected' ? 'bg-red-100 text-red-700' :
                     'bg-amber-100 text-amber-700')
                  }>
                    {l.Status}
                  </span>
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(l)} className="px-2 py-1 rounded border">Edit</button>
                    <button onClick={() => { setSelectedLeave({ id: l.LeaveID }); setOpenDelete(true); }}
                      className="px-2 py-1 rounded border border-red-300 text-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="p-3 text-gray-500">No leaves found.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <LeaveCreate
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={loadLeaves}
        tenantId={1}
        userId={employeeId}
        availableDays={17}
      />

      <LeaveUpdate
        isOpen={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onUpdated={loadLeaves}
        leave={selectedLeave}
      />

      <LeaveDelete
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onDeleted={loadLeaves}
        id={selectedLeave?.id}
      />
    </div>
  );
}
