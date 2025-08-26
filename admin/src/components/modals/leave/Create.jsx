import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = '/api/leave'; // change to your Fastify prefix

const toISO = (v) => {
  if (!v) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};
const diffDaysInclusive = (aISO, bISO) => {
  const a = new Date(aISO); const b = new Date(bISO);
  if (isNaN(a) || isNaN(b)) return 0;
  const ms = b.setHours(12) - a.setHours(12);
  return Math.max(0, Math.floor(ms / 86400000) + 1);
};

export default function LeaveCreate({ isOpen, onClose, onCreated, tenantId, userId, availableDays = 17 }) {
  const [community, setCommunity] = useState('Holidays');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [overlap, setOverlap] = useState({ company: 0, team: 0, loading: false });

  const duration = useMemo(() => diffDaysInclusive(toISO(fromDate), toISO(untilDate)), [fromDate, untilDate]);

  useEffect(() => {
    if (!isOpen) return;
    const f = async () => {
      const fISO = toISO(fromDate); const tISO = toISO(untilDate);
      if (!fISO || !tISO) return;
      setOverlap(o => ({ ...o, loading: true }));
      try {
        const r = await fetch(`${API_BASE}/overlap?from=${fISO}&until=${tISO}`);
        const j = r.ok ? await r.json() : { company: 0, team: 0 };
        setOverlap({ company: j.company || 0, team: j.team || 0, loading: false });
      } catch {
        setOverlap({ company: 0, team: 0, loading: false });
      }
    };
    f();
  }, [isOpen, fromDate, untilDate]);

  const validate = () => {
    const e = {};
    const fISO = toISO(fromDate), tISO = toISO(untilDate);
    if (!community) e.community = 'Required';
    if (!fISO) e.fromDate = 'Invalid date';
    if (!tISO) e.untilDate = 'Invalid date';
    if (fISO && tISO && new Date(tISO) < new Date(fISO)) e.untilDate = 'Must be after From';
    if (duration === 0) e.duration = 'Select a range';
    if (duration > availableDays) e.available = 'Not enough balance';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        TenantID: tenantId,
        UserID: userId,
        Community: community,
        StartTime: toISO(fromDate),
        EndTime: toISO(untilDate),
        Purpose: note || null
      };
      const r = await fetch(`${API_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('Failed to create leave');
      const data = await r.json();
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
