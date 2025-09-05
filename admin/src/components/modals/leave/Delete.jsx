import React, { useState } from 'react';

const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_BASE = `${API_ORIGIN}/leaves`;

export default function LeaveDelete({ isOpen, onClose, onDeleted, id }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const remove = async () => {
    setError('');
    setBusy(true);
    try {
      const r = await fetch(`${API_BASE}/delete/${id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Failed to delete leave');
      onDeleted && onDeleted(id);
      onClose && onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold">Delete leave request</h3>
        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete this leave request? This action cannot be undone.
        </p>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 rounded-lg border" onClick={onClose}>Cancel</button>
          <button
            onClick={remove}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60">
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
