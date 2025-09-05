import React, { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Download, Info, X, ArrowRightCircle } from "lucide-react";

const AV_WOMAN = "/images/img_rectangle_4383.png";
const AV_MAN_1 = "/images/img_rectangle_4383_1.png";
const AV_MAN_2 = "/images/img_rectangle_4383_2.png";
const AV_MAN_3 = "/images/img_rectangle_4383_158x210.png";

const ROWS = [
  { id: 1, name: "Tarik Fassi", avatar: AV_MAN_2, planned: "8h", worked: "0h", details: "-8h" },
  { id: 2, name: "Rachid Benkirane", avatar: AV_MAN_1, planned: "8h", worked: "0h", details: "-8h" },
  { id: 3, name: "Salim Bennis", avatar: AV_MAN_3, planned: "8h", worked: "0h", details: "-8h" },
  { id: 4, name: "Ghizlane Ouazzani", avatar: AV_WOMAN, planned: "8h", worked: "0h", details: "-7h" },
  { id: 5, name: "Salma El Harti", avatar: AV_WOMAN, planned: "8h", worked: "0h", details: "-8h" },
];

const ToolbarButton = ({ children, onClick }) => (
  <button onClick={onClick} className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center gap-2">
    {children}
  </button>
);

const Modal = ({ title, onClose, children, primary = "Export" }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative z-10 w-[92vw] max-w-[520px] rounded-2xl bg-white shadow-xl">
      <div className="flex items-center justify-between px-6 pt-6">
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-100" onClick={onClose}>
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
      <div className="rounded-b-2xl px-6 py-4" style={{ background: "var(--brand,#0e4b3b)" }}>
        <button className="w-full rounded-lg bg-white/10 text-white px-4 py-2 font-semibold hover:bg-white/20" onClick={onClose}>
          {primary}
        </button>
      </div>
    </div>
  </div>
);

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // 'annual' | 'export'
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return q ? ROWS.filter((r) => r.name.toLowerCase().includes(q)) : ROWS;
  }, [search]);

  return (
    <>
      {/* Toolbar */}
      <div className="mt-0 flex flex-wrap items-center gap-2">
        <ToolbarButton>Filter by</ToolbarButton>

        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="w-full rounded-lg border bg-white pl-9 pr-3 py-2 text-sm" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>

        <ToolbarButton onClick={() => setModal("annual")}>Annual balance</ToolbarButton>

        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] text-[var(--on-brand)] px-3 py-2 text-sm font-medium hover:opacity-95" onClick={() => setModal("export")}>
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-xl border bg-white">
        <div className="grid grid-cols-[52px,1.8fr,1fr,1fr,1fr,52px] text-xs text-slate-500 font-medium border-b">
          <div className="px-3 py-3"><input type="checkbox" className="h-4 w-4" /></div>
          <div className="px-3 py-3">Employee</div>
          <div className="px-3 py-3">Planned</div>
          <div className="px-3 py-3">Worked</div>
          <div className="px-3 py-3">Details</div>
          <div className="px-3 py-3" />
        </div>

        {filtered.map((r, i) => (
          <div key={r.id} className={`grid grid-cols-[52px,1.8fr,1fr,1fr,1fr,52px] items-center text-sm ${i !== filtered.length - 1 ? "border-b" : ""}`}>
            <div className="px-3 py-3"><input type="checkbox" className="h-4 w-4" /></div>
            <div className="px-3 py-3 flex items-center gap-3"><img src={r.avatar} alt={r.name} className="h-8 w-8 rounded-full object-cover" /><span className="text-slate-800">{r.name}</span></div>
            <div className="px-3 py-3 text-slate-700">{r.planned}</div>
            <div className="px-3 py-3 text-slate-700">{r.worked}</div>
            <div className="px-3 py-3">
              <span className={`rounded-md px-2 py-1 text-xs font-medium ${r.details.startsWith("-") ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                {r.details}
              </span>
            </div>
            <div className="px-3 py-3 flex items-center justify-end"><button className="h-8 w-8 rounded-full hover:bg-slate-50 flex items-center justify-center" title="Open details"><ArrowRightCircle className="w-5 h-5 text-slate-500" /></button></div>
          </div>
        ))}

        <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-500">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /> Previous</button>
          <div>Showing data {filtered.length} of {ROWS.length} entries</div>
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 hover:bg-slate-50">Next <ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Modals */}
      {modal === "annual" && (
        <Modal title="Annual Balance" onClose={() => setModal(null)} primary="Close">
          <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-sm px-3 py-2 mb-3 flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5" />
            <span>Please select at least one filter: either by team or by location. If you choose both filters, results reflect the combination.</span>
          </div>
          <div className="grid gap-3">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Team</label><select className="w-full rounded-xl border px-3 py-2 text-sm"><option>Select</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Workplace</label><select className="w-full rounded-xl border px-3 py-2 text-sm"><option>Select</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Week (Choose a specific week)</label><select className="w-full rounded-xl border px-3 py-2 text-sm"><option>Select</option></select></div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 text-sky-900 text-sm px-3 py-2">A report of the month and corresponding year for the selected week will be generated.</div>
          </div>
        </Modal>
      )}
      {modal === "export" && (
        <Modal title="Export View" onClose={() => setModal(null)} primary="Export">
          <p className="text-sm text-slate-600 mb-4">Export the current view as a CSV or Excel file.</p>
          <label className="block text-sm font-medium text-slate-700 mb-1">File name</label>
          <input className="w-full rounded-xl border px-3 py-2 text-sm mb-4" defaultValue="Attendance-Export" />
          <label className="block text-sm font-medium text-slate-700 mb-1">File format</label>
          <select className="w-full rounded-xl border px-3 py-2 text-sm"><option>Excel</option><option>CSV</option></select>
        </Modal>
      )}
    </>
  );
}
