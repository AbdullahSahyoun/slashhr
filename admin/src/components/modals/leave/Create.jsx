import React, { useEffect, useMemo, useState } from 'react';
const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_BASE = `${API_ORIGIN}/leaves`;



 
// Convert yyyy-mm-dd → yyyy-mm-ddT00:00:00Z (UTC midnight)
const toISODateTime = (v) => {
  if (!v) return '';
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? `${v}T00:00:00Z` : '';
};

const diffDaysInclusive = (aISO, bISO) => {
  const a = new Date(aISO); const b = new Date(bISO);
  if (isNaN(a) || isNaN(b)) return 0;
  const ms = b.setHours(12,0,0,0) - a.setHours(12,0,0,0); // normalize to noon
  return Math.max(0, Math.floor(ms / 86400000) + 1);
};

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

export default function LeaveCreate({
  isOpen, onClose, onCreated,
  tenantId, userId, // userId = EmployeeID
  availableDays = 17
}) {
  const [community, setCommunity] = useState('Holidays');
  const [fromDate, setFromDate] = useState('');   // yyyy-mm-dd
  const [untilDate, setUntilDate] = useState(''); // yyyy-mm-dd
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [overlap, setOverlap] = useState({ company: 0, team: 0, loading: false });

  const fromISO = toISODateTime(fromDate);
  const untilISO = toISODateTime(untilDate);
  const duration = useMemo(() => diffDaysInclusive(fromISO, untilISO), [fromISO, untilISO]);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      if (!fromISO || !untilISO) return;
      setOverlap(o => ({ ...o, loading: true }));
      try {
        // Optional: if you didn't add this route, this will silently fall back.
        const j = await fetchJson(`${API_BASE}/overlap?from=${encodeURIComponent(fromISO)}&until=${encodeURIComponent(untilISO)}`);
        setOverlap({ company: j.company || 0, team: j.team || 0, loading: false });
      } catch {
        setOverlap({ company: 0, team: 0, loading: false });
      }
    })();
  }, [isOpen, fromISO, untilISO]);

  const validate = () => {
    const e = {};
    if (!community) e.community = 'Required';
    if (!fromDate) e.fromDate = 'Required';
    if (!untilDate) e.untilDate = 'Required';
    if (fromISO && untilISO && new Date(untilISO) < new Date(fromISO)) e.untilDate = 'Must be after From';
    if (duration === 0) e.duration = 'Select a range';
    if (duration > availableDays) e.available = 'Not enough balance';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        TenantID: tenantId,
        EmployeeID: userId,   // ✅ DB expects EmployeeID
        Community: community, // keep only if you have this column
        StartTime: fromISO,   // ✅ date-time format for Ajv
        EndTime: untilISO,    // ✅ date-time format
        Purpose: note || null,
        Status: 'Pending'
      };
      // ✅ align with your working backend: POST /leaves/create
      const data = await fetchJson(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include', // uncomment if cookie-based auth
        body: JSON.stringify(payload)
      });
      onCreated && onCreated(data);
      onClose && onClose();
    } catch (err) {
      setErrors(x => ({ ...x, submit: err.message }));
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Leave Request</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">✕</button>
        </div>

        <form className="space-y-4" onSubmit={submit} noValidate>
          <div>
            <label className="block text-sm font-medium">Community</label>
            <input
              className={`w-full mt-1 px-3 py-2 border rounded-lg ${errors.community ? 'border-red-400' : 'border-gray-300'}`}
              value={community}
              onChange={e => setCommunity(e.target.value)}
              placeholder="Holidays"
            />
            {errors.community && <p className="text-xs text-red-500 mt-1">{errors.community}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">From</label>
              <input
                type="date"
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${errors.fromDate ? 'border-red-400' : 'border-gray-300'}`}
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
              />
              {errors.fromDate && <p className="text-xs text-red-500 mt-1">{errors.fromDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Until</label>
              <input
                type="date"
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${errors.untilDate ? 'border-red-400' : 'border-gray-300'}`}
                value={untilDate}
                onChange={e => setUntilDate(e.target.value)}
              />
              {errors.untilDate && <p className="text-xs text-red-500 mt-1">{errors.untilDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Duration</label>
              <div className={`mt-1 px-3 py-2 border rounded-lg bg-gray-50 ${errors.duration ? 'border-red-400' : 'border-gray-300'}`}>
                {duration} {duration === 1 ? 'Day' : 'Days'}
              </div>
              {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Available</label>
              <div className={`mt-1 px-3 py-2 border rounded-lg bg-gray-50 ${errors.available ? 'border-red-400' : 'border-gray-300'}`}>
                {availableDays} Days
              </div>
              {errors.available && <p className="text-xs text-red-500 mt-1">{errors.available}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Note (optional)</label>
            <textarea
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add any context for your approver…"
            />
          </div>

          {overlap.loading ? (
            <div className="w-full rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm">
              Checking overlaps…
            </div>
          ) : (overlap.company > 0 || overlap.team > 0) && (
            <div className="w-full rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm">
              Overlaps with <b>{overlap.company}</b> in company, <b>{overlap.team}</b> in team.
            </div>
          )}

          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60">
              {saving ? 'Submitting…' : 'Submit request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
  