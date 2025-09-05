import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function delJSON(url) {
  const res = await fetch(url, { method: "DELETE", headers: { Accept: "application/json" } });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}

/**
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - job: { id: number, title_name?: string }
 * - onDeleted?: (deletedId: number) => void
 */
export default function Delete({ open, onClose, job, onDeleted }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const hasId = !!job?.id;

  useEffect(() => {
    if (open) setErr("");
  }, [open]);

  // ESC to close, ENTER to confirm
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !busy) onClose?.();
      if (e.key === "Enter" && !busy) remove();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, busy, hasId]);

  const remove = async () => {
    if (!hasId) {
      setErr("Missing job id. Please reopen the page and try again.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      await delJSON(`${API_ORIGIN}/job/delete/${job.id}`); // or /job-titles/delete/:id if you prefer the alias
      onDeleted?.(job.id);
      navigate("/organization"); // redirect after success
      onClose?.();
    } catch (e) {
      try {
        const p = JSON.parse(e.message);
        setErr(p?.message || "Delete failed");
      } catch {
        setErr(e.message || "Delete failed");
      }
      console.error("Delete job failed:", e);
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110]" role="dialog" aria-modal="true">
      {/* Overlay (z-10) */}
      <div
        className="absolute inset-0 bg-black/60 z-10"
        onClick={() => !busy && onClose?.()}
      />
      {/* Modal (z-20) */}
      <div className="absolute inset-0 z-20 grid place-items-center p-4">
        <div className="w-full max-w-[560px] rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
            <h3 className="text-[20px] font-bold text-[#2b6171]">
              Delete “{job?.title_name || "job"}”?
            </h3>
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => !busy && onClose?.()}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">
              This will remove the job title from your organization. Employees currently using this
              title will keep their profiles, but you may need to assign them a new title.
            </p>
            {!hasId && (
              <div className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                No job id passed to the modal. The Delete button is disabled.
              </div>
            )}
            {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
          </div>

          <div className="px-6 py-4 bg-[#1f4d57]">
            <button
              type="button"
              onClick={remove}
              disabled={busy || !hasId}
              className="w-full rounded-xl bg-[#1f4d57] text-white py-2 font-medium border border-white/15 hover:bg-[#1b434c] disabled:opacity-60"
            >
              {busy ? "Deleting…" : "Delete job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
