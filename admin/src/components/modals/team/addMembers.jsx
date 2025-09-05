// src/components/modals/team/AddMembers.jsx
import React, { useEffect, useMemo, useState } from "react";

/* ------------ Config ------------ */
const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TENANT_ID = 1;

/* ------------ HTTP ------------ */
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

/* ------------ Small UI bits ------------ */
const SearchInput = ({ value, onChange, onEnter, placeholder = "Search" }) => (
  <div className="relative">
    <input
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      placeholder={placeholder}
      className="w-full rounded-[10px] border border-[#E6E7EA] bg-white pl-10 pr-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#2b6171]"
    />
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A6AE]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
);

const Avatar = ({ name }) => {
  const ch = (name?.[0] || "?").toUpperCase();
  const colors = ["#E6F3FF", "#FEE2E2", "#EDE9FE", "#DCFCE7", "#FFF7ED"];
  const c = colors[(name?.length || 0) % colors.length];
  return (
    <div
      className="h-7 w-7 shrink-0 rounded-full grid place-items-center text-[11px] font-semibold text-[#0f172a]"
      style={{ background: c }}
    >
      {ch}
    </div>
  );
};

const Badge = ({ children, tone = "muted" }) => {
  const tones = {
    muted: "bg-gray-100 text-gray-700 border-gray-200",
    green: "bg-green-50 text-green-800 border-green-200",
    blue: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    <span className={`ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${tones[tone]}`}>{children}</span>
  );
};

const Card = ({ title, description, enabled, onToggle, children }) => (
  <div className="rounded-[14px] border border-[#E6E7EA] bg-white">
    <div className="flex items-start justify-between px-4 py-3 border-b border-[#EFF0F2]">
      <div>
        <div className="text-[13px] font-semibold text-[#0f172a]">{title}</div>
        {description && <div className="mt-1 text-[12px] leading-5 text-[#6B7280]">{description}</div>}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`h-5 w-5 grid place-items-center rounded-full border ${
          enabled ? "bg-[#2b6171] border-[#2b6171] text-white" : "border-[#D2D6DC] text-[#9AA3AF]"
        }`}
        aria-label={enabled ? "Enabled" : "Disabled"}
        title={enabled ? "Enabled" : "Enable section"}
      >
        <svg width="10" height="10" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
      </button>
    </div>
    <div className="px-4 py-3">{children}</div>
  </div>
);

const List = ({ items, selected, onToggle, getDisabled, getBadges }) => (
  <div className="mt-2 max-h-64 overflow-auto rounded-[10px] border border-[#EFF0F2]">
    {items.length === 0 ? (
      <div className="p-3 text-[13px] text-[#6B7280]">No results.</div>
    ) : (
      items.map((r) => {
        const disabled = !!getDisabled?.(r);
        const badges = getBadges?.(r) || [];
        return (
          <label
            key={r.id}
            className={`flex items-center gap-3 p-3 border-b last:border-b-0 border-[#EFF0F2] ${disabled ? "opacity-60" : ""}`}
          >
            <input
              type="checkbox"
              className="h-[14px] w-[14px] accent-[#2b6171]"
              checked={!!selected[r.id]}
              disabled={disabled}
              onChange={() => onToggle(r.id)}
            />
            <Avatar name={r.name} />
            <div className="text-[13px] text-[#0f172a] flex items-center">
              {r.name}
              {badges.map((b, i) => (
                <Badge key={i} tone={b.tone}>{b.label}</Badge>
              ))}
            </div>
          </label>
        );
      })
    )}
  </div>
);

