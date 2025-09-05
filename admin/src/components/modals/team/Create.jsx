import React, { useEffect, useMemo, useState } from 'react';

/* ------------ Config ------------ */
const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TENANT_ID = 1;

/* ------------ Tiny helpers ------------ */
async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: 'application/json' }, ...opts });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}

/* ------------ Small UI bits ------------ */
const SearchInput = ({ value, onChange, onSearch, className = '' }) => (
  <div className={`relative ${className}`}>
    <input
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && onSearch?.(value)}
      placeholder="Search"
      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
    />
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
);

const InitialBadge = ({ name }) => {
  const letter = (name?.[0] || '?').toUpperCase();
  const palette = ['#A7F3D0', '#93C5FD', '#FDE68A', '#FCA5A5', '#C4B5FD'];
  const bg = palette[(name?.length || 0) % palette.length];
  return (
    <div className="h-8 w-8 rounded-full grid place-items-center font-semibold" style={{ background: bg, color: '#0b3b3a' }}>
      {letter}
    </div>
  );
};

const Bar = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
    <div className="h-full rounded-full bg-[#2b6171]" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

const RowArrow = () => (
  <button className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
      <path fill="currentColor" d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 0 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.01z"/>
    </svg>
  </button>
);

/* ------------ Create Job Modal (job_titles) ------------ */
function CreateJobModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!open) return;
    setErr('');
    setName('');
    setActive(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape' && !saving) onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, saving, onClose]);

  const canSave = name.trim().length > 0 && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    setErr('');
    try {
      const payload = {
        TenantID: TENANT_ID,
        title_name: name.trim(),
        is_active: !!active,
      };
      const created = await postJSON(`${API_ORIGIN}/job-titles`, payload);
      onCreated?.(created);
      onClose?.();
    } catch (e) {
      // 409 from unique (TenantID, lower(title_name))
      try {
        const parsed = JSON.parse(e.message);
        setErr(parsed?.message || 'Save failed');
      } catch {
        setErr(e.message || 'Save failed');
      }
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={() => !saving && onClose?.()} />
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-[#2b6171]">New Job Title</h3>
                <p className="text-xs text-gray-500 mt-1">Create a job title under this tenant.</p>
              </div>
              <button
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => !saving && onClose?.()}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="px-4 py-3 space-y-3">
            {err && <div className="text-sm text-red-600">{err}</div>}

            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">Title name</span>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                placeholder="e.g. Software Engineer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="px-4 py-3 bg-[#1f4d57]">
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="w-full rounded-lg bg-[#1f4d57] text-white py-2 font-medium border border-white/15 hover:bg-[#1b434c] disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------ Page ------------ */
const TeamsPageModol = () => {
  const [search, setSearch] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // Alerts (top list)
  const alerts = [
    '1 employees without a role or level',
    '3 employees with the wrong job data',
    '1 employee without a reporting line hierarchy',
  ];

  // Load from API
  const loadJobs = async () => {
    setLoading(true);
    setErr('');
    try {
      // You registered: GET /job-titles/tenant/:tenantId/with-counts
      const data = await getJSON(`${API_ORIGIN}/job-titles/tenant/${TENANT_ID}/with-counts`);
      // Map to UI rows
      const mapped = (Array.isArray(data) ? data : []).map((jt) => ({
        id: jt.id,
        role: jt.title_name,
        members: Number(jt.employee_count || 0),
        avgAge: 'N/A',          // not available from this endpoint yet
        avgTenure: '—',         // not available from this endpoint yet
        femalePct: 0,           // not available yet
        malePct: 0,             // not available yet
      }));
      setRows(mapped);
    } catch (e) {
      setErr(e.message || 'Failed to load jobs');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => String(r.role).toLowerCase().includes(q));
  }, [search, rows]);

  const handleCreated = (job) => {
    // job is the object returned by POST /job-titles
    const newRow = {
      id: job?.id ?? Math.max(0, ...rows.map(r => r.id || 0)) + 1,
      role: job?.title_name || job?.name || 'New Role',
      members: 0,
      avgAge: 'N/A',
      avgTenure: '—',
      femalePct: 0,
      malePct: 0,
    };
    setRows(prev => [newRow, ...prev]);
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto mt-6 w-full max-w-[1180px] space-y-5">
        {/* Alerts card */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <ul className="divide-y divide-gray-100">
            {alerts.map((text, i) => (
              <li key={i} className="flex items-center justify-between py-3 px-2">
                <span className="text-[15px] text-[#626262]">{text}</span>
                <img src="/images/img_group_1325.svg" alt="settings" className="h-4 w-4 opacity-70" />
              </li>
            ))}
          </ul>
        </div>

        {/* Grid card: search + actions + table */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          {/* Top controls */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={setSearch}
              className="w-full sm:flex-1"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setOpenCreate(true)}
                className="rounded-xl bg-[#2b6171] px-4 py-2 text-sm font-medium text-white hover:bg-[#214b59]"
              >
                + New job
              </button>
              <button
                onClick={() => loadJobs()}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#2b6171] hover:bg-gray-50"
                title="Reload"
              >
                Reload
              </button>
            </div>
          </div>

          {/* Errors / Loading */}
          {err && (
            <div className="mb-3 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
              {err}
            </div>
          )}
          {loading && (
            <div className="mb-3 text-sm text-gray-500">Loading…</div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="text-left text-[13px] font-medium text-[#9aa3af]">
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Members</th>
                  <th className="py-3 px-3">Av. Age</th>
                  <th className="py-3 px-3">Av. Tenure</th>
                  <th className="py-3 px-3">Gender distribution</th>
                  <th className="py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50/40">
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <InitialBadge name={r.role} />
                        <div className="text-sm text-[#0f172a]">{r.role}</div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-sm text-[#0f172a]">{r.members}</td>
                    <td className="py-4 px-3 text-sm text-[#0f172a]">{r.avgAge}</td>
                    <td className="py-4 px-3 text-sm text-[#0f172a]">{r.avgTenure}</td>
                    <td className="py-4 px-3">
                      <div className="space-y-2">
                        <Bar value={r.femalePct} />
                        <Bar value={r.malePct} />
                      </div>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <RowArrow />
                    </td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td className="py-6 px-3 text-sm text-gray-500" colSpan={6}>
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination (static placeholder) */}
          <div className="mt-4 flex items-center justify-between">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              ← Previous
            </button>
            <span className="text-xs text-gray-500">
              Showing data {filtered.length} of {rows.length} entries
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateJobModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default TeamsPageModol;
 