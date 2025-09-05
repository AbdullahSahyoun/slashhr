// src/pages/settings/Customization.jsx
import React from "react";
import Sidebar from "../../../components/common/Sidebar";

/* === inline icons to match screenshot === */
const GearIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M10.325 4.317a1 1 0 0 1 1.35-.436l.8.4a2 2 0 0 0 1.79 0l.8-.4a1 1 0 0 1 1.35.435l.4.693a2 2 0 0 0 .99.86l.74.311a1 1 0 0 1 .6 1.16l-.2.8a2 2 0 0 0 0 1.79l.2.8a1 1 0 0 1-.6 1.16l-.74.311a2 2 0 0 0-.99.86l-.4.693a1 1 0 0 1-1.35.435l-.8-.4a2 2 0 0 0-1.79 0l-.8.4a1 1 0 0 1-1.35-.435l-.4-.693a2 2 0 0 0-.99-.86l-.74-.311a1 1 0 0 1-.6-1.16l.2-.8a2 2 0 0 0 0-1.79l-.2-.8a1 1 0 0 1 .6-1.16l.74-.311a2 2 0 0 0 .99-.86l.4-.693Z"/>
    <circle cx="12" cy="12" r="3" strokeWidth="2"/>
  </svg>
);
const LinkIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 12M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 1 1-7-7L7 10"/>
  </svg>
);
const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"/>
  </svg>
);

export default function Customization() {
  return (
    <div className="min-h-screen bg-[#F6F8F7] dark:bg-gray-900">
      <Sidebar />

      <main className="ml-[300px] px-8 py-8">
        {/* breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border shadow-sm text-teal-800">
              <GearIcon className="w-[18px] h-[18px]" />
            </span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Settings</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 dark:text-white font-semibold">Customization</span>
          </div>
        </div>

        {/* sections */}
        <div className="space-y-10 max-w-4xl">
          {/* Workspace logo */}
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-lg bg-[#ECF3F2] grid place-items-center">
              <LinkIcon className="w-[18px] h-[18px] text-[#1D6960]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Workspace logo</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-[600px]">
                The logo will appear in the top left corner of your workspace. If you don’t add a logo, we’ll display your company’s initials by default.
              </p>
              <p className="text-sm text-gray-500 mt-1">Upload a PNG image, preferably with a transparent background, sized 80×80px (max. 1MB).</p>
              <button className="mt-3 rounded-md border px-3.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50">Upload</button>
            </div>
          </div>

          {/* Company logo */}
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-lg bg-[#ECF3F2] grid place-items-center">
              <LinkIcon className="w-[18px] h-[18px] text-[#1D6960]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Company logo</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-[600px]">
                This is your company’s official identifier for official documents, such as payslips, timesheets, and other exports.
              </p>
              <p className="text-sm text-gray-500 mt-1">Upload a PNG image, preferably with a transparent background, sized 260×80px (max. 1MB).</p>
              <button className="mt-3 rounded-md border px-3.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50">Upload</button>
            </div>
          </div>

          {/* Gender options */}
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-lg bg-[#ECF3F2] grid place-items-center">
              <SearchIcon className="w-[18px] h-[18px] text-[#1D6960]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Gender options</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-[600px]">
                You can add more options to the predefined gender fields.
              </p>
              <button className="mt-3 rounded-md border px-3.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                Add new gender
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