/* ------------ Modal ------------ */
export default function AddMembersModal({ open, onClose, teamId, onAdded }) {
  const [enableMembers, setEnableMembers] = useState(true);
  const [enableLeaders, setEnableLeaders] = useState(false);

  const [qMembers, setQMembers] = useState("");
  const [qLeaders, setQLeaders] = useState("");

  const [rowsMembers, setRowsMembers] = useState([]);
  const [rowsLeaders, setRowsLeaders] = useState([]);

  const [selMembers, setSelMembers] = useState({});
  const [selLeaders, setSelLeaders] = useState({});

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const idsMembers = useMemo(() => Object.keys(selMembers).filter((k) => selMembers[k]).map(Number), [selMembers]);
  const idsLeaders = useMemo(() => Object.keys(selLeaders).filter((k) => selLeaders[k]).map(Number), [selLeaders]);

  const mapEmployee = (e) => ({
    id: e.id ?? e.employeeId ?? e.EmployeeID,
    name: e.name ?? e.full_name ?? e.DisplayName ?? "Employee",
    in_team: !!e.in_team,
    is_team_leader: !!e.is_team_leader,
  });

  //  Members search helper (exclude leaders)
  const fetchMembers = async (search = "") => {
    const url = `${API_ORIGIN}/team/employees-flag?tenantId=${TENANT_ID}&teamId=${teamId}&excludeLeaders=true&search=${encodeURIComponent(search)}`;
    const data = await getJSON(url);
    const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    return arr.map(mapEmployee);
  };

  //  Leaders search helper (include leaders)
  const fetchLeaders = async (search = "") => {
    const url = `${API_ORIGIN}/team/employees-flag?tenantId=${TENANT_ID}&teamId=${teamId}&excludeLeaders=false&search=${encodeURIComponent(search)}`;
    const data = await getJSON(url);
    const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    return arr.map(mapEmployee);
  };

  // Default load: show CURRENT team composition
  // - Members tab → only employees with in_team === true (non-leaders)
  // - Leaders tab → only employees with is_team_leader === true
  useEffect(() => {
    if (!open || !teamId) return;

    setEnableMembers(true);
    setEnableLeaders(false);
    setQMembers("");
    setQLeaders("");
    setRowsMembers([]);
    setRowsLeaders([]);
    setSelMembers({});
    setSelLeaders({});
    setErr("");

    (async () => {
      try {
        // Load all and filter to inside team for default view
        const [allMembers, allLeadersCand] = await Promise.all([fetchMembers(""), fetchLeaders("")]);

        // Members: inside team only (non-leaders already excluded by API param)
        setRowsMembers(allMembers.filter((e) => e.in_team));

        // Leaders: currently leaders only
        setRowsLeaders(allLeadersCand.filter((e) => e.is_team_leader));
      } catch (e) {
        setErr(typeof e?.message === "string" ? e.message : "Failed to load employees");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, teamId]);

  // Auto-search while typing (debounce 400ms)
  useEffect(() => {
    if (!open || !teamId) return;
    const t = setTimeout(async () => {
      try {
        if (qMembers.trim().length > 0) {
          // search results (can include out-of-team people to add)
          const res = await fetchMembers(qMembers);
          setRowsMembers(res);
        } else {
          // if cleared -> default to inside team members again
          const res = await fetchMembers("");
          setRowsMembers(res.filter((e) => e.in_team));
        }
      } catch (e) {
        setErr(typeof e?.message === "string" ? e.message : "Failed to search members");
      }
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qMembers, open, teamId]);

  useEffect(() => {
    if (!open || !teamId) return;
    const t = setTimeout(async () => {
      try {
        if (qLeaders.trim().length > 0) {
          const res = await fetchLeaders(qLeaders);
          setRowsLeaders(res);
        } else {
          // if cleared -> show current leaders again
          const res = await fetchLeaders("");
          setRowsLeaders(res.filter((e) => e.is_team_leader));
        }
      } catch (e) {
        setErr(typeof e?.message === "string" ? e.message : "Failed to search leaders");
      }
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qLeaders, open, teamId]);

  const submit = async () => {
    if (!teamId) return;
    setBusy(true);
    setErr("");
    try {
      const calls = [];

      // Prefer new endpoints; fallback to old org endpoints
      const postMember = (employeeId) =>
        postJSON(`${API_ORIGIN}/team/members/${teamId}`, { tenantId: TENANT_ID, employeeId })
          .catch(() => postJSON(`${API_ORIGIN}/org/team/${teamId}/members`, { tenantId: TENANT_ID, employeeId }));

      const postLeader = (employeeId) =>
        postJSON(`${API_ORIGIN}/team/leaders/${teamId}`, { tenantId: TENANT_ID, employeeId })
          .catch(() => postJSON(`${API_ORIGIN}/org/team/${teamId}/leaders`, { tenantId: TENANT_ID, employeeId }));

      if (enableMembers && idsMembers.length > 0) {
        for (const employeeId of idsMembers) calls.push(postMember(employeeId));
      }
      if (enableLeaders && idsLeaders.length > 0) {
        for (const employeeId of idsLeaders) calls.push(postLeader(employeeId));
      }

      await Promise.all(calls);

      onAdded?.({
        members: enableMembers ? idsMembers : [],
        leaders: enableLeaders ? idsLeaders : [],
      });
      onClose?.();
    } catch (e) {
      try {
        const p = JSON.parse(e.message);
        setErr(p?.message || "Submit failed");
      } catch {
        setErr(e.message || "Submit failed");
      }
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={() => !busy && onClose?.()} />
      {/* modal */}
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w-full max-w-[860px] rounded-[18px] bg-white shadow-2xl overflow-hidden">
          {/* header */}
          <div className="px-6 pt-5 pb-4 border-b border-[#EFF0F2] flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-semibold text-[#184A55]">Add Members</h3>
              <p className="mt-1 text-[12px] text-[#6B7280]">
                Select one or multiple employees to add to the team.
              </p>
            </div>
            <button
              type="button"
              onClick={() => !busy && onClose?.()}
              className="h-8 w-8 grid place-items-center rounded-full text-[#7A7F87] hover:bg-[#F4F5F7]"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7A1 1 0 1 0 5.7 7.1L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"
                />
              </svg>
            </button>
          </div>

          {/* body */}
          <div className="px-6 py-5 space-y-4">
            {err && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-[13px] text-red-700">
                {err}
              </div>
            )}

            {/* members card */}
            <Card
              title="Add team members"
              description="They don't have specific permissions. Their role in the team is to extract data and take related actions."
              enabled={enableMembers}
              onToggle={() => setEnableMembers((v) => !v)}
            >
              <div className="grid gap-2">
                <SearchInput
                  value={qMembers}
                  onChange={(e) => setQMembers(e.target.value)}
                  onEnter={() => {
                    // immediate search on Enter
                    (async () => {
                      try {
                        if (qMembers.trim()) {
                          const res = await fetchMembers(qMembers);
                          setRowsMembers(res);
                        } else {
                          const res = await fetchMembers("");
                          setRowsMembers(res.filter((e) => e.in_team));
                        }
                      } catch (e) {
                        setErr(typeof e?.message === "string" ? e.message : "Failed to search members");
                      }
                    })();
                  }}
                  placeholder="Search employees (shows all; current members are disabled)…"
                />
                <List
                  items={rowsMembers}
                  selected={selMembers}
                  onToggle={(id) => setSelMembers((s) => ({ ...s, [id]: !s[id] }))}
                  getDisabled={(r) => r.in_team} // current members cannot be re-added
                  getBadges={(r) => [
                    ...(r.in_team ? [{ label: "already in team", tone: "muted" }] : []),
                  ]}
                />
              </div>
            </Card>

            {/* leaders card */}
            <Card
              title="Add team leaders"
              description="Permissions can be set to allow team leaders to view their team's information and manage time off."
              enabled={enableLeaders}
              onToggle={() => setEnableLeaders((v) => !v)}
            >
              <div className="grid gap-2">
                <SearchInput
                  value={qLeaders}
                  onChange={(e) => setQLeaders(e.target.value)}
                  onEnter={() => {
                    (async () => {
                      try {
                        if (qLeaders.trim()) {
                          const res = await fetchLeaders(qLeaders);
                          setRowsLeaders(res);
                        } else {
                          const res = await fetchLeaders("");
                          setRowsLeaders(res.filter((e) => e.is_team_leader));
                        }
                      } catch (e) {
                        setErr(typeof e?.message === "string" ? e.message : "Failed to search leaders");
                      }
                    })();
                  }}
                  placeholder="Search employees (leaders included; current leaders are disabled)…"
                />
                <List
                  items={rowsLeaders}
                  selected={selLeaders}
                  onToggle={(id) => setSelLeaders((s) => ({ ...s, [id]: !s[id] }))}
                  getDisabled={(r) => r.is_team_leader} // cannot re-add as leader
                  getBadges={(r) => [
                    ...(r.is_team_leader ? [{ label: "already leader", tone: "blue" }] : []),
                    ...(r.in_team && !r.is_team_leader ? [{ label: "member", tone: "green" }] : []),
                  ]}
                />
              </div>
            </Card>
          </div>

          {/* footer */}
          <div className="px-6 py-4 bg-[#1f4d57]">
            <button
              type="button"
              disabled={busy || (!enableMembers && !enableLeaders)}
              onClick={submit}
              className="w-full rounded-xl bg-[#1f4d57] text-white py-2 font-medium hover:bg-[#1b434c] disabled:opacity-60"
            >
              {busy ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
