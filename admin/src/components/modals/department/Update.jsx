
// =============================================
// File: src/components/modals/department/Update.jsx
// =============================================
import React, { useEffect, useState } from "react";

const API_ORIGIN2 = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function patchJSON(url, body) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}

function InitialBadge({ name }) {
  const letter = (name?.[0] || "?").toUpperCase();
  return (
    <div className="h-[64px] w-[64px] rounded-2xl grid place-items-center font-semibold text-white" style={{ background: "#2b6171" }}>
      {letter}
    </div>
  );
}

export default function UpdateDepartmentModal({ open, onClose, department, onSaved }) {
  const [name, setName] = useState(department?.name || "");
  const [description, setDescription] = useState(department?.description || "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(department?.name || "");
    setDescription(department?.description || "");
    setErr("");
  }, [open, department]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && !saving && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, saving, onClose]);

  const canSave = name.trim().length > 0 && !saving;

  const save = async () => {
    if (!department?.id || !canSave) return;
    setSaving(true); setErr("");
    try {
      const body = { name: name.trim(), description: description.trim() };
      // PATCH /org/department/:id
      const updated = await patchJSON(`${API_ORIGIN2}/org/department/${department.id}`, body);
      onSaved?.(updated);
      onClose?.();
    } catch (e) {
      try {
        const p = JSON.parse(e.message);
        setErr(p?.message || "Update failed");
      } catch {
        setErr(e.message || "Update failed");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      <div className="absolute inset-0 bg-black/40" onClick={() => !saving && onClose?.()} />
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w/full max-w-[560px] rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-start justify-between">
            <div>
              <h3 className="text-[18px] font-semibold text-[#2b6171]">Edit Department</h3>
              <p className="text-xs text-gray-500 mt-1">Update the department name and description.</p>
            </div>
            <button
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => !saving && onClose?.()}
              aria-label="Close"
            >✕</button>
          </div>

          <div className="px-5 py-4 space-y-4">
            <div className="flex items-center gap-4">
              <InitialBadge name={name || department?.name} />
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">Department name</span>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Finance"
              />
            </label>

            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">Description</span>
              <textarea
                rows={5}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional"
              />
            </label>
          </div>

          <div className="px-5 py-4 bg-[#1f4d57]">
            <button
              onClick={save}
              disabled={!canSave}
              className="w-full rounded-xl bg-[#1f4d57] text-white py-2 font-medium border border-white/15 hover:bg-[#1b434c] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

