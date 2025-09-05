// src/pages/settings/Documents.jsx
import React, { useState } from "react";
import Sidebar from "../../../components/common/Sidebar";

/* inline icons to match look */
const GearIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M10.325 4.317a1 1 0 0 1 1.35-.436l.8.4a2 2 0 0 0 1.79 0l.8-.4a1 1 0 0 1 1.35.435l.4.693a2 2 0 0 0 .99.86l.74.311a1 1 0 0 1 .6 1.16l-.2.8a2 2 0 0 0 0 1.79l.2.8a1 1 0 0 1-.6 1.16l-.74.311a2 2 0 0 0-.99.86l-.4.693a1 1 0 0 1-1.35.435l-.8-.4a2 2 0 0 0-1.79 0l-.8.4a1 1 0 0 1-1.35-.435l-.4-.693a2 2 0 0 0-.99-.86l-.74-.311a1 1 0 0 1-.6-1.16l.2-.8a2 2 0 0 0 0-1.79l-.2-.8a1 1 0 0 1 .6-1.16l.74-.311a2 2 0 0 0 .99-.86l.4-.693Z" />
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
  </svg>
);
const FolderIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SettingsDocuments() {
  const tabs = ["Public", "Private", "Employee", "Custom fields"];
  const [active, setActive] = useState("Private");

  return (
    <div className="min-h-screen bg-[#F6F8F7] dark:bg-gray-900">
      <Sidebar />

      {/* match your fixed sidebar width */}
      <main className="ml-[300px] px-6 py-6 transition-all">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border shadow-sm text-teal-800">
              <GearIcon className="w-[18px] h-[18px]" />
            </span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Settings</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 dark:text-white font-semibold">Documents</span>
          </div>
        </div>

        {/* Tabs row */}
        <div className="flex items-center justify-between border-b">
          <div className="flex gap-8">
            {tabs.map((t) => {
              const isActive = active === t;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`py-3 text-sm ${
                    isActive
                      ? "text-gray-900 dark:text-white border-b-2 border-[#1D6960] font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* New Folder button (top right) */}
          <button className="rounded-md bg-[#1D6960] text-white px-3 py-2 text-sm hover:brightness-95">
            + New Folder
          </button>
        </div>

        {/* Private tab content */}
        {active === "Private" && (
          <section className="pt-6">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
              Private company documents
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
              Only users with the permission to view private company documents can
              access or edit this section in Company documents.
            </p>

            {/* Empty state panel */}
            <div className="mt-5 rounded-lg border bg-white dark:bg-gray-800 p-10">
              <div className="flex flex-col items-center justify-center text-center py-16">
                <FolderIcon className="w-8 h-8 text-gray-400 mb-3" />
                <div className="text-gray-500 text-sm">No folders</div>
                <div className="text-gray-400 text-xs">
                  Folders stored in this space will be displayed here.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Simple stubs for other tabs to keep layout identical; fill later */}
        {active !== "Private" && (
          <section className="pt-6">
            <div className="rounded-lg border bg-white dark:bg-gray-800 p-10 text-center text-gray-500">
              {active} — no folders
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
