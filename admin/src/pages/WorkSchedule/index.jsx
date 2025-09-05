// src/pages/WorkSchedule/index.jsx
import React, { useMemo, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Plus,
  Copy,
  Upload,
  Settings as SettingsIcon,
  Filter,
} from "lucide-react";

/* ================= helpers ================= */
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const startOfWeek = (d, weekStartsOn = 1) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
};
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const sameYMD = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const fmtDay = (d) => d.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase();
const fmtDate = (d) => `${pad(d.getDate())} ${d.toLocaleString(undefined, { month: "short" })}`;
const fmtTime = (h, m = 0) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
const weekNo = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

/* ================= avatars (as requested) =================
   - img_rectangle_4383.png           => woman
   - img_rectangle_4383_1.png         => man
   - img_rectangle_4383_2.png         => man
   - img_rectangle_4383_158x210.png   => man
*/
const AV_WOMAN = "/images/img_rectangle_4383.png";
const AV_MAN_1 = "/images/img_rectangle_4383_1.png";
const AV_MAN_2 = "/images/img_rectangle_4383_2.png";
const AV_MAN_3 = "/images/img_rectangle_4383_158x210.png";

/* ================= employees (map your photos) ================= */
const EMPLOYEES = [
  {
    id: 1,
    name: "Natalie Norton",
    role: "NORTH STORE ASSISTANT",
    rate: "32.0PH",
    hours: "40.0H/W",
    avatar: AV_WOMAN, // woman
  },
  {
    id: 2,
    name: "Noah Morris",
    role: "NORTH STORE MANAGER",
    rate: "39.0PH",
    hours: "40.0H/W",
    avatar: AV_MAN_1, // man
  },
  {
    id: 3,
    name: "Nora Nelson",
    role: "NORTH STORE ASSISTANT",
    rate: "43.0PH",
    hours: "40.0H/W",
    avatar: AV_WOMAN, // woman
  },
  {
    id: 4,
    name: "Samuel Stone",
    role: "SOUTH STORE ASSISTANT",
    rate: "36.0PH",
    hours: "40.0H/W",
    avatar: AV_MAN_2, // man
  },
  {
    id: 5,
    name: "Nora Nelson",
    role: "NORTH STORE ASSISTANT",
    rate: "35.0PH",
    hours: "40.0H/W",
    avatar: AV_WOMAN, // woman
  },
  {
    id: 6,
    name: "Nora Nelson",
    role: "SOUTH STORE MANAGER",
    rate: "37.0PH",
    hours: "40.0H/W",
    avatar: AV_WOMAN, // woman
  },
];

/* ================= shifts ================= */
const SHIFT_STYLES = {
  morning: "bg-emerald-700/90",
  afternoon: "bg-sky-600/90",
  complete: "bg-teal-600/90",
  rotating: "bg-violet-700/90",
  rest: "bg-slate-300 text-slate-800",
};
const titleOf = (k) =>
  k === "morning"
    ? "Morning shift"
    : k === "afternoon"
    ? "Afternoon shift"
    : k === "complete"
    ? "Complete shift"
    : k === "rotating"
    ? "Rotating Shifts"
    : "Rest Day";

function seedShifts(weekStart) {
  const out = [];
  const add = (e, off, kind, s, e2, place = "Retail • Store") =>
    out.push({
      id: `${e}-${off}-${kind}`,
      employeeId: e,
      date: addDays(weekStart, off),
      kind,
      start: fmtTime(s),
      end: fmtTime(e2),
      place,
    });

  // Natalie
  add(1, 0, "morning", 10, 15);
  add(1, 1, "morning", 10, 15);
  add(1, 2, "morning", 10, 15);
  add(1, 4, "complete", 8, 16);
  add(1, 5, "morning", 10, 15);

  // Noah
  add(2, 0, "complete", 8, 16);
  add(2, 1, "afternoon", 15, 20);
  add(2, 2, "afternoon", 15, 20);
  add(2, 4, "complete", 8, 16);
  add(2, 5, "afternoon", 15, 20);

  // Nora
  add(3, 3, "afternoon", 15, 20);
  add(3, 4, "afternoon", 15, 20);

  // Samuel
  add(4, 1, "afternoon", 15, 20);
  add(4, 2, "afternoon", 15, 20);
  add(4, 3, "afternoon", 15, 20);

  // Stephanie rotating
  for (let i = 0; i < 6; i++) add(5, i, "rotating", 9, 17);

  // Susan rotating
  for (let i = 0; i < 6; i++) add(6, i, "rotating", 9, 17);

  return out;
}

/* ================= small UI parts ================= */
const IconBtn = ({ children, title }) => (
  <button className="rounded-lg border bg-white px-2 py-2 hover:bg-slate-50" title={title}>
    {children}
  </button>
);

const EmployeeCell = ({ e }) => (
  <div className="flex items-center gap-3 px-3 py-3">
    <img
      src={e.avatar}
      alt={e.name}
      className="h-8 w-8 rounded-full object-cover"
      loading="lazy"
    />
    <div className="min-w-0">
      <div className="text-sm font-medium text-slate-900 truncate">{e.name}</div>
      <div className="text-[11px] text-slate-500 truncate">
        {e.role} • {e.rate} • {e.hours}
      </div>
    </div>
  </div>
);

