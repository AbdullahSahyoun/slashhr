import React, { useEffect, useMemo, useState } from "react";
// adjust this import path if your file is elsewhere
import Sidebar from "../../../../components/common/Sidebar";

/* =================== Config =================== */
const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TENANT_ID = 1;

/* =================== HTTP helpers =================== */
async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...opts });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
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
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
);
const InitialBadge = ({ name, className = "" }) => {
  const letter = (name?.[0] || "?").toUpperCase();
  const palette = ["#A7F3D0", "#93C5FD", "#FDE68A", "#FCA5A5", "#C4B5FD"];
  const bg = palette[(name?.length || 0) % palette.length];
  return (
    <div className={`h-12 w-12 rounded-full grid place-items-center font-semibold ${className}`} style={{ background: bg, color: "#0b3b3a" }}>
      {letter}
    </div>
  );
};
const RowArrow = () => (
  <button type="button" className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
      <path fill="currentColor" d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 0 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.01z"/>
    </svg>
  </button>
);

/* =================== Select Employees Modal =================== */
function SelectEmployeesModal({ open, onClose, onSubmit, title = "Add members", role = "member", teamId }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState({});
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    setQuery(""); setRows([]); setSelected({}); setErr("");
  }, [open]);

  // Search via employees-flag (try /org/... first, then /team/...)
  const search = async () => {
    if (!teamId) return;
    setLoading(true); setErr("");
    try {
      const excludeLeaders = role === "member";
      const q = encodeURIComponent(query || "");
      const base1 = `${API_ORIGIN}/org/team/employees-flag?tenantId=${TENANT_ID}&teamId=${teamId}&search=${q}&excludeLeaders=${excludeLeaders}`;
      const base2 = `${API_ORIGIN}/team/employees-flag?tenantId=${TENANT_ID}&teamId=${teamId}&search=${q}&excludeLeaders=${excludeLeaders}`;
      let data;
      try {
        data = await getJSON(base1);
      } catch {
        data = await getJSON(base2);
      }
      const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      setRows(arr.map(e => ({
        id: e.id ?? e.employeeId ?? e.EmployeeID,
        name: e.name ?? e.full_name ?? e.DisplayName ?? "Employee",
        in_team: !!e.in_team,
        is_team_leader: !!e.is_team_leader,
      })));
    } catch (e) {
      setErr(e.message || "Search failed"); setRows([]);
    } finally { setLoading(false); }
  };

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const ids = Object.keys(selected).filter((k) => selected[k]).map(Number);

  const submit = async () => {
    if (ids.length === 0) return onClose?.();
    try { await onSubmit?.(ids, role); onClose?.(); }
    catch (e) { setErr(e.message || "Failed to add"); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose?.()} />
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-semibold text-[#2b6171]">{title}</h3>
              <p className="text-xs text-gray-500 mt-1">Search and select employees to add to this team.</p>
            </div>
            <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100" onClick={() => onClose?.()}>✕</button>
          </div>

          <div className="px-4 py-3 space-y-3">
            {err && <div className="text-sm text-red-600">{err}</div>}
            <div className="flex gap-2">
              <SearchInput value={query} onChange={(e)=>setQuery(e.target.value)} onSearch={search} className="flex-1" placeholder="Search employees" />
              <button onClick={search} className="rounded-xl bg-[#2b6171] px-4 py-2 text-sm font-medium text-white hover:bg-[#214b59]">Search</button>
            </div>

            <div className="max-h-72 overflow-auto border border-gray-100 rounded-xl">
              {loading && <div className="p-3 text-sm text-gray-500">Loading…</div>}
              {!loading && rows.length === 0 && <div className="p-3 text-sm text-gray-500">No results.</div>}
              {!loading && rows.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-center gap-3 p-3 border-b last:border-b-0 border-gray-100 ${
                    (role === "member" && r.in_team) || (role === "leader" && r.is_team_leader) ? "opacity-60" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selected[r.id]}
                    disabled={(role === "member" && r.in_team) || (role === "leader" && r.is_team_leader)}
                    onChange={()=>toggle(r.id)}
                  />
                  <InitialBadge name={r.name} />
                  <div className="text-sm">
                    {r.name}
                    {r.in_team && role === "member" && <span className="ml-2 text-xs text-gray-500">(already in team)</span>}
                    {r.is_team_leader && role === "leader" && <span className="ml-2 text-xs text-gray-500">(already leader)</span>}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 bg-[#1f4d57]">
            <button onClick={submit} className="w-full rounded-lg bg-[#1f4d57] text-white py-2 font-medium hover:bg-[#1b434c]">
              Add {ids.length ? `(${ids.length})` : "selected"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================== Page =================== */
const TeamPage = ({ teamId: propTeamId, onBack }) => {
  const embedded = !!onBack;
  const [teamId, setTeamId] = useState(propTeamId ?? null);

  useEffect(() => {
    if (propTeamId != null) { setTeamId(propTeamId); return; }
    const p = new URLSearchParams(window.location.search);
    const id = Number(p.get("id") || 0);
    if (id) setTeamId(id);
  }, [propTeamId]);

  const [team, setTeam] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [search, setSearch] = useState("");
  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? members.filter((m) => String(m.name).toLowerCase().includes(q)) : members;
  }, [search, members]);

  const [openAddMembers, setOpenAddMembers] = useState(false);
  const [openAddLeaders, setOpenAddLeaders] = useState(false);

  const load = async (id) => {
    setLoading(true); setErr("");
    try {
      // Try to get team meta from /team/:id, but don't fail the page if it's missing
      try {
        const t = await getJSON(`${API_ORIGIN}/team/${id}?tenantId=${TENANT_ID}`);
        const teamObj = t?.team || t || null;
        setTeam(teamObj);
      } catch { /* ignore 404 or missing route */ }

      // Your working endpoints:
      const [ls, ms] = await Promise.all([
        getJSON(`${API_ORIGIN}/team/leaders/${id}?tenantId=${TENANT_ID}`),
        getJSON(`${API_ORIGIN}/team/members/${id}?tenantId=${TENANT_ID}`),
      ]);

      const leadersArr = Array.isArray(ls?.items) ? ls.items : Array.isArray(ls) ? ls : [];
      setLeaders(leadersArr.map(x => ({
        id: x.employeeId ?? x.id ?? x.EmployeeID,
        name: x.name ?? x.full_name ?? x.DisplayName ?? "Employee",
      })));

      const memArr = Array.isArray(ms?.items) ? ms.items : Array.isArray(ms) ? ms : [];
      setMembers(memArr.map(x => ({
        id: x.id ?? x.EmployeeID ?? x.employeeId,
        name: x.name ?? x.full_name ?? x.DisplayName ?? "Employee",
        level: x.level ?? x.job_title ?? "",
        hired: x.hired_on ?? x.hired ?? "",
        manager: x.manager_name ?? "",
      })));
    } catch (e) {
      setErr(e.message || "Failed to load team");
      setTeam(null); setLeaders([]); setMembers([]);
    } finally { setLoading(false); }
  };
  useEffect(() => { if (teamId) load(teamId); }, [teamId]);

  // Add members/leaders — try both API shapes, use whichever works
  const addPeople = async (ids, role) => {
    const path = role === "leader" ? "leaders" : "members";
    for (const employeeId of ids) {
      let succeeded = false;
      // 1) Old org route
      try {
        await postJSON(`${API_ORIGIN}/org/team/${teamId}/${path}`, { tenantId: TENANT_ID, employeeId });
        succeeded = true;
      } catch {
        // 2) New team-first route
        await postJSON(`${API_ORIGIN}/team/${path}/${teamId}`, { tenantId: TENANT_ID, employeeId });
        succeeded = true;
      }
      if (!succeeded) throw new Error(`Failed to add ${role} ${employeeId}`);
    }
    await load(teamId);
  };

  const handleDelete = async () => {
    if (!teamId) return;
    if (!confirm("Delete this team?")) return;
    await delJSON(`${API_ORIGIN}/org/team/${teamId}`); // keep your existing delete if that's the one you implemented
    if (onBack) onBack();
    else window.location.href = "/org?tab=Teams";
  };

  const Content = (
    <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 py-5">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-[#0b3b3a]">People &amp; Org</span>
        <span>/</span>
        <span className="text-gray-500">Teams</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{team?.name || (teamId ? `Team #${teamId}` : "Team")}</span>
      </div>

      {/* Title card */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <InitialBadge name={team?.name || `Team #${teamId}`} />
            <div>
              <h1 className="text-xl font-semibold text-[#0f172a]">{team?.name || `Team #${teamId}`}</h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">
                {team?.description || "Team description is not available."}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {embedded && (
              <button onClick={onBack} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                Back
              </button>
            )}
            <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">Edit</button>
            <button onClick={handleDelete} className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              Delete
            </button>
            <button onClick={()=>setOpenAddMembers(true)} className="rounded-xl bg-[#2b6171] px-3 py-2 text-sm font-medium text-white hover:bg-[#214b59]">
              + Add members
            </button>
          </div>
        </div>
        {err && <div className="mt-3 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{err}</div>}
      </div>

      {/* Leaders */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0f172a]">Team leaders</h2>
          <button onClick={()=>setOpenAddLeaders(true)} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50">
            Add team leaders
          </button>
        </div>
        {loading && <div className="text-sm text-gray-500">Loading…</div>}
        {!loading && leaders.length === 0 && (
          <div className="h-28 grid place-items-center text-sm text-gray-500">There are no team leaders.</div>
        )}
        {!loading && leaders.length > 0 && (
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

      {/* Members */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white">
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0f172a]">Team members</h2>
          </div>
          <SearchInput value={search} onChange={(e)=>setSearch(e.target.value)} onSearch={setSearch} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="text-left text-[13px] font-medium text-[#9aa3af] border-t border-gray-100">
                <th className="py-3 px-4">Full name</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Hired</th>
                <th className="py-3 px-4">Manager</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>Loading…</td></tr>
              )}
              {!loading && filteredMembers.map((m) => (
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
                  <td className="py-4 px-4 text-right"><RowArrow /></td>
                </tr>
              ))}
              {!loading && filteredMembers.length === 0 && (
                <tr><td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>There are no team members.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:p-5">
          <button onClick={()=>setOpenAddMembers(true)} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50">
            Add members
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="w-full bg-[#f8fafc]">
        {Content}
        <SelectEmployeesModal
          open={openAddMembers}
          onClose={()=>setOpenAddMembers(false)}
          onSubmit={addPeople}
          title="Add members"
          role="member"
          teamId={teamId}
        />
        <SelectEmployeesModal
          open={openAddLeaders}
          onClose={()=>setOpenAddLeaders(false)}
          onSubmit={addPeople}
          title="Add team leaders"
          role="leader"
          teamId={teamId}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar className="shrink-0" activeKey="people-org" />
      <div className="flex-1 flex flex-col lg:ml-[270px] bg-[#f8fafc]">
        {Content}
      </div>

      <SelectEmployeesModal
        open={openAddMembers}
        onClose={()=>setOpenAddMembers(false)}
        onSubmit={addPeople}
        title="Add members"
        role="member"
        teamId={teamId}
      />
      <SelectEmployeesModal
        open={openAddLeaders}
        onClose={()=>setOpenAddLeaders(false)}
        onSubmit={addPeople}
        title="Add team leaders"
        role="leader"
        teamId={teamId}
      />
    </div>
  );
};

export default TeamPage;
