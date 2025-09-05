// src/pages/documents/index.jsx
import React, { useState, Suspense, lazy } from "react";
import Sidebar from "../../components/common/Sidebar";

// Lazy tabs (each in its own folder)
const PublicTab     = lazy(() => import("./Public"));
const PrivateTab    = lazy(() => import("./Private"));
const EmployeeTab   = lazy(() => import("./Employee"));
const DistributeTab = lazy(() => import("./DistributeFiles"));
const TemplatesTab  = lazy(() => import("./Templates"));

const TABS = [
  { key: "Public",          component: PublicTab },
  { key: "Private",         component: PrivateTab },
  { key: "Employee",        component: EmployeeTab },
  { key: "DistributeFiles",component: DistributeTab },
  { key: "Templates",       component: TemplatesTab },
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("Public");
  const ActiveComponent =
    TABS.find((t) => t.key === activeTab)?.component || PublicTab;

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar className="shrink-0" />

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        {/* Header */}
        <div className="w-full bg-white">
          <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-12 pt-6 pb-0">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <img src="/images/img_group_2570.svg" alt="Docs Icon" className="w-11 h-11" />
              <h1 className="text-xl sm:text-2xl font-medium text-black">Documents</h1>
            </div>
            <div className="w-full h-[1px] bg-header-1" />
          </div>

          {/* Tabs */}
          <div className="flex flex-col px-4 sm:px-6 lg:px-12">
            <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto">
              {TABS.map(({ key }) => (
                <div key={key} className="flex flex-col items-center min-w-max">
                  <button
                    onClick={() => setActiveTab(key)}
                    className={`text-sm sm:text-base font-bold py-3 whitespace-nowrap ${
                      activeTab === key ? "text-global-2" : "text-global-3"
                    }`}
                  >
                    {key}
                  </button>
                  {activeTab === key && (
                    <div className="w-full h-[3px] bg-global-2 rounded mt-3" />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-header-1 mt-0" />
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-screen-xl mx-auto">
            <Suspense fallback={<div className="text-sm text-gray-500">Loading…</div>}>
              <ActiveComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
