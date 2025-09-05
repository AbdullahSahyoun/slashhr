// src/pages/settings/CompanyDetails.jsx
import React from "react";
import Sidebar from "../../../components/common/Sidebar";

// inline svgs tuned to match the screenshot look
const GearIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M10.325 4.317a1 1 0 0 1 1.35-.436l.8.4a2 2 0 0 0 1.79 0l.8-.4a1 1 0 0 1 1.35.435l.4.693a2 2 0 0 0 .99.86l.74.311a1 1 0 0 1 .6 1.16l-.2.8a2 2 0 0 0 0 1.79l.2.8a1 1 0 0 1-.6 1.16l-.74.311a2 2 0 0 0-.99.86l-.4.693a1 1 0 0 1-1.35.435l-.8-.4a2 2 0 0 0-1.79 0l-.8.4a1 1 0 0 1-1.35-.435l-.4-.693a2 2 0 0 0-.99-.86l-.74-.311a1 1 0 0 1-.6-1.16l.2-.8a2 2 0 0 0 0-1.79l-.2-.8a1 1 0 0 1 .6-1.16l.74-.311a2 2 0 0 0 .99-.86l.4-.693Z" />
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
  </svg>
);

const BuildingIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="6" y="3" width="12" height="18" rx="1.5" strokeWidth="2" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M6 21h12" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TranslateIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M3 5h8M7 5s0 9 7 9M7 14c1.5-2 2.5-4 3-6M13 19l4-9 4 9M15 16h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BankIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 3 3 8v2h18V8l-9-5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21h14M6 10v8M10 10v8M14 10v8M18 10v8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function CompanyDetails() {
  return (
    <div className="min-h-screen bg-[#F6F8F7] dark:bg-gray-900">
      <Sidebar />

      {/* keep content clear of fixed sidebar */}
      <main className="ml-[84px] lg:ml-[300px] transition-all px-6 py-6">
        {/* breadcrumb / header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border shadow-sm text-teal-800">
              <GearIcon className="w-4.5 h-4.5" />
            </span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Settings</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 dark:text-white font-semibold">Company details</span>
          </div>
        </div>

        {/* header action */}
        <div className="mb-5">
          <button className="inline-flex items-center gap-2 rounded-md bg-[#1D6960] text-white px-3 py-2 text-sm hover:brightness-95">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New legal entity
          </button>
        </div>

        {/* legal entities cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { name: "D’angelo-Morelli SPA", employees: 0 },
            { name: "SlashHR – Legal 2", employees: 3 },
            { name: "SlashHR – Legal", employees: 33 },
          ].map((e, i) => (
            <div key={i} className="relative rounded-lg border bg-white dark:bg-gray-800 p-4 pt-6">
              {/* top-floating icon */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border grid place-items-center shadow-sm">
                  <BuildingIcon className="w-5 h-5 text-[#1D6960]" />
                </div>
              </div>

              <div className="mt-2">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{e.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {e.employees} employees are part of this legal entity.
                </div>
              </div>

              <button className="mt-3 w-[180px] rounded-md bg-[#1D6960] text-white px-4 py-2 text-sm hover:brightness-95">
                View legal entity
              </button>
            </div>
          ))}
        </div>

        {/* 2-column body like reference */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* left: section titles with icons + helper text */}
          <div className="space-y-6">
            <LeftInfoCard
              icon={<BuildingIcon className="w-5 h-5 text-[#1D6960]" />}
              title="General information"
              desc="Just a bit of info about your company, and the default language your employees will see when invited."
            />
            <LeftInfoCard
              icon={<TranslateIcon className="w-5 h-5 text-[#1D6960]" />}
              title="Language and format"
              desc="Select a default language for your company and a format for dates and numbers."
            />
            <LeftInfoCard
              icon={<BankIcon className="w-5 h-5 text-[#1D6960]" />}
              title="Bank accounts"
              desc="Add your company’s bank accounts to appear on documents."
            />
          </div>

          {/* right: form cards */}
          <div className="space-y-6">
            {/* General info form */}
            <div className="rounded-lg border bg-white dark:bg-gray-800 p-4">
              <div className="grid gap-4">
                <LabeledInput label="Company name" value="SlashHR" placeholder="SlashHR" />
                <LabeledSelect label="Industry" placeholder="-- Select --" />
              </div>
            </div>

            {/* Language & format */}
            <div className="rounded-lg border bg-white dark:bg-gray-800 p-4">
              <div className="grid gap-4">
                <LabeledSelect label="Language" placeholder="English (US)" />
                <LabeledSelect
                  label="Date and number format"
                  placeholder="MAR (04/30/2025 · MAD 1,234.56)"
                />
              </div>
            </div>

            {/* Bank accounts empty state */}
            <div className="rounded-lg border bg-white dark:bg-gray-800 p-4">
              <div className="text-sm text-gray-500">No bank accounts created</div>
              <button className="mt-3 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add bank account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- helpers ---------- */

function LeftInfoCard({ icon, title, desc }) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 w-10 h-10 rounded-lg bg-[#ECF3F2] grid place-items-center">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-gray-800 dark:text-white">{title}</div>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value = "", placeholder }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</div>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-md border bg-gray-50 dark:bg-gray-700 dark:text-white px-3 py-2 outline-none"
      />
    </label>
  );
}

function LabeledSelect({ label, placeholder }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</div>
      <div className="relative">
        <select
          defaultValue=""
          className="w-full appearance-none rounded-md border bg-gray-50 dark:bg-gray-700 dark:text-white px-3 py-2 pr-8 outline-none"
        >
          <option value="" disabled>{placeholder}</option>
        </select>
        {/* chevron */}
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
             viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"/>
        </svg>
      </div>
    </label>
  );
}
