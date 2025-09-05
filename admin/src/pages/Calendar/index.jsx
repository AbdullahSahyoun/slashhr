// src/pages/Calendar/index.jsx
import React, { useMemo, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ============== date helpers ============== */
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const endOfDay = (d) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};
const startOfWeek = (d, weekStartsOn = 1) => {
  // Monday=1
  const date = startOfDay(d);
  const day = date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  return date;
};
const endOfWeek = (d, weekStartsOn = 1) => {
  return addDays(startOfWeek(d, weekStartsOn), 6);
};
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) => endOfDay(new Date(d.getFullYear(), d.getMonth() + 1, 0));
const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/* ============== demo events (like screenshot) ============== */
// multi-day bars (inclusive)
const SEED_EVENTS = [
  {
    id: "hannah",
    title: "Hannah Harris",
    color: "bg-slate-700",
    start: "2025-02-28",
    end: "2025-03-05",
  },
  {
    id: "natalie",
    title: "Natalie Norton",
    color: "bg-sky-600",
    start: "2025-03-01",
    end: "2025-03-07",
  },
  {
    id: "susmi-1",
    title: "Susmi Shaheed - Maternity",
    color: "bg-slate-700",
    start: "2025-03-09",
    end: "2025-03-15",
  },
  {
    id: "susmi-2",
    title: "Susmi Shaheed - Maternity",
    color: "bg-slate-700",
    start: "2025-03-14",
    end: "2025-03-17",
  },
  {
    id: "peter-1",
    title: "Peter Price",
    color: "bg-slate-700",
    start: "2025-03-21",
    end: "2025-03-21",
  },
  {
    id: "matt",
    title: "Matt Spencer",
    color: "bg-slate-700",
    start: "2025-03-22",
    end: "2025-03-22",
  },
  {
    id: "james",
    title: "James Jones",
    color: "bg-slate-700",
    start: "2025-03-23",
    end: "2025-03-23",
  },
  {
    id: "peter-2",
    title: "Peter Price",
    color: "bg-slate-700",
    start: "2025-03-24",
    end: "2025-03-24",
  },
];

// small day badges (emoji + count)
const SEED_BADGES = {
  "2025-03-03": { emoji: "", count: 1 },
  "2025-03-11": { emoji: "", count: 1 },
  "2025-03-16": { emoji: "", count: 1 },
  "2025-03-26": { emoji: "", count: 1 },
};

function toDate(s) {
  const [Y, M, D] = s.split("-").map(Number);
  return new Date(Y, M - 1, D);
}

/* ============== layout helpers ============== */
function getMonthWeeks(current) {
  // returns array of {start, end} for each visible week covering the month
  const first = startOfMonth(current);
  const last = endOfMonth(current);
  const ws = startOfWeek(first, 1);
  const weeks = [];
  let cur = ws;
  while (cur <= last) {
    const wStart = new Date(cur);
    const wEnd = endOfWeek(cur, 1);
    weeks.push({ start: wStart, end: wEnd });
    cur = addDays(cur, 7);
  }
  return weeks;
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart <= bEnd && aEnd >= bStart;
}

function weekdayIndexMonday(d) {
  // Monday=1..Sunday=7 -> return 1..7
  let idx = d.getDay();
  if (idx === 0) idx = 7;
  return idx;
}

/* place each event into "lanes" for the week to avoid collisions */
function assignLanes(segments) {
  const lanes = [];
  segments.forEach((seg) => {
    let placed = false;
    for (const lane of lanes) {
      if (!lane.some((s) => !(seg.colEnd <= s.colStart || seg.colStart >= s.colEnd))) {
        lane.push(seg);
        seg.lane = lanes.indexOf(lane);
        placed = true;
        break;
      }
    }
    if (!placed) {
      lanes.push([seg]);
      seg.lane = lanes.length - 1;
    }
  });
  return Math.max(0, lanes.length - 1);
}

/* ============== components ============== */
const Tabs = ({ active, onChange }) => (
  <div className="flex gap-6 border-b">
    {["Calendar", "Team view"].map((t) => (
      <button
        key={t}
        className={`-mb-px border-b-2 px-1 pb-3 text-sm font-medium ${
          active === t ? "border-[var(--brand,#0e4b3b)] text-slate-900" : "border-transparent text-slate-500"
        }`}
        onClick={() => onChange(t)}
      >
        {t}
      </button>
    ))}
  </div>
);

const Badge = ({ emoji, count }) => (
  <span className="ml-1 inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px]">
    <span className="leading-none">{emoji}</span>
    <span className="leading-none">× {count}</span>
  </span>
);

