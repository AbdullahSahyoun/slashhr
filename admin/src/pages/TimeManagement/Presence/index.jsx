import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  X,
} from "lucide-react";

/* avatars */
const AV_WOMAN = "/images/img_rectangle_4383.png";
const AV_MAN_1 = "/images/img_rectangle_4383_1.png";
const AV_MAN_2 = "/images/img_rectangle_4383_2.png";
const AV_MAN_3 = "/images/img_rectangle_4383_158x210.png";

/* data */
const PEOPLE = [
  { id: 1, name: "Tarik Fassi", avatar: AV_MAN_2, acquired: 18, taken: 10, adjustment: 0, request: 0, cancellation: 0, balance: 8 },
  { id: 2, name: "Rachid Benkirane", avatar: AV_MAN_1, acquired: 18, taken: 5, adjustment: 0, request: 0, cancellation: 0, balance: 13 },
  { id: 3, name: "Salim Bennis", avatar: AV_MAN_3, acquired: 18, taken: 2, adjustment: 0, request: 0, cancellation: 0, balance: 16 },
  { id: 4, name: "Ghizlane Ouazzani", avatar: AV_WOMAN, acquired: 18, taken: 15, adjustment: 0, request: 0, cancellation: 0, balance: 3 },
  { id: 5, name: "Salma El Harti", avatar: AV_WOMAN, acquired: 18, taken: 17, adjustment: 0, request: 0, cancellation: 0, balance: 1 },
];

/* small ui */
const ToolbarButton = ({ children, onClick }) => (
  <button onClick={onClick} className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center gap-2">
    {children}
  </button>
);

const ModalShell = ({ title, onClose, children, footerText = "Export" }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative z-10 w-[92vw] max-w-[540px] rounded-2xl bg-white shadow-xl">
      <div className="flex items-center justify-between px-6 pt-6">
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <button onClick={onClose} className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-100">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
      <div className="rounded-b-2xl px-6 py-4" style={{ background: "var(--brand,#0e4b3b)" }}>
        <button onClick={onClose} className="w-full rounded-lg bg-white/10 text-white px-4 py-2 font-semibold hover:bg-white/20">
          {footerText}
        </button>
      </div>
    </div>
  </div>
);

const ExportViewModal = ({ open, onClose }) => {
  const [name, setName] = useState(
    `${new Date().toISOString().slice(0,10).replace(/-/g,"")}-Headcount Evolution ${new Date().toISOString().slice(0,19).replace("T"," ")}`
  );
  const [format, setFormat] = useState("Excel");
  if (!open) return null;
  return (
    <ModalShell title="Export View" onClose={onClose}>
      <p className="text-sm text-slate-600 mb-4">Export the current view as a CSV or Excel file.</p>
      <label className="block text-sm font-medium text-slate-700 mb-1">File name</label>
      <input className="w-full rounded-xl border px-3 py-2 text-sm mb-4" value={name} onChange={(e)=>setName(e.target.value)} />
      <label className="block text-sm font-medium text-slate-700 mb-1">File format</label>
      <select className="w-full rounded-xl border px-3 py-2 text-sm" value={format} onChange={(e)=>setFormat(e.target.value)}>
        <option>Excel</option><option>CSV</option>
      </select>
    </ModalShell>
  );
};

const ExportTimeTrackingModal = ({ open, onClose }) => {
  const [type, setType] = useState("Time Tracking Export – Full Version");
  const [format, setFormat] = useState("Excel");
  const [timeFmt, setTimeFmt] = useState("Hours And Minutes (E.G. 8:30)");
  const [from, setFrom] = useState("2025-03-25");
  const [to, setTo] = useState("2025-03-25");
  if (!open) return null;
  return (
    <ModalShell title="Export Time Tracking Report" onClose={onClose}>
      <div className="grid gap-3">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Export type</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={type} onChange={(e)=>setType(e.target.value)}>
            <option>Time Tracking Export – Full Version</option><option>Time Tracking Export – Summary</option>
          </select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">File format</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={format} onChange={(e)=>setFormat(e.target.value)}>
            <option>Excel</option><option>CSV</option>
          </select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Select time format</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={timeFmt} onChange={(e)=>setTimeFmt(e.target.value)}>
            <option>Hours And Minutes (E.G. 8:30)</option><option>Decimal Hours (E.G. 8.50)</option>
          </select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Select employees</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" disabled><option>Select</option></select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Select absence types</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" disabled><option>No Absence Types Selected</option></select></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">From</label>
            <input type="date" className="w-full rounded-xl border px-3 py-2 text-sm" value={from} onChange={(e)=>setFrom(e.target.value)} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">To</label>
            <input type="date" className="w-full rounded-xl border px-3 py-2 text-sm" value={to} onChange={(e)=>setTo(e.target.value)} /></div>
        </div>
      </div>
    </ModalShell>
  );
};

