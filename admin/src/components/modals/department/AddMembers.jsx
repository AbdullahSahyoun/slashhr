

// =============================================
// File: src/components/modals/department/AddMembers.jsx
// =============================================
import React, { useEffect, useMemo, useState } from "react";

const API_ORIGIN4 = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TENANT_ID4 = 1;

async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...opts });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}
async function postJSON4(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}

const SearchInput4 = ({ value, onChange, onEnter, placeholder = "Search" }) => (
  <div className="relative">
    <input
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      placeholder={placeholder}
      className="w-full rounded-[10px] border border-[#E6E7EA] bg-white pl-10 pr-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#2b6171]"
    />
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A6AE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
);

const Avatar4 = ({ name }) => {
  const ch = (name?.[0] || "?").toUpperCase();
  const colors = ["#E6F3FF", "#FEE2E2", "#EDE9FE", "#DCFCE7", "#FFF7ED"];
  const c = colors[(name?.length || 0) % colors.length];
  return (
    <div className="h-7 w-7 shrink-0 rounded-full grid place-items-center text-[11px] font-semibold text-[#0f172a]" style={{ background: c }}>
      {ch}
    </div>
  );
};

const List4 = ({ items, selected, onToggle }) => (
  <div className="mt-2 max-h-64 overflow-auto rounded-[10px] border border-[#EFF0F2]">
    {items.length === 0 ? (
      <div className="p-3 text-[13px] text-[#6B7280]">No results.</div>
    ) : (
      items.map((r) => (
        <label key={r.id} className="flex items-center gap-3 p-3 border-b last:border-b-0 border-[#EFF0F2]">
          <input type="checkbox" className="h-[14px] w-[14px] accent-[#2b6171]" checked={!!selected[r.id]} onChange={() => onToggle(r.id)} />
          <Avatar4 name={r.name} />
          <div className="text-[13px] text-[#0f172a]">{r.name}</div>
        </label>
      ))
    )}
  </div>
);

export default function AddDepartmentMembersModal({ open, onClose, departmentId, onAdded }) {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  const [sel, setSel] = useState({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    setQ("");
    setRows([]);
    setSel({});
    setErr("");
  }, [open]);

  const ids = useMemo(() => Object.keys(sel).filter((k) => sel[k]).map(Number), [sel]);

  const search = async () => {
    const data = await getJSON(`${API_ORIGIN4}/employee/search?q=${encodeURIComponent(q)}&tenantId=${TENANT_ID4}`);
    const arr = Array.isArray(data) ? data : [];
    setRows(
      arr.map((e) => ({ id: e.id ?? e.EmployeeID ?? e.employee_id, name: e.full_name ?? e.name ?? e.DisplayName ?? "Employee" }))
    );
  };

  const submit = async () => {
    if (!departmentId) return;
    if (ids.length === 0) { onClose?.(); return; }
    setBusy(true); setErr("");
    try {
      // POST /org/department/:id/members
      await postJSON4(`${API_ORIGIN4}/org/department/${departmentId}/members`, {
        tenantId: TENANT_ID4,
        employeeIds: ids,
      });
      onAdded?.(ids);
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
      <div className="absolute inset-0 bg-black/40" onClick={() => !busy && onClose?.()} />
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w/full max-w-[720px] rounded-[18px] bg-white shadow-2xl overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-[#EFF0F2] flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-semibold text-[#184A55]">Add Department Members</h3>
              <p className="mt-1 text-[12px] text-[#6B7280]">Search and select employees to add to this department.</p>
            </div>
            <button type="button" onClick={() => !busy && onClose?.()} className="h-8 w-8 grid place-items-center rounded-full text-[#7A7F87] hover:bg-[#F4F5F7]" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7A1 1 0 1 0 5.7 7.1L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/></svg>
            </button>
          </div>

          <div className="px-6 py-5 space-y-3">
            {err && <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-[13px] text-red-700">{err}</div>}

            <div className="grid gap-2">
              <SearchInput4 value={q} onChange={(e) => setQ(e.target.value)} onEnter={search} />
              <List4 items={rows} selected={sel} onToggle={(id) => setSel((s) => ({ ...s, [id]: !s[id] }))} />
            </div>
          </div>

          <div className="px-6 py-4 bg-[#1f4d57]">
            <button type="button" disabled={busy} onClick={submit} className="w-full rounded-xl bg-[#1f4d57] text-white py-2 font-medium hover:bg-[#1b434c] disabled:opacity-60">
              {busy ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
