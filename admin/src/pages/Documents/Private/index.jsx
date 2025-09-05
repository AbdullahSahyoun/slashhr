import React, { useEffect, useMemo, useState } from "react";
import {
  Folder, FileText, UploadCloud, Search, Filter,
  MoreVertical, Eye, ChevronLeft, ChevronRight
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const token = localStorage.getItem("token");

async function getJSON(url, opts = {}) {
  const res = await fetch(url, {
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...opts,
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}
const Checkbox = (p) => <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" {...p} />;

export default function PrivateTab() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);

  const collections = [
    { label: "Company Profile",   files: 6 },
    { label: "Document for Sales", files: 12 },
    { label: "Product List",      files: 3 },
    { label: "Sales Team",        files: 8 },
  ];

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getJSON(`${API}/documents?scope=private&q=${encodeURIComponent(query)}&page=${page}&limit=${pageSize}`);
        if (!ignore) {
          setRows(data.items || []);
          setTotal(data.total || 0);
          setChecked([]);
        }
      } catch {
        const demo = [
          {
            id: 11, name: "Expenses-last-month.png",
            uploader: { name: "Manale Battache", avatar: "https://i.pravatar.cc/60?img=20" },
            createdOn: "01/11/2025", category: "Payslip",
          },
          {
            id: 12, name: "Q4-Report.pdf",
            uploader: { name: "Manale Battache", avatar: "https://i.pravatar.cc/60?img=21" },
            createdOn: "01/11/2025", category: "Report",
          },
        ];
        if (!ignore) { setRows(demo); setTotal(demo.length); }
      } finally { if (!ignore) setLoading(false); }
    })();
    return () => (ignore = true);
  }, [query, page, pageSize]);

  const allChecked = useMemo(() => rows.length > 0 && checked.length === rows.length, [rows, checked]);
  const toggleAll = () => setChecked((p) => (p.length === rows.length ? [] : rows.map((r) => r.id)));
  const toggleOne = (id) => setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <>
      <p className="text-sm text-gray-600 mb-2">Private company documents</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6">
        {collections.map((c, i) => (
          <div key={i} className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow transition">
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Folder className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{c.label}</div>
              <div className="text-[11px] text-gray-500">{c.files} Files</div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 text-gray-400">↗</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="h-4 w-4" />
            <span>New Filter</span>
          </div>

          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search"
              className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          <button className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#2B8A6E] text-white text-sm px-3 py-2 hover:brightness-95">
            <UploadCloud className="h-4 w-4" />
            Upload File
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="w-10 px-4 py-3"><Checkbox checked={allChecked} onChange={toggleAll} /></th>
                <th className="text-left px-2 py-3 font-medium">File name</th>
                <th className="text-left px-2 py-3 font-medium">Uploaded by</th>
                <th className="text-left px-2 py-3 font-medium">Created on</th>
                <th className="text-left px-2 py-3 font-medium">Category</th>
                <th className="w-24 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(2)].map((_, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-4"><div className="h-4 w-4 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-4 w-64 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse" /></td>
                    <td className="px-2 py-4" />
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-500">No documents found.</td></tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-4"><Checkbox checked={checked.includes(r.id)} onChange={() => toggleOne(r.id)} /></td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="text-gray-900">{r.name}</div>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-2">
                        <img src={r.uploader?.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                        <span className="text-gray-800">{r.uploader?.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-gray-700">{r.createdOn}</td>
                    <td className="px-2 py-4 text-gray-700">{r.category}</td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-end gap-2 text-gray-500">
                        <button className="hover:text-gray-800" title="Preview"><Eye className="h-4 w-4" /></button>
                        <button className="hover:text-gray-800" title="More"><MoreVertical className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-600">
          <div>Showing data {rows.length ? 1 : 0}–{rows.length} of {total} entries</div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"><ChevronLeft className="h-4 w-4" /></button>
            <button className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 bg-gray-900 text-white">{page}</button>
            <button onClick={() => setPage((p) => p + 1)} className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </>
  );
}
