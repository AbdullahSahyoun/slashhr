import React, { useState } from "react";
import { FileText, Info, Search, Copy, BadgeCheck } from "lucide-react";

const TABS = ["Templates", "Variables"];

const variables = [
  { id: 1, name: "Legal entity name", section: "Company/Legal Entity", entity: "ALL", public: true, token: "{{legal_entity_name}}" },
  { id: 2, name: "Legal entity tax number", section: "Company/Legal Entity", entity: "ALL", public: true, token: "{{legal_entity_tax_number}}" },
  { id: 3, name: "Legal entity address 1", section: "Company/Legal Entity", entity: "ALL", public: true, token: "{{legal_entity_address_1}}" },
  { id: 4, name: "Legal entity address 2", section: "Company/Legal Entity", entity: "ALL", public: true, token: "{{legal_entity_address_2}}" },
  { id: 5, name: "Legal entity address city", section: "Company/Legal Entity", entity: "ALL", public: true, token: "{{legal_entity_address_city}}" },
];

export default function TemplatesTab() {
  const [subTab, setSubTab] = useState("Templates");
  const [q, setQ] = useState("");

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`py-3 text-sm font-semibold ${subTab === t ? "text-global-2 border-b-2 border-global-2 -mb-px" : "text-global-3"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === "Templates" ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="max-w-2xl text-sm text-gray-700">
            Create document templates to automate the generation of documents with employee information.
            You can upload PDFs with fillable capabilities containing variables, DOCX files with variables, or any other types of documents that you need to send to employees.
            <a className="text-teal-700 underline ml-1" href="#">Learn more</a>
          </div>

          <div className="mt-6 space-y-3">
            {/* Demo list like screenshots */}
            {[
              { name: "ES - Modelo 145.pdf", tag: "Fillable" },
              { name: "US-Form W4.pdf", tag: "Fillable" },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-sm text-gray-800">{t.name}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] px-2 py-1 rounded bg-amber-100 text-amber-700">{t.tag}</span>
                  <button className="h-8 w-8 rounded-md border border-gray-200">⋮</button>
                  <button className="h-8 w-8 rounded-md border border-gray-200">↗</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600 flex items-center justify-between">
              <span>Your templates</span>
              <button className="px-3 py-2 text-sm rounded-lg bg-[#2B8A6E] text-white">+ Add template</button>
            </div>
            <div className="text-sm text-gray-500 mt-2">There are no saved document templates.</div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-5 space-y-4">
            <div className="text-sm text-gray-700">
              Click to copy the variable in curly brackets and paste it into your document to replace it with employee information.
              <a href="#" className="text-teal-700 underline ml-1">Learn more about variables</a>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-2 py-3 font-medium">Section in Slashr</th>
                  <th className="text-left px-2 py-3 font-medium">Legal entity</th>
                  <th className="text-left px-2 py-3 font-medium">Permission</th>
                  <th className="text-left px-2 py-3 font-medium">Variable</th>
                  <th className="w-10 px-2 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {variables
                  .filter(v => v.name.toLowerCase().includes(q.toLowerCase()))
                  .map((v) => (
                    <tr key={v.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-800">{v.name}</td>
                      <td className="px-2 py-3 text-gray-700">{v.section}</td>
                      <td className="px-2 py-3">
                        <span className="text-[11px] px-2 py-1 rounded bg-gray-100 text-gray-700">{v.entity}</span>
                      </td>
                      <td className="px-2 py-3">
                        <span className="inline-flex items-center gap-1 text-xs text-teal-700">
                          <BadgeCheck className="h-4 w-4" /> Public access
                        </span>
                      </td>
                      <td className="px-2 py-3 font-mono text-xs text-gray-800">{v.token}</td>
                      <td className="px-2 py-3">
                        <button
                          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
                          title="Copy"
                          onClick={() => navigator.clipboard?.writeText(v.token)}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-600 flex justify-between">
            <div>Showing data {variables.length ? 1 : 0}–{variables.length} of {variables.length} entries</div>
            <div className="text-gray-400 flex items-center gap-2"><Info className="h-4 w-4" /> Demo list</div>
          </div>
        </div>
      )}
    </div>
  );
}
