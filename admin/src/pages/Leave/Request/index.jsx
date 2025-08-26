import React, { useEffect, useState } from 'react';
import { LeaveCreate } from '@/components/modals/leave'; // adjust path to your modals

export default function LeaveRequestPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    try {
      //  API call to backend Fastify route
      const res = await fetch('/api/leave/employee/12'); // employeeId = 12 example
      if (!res.ok) throw new Error('Failed to fetch leaves');
      const data = await res.json();
      setLeaves(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadLeaves(); }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Leave Requests</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="px-4 py-2 rounded bg-gray-900 text-white"
        >
          + New Leave
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Purpose</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.LeaveID} className="border-t">
              <td className="p-2">{new Date(l.StartTime).toLocaleDateString()}</td>
              <td className="p-2">{new Date(l.EndTime).toLocaleDateString()}</td>
              <td className="p-2">{l.Purpose}</td>
              <td className="p-2">{l.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Leave Create Modal */}
      <LeaveCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={() => {
          setOpenCreate(false);
          loadLeaves(); // reload list after creation
        }}
      />
    </div>
  );
}
