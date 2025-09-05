// src/pages/PeopleOrg/Jobs/JobDetailsPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/common/Sidebar";
import { Pencil, Save, Trash2, ShieldCheck, Info } from "lucide-react";

/* Delete modal */
import DeleteJobModal from "../../../../components/modals/job/Delete.jsx";

/* =================== Config =================== */
const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";

/* =================== HTTP helpers =================== */
async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...opts });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}
async function sendJSON(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}

/* =================== Small UI =================== */
const LeftSection = ({ icon: Icon, title, children }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <div className="rounded-xl border border-gray-200 bg-white p-2">
        <Icon className="text-[#2b6171]" size={18} />
      </div>
      <div className="text-[15px] font-semibold text-[#0f172a]">{title}</div>
    </div>
    <div className="text-xs leading-5 text-gray-600">{children}</div>
  </div>
);

const RightCard = ({ title, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white">
    {title ? (
      <div className="px-4 py-2.5 border-b border-gray-100 text-[13px] font-medium text-gray-700">
        {title}
      </div>
    ) : null}
    <div className="p-3 sm:p-4">{children}</div>
  </div>
);

/* =================== Page =================== */
export default function JobDetailsPage() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // supports /organization/job?id=10 and /organization/job/10
  const jobId = useMemo(() => {
    const q = new URLSearchParams(location.search).get("id");
    const raw = params.id ?? q;
    return raw ? Number(raw) : 1; // ensure it's a number
  }, [params.id, location.search]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [job, setJob] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title_name: "", description: "", is_active: true });

  /* modal state */
  const [showDelete, setShowDelete] = useState(false);

  /* ========== Load ========== */
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const j = await getJSON(`${API_ORIGIN}/job/details/${jobId}`);
        if (!alive) return;
        setJob(j);
        setForm({
          title_name: j?.title_name || "",
          description: j?.description || "",
          is_active: j?.is_active ?? true,
        });
      } catch (e) {
        if (!alive) return;
        setError("Failed to load job.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [jobId]);

  /* ========== Save (PATCH) ========== */
  const save = async () => {
    try {
      setSaving(true);
      setError("");
      const updated = await sendJSON(`${API_ORIGIN}/job/${jobId}`, "PATCH", {
        title_name: form.title_name,
        description: form.description,
        is_active: form.is_active,
      });
      setJob(updated);
      setEditMode(false);
    } catch (e) {
      setError(e?.message || "Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  /* ========== Delete (via modal) ========== */
  const openDelete = () => setShowDelete(true);
  const closeDelete = () => setShowDelete(false);

  // If your modal already navigates, this can just close the modal.
  const handleDeleted = () => {
    setShowDelete(false);
    // If your modal doesn't navigate, uncomment the next line:
    // navigate("/organization");
  };

  /* ===== Layout ===== */
  const Content = (
    <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 py-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-[#0b3b3a]">People &amp; Org</span>
          <span>›</span>
          <Link to="/organization/jobs" className="hover:underline">
            Jobs
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{job?.title_name || "Job"}</span>
        </div>

        <div className="flex items-center gap-2">
          {!editMode ? (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4 text-gray-600" />
                Edit
              </button>

              <button
                onClick={openDelete}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                title="Delete job title"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2b6171] px-3 py-2 text-xs font-medium text-white hover:bg-[#214b59] disabled:opacity-60"
            >
              <Save className="h-4 w-4 text-white" />
              Save
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-6 mb-6 text-[22px] font-semibold text-[#0f172a]">
        {job?.title_name || "Job"}
      </h1>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left column */}
        <div className="space-y-10">
          <LeftSection icon={ShieldCheck} title="Basic info">
            Edit the basic information for this role. Visible to all employees.
          </LeftSection>

          <LeftSection icon={Info} title="Meta">
            Review status and timestamps for auditing.
          </LeftSection>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <RightCard>
            {loading ? (
              <div className="h-20 grid place-items-center text-sm text-gray-500">Loading…</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Name</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                    value={editMode ? form.title_name : job?.title_name || ""}
                    onChange={(e) => setForm((f) => ({ ...f, title_name: e.target.value }))}
                    disabled={!editMode}
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea
                    rows={6}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                    value={editMode ? form.description : job?.description || ""}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    disabled={!editMode}
                    placeholder="Short description of this role…"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="text-xs font-medium text-gray-700">Active</label>
                  <button
                    type="button"
                    onClick={() =>
                      editMode && setForm((f) => ({ ...f, is_active: !f.is_active }))
                    }
                    className={[
                      "relative inline-flex h-6 w-11 items-center rounded-full transition",
                      editMode ? "cursor-pointer" : "cursor-not-allowed",
                      (editMode ? form.is_active : job?.is_active) ? "bg-emerald-500" : "bg-gray-300",
                    ].join(" ")}
                    disabled={!editMode}
                    aria-pressed={editMode ? form.is_active : job?.is_active}
                  >
                    <span
                      className={[
                        "inline-block h-5 w-5 transform rounded-full bg-white transition",
                        (editMode ? form.is_active : job?.is_active) ? "translate-x-5" : "translate-x-1",
                      ].join(" ")}
                    />
                  </button>
                </div>
              </div>
            )}
          </RightCard>

          <RightCard title="Meta">
            {job ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">Tenant</div>
                  <div className="text-[#0f172a]">{job.TenantID}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Status</div>
                  <div className="text-[#0f172a]">{job.is_active ? "Active" : "Inactive"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Created at</div>
                  <div className="text-[#0f172a]">{job.created_at}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Updated at</div>
                  <div className="text-[#0f172a]">{job.updated_at}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No meta available.</div>
            )}
          </RightCard>

          {error && <div className="rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>}
        </div>
      </div>

      {/* Delete modal */}
      <DeleteJobModal
        open={showDelete}
        onClose={closeDelete}
        job={{ id: jobId, title_name: job?.title_name }}
        onDeleted={handleDeleted}
      />
    </div>
  );

  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar className="shrink-0" activeKey="people-org" />
      <div className="flex-1 flex flex-col lg:ml-[270px] bg-[#f8fafc]">{Content}</div>
    </div>
  );
}
