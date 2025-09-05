import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { Calendar as CalendarIcon } from "lucide-react";

// child pages (each has ONLY its own toolbar/table—no sidebar/header/tabs)
import Presence from "./Presence";
import Attendance from "./Attendance";

export default function TimeManagementIndex() {
  const [tab, setTab] = useState("Presence");

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
          <h1 className="text-2xl font-semibold text-slate-900">Time Management</h1>
          <span className="text-slate-400">›</span>
          <span className="text-lg text-slate-700">{tab}</span>
        </div>

        {/* Tabs (switch content below) */}
        <div className="flex gap-6 border-b mb-4">
          {["Presence", "Attendance"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-1 pb-3 text-sm font-medium ${
                tab === t ? "border-[var(--brand,#0e4b3b)] text-slate-900" : "border-transparent text-slate-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "Presence" ? <Presence /> : <Attendance />}
      </main>
    </div>
  );
}
