import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../../../components/common/Sidebar";
import { Edit, Trash2, UserPlus } from "lucide-react";

/* =================== Config =================== */
const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";

/* =================== HTTP helpers =================== */
async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...opts });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}
async function delJSON(url) {
  const res = await fetch(url, { method: "DELETE", headers: { Accept: "application/json" } });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}

/* =================== Small UI bits =================== */
const SearchInput = ({ value, onChange, onSearch, placeholder = "Search", className = "" }) => (
  <div className={`relative ${className}`}>
    <input
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === "Enter" && onSearch?.(value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
    />
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  </div>
);

const InitialBadge = ({ name, className = "" }) => {
  const letter = (name?.[0] || "?").toUpperCase();
  const palette = ["#A7F3D0", "#93C5FD", "#FDE68A", "#FCA5A5", "#C4B5FD"];
  const bg = palette[(name?.length || 0) % palette.length];
  return (
    <div
      className={`h-12 w-12 rounded-full grid place-items-center font-semibold ${className}`}
      style={{ background: bg, color: "#0b3b3a" }}
    >
      {letter}
    </div>
  );
};

const RowArrow = () => (
  <button
    type="button"
    className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
      <path
        fill="currentColor"
        d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 0 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.01z"
      />
    </svg>
  </button>
);

/* =================== Page =================== */
const DepartmentPage = ({ departmentId: propdepartmentId, onBack }) => {
  const embedded = !!onBack;
  const [departmentId, setdepartmentId] = useState(propdepartmentId ?? null);

  useEffect(() => {
    if (propdepartmentId != null) {
      setdepartmentId(propdepartmentId);
      return;
    }
    const p = new URLSearchParams(window.location.search);
    const id = Number(p.get("id") || 0);
    if (id) setdepartmentId(id);
  }, [propdepartmentId]);

  const [department, setdepartment] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [search, setSearch] = useState("");
  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? members.filter((m) => String(m.name).toLowerCase().includes(q)) : members;
  }, [search, members]);

  const load = async (id) => {
    setLoading(true);
    setErr("");
    try {
      const [t, ls, ms] = await Promise.all([
        getJSON(`${API_ORIGIN}/org/department/${id}`),
        getJSON(`${API_ORIGIN}/org/department/${id}/leaders`),
        getJSON(`${API_ORIGIN}/org/department/${id}/members`),
      ]);
      setdepartment(t);
      setLeaders(
        (Array.isArray(ls) ? ls : []).map((x) => ({
          id: x.id ?? x.EmployeeID,
          name: x.name ?? x.full_name,
        }))
      );
      setMembers(
        (Array.isArray(ms) ? ms : []).map((x) => ({
          id: x.id ?? x.EmployeeID,
          name: x.name ?? x.full_name,
          level: x.level ?? x.job_title ?? "",
          hired: x.hired_on ?? x.hired ?? "",
          manager: x.manager_name ?? "",
        }))
      );
    } catch (e) {
      setErr(e.message || "Failed to load department");
      setdepartment(null);
      setLeaders([]);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (departmentId) load(departmentId);
  }, [departmentId]);

  const Content = (
    <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 py-5 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-[#0b3b3a]">People &amp; Org</span>
        <span>/</span>
        <span className="text-gray-500">departments</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {department?.name || (departmentId ? `#${departmentId}` : "department")}
        </span>
      </div>

      {/* Title card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <InitialBadge name={department?.name || "department"} />
            <div>
              <h1 className="text-[18px] font-semibold text-[#0f172a]">
                {department?.name || "department"}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">
                {department?.description ||
                  "combines development (Dev) and operations (Ops) to increase the efficiency, speed, and security of software development and delivery compared to traditional processes"}
              </p>
            </div>
          </div>

          {/* Buttons (no modals now, but kept UI) */}
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50">
              <Edit className="h-4 w-4 text-gray-600" />
              Edit
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4 text-red-600" />
              Delete
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#2b6171] px-3 py-2 text-xs font-medium text-white hover:bg-[#214b59]">
              <UserPlus className="h-4 w-4 text-white" />
              Add members
            </button>
          </div>
        </div>
        {err && <div className="mt-3 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{err}</div>}
      </div>

      {/* Leaders panel */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-[#0f172a]">department leaders</h2>
        {loading ? (
          <div className="h-28 grid place-items-center text-sm text-gray-500">Loading…</div>
        ) : leaders.length === 0 ? (
          <div className="h-28 grid place-items-center text-xs text-gray-500">There are no department leaders.</div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {leaders.map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">
                <InitialBadge name={l.name} />
                <div className="text-sm">{l.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Members panel */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-semibold text-[#0f172a]">department members</h2>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} onSearch={setSearch} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="text-left text-[13px] font-medium text-[#9aa3af]">
                <th className="py-3 px-4">Full name</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Hired</th>
                <th className="py-3 px-4">Manager</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>
                    Loading…
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td className="py-10 px-4 text-center text-xs text-gray-500" colSpan={5}>
                    There are no department members.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="border-t border-gray-100 hover:bg-gray-50/40">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <InitialBadge name={m.name} className="h-9 w-9" />
                        <div className="text-sm text-[#0f172a]">{m.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{m.level || "—"}</td>
                    <td className="py-4 px-4 text-sm">{m.hired || "—"}</td>
                    <td className="py-4 px-4 text-sm">{m.manager || "—"}</td>
                    <td className="py-4 px-4 text-right">
                      <RowArrow />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (embedded) return <div className="w-full bg-[#f8fafc]">{Content}</div>;

  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar className="shrink-0" activeKey="people-org" />
      <div className="flex-1 flex flex-col lg:ml-[270px] bg-[#f8fafc]">{Content}</div>
    </div>
  );
};

export default DepartmentPage;
