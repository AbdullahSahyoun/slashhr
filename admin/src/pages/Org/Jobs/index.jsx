import React, { useMemo, useState } from 'react';

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

/* ------------ Page ------------ */

const JobsPage = () => {
  const [search, setSearch] = useState('');

  // Alerts (top list)
  const alerts = [
    '1 employees without a role or level',
    '3 employees with the wrong job data',
    '1 employee without a reporting line hierarchy',
  ];

  // Demo rows (Role groups)
  const rows = [
    { id: 1, role: 'Devops',   members: 4,  avgAge: 20,  avgTenure: '2 years',  femalePct: 28, malePct: 72 },
    { id: 2, role: 'Managers', members: 5,  avgAge: 28,  avgTenure: '10 years', femalePct: 25, malePct: 75 },
    { id: 3, role: 'People',   members: 4,  avgAge: 'N/A', avgTenure: 'a year', femalePct: 62, malePct: 38 },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => String(r.role).toLowerCase().includes(q));
  }, [search]);

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
                onClick={() => {/* open create job modal */}}
                className="rounded-xl bg-[#2b6171] px-4 py-2 text-sm font-medium text-white hover:bg-[#214b59]"
              >
                + New job
              </button>
              <button
                onClick={() => {/* open import flow */}}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#2b6171] hover:bg-gray-50"
              >
                Import jobs in bulk
              </button>
            </div>
          </div>

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
                    {/* Role */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <InitialBadge name={r.role} />
                        <div className="text-sm text-[#0f172a]">{r.role}</div>
                      </div>
                    </td>

                    {/* Members */}
                    <td className="py-4 px-3 text-sm text-[#0f172a]">{r.members}</td>

                    {/* Av. Age */}
                    <td className="py-4 px-3 text-sm text-[#0f172a]">
                      {r.avgAge}
                    </td>

                    {/* Av. Tenure */}
                    <td className="py-4 px-3 text-sm text-[#0f172a]">
                      {r.avgTenure}
                    </td>

                    {/* Gender distribution */}
                    <td className="py-4 px-3">
                      <div className="space-y-2">
                        <Bar value={r.femalePct} />
                        <Bar value={r.malePct} />
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-3 text-right">
                      <RowArrow />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination */}
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
    </div>
  );
};

export default JobsPage;