const ExportAnnualBalanceModal = ({ open, onClose }) => {
  const [team, setTeam] = useState("");
  const [place, setPlace] = useState("");
  const [week, setWeek] = useState("");
  if (!open) return null;
  return (
    <ModalShell title="Export Annual Balance" onClose={onClose}>
      <p className="text-sm text-slate-600 mb-4">Select from the following options to refine your results. This data is collected from past worked hours and the forecast of planned future hours.</p>
      <div className="grid gap-3">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Team</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={team} onChange={(e)=>setTeam(e.target.value)}><option value="">Select</option></select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Workplace</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={place} onChange={(e)=>setPlace(e.target.value)}><option value="">Select</option></select></div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-sm px-3 py-2">
          Please select at least one filter: either by team or by location. If you choose both filters, the results will reflect the combination of teams and locations.
        </div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Week <span className="text-slate-400">(Choose a specific week of the year)</span></label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={week} onChange={(e)=>setWeek(e.target.value)}><option value="">Select</option></select></div>
        <div className="rounded-xl border border-sky-200 bg-sky-50 text-sky-900 text-sm px-3 py-2">
          A report of the month and corresponding year for the selected week will be generated.
        </div>
      </div>
    </ModalShell>
  );
};

export default function Presence() {
  const [search, setSearch] = useState("");
  const [dateCursor, setDateCursor] = useState(new Date());
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'view' | 'time' | 'annual'

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PEOPLE;
    return PEOPLE.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <>
      {/* Toolbar */}
      <div className="mt-0 flex flex-wrap items-center gap-2">
        <ToolbarButton>Filter by</ToolbarButton>

        <div className="flex items-center rounded-lg border bg-white">
          <button className="px-2 py-2 hover:bg-slate-50" onClick={() => setDateCursor(new Date(dateCursor.getFullYear(), dateCursor.getMonth(), dateCursor.getDate() - 1))}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="px-4 py-2 text-sm font-medium whitespace-nowrap">Today</div>
          <button className="px-2 py-2 hover:bg-slate-50" onClick={() => setDateCursor(new Date(dateCursor.getFullYear(), dateCursor.getMonth(), dateCursor.getDate() + 1))}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="w-full rounded-lg border bg-white pl-9 pr-3 py-2 text-sm" />
        </div>

        <div className="relative">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] text-[var(--on-brand)] px-3 py-2 text-sm font-medium hover:opacity-95" onClick={() => setExportMenuOpen((v) => !v)}>
            <Download className="w-4 h-4" /> Export
          </button>
          {exportMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-md overflow-hidden z-10">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" onClick={() => { setModal("view"); setExportMenuOpen(false); }}>Export View</button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" onClick={() => { setModal("time"); setExportMenuOpen(false); }}>Export Time Tracking Report</button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" onClick={() => { setModal("annual"); setExportMenuOpen(false); }}>Export Annual Balance</button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-xl border bg-white">
        <div className="grid grid-cols-[1.5fr,repeat(6,1fr)] text-xs text-slate-500 font-medium border-b">
          <div className="px-4 py-3">Full name</div>

          <div className="col-span-3 grid grid-cols-3 border-l">
            <div className="px-4 py-2 col-span-3 border-b text-center">CPN ACQUIRED – {new Date().getFullYear()}</div>
            <div className="px-4 py-2 text-center">Acquired</div>
            <div className="px-4 py-2 text-center">Taken</div>
            <div className="px-4 py-2 text-center">Adjustment</div>
          </div>

          <div className="col-span-2 grid grid-cols-2 border-l">
            <div className="px-4 py-2 col-span-2 border-b text-center">Pending validation</div>
            <div className="px-4 py-2 text-center">Request</div>
            <div className="px-4 py-2 text-center">Cancellation</div>
          </div>

          <div className="px-4 py-3 text-center border-l">Balance</div>
        </div>

        {filtered.map((p, idx) => (
          <div key={p.id} className={`grid grid-cols-[1.5fr,repeat(6,1fr)] text-sm ${idx !== filtered.length - 1 ? "border-b" : ""}`}>
            <div className="flex items-center gap-3 px-4 py-3">
              <img src={p.avatar} className="h-8 w-8 rounded-full object-cover" alt={p.name} />
              <span className="text-slate-800">{p.name}</span>
            </div>
            <div className="px-4 py-3 text-center border-l">{p.acquired}</div>
            <div className="px-4 py-3 text-center">{p.taken}</div>
            <div className="px-4 py-3 text-center">{p.adjustment.toFixed(1)}</div>
            <div className="px-4 py-3 text-center border-l">{p.request.toFixed(1)}</div>
            <div className="px-4 py-3 text-center">{p.cancellation.toFixed(1)}</div>
            <div className="px-4 py-3 text-center border-l font-medium">{p.balance}</div>
          </div>
        ))}

        <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-500">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 hover:bg-slate-50">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <div>Showing data {filtered.length} of {PEOPLE.length} entries</div>
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 hover:bg-slate-50">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <ExportViewModal open={modal === "view"} onClose={() => setModal(null)} />
      <ExportTimeTrackingModal open={modal === "time"} onClose={() => setModal(null)} />
      <ExportAnnualBalanceModal open={modal === "annual"} onClose={() => setModal(null)} />
    </>
  );
}
