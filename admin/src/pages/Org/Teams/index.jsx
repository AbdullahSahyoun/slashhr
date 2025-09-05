import React, { useEffect, useMemo, useRef, useState } from "react";

const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";

/* ---------- HTTP helpers ---------- */
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
async function getJSON(url) {
  const res = await fetch(url, { headers });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}
async function postJSON(url, body) {
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}

/* ---------- UI bits ---------- */
const SearchInput = ({ value, onChange, onSearch, className = "" }) => (
  <div className={`relative ${className}`}>
    <input
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === "Enter" && onSearch?.(value)}
      placeholder="Search"
      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
    />
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
);

const InitialBadge = ({ name }) => {
  const initial = (name?.[0] || "?").toUpperCase();
  const colors = ["#A7F3D0", "#93C5FD", "#FDE68A", "#FCA5A5", "#C4B5FD"];
  const color = colors[(name?.length || 0) % colors.length];
  return (
    <div className="h-8 w-8 rounded-full grid place-items-center font-semibold" style={{ background: color, color: "#0b3b3a" }}>
      {initial}
    </div>
  );
};

const Progress = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
    <div className="h-full rounded-full bg-[#2b6171]" style={{ width: `${Math.max(0, Math.min(100, Number(value) || 0))}%` }} />
  </div>
);

const RowArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
    aria-label="Open team"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
      <path
        fill="currentColor"
        d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 0 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.01z"
      />
    </svg>
  </button>
);

/* ---------- New Team Modal ---------- */
const NewTeamModal = ({ open, onClose, onCreate, creating = false, error = "" }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [localErr, setLocalErr] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    if (open) {
      setLocalErr("");
      setTimeout(() => nameRef.current?.focus(), 50);
    } else {
      setName("");
      setDesc("");
      setLocalErr("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && open && !creating && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, creating, onClose]);

  const submit = () => {
    if (!name.trim()) return setLocalErr("Team name is required.");
    onCreate({ name: name.trim(), description: desc.trim() }, () => {
      setName("");
      setDesc("");
      setLocalErr("");
      onClose();
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div onClick={() => !creating && onClose()} className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">New Team</h3>
            <button
              type="button"
              disabled={creating}
              onClick={onClose}
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"/>
              </svg>
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Team name</label>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., DevOps"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                placeholder="Optional"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171] resize-none"
              />
            </div>
            {(localErr || error) && <div className="text-sm text-red-600">{localErr || error}</div>}
          </div>

          <div className="p-5 pt-0">
            <button
              type="button"
              onClick={submit}
              disabled={creating}
              className="w-full rounded-xl bg-[#2b6171] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#214b59] disabled:opacity-60"
            >
              {creating ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */
const TeamsPage = () => {
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const loadTeams = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await getJSON(`${API_ORIGIN}/team/`);
      const arr = Array.isArray(data?.items) ? data.items : [];
      const mapped = arr.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description ?? "",
        is_active: !!t.is_active,
        members: 0,
        avgAge: "—",
        tenureYears: "—",
        malePct: 0,
        femalePct: 0,
        avatar: "",
      }));
      setTeams(mapped);
    } catch (e) {
      setErr(e.message || "Failed to load teams");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter((t) => String(t.name).toLowerCase().includes(q));
  }, [search, teams]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto mt-6 w-full max-w-[1180px] rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} onSearch={setSearch} className="w-full sm:flex-1" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowNew(true)}
              className="self-end sm:self-auto rounded-xl bg-[#2b6171] px-4 py-2 text-sm font-medium text-white hover:bg-[#214b59]"
            >
              + New team
            </button>
            <button
              type="button"
              onClick={loadTeams}
              className="self-end sm:self-auto rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#2b6171] hover:bg-gray-50"
              title="Reload"
            >
              Reload
            </button>
          </div>
        </div>

        {/* Errors/Loading */}
        {err && <div className="mt-3 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{err}</div>}
        {loading && <div className="mt-3 text-sm text-gray-500">Loading…</div>}

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="text-left text-[13px] font-medium text-[#9aa3af]">
                <th className="py-3 px-3">Team name</th>
                <th className="py-3 px-3">Members</th>
                <th className="py-3 px-3">Age &amp; tenure</th>
                <th className="py-3 px-3">Gender distribution</th>
                <th className="py-3 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50/40">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <InitialBadge name={t.name} />
                      <div className="text-sm text-[#0f172a]">
                        <div className="font-medium">{t.name}</div>
                        {t.description ? <div className="text-xs text-gray-500">{t.description}</div> : null}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3 text-sm text-[#0f172a]">{t.members}</td>

                  <td className="py-4 px-3">
                    <div className="text-sm text-[#0f172a]">Age {t.avgAge}</div>
                    <div className="text-[12px] text-[#9aa3af]">Tenure: {t.tenureYears}</div>
                  </td>

                  <td className="py-4 px-3">
                    <div className="flex items-center gap-6">
                      <div className="flex-1 space-y-2">
                        <Progress value={t.femalePct} />
                        <Progress value={t.malePct} />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3 text-right">
                    {/* Hard navigation to /team?id={id} */}
                    <RowArrow onClick={() => (window.location.href = `/organization/team?id=${t.id}`)} />
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="py-6 px-3 text-sm text-gray-500" colSpan={5}>
                    No teams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination (static) */}
        <div className="mt-4 flex items-center justify-between">
          <button type="button" className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            ← Previous
          </button>
          <span className="text-xs text-gray-500">
            Showing data {filtered.length} of {teams.length} entries
          </span>
          <button type="button" className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            Next →
          </button>
        </div>
      </div>

      {/* Modal */}
      <NewTeamModal
        open={showNew}
        onClose={() => {
          setShowNew(false);
          setCreateErr("");
        }}
        onCreate={async ({ name, description }, done) => {
          setCreating(true);
          setCreateErr("");
          try {
            const created = await postJSON(`${API_ORIGIN}/team/`, {
              name,
              description,
              is_active: true,
            });
            const t = created?.item || created;
            const newRow = {
              id: t?.id ?? Math.max(0, ...teams.map((x) => x.id || 0)) + 1,
              name: t?.name ?? name,
              description: t?.description ?? description ?? "",
              is_active: t?.is_active ?? true,
              members: 0,
              avgAge: "—",
              tenureYears: "—",
              malePct: 0,
              femalePct: 0,
              avatar: "",
            };
            setTeams((prev) => [newRow, ...prev]);
            done?.();
          } catch (e) {
            try {
              const parsed = JSON.parse(e.message);
              setCreateErr(parsed?.message || "Failed to create team");
            } catch {
              setCreateErr(e.message || "Failed to create team");
            }
          } finally {
            setCreating(false);
          }
        }}
        creating={creating}
        error={createErr}
      />
    </div>
  );
};

export default TeamsPage;