const EventBar = ({ seg, color }) => {
  const style = {
    gridColumnStart: seg.colStart,
    gridColumnEnd: seg.colEnd,
    marginTop: `${seg.lane * 28}px`,
  };
  const roundedLeft = seg.isStart ? "rounded-l-md" : "rounded-none";
  const roundedRight = seg.isEnd ? "rounded-r-md" : "rounded-none";
  return (
    <div
      className={`h-[24px] ${color} text-white text-xs px-2 flex items-center ${roundedLeft} ${roundedRight}`}
      style={style}
      title={seg.title}
    >
      <span className="truncate">{seg.title}</span>
    </div>
  );
};

/* ============== page ============== */
export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState("Calendar");
  const [cursor, setCursor] = useState(new Date(2025, 2, 1)); // Mar 2025 per screenshot

  const monthLabel = useMemo(
    () => `${cursor.toLocaleString(undefined, { month: "short" })} ${cursor.getFullYear()}`,
    [cursor]
  );

  const weeks = useMemo(() => getMonthWeeks(cursor), [cursor]);

  // Transform events into per-week segments
  const allEvents = useMemo(
    () =>
      SEED_EVENTS.map((e) => ({
        ...e,
        startDate: startOfDay(toDate(e.start)),
        endDate: endOfDay(toDate(e.end)),
      })),
    []
  );

  const renderWeekRow = (week, weekIdx) => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(week.start, i));

    // build segments that intersect this week
    const segs = [];
    allEvents.forEach((ev) => {
      if (!overlaps(ev.startDate, ev.endDate, week.start, week.end)) return;
      const segStart = ev.startDate < week.start ? week.start : ev.startDate;
      const segEnd = ev.endDate > week.end ? week.end : ev.endDate;
      const colStart = weekdayIndexMonday(segStart);
      const colEnd = weekdayIndexMonday(addDays(segEnd, 1)); // end is inclusive
      segs.push({
        id: `${ev.id}-${weekIdx}`,
        title: ev.title,
        color: ev.color,
        colStart,
        colEnd,
        isStart: isSameDay(segStart, ev.startDate),
        isEnd: isSameDay(segEnd, ev.endDate),
      });
    });

    // lane assignment to avoid overlaps
    assignLanes(segs);
    const laneCount = segs.reduce((m, s) => Math.max(m, s.lane || 0), 0) + 1;

    return (
      <div key={weekIdx} className="relative">
        {/* grid header row for dates */}
        <div className="grid grid-cols-7 border-b">
          {days.map((d, i) => {
            const k = ymd(d);
            const badge = SEED_BADGES[k];
            return (
              <div key={i} className="h-20 border-r last:border-r-0">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {d.getDate()}
                  </span>
                  {badge && <Badge emoji={badge.emoji} count={badge.count} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* event lanes layer */}
        <div
          className="absolute left-0 right-0 top-[24px] px-1"
          style={{ height: `${laneCount * 28 + 8}px` }}
        >
          <div className="grid grid-cols-7 gap-x-1">
            {segs.map((s) => (
              <EventBar key={s.id} seg={s} color={s.color} />
            ))}
          </div>
        </div>

        {/* spacer to reserve height for event lanes */}
        <div style={{ height: `${laneCount * 28 + 30}px` }} />
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{
        ["--sidebar-w"]: "300px",
        ["--brand"]: "var(--sidebar-bg,#0e4b3b)",
        ["--on-brand"]: "#ffffff",
      }}
    >
      <Sidebar />

      <main className="px-4 md:px-6 py-6" style={{ paddingLeft: "var(--sidebar-w)" }}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--brand)" }}>
            <CalendarIcon className="h-5 w-5 text-[var(--on-brand)]" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Calendar</h1>
        </div>

        {/* Tabs */}
        <Tabs active={activeTab} onChange={setActiveTab} />

        {/* Top controls */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50">Filter</button>
            <button className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50">Calendar feed</button>
            <button className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50">Add time off</button>
          </div>

          <div className="flex items-center gap-1 rounded-lg border bg-white">
            <button
              className="px-2 py-2 hover:bg-slate-50"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 py-2 text-sm font-medium whitespace-nowrap">{monthLabel}</div>
            <button
              className="px-2 py-2 hover:bg-slate-50"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Month grid */}
        <div className="mt-4 overflow-hidden rounded-xl border bg-white">
          {/* weekday header */}
          <div className="grid grid-cols-7 border-b bg-slate-50">
            {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map((d) => (
              <div key={d} className="px-3 py-2 text-[11px] font-semibold text-slate-500">
                {d}
              </div>
            ))}
          </div>

          {/* weeks */}
          <div>
            {weeks.map((w, idx) => renderWeekRow(w, idx))}
          </div>
        </div>
      </main>
    </div>
  );
}
