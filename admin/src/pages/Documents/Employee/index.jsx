import React, { useEffect, useMemo, useState } from "react";
import { Folder, ChevronRight, Search, Filter, FileText, ChevronLeft, Eye } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const token = localStorage.getItem("token");

async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...opts });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || `${res.status} ${res.statusText}`);
  return txt ? JSON.parse(txt) : {};
}
const Badge = ({ children }) => (
  <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 text-[10px] rounded-full bg-rose-100 text-rose-700 px-1.5">{children}</span>
);
const Checkbox = (p) => <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" {...p} />;

export default function EmployeeTab() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);

  // Top folders (like Identity, Contracts...)
  const folders = [
    { name: "Identity Documents", count: 1 },
    { name: "Family Documents", count: 3 },
    { name: "Contracts", count: 2 },
    { name: "Pictures", count: 2 },
    { name: "Certification", count: 2 },
    { name: "Career document", count: 2 },
    { name: "Others", count: 0 },
  ];

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getJSON(`${API}/documents?scope=employee&q=${encodeURIComponent(query)}&page=${page}&limit=${pageSize}`);
        if (!ignore) {
          setRows(data.items || []);
          setTotal(data.total || 0);
          setChecked([]);
        }
      } catch {
        const demo = [
          { id: 31, name: "medical_certificate.pdf", owner: "Manale Battache", avatar: "https://i.pravatar.cc/60?img=14", location: "Certification", createdOn: "01/11/2025" },
          { id: 32, name: "Sick-leave-EmployeeName.png", owner: "Manale Battache", avatar: "https://i.pravatar.cc/60?img=15", location: "Certification", createdOn: "01/11/2025" },
          { id: 33, name: "ID-Card.png", owner: "Manale Battache", avatar: "https://i.pravatar.cc/60?img=16", location: "Identity Documents", createdOn: "01/11/2025" },
          { id: 34, name: "medical_certificate.pdf", owner: "Manale Battache", avatar: "https://i.pravatar.cc/60?img=14", location: "Certification", createdOn: "01/11/2025" },
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
      {/* Optional breadcrumb like: Documents > Amina Sophia */}
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
        <img src="/images/img_group_2570.svg" alt="" className="w-6 h-6 opacity-80" />
        <span className="font-medium">Documents</span>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="text-gray-600">Amina Sophia</span>
      </div>

      {/* Folders row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {folders.map((f, i) => (
          <button key={i} className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow transition">
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Folder className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-gray-900 flex items-center">
                {f.name}
                {f.count > 0 && <Badge>{f.count}</Badge>}
              </div>
              <div className="text-[11px] text-gray-500">{f.count} Files</div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 text-gray-400">↗</span>
          </button>
        ))}
      </div>

      {/* Table card */}
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
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="w-10 px-4 py-3"><Checkbox checked={allChecked} onChange={toggleAll} /></th>
                <th className="text-left px-2 py-3 font-medium">File name</th>
                <th className="text-left px-2 py-3 font-medium">Owner</th>
                <th className="text-left px-2 py-3 font-medium">Location</th>
                <th className="text-left px-2 py-3 font-medium">Created on</th>
                <th className="w-16 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-4"><div className="h-4 w-4 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-4 w-64 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-4 w-28 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-2 py-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
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
                        <img src={r.avatar} className="h-8 w-8 rounded-full object-cover" alt="" />
                        <span className="text-gray-800">{r.owner}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-gray-700">{r.location}</td>
                    <td className="px-2 py-4 text-gray-700">{r.createdOn}</td>
                    <td className="px-2 py-4">
                      <button className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50" title="Open">
                        <Eye className="h-4 w-4" />
                      </button>
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
            <button onClick={() => setPage((p) => p + 1)} className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
}
