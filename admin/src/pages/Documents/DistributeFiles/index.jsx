import React, { useState } from "react";
import { UploadCloud, Users, Mail, Clock, FileText } from "lucide-react";

export default function DistributeTab() {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Distribute files</h3>
        <p className="text-sm text-gray-600">
          Send documents to multiple employees at once. Choose the file, audience, and delivery options.
        </p>

        {/* Wizard steps */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className={`rounded-lg border ${step >= 1 ? "border-teal-500" : "border-gray-200"} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-gray-700" />
              <span className="font-medium">1) Choose a file</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm px-3 py-2">
              <UploadCloud className="h-4 w-4" /> Upload / Pick from library
            </button>
          </div>

          {/* Step 2 */}
          <div className={`rounded-lg border ${step >= 2 ? "border-teal-500" : "border-gray-200"} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-gray-700" />
              <span className="font-medium">2) Select recipients</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200">All employees</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200">By department</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200">Specific people</button>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`rounded-lg border ${step >= 3 ? "border-teal-500" : "border-gray-200"} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-gray-700" />
              <span className="font-medium">3) Delivery options</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200">Send with email</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200 inline-flex items-center gap-2"><Clock className="h-4 w-4" />Schedule</button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button onClick={() => setStep((s) => Math.max(1, s - 1))} className="px-3 py-2 text-sm rounded-lg border border-gray-200">Back</button>
          <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="px-3 py-2 text-sm rounded-lg bg-[#2B8A6E] text-white">Next</button>
        </div>
      </div>
    </div>
  );
}