const ShiftCard = ({ shift }) => {
  const cls = SHIFT_STYLES[shift.kind] || "bg-slate-700/90 text-white";
  const isRest = shift.kind === "rest";
  return (
    <div className={`rounded-lg ${cls} text-white px-3 py-3 shadow-sm min-h-[90px] flex flex-col justify-between`}>
      <div>
        <div className={`text-sm font-semibold ${isRest ? "text-slate-900" : "text-white"}`}>
          {titleOf(shift.kind)}
        </div>
        {isRest ? (
          <div className="text-xs opacity-80">Enjoy your day </div>
        ) : (
          <>
            <div className="text-xs opacity-90">
              {shift.start} - {shift.end}
            </div>
            <div className="text-xs opacity-90">{shift.place}</div>
          </>
        )}
      </div>
      {!isRest && <div className="text-[10px] opacity-80">☕ Break • 15m</div>}
    </div>
  );
};

/* ================= page ================= */
export default function WorkSchedule() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), 1));
  const [published, setPublished] = useState(true);
  const [view, setView] = useState("weekly");

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const shifts = useMemo(() => seedShifts(weekStart), [weekStart]);

  const getShiftFor = (empId, day) => {
    const s = shifts.find((x) => x.employeeId === empId && sameYMD(x.date, day));
    if (s) return s;
    if (day.getDay() === 0) return { kind: "rest" }; // Sunday rest demo
    return null;
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{
        ["--sidebar-w"]: "300px",                // << your sidebar width
        ["--brand"]: "var(--sidebar-bg,#0e4b3b)",
        ["--on-brand"]: "#ffffff",
      }}
    >
      {/* your fixed sidebar */}
      <Sidebar />

      {/* keep your layout: just pad-left with the CSS var */}
      <main className="px-4 md:px-6 py-6" style={{ paddingLeft: "var(--sidebar-w)" }}>
        {/* toolbar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--brand)" }}>
              <CalendarDays className="w-5 h-5 text-[var(--on-brand)]" />
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Work Schedule</h1>
            {published && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Published
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center">
              <Filter className="w-4 h-4 mr-1" /> Filter
            </button>
            <button
              className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50"
              onClick={() => setWeekStart(startOfWeek(new Date(), 1))}
            >
              Today
            </button>

            <div className="flex items-center rounded-lg border bg-white">
              <button className="px-2 py-2 hover:bg-slate-50" onClick={() => setWeekStart(addDays(weekStart, -7))}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-3 text-sm font-medium whitespace-nowrap">
                {`Week ${weekNo(weekStart)}: ${weekStart.toLocaleString(undefined, {
                  month: "long",
                })} ${weekStart.getFullYear()}`}
              </div>
              <button className="px-2 py-2 hover:bg-slate-50" onClick={() => setWeekStart(addDays(weekStart, +7))}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="rounded-lg border bg-white px-3 py-2 text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <div className="hidden md:flex items-center gap-1">
              <IconBtn title="Add shift">
                <Plus className="w-4 h-4" />
              </IconBtn>
              <IconBtn title="Copy">
                <Copy className="w-4 h-4" />
              </IconBtn>
              <IconBtn title="Export">
                <Upload className="w-4 h-4" />
              </IconBtn>
              <IconBtn title="Settings">
                <SettingsIcon className="w-4 h-4" />
              </IconBtn>
            </div>

            <button
              onClick={() => setPublished((p) => !p)}
              className="rounded-lg bg-[var(--brand)] text-[var(--on-brand)] px-4 py-2 text-sm font-semibold hover:opacity-95"
            >
              {published ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>

        {/* grid */}
        <div className="mt-4 overflow-auto border rounded-xl bg-white">
          {/* header row */}
          <div className="grid" style={{ gridTemplateColumns: "260px repeat(7, minmax(190px, 1fr))" }}>
            <div className="sticky left-0 z-10 bg-white border-b px-3 py-3 text-sm font-medium text-slate-500">
              EMPLOYEES
            </div>
            {Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).map((d, i) => (
              <div key={i} className="border-b px-3 py-3">
                <div className="text-[11px] text-slate-500 tracking-wide">{fmtDay(d)}</div>
                <div className="text-sm font-semibold text-slate-900">{fmtDate(d)}</div>
              </div>
            ))}
          </div>

          {/* body rows */}
          {EMPLOYEES.map((e) => (
            <div key={e.id} className="grid" style={{ gridTemplateColumns: "260px repeat(7, minmax(190px, 1fr))" }}>
              {/* employee column */}
              <div className="sticky left-0 z-10 bg-white border-t border-r">
                <EmployeeCell e={e} />
              </div>

              {/* day cells */}
              {Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).map((d, idx) => {
                const shift = (shifts.find((x) => x.employeeId === e.id && sameYMD(x.date, d))) ||
                              (d.getDay() === 0 ? { kind: "rest" } : null);
                return (
                  <div key={idx} className="border-t p-2">
                    {shift ? <ShiftCard shift={shift} /> : <div className="h-[94px]" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
