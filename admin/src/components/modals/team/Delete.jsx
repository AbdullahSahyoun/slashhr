import React, { useEffect, useState } from "react";

const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function delJSON(url) {
  const res = await fetch(url, { method: "DELETE", headers: { Accept: "application/json" } });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}

export default function Delete({ open, onClose, team, onDeleted }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { if (open) setErr(""); }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && !busy && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onClose]);

  const remove = async () => {
    if (!team?.id) return;
    setBusy(true); setErr("");
    try {
      await delJSON(`${API_ORIGIN}/org/team/${team.id}`);
      onDeleted?.(team.id);
      onClose?.();
    } catch (e) {
      try {
        const p = JSON.parse(e.message);
        setErr(p?.message || "Delete failed");
      } catch {
        setErr(e.message || "Delete failed");
      }
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110]">
      <div className="absolute inset-0 bg-black/60" onClick={() => !busy && onClose?.()} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-[560px] rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
            <h3 className="text-[20px] font-bold text-[#2b6171]">
              Are you sure you want to delete the {team?.name || "team"} team?
            </h3>
            <button
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => !busy && onClose?.()}
              aria-label="Close"
            >✕</button>
          </div>

          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">
              This action will unassign employees from this team, but it won't remove them from the platform.
            </p>
            {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
          </div>

          <div className="px-6 py-4 bg-[#1f4d57]">
            <button
              onClick={remove}
              disabled={busy}
              className="w-full rounded-xl bg-[#1f4d57] text-white py-2 font-medium border border-white/15 hover:bg-[#1b434c] disabled:opacity-60"
            >
              {busy ? "Deleting…" : "Delete team"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
