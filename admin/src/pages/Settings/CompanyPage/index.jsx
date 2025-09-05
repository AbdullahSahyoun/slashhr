// src/pages/settings/CompanyPage.jsx
import React from "react";
import Sidebar from "../../../components/common/Sidebar";

/* === Inline icons to match the screenshot === */
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
const PenIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M16.5 3.5 20.5 7.5 8 20H4v-4L16.5 3.5z"/>
  </svg>
);
const BriefcaseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Zm0 4h18"/>
  </svg>
);

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-[#F6F8F7] dark:bg-gray-900">
      <Sidebar />

      {/* matches your fixed sidebar width */}
      <main className="ml-[300px] transition-all px-6 py-6">
        {/* breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border shadow-sm text-teal-800">
              <GearIcon className="w-[18px] h-[18px]" />
            </span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Settings
            </span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 dark:text-white font-semibold">
              Company page
            </span>
          </div>
        </div>

        {/* single-column sections with icons at left */}
        <div className="space-y-10 pr-6">
          {/* Company page */}
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-lg bg-[#ECF3F2] grid place-items-center">
              <LinkIcon className="w-4.5 h-4.5 text-[#1D6960]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Company page
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-[560px]">
                Generate a customizable public page to share information about your company and attract candidates.
              </p>
            </div>
          </div>

          {/* Customize */}
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-lg bg-[#ECF3F2] grid place-items-center">
              <PenIcon className="w-4.5 h-4.5 text-[#1D6960]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Customize
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-[560px]">
                Select the language for your company page and customize the content and appearance of your site from the website builder.
              </p>
              {/* outlined button like the screenshot */}
              <button
                className="mt-3 inline-flex items-center rounded-md border px-3.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200"
              >
                Customize company page
              </button>
            </div>
          </div>

          {/* Privacy policy */}
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-lg bg-[#ECF3F2] grid place-items-center">
              <BriefcaseIcon className="w-4.5 h-4.5 text-[#1D6960]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Privacy policy
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-[560px]">
                Introduce the email you want to display in the company page’s privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
