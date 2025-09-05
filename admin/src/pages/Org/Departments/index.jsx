import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Create as CreateDepartment } from "@/components/modals/department";

const SearchInput = ({ value, onChange, onSearch, className = "" }) => (
  <div className={`relative ${className}`}>
    <input
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === "Enter" && onSearch?.(value)}
      placeholder="Search"
      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
    />
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
);

const InitialBadge = ({ name }) => {
  const initial = (name?.[0] || "?").toUpperCase();
  const palette = ["#A7F3D0", "#93C5FD", "#FDE68A", "#FCA5A5", "#C4B5FD"];
  const bg = palette[(name?.length || 0) % palette.length];
  return (
    <div className="h-8 w-8 rounded-full grid place-items-center font-semibold" style={{ background: bg, color: "#0b3b3a" }}>
      {initial}
    </div>
  );
};

const Bar = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
    <div className="h-full rounded-full bg-[#2b6171]" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

const RowArrow = ({ onClick }) => (
  <button onClick={onClick} className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
      <path fill="currentColor" d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 0 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.01z"/>
    </svg>
  </button>
);

const DepartmentsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const seed = [
    {
      id: 1,
      name: "Devops",
      members: 4,
      head: { name: "Dawson Frederick", avatar: "/images/img_avatar_image_39.png" },
      avgAge: 25,
      tenureYears: 0.7,
      malePct: 72,
      femalePct: 28,
    },
    {
      id: 2,
      name: "Managers",
      members: 5,
      head: { name: "Kristian Scott", avatar: "/images/img_avatar_image_39_38x38.png" },
      avgAge: 42,
      tenureYears: 3.2,
      malePct: 70,
      femalePct: 30,
    },
    {
      id: 3,
      name: "People",
      members: 4,
      head: { name: "Armani Fuller", avatar: "/images/img_avatar_image_39_1.png" },
      avgAge: 31,
      tenureYears: 6.8,
      malePct: 40,
      femalePct: 60,
    },
  ];

  const [rows, setRows] = useState(seed);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((d) => d.name.toLowerCase().includes(q) || d.head.name.toLowerCase().includes(q));
  }, [search, rows]);

  const goToDepartment = (id) => {
    // Route target provided: /organization/department with dep id
    navigate(`/organization/department?id=${id}`);
  };

  const handleCreated = (created) => {
    // created: object returned from POST /org/department
    const id = created?.id ?? Math.max(0, ...rows.map((r) => r.id)) + 1;
    const name = created?.name || created?.title_name || "New Department";

    const newRow = {
      id,
      name,
      members: 0,
      head: { name: "—", avatar: "/images/img_avatar_image_39.png" },
      avgAge: "—",
      tenureYears: "—",
      malePct: 0,
      femalePct: 0,
    };
    setRows((prev) => [newRow, ...prev]);
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto mt-6 w-full max-w-[1180px] rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        {/* Top bar */}
        <div className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between">
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} onSearch={setSearch} className="w-full sm:flex-1" />
          <div className="flex gap-2">
            <button
              onClick={() => setOpenCreate(true)}
              className="rounded-xl bg-[#2b6171] px-4 py-2 text-sm font-medium text-white hover:bg-[#214b59]"
            >
              + New department
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[880px]">
            <thead>
              <tr className="text-left text-[13px] font-medium text-[#9aa3af]">
                <th className="py-3 px-3">Department name</th>
                <th className="py-3 px-3">Members</th>
                <th className="py-3 px-3">Head of the department</th>
                <th className="py-3 px-3">Averages</th>
                <th className="py-3 px-3">Gender distribution</th>
                <th className="py-3 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50/40">
                  {/* Department */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <InitialBadge name={d.name} />
                      <div className="text-sm text-[#0f172a]">{d.name}</div>
                    </div>
                  </td>

                  {/* Members */}
                  <td className="py-4 px-3 text-sm text-[#0f172a]">{d.members}</td>

                  {/* Head */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <img src={d.head.avatar} alt={d.head.name} className="h-9 w-9 rounded-full object-cover" />
                      <div className="text-sm text-[#0f172a]">{d.head.name}</div>
                    </div>
                  </td>

                  {/* Averages (Age/Tenure) */}
                  <td className="py-4 px-3">
                    <div className="text-sm text-[#0f172a]">Age {d.avgAge} years</div>
                    <div className="text-[12px] text-[#9aa3af]">Tenure: {d.tenureYears} years</div>
                  </td>

                  {/* Gender distribution */}
                  <td className="py-4 px-3">
                    <div className="space-y-2">
                      <Bar value={d.femalePct} />
                      <Bar value={d.malePct} />
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-3 text-right">
                    <RowArrow onClick={() => goToDepartment(d.id)} />
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

      {/* Create Department Modal */}
      <CreateDepartment
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default DepartmentsPage;
