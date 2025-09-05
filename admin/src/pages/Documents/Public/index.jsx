// src/pages/documents/Public/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Folder, FileText, UploadCloud, Eye, Link as LinkIcon, MoreVertical, Search, Filter, ChevronLeft, ChevronRight, Check } from "lucide-react";

/* =================== Config =================== */
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const token = localStorage.getItem("token");

/* =================== Helpers =================== */
async function getJSON(url, opts = {}) {
  const res = await fetch(url, {
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...opts,
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}

const Checkbox = (props) => (
  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" {...props} />
);

export default function PublicTab() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);

  const collections = [
    { icon: Folder, label: "Company Profile", dot: 6 },
    { icon: FileText, label: "Slashr Social Media Guidelines" },
    { icon: FileText, label: "Important updates that will come" },
    { icon: FileText, label: "Slashr Official Colors and Fonts" },
    { icon: FileText, label: "Employee Agreement July 2024" },
  ];

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getJSON(`${API}/documents?scope=public&q=${encodeURIComponent(query)}&page=${page}&limit=${pageSize}`);
        if (!ignore) {
          setRows(data.items || []);
          setTotal(data.total || 0);
          setChecked([]);
        }
      } catch {
        const demo = [
          { id: 1, name: "Slashr Official Colors and Fonts .pdf", uploader: { name: "Monale Bottache", avatar: "https://i.pravatar.cc/60?img=12" }, createdOn: "09/11/2025", category: "Company Profile" },
          { id: 2, name: "Employee Agreement July 2024.doc", uploader: { name: "Monale Bottache", avatar: "https://i.pravatar.cc/60?img=32" }, createdOn: "09/11/2025", category: "Company Profile" },
        ];
        if (!ignore) {
          setRows(demo);
          setTotal(demo.length);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => (ignore = true);
  }, [query, page, pageSize]);

  const allChecked = useMemo(() => rows.length > 0 && checked.length === rows.length, [rows, checked]);
  const toggleAll = () => setChecked((prev) => (prev.length === rows.length ? [] : rows.map((r) => r.id)));
  const toggleOne = (id) => setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <>
      <p className="text-sm text-gray-600 mb-2">Public company documents</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6">
        {collections.map((c, i) => (
          <button key={i} className="group w-full flex items-center gap-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white px-4 py-3 shadow-sm hover:shadow transition">
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <c.icon className="h-5 w-5 text-gray-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                {c.label}
                {typeof c.dot === "number" && <span className="text-[11px] text-gray-500">• {c.dot} files</span>}
              </div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400">↗</span>
          </button>
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
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
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
                <th className="w-10 px-4 py-3">
                  <Checkbox checked={allChecked} onChange={toggleAll} aria-label="Select all" />
                </th>
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
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">No documents found.</td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-4 align-middle">
                      <Checkbox checked={checked.includes(r.id)} onChange={() => toggleOne(r.id)} aria-label={`Select ${r.name}`} />
                    </td>
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
                    <td className="px-2 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-700">
                        <Check className="h-3.5 w-3.5 text-teal-600" />
                        {r.category}
                      </span>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-end gap-2 text-gray-500">
                        <button title="Preview" className="hover:text-gray-800"><Eye className="h-4 w-4" /></button>
                        <button title="Copy Link" className="hover:text-gray-800"><LinkIcon className="h-4 w-4" /></button>
                        <button title="More" className="hover:text-gray-800"><MoreVertical className="h-4 w-4" /></button>
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
