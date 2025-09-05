import React, { useMemo, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import {
  Search,
  Plus,
  MoreVertical,
  Star,
  ChevronRight,
  BarChart3,
  PieChart,
  ArrowRight,
  X,
  Download,
  ChevronDown,
  Info,
} from "lucide-react";

/* ---------------- helpers ---------------- */
const fmtFullDate = (d) =>
  d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const rel = (date) => {
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  return days === 0 ? "today" : days === 1 ? "1 day ago" : `${days} days ago`;
};

/* ---------------- demo rows ---------------- */
const seedRows = [
  {
    id: 1,
    name: "My dashboard",
    createdBy: "-",
    createdOn: new Date(2025, 2, 9),
    updatedAt: new Date(Date.now() - 13 * 86400000),
    starred: false,
  },
];

/* ---------------- small ui ---------------- */
const Chip = ({ label }) => (
  <button className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs bg-white hover:bg-slate-50">
    {label} <ChevronDown className="w-3.5 h-3.5" />
  </button>
);

/* ---------------- modal ---------------- */
function CreateDashboardModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-[560px] rounded-2xl bg-white shadow-xl border">
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="text-xl font-semibold text-slate-800">Create a new dashboard</h3>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-slate-600 mb-4">
            Customize your new dashboard to better organize your company widgets.
          </p>

          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm mb-4"
          />

          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>

        <div className="rounded-b-2xl px-6 py-4 bg-slate-700 text-white">
          <button
            onClick={() => {
              if (!title.trim()) return;
              onCreate(title.trim(), desc.trim());
              onClose();
            }}
            className="w-full rounded-lg bg-white/10 backdrop-blur px-4 py-2 font-semibold hover:bg-white/20"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Insights tab ---------------- */
function SimpleLineChart() {
  // simple SVG path (fake data) to mimic smooth line with light fill
  const path =
    "M0,60 C60,50 120,55 180,48 C240,42 300,52 360,47 C420,44 480,50 540,45 C600,40 660,48 720,44";
  return (
    <svg viewBox="0 0 720 80" className="w-full h-28">
      <path d={`${path} L720,80 L0,80 Z`} fill="currentColor" className="text-sky-100" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-400" />
    </svg>
  );
}

function MiniBars({ values }) {
  return (
    <div className="flex gap-1 items-end h-24">
      {values.map((v, i) => (
        <div key={i} className="w-3 bg-slate-300 rounded" style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}

function InsightsTab() {
  return (
    <>
      {/* Filters + Export */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {["Gender", "Legal entity", "Workplace", "Manager", "Team", "Nationality"].map((l) => (
          <Chip key={l} label={l} />
        ))}
        <div className="ml-auto">
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700 text-white px-3 py-2 text-sm hover:opacity-95">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Headcount card */}
      <div className="mt-4 rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-[200px,1fr] gap-4 p-4">
          <div className="text-sm">
            <div className="text-slate-500 mb-2">March 2025</div>
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Headcount</span>
              <span className="font-semibold">35</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-sky-500" />Joiners</span>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" />Leavers</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
          <div className="px-2">
            <SimpleLineChart />
            <div className="grid grid-cols-12 text-[10px] text-slate-400 mt-1">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"].map((m) => (
                <div key={m} className="text-center">{m}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="font-medium">Retention rate</span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-[11px] text-slate-500 mb-3">1 Mar 2024 – 28 Feb 2025</div>
          <div className="text-2xl font-semibold mb-2">97.1%</div>
          <MiniBars values={[88, 90, 92, 93, 94, 92, 95, 96, 97, 96, 97, 98]} />
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="font-medium">Turnover rate</span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-[11px] text-slate-500 mb-3">1 Mar 2024 – 28 Feb 2025</div>
          <div className="text-2xl font-semibold mb-2">2.9%</div>
          <MiniBars values={[2, 1, 3, 1, 2, 2, 3, 2, 1, 1, 4, 3].map((x) => x * 20)} />
        </div>
      </div>
    </>
  );
}

/* ---------------- Advanced reports tab ---------------- */
function AdvancedReportsTab({ rows, setRows }) {
  const [q, setQ] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const filtered = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return rows;
    return rows.filter((r) => r.name.toLowerCase().includes(v));
  }, [q, rows]);

  return (
    <>
      {/* search + create */}
      <div className="flex items-center gap-3 p-3 border-b rounded-2xl border bg-white shadow-sm mt-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2 text-sm"
          />
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-slate-700 text-white px-3 py-2 text-sm font-medium hover:opacity-95"
          onClick={() => setOpenCreate(true)}
        >
          <Plus className="w-4 h-4" />
          Create dashboard
        </button>
      </div>

      {/* header */}
      <div className="mt-3 rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-[56px,1.6fr,1fr,1fr,1fr,64px] text-xs text-slate-500 font-medium px-4 py-3 border-b">
          <div></div>
          <div>Name</div>
          <div>Created by</div>
          <div>Created on</div>
          <div>Last updated</div>
          <div></div>
        </div>

        {/* rows */}
        {filtered.map((r, i) => (
          <div
            key={r.id}
            className={`grid grid-cols-[56px,1.6fr,1fr,1fr,1fr,64px] items-center px-4 ${
              i !== filtered.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="py-4">
              <button
                className="h-8 w-8 grid place-items-center rounded-full hover:bg-slate-50"
                onClick={() =>
                  setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, starred: !x.starred } : x)))
                }
              >
                <Star className={`w-4 h-4 ${r.starred ? "text-amber-500 fill-amber-500" : "text-slate-400"}`} />
              </button>
            </div>
            <div className="py-4 text-sm text-slate-800">{r.name}</div>
            <div className="py-4">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-slate-300 inline-block" />
                <span className="text-sm text-slate-500">{r.createdBy}</span>
              </div>
            </div>
            <div className="py-4 text-sm text-slate-600">{fmtFullDate(r.createdOn)}</div>
            <div className="py-4 text-sm text-slate-600">{rel(r.updatedAt)}</div>
            <div className="py-2 flex items-center justify-end gap-1">
              <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-slate-50">
                <MoreVertical className="w-4 h-4 text-slate-500" />
              </button>
              <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-slate-50">
                <ArrowRight className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">No dashboards found.</div>
        )}
      </div>

      {/* modal */}
      <CreateDashboardModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={(title, description) =>
          setRows((rs) => [
            ...rs,
            {
              id: rs.length ? Math.max(...rs.map((x) => x.id)) + 1 : 1,
              name: title,
              createdBy: "-",
              createdOn: new Date(),
              updatedAt: new Date(),
              starred: false,
              description,
            },
          ])
        }
      />
    </>
  );
}

/* ---------------- page ---------------- */
export default function AnalyticsPage() {
  const [tab, setTab] = useState("Insights"); // default like your screenshot
  const [rows, setRows] = useState(seedRows);

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ ["--sidebar-w"]: "300px" }}
    >
      <Sidebar active="analytics" />
      <main className="px-4 md:px-6 py-6" style={{ paddingLeft: "var(--sidebar-w)" }}>
        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-white border">
              <BarChart3 className="w-4 h-4 text-slate-600" />
            </span>
            <span className="text-slate-700">Analytics</span>
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-400">{tab}</span>
        </div>

        {/* tabs */}
        <div className="flex gap-6 border-b">
          {["Advanced reports", "Insights"].map((t) => (
            <button
              key={t}
              className={`-mb-px border-b-2 px-1 pb-3 text-sm font-medium ${
                tab === t ? "border-slate-700 text-slate-900" : "border-transparent text-slate-500"
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* title */}
        <div className="mt-7 flex items-start gap-3">
          <div className="h-9 w-9 grid place-items-center rounded-lg bg-white border text-slate-700">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {tab === "Insights" ? "Insights" : "Dashboards"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {tab === "Insights"
                ? "Explore headcount trends and key people metrics."
                : "View all dashboards within your organization here."}
            </p>
          </div>
        </div>

        {/* content */}
        {tab === "Insights" ? (
          <InsightsTab />
        ) : (
          <AdvancedReportsTab rows={rows} setRows={setRows} />
        )}
      </main>
    </div>
  );
}
