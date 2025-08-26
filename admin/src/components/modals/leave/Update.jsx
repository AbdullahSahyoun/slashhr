import React, { useMemo, useState } from 'react';

const API_BASE = '/api/leave';

const toISO = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '';
const diffDaysInclusive = (aISO, bISO) => {
  const a = new Date(aISO); const b = new Date(bISO);
  if (isNaN(a) || isNaN(b)) return 0;
  return Math.max(0, Math.floor((b.setHours(12) - a.setHours(12)) / 86400000) + 1);
};

export default function LeaveUpdate({ isOpen, onClose, onUpdated, leave }) {
  // `leave` should include: id, StartTime (YYYY-MM-DD), EndTime, Community, Purpose
  const [fromDate, setFromDate] = useState(leave?.StartTime || '');
  const [untilDate, setUntilDate] = useState(leave?.EndTime || '');
  const [community, setCommunity] = useState(leave?.Community || '');
  const [note, setNote] = useState(leave?.Purpose || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const duration = useMemo(() => diffDaysInclusive(toISO(fromDate), toISO(untilDate)), [fromDate, untilDate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!community) return setError('Community is required');
    if (!toISO(fromDate) || !toISO(untilDate)) return setError('Dates are invalid');
    if (new Date(untilDate) < new Date(fromDate)) return setError('Until must be after From');

    setSaving(true);
    try {
      const r = await fetch(`${API_BASE}/requests/${leave.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Community: community,
          StartTime: fromDate,
          EndTime: untilDate,
          Purpose: note || null
        })
      });
      if (!r.ok) throw new Error('Failed to update leave');
      const data = await r.json();
      onUpdated && onUpdated(data);
      onClose && onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Update Leave</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Community</label>
            <input className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                   value={community} onChange={e=>setCommunity(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">From</label>
              <input type="date" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                     value={fromDate} onChange={e=>setFromDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Until</label>
              <input type="date" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                     value={untilDate} onChange={e=>setUntilDate(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Duration</label>
            <div className="mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
              {duration} {duration === 1 ? 'Day' : 'Days'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Note</label>
            <textarea rows={3} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                      value={note} onChange={e=>setNote(e.target.value)} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
