/* inbox/Request/index.jsx */
import React, { useEffect, useMemo, useState } from 'react';
import Dropdown from '../../../components/ui/Dropdown';

const API_ORIGIN   = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // Fastify origin
const LEAVES_API   = `${API_ORIGIN}/leaves`;
const EMPLOYEE_API = `${API_ORIGIN}/employee`;
const TENANT_ID    = 1; // adjust/inject from auth/context

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}\n${text.slice(0, 300)}`);
  }
  // Allow 204 for PATCH cases, though we expect JSON; fall back gracefully
  if (res.status === 204) return null;
  if (!ct.includes('application/json')) {
    const text = await res.text().catch(() => '');
    throw new Error(`Expected JSON, got ${ct}\n${text.slice(0, 300)}`);
  }
  return res.json();
}

const fmtDateShort = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

const isOverdue = (leave) => {
  if (!leave?.EndTime) return false;
  const today = new Date();
  const end = new Date(leave.EndTime);
  return leave.Status === 'Pending' && end.setHours(0,0,0,0) < today.setHours(0,0,0,0);
};

// If your server path is '/update:id' (no slash), use: (id) => `${LEAVES_API}/update${id}`
const UPDATE_URL = (id) => `${LEAVES_API}/update/${id}`;
const DEFAULT_AVATAR = '/images/img_ellipse_44.png';

const FILTER_OPTIONS = ['All Requests', 'Pending', 'Overdue', 'Approved', 'Rejected'];

const InboxTimeOffPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Requests');

  const [items, setItems] = useState([]);         // mapped UI rows
  const [nameCache, setNameCache] = useState({}); // EmployeeID -> EmployeeName
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [busyId, setBusyId] = useState(null);     // row-level busy (approve/reject)

  // Robust handler: Dropdown might pass string, event, or { value }
  const handleFilterChange = (next) => {
    if (typeof next === 'string') return setSelectedFilter(next);
    if (next && typeof next === 'object') {
      if ('value' in next) return setSelectedFilter(next.value);
      if (next.target?.value) return setSelectedFilter(next.target.value);
    }
    // fallback (do nothing)
  };

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      // 1) Fetch leaves for the tenant
      const leaves = await fetchJson(`${LEAVES_API}/tenant/${TENANT_ID}`);

      // 2) Build/extend the name cache (avoid stale state by using a local merged map)
      let mergedCache = { ...nameCache };
      const ids = [...new Set((leaves || []).map(l => l.EmployeeID).filter(Boolean))];
      const missing = ids.filter(id => !mergedCache[id]);

      if (missing.length) {
        const results = await Promise.allSettled(
          missing.map(id => fetchJson(`${EMPLOYEE_API}/${id}/name`))
        );
        results.forEach((r, i) => {
          const id = missing[i];
          if (r.status === 'fulfilled' && r.value?.EmployeeName) {
            mergedCache[id] = r.value.EmployeeName;
          } else {
            mergedCache[id] = `#${id}`;
          }
        });
        setNameCache(mergedCache);
      }

      // 3) Map leaves → UI items using mergedCache
      const mapped = (leaves || []).map(l => {
        const name  = (mergedCache[l.EmployeeID] ?? '').trim() || `#${l.EmployeeID}`;
        const start = fmtDateShort(l.StartTime);
        const end   = fmtDateShort(l.EndTime);
        const status = l.Status;
        const type =
          status === 'Pending'  ? 'time off request is pending'  :
          status === 'Approved' ? 'time off request approved'     :
          status === 'Rejected' ? 'time off request rejected'     :
                                  'time off request';

        return {
          id: l.LeaveID,
          name,
          avatar: DEFAULT_AVATAR,
          type,
          status,
          dueDate: end || '—',
          requestDate: `${start || '—'}. Time off`,
          description: `Holidays from ${start || '—'} to ${end || '—'}`,
          isOverdue: isOverdue(l),
          _raw: l,
        };
      });

      setItems(mapped);
    } catch (e) {
      setErr(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const filtered = useMemo(() => {
    switch (selectedFilter) {
      case 'Pending':  return items.filter(x => x.status === 'Pending');
      case 'Approved': return items.filter(x => x.status === 'Approved');
      case 'Rejected': return items.filter(x => x.status === 'Rejected');
      case 'Overdue':  return items.filter(x => x.isOverdue);
      case 'All Requests':
      default:         return items;
    }
  }, [items, selectedFilter]);

  const activeCount  = items.length;
  const overdueCount = items.filter(x => x.isOverdue).length;

  const completeAndRefresh = async (requestId, newStatus) => {
    setBusyId(requestId);
    try {
      await fetchJson(UPDATE_URL(requestId), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Status: newStatus })
      });
      // Re-fetch from the server to reflect any DB/trigger side-effects
      await load();
    } catch (e) {
      alert(`${newStatus} failed:\n${e.message}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleApprove = (requestId) => completeAndRefresh(requestId, 'Approved');
  const handleReject  = (requestId) => completeAndRefresh(requestId, 'Rejected');

  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className="flex-1 flex flex-col px-[62px] pt-12 pb-8">
        <div className="flex flex-col lg:flex-row gap-9">
          {/* Active Requests Card */}
          <div className="w-full lg:w-[28%] border border-header-1 rounded-[14px] p-5">
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-lg font-medium font-poppins text-black">Active requests</h3>
              <div className="text-[48px] font-medium font-poppins text-black">
                {loading ? '…' : activeCount}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium font-poppins text-global-10">Overdue</span>
                <span className="text-lg font-medium font-poppins text-global-10">
                  {loading ? '…' : overdueCount}
                </span>
              </div>
              {err && <div className="text-sm text-red-600 mt-2 whitespace-pre-wrap">{err}</div>}
            </div>
          </div>

          {/* Requests List */}
          <div className="flex-1 relative">
            {/* Background Container */}
            <div className="absolute inset-0 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005]" />

            {/* Filter Dropdown */}
            <div className="relative z-10 px-6 pt-4">
              <div className="w-full max-w-[240px]">
                <Dropdown
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  options={FILTER_OPTIONS}
                  className="border border-[#e6e6e6] rounded-[10px] bg-white"
                  rightImage={{
                    src: "/images/img_arrowdown_gray_700.svg",
                    width: 16,
                    height: 18
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 px-6 mt-4">
              <div className="w-full h-px bg-header-1" />
            </div>

            {/* Requests List */}
            <div className="relative z-10 px-6 py-6 max-h-[600px] overflow-y-auto">
              <div className="flex flex-col">
                {filtered.map((request, index) => (
                  <div key={request.id}>
                    <div className="flex items-start justify-between py-4">
                      {/* Request Info */}
                      <div className="flex items-start gap-[14px] flex-1">
                        <img
                          src={request.avatar}
                          alt={`${request.name} avatar`}
                          className="w-9 h-9 rounded-full flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1.5 flex-1">
                          <div className="text-[15px] font-medium font-inter text-black">
                            <span className="font-bold">{request.name}</span>
                            <span className="text-global-3"> {request.type}</span>
                          </div>

                          {/* Status and Due Date */}
                          <div className="flex items-center gap-2">
                            {request.isOverdue && request.status === 'Pending' && (
                              <div className="bg-white rounded border px-1 py-0.5">
                                <span className="text-xs font-medium font-poppins text-global-9">Overdue</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <img
                                src={request.isOverdue && request.status === 'Pending' ? "/images/img_frame_red_600.svg" : "/images/img_frame_5.svg"}
                                alt="Calendar"
                                className="w-5 h-5"
                              />
                              <span
                                className={`text-xs font-medium font-poppins ${
                                  request.isOverdue && request.status === 'Pending' ? 'text-global-9' : 'text-global-3'
                                }`}
                              >
                                Due date: {request.dueDate}
                              </span>
                            </div>
                          </div>

                          <div className="text-[13px] font-medium font-inter text-global-3">
                            {request.requestDate}
                          </div>
                          <div className="text-xs font-medium font-inter text-global-3">
                            {request.description}
                          </div>
                        </div>
                      </div>

                      {/* Actions / Status Pill */}
                      <div className="flex items-center gap-5 ml-4">
                        {request.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleReject(request.id)}
                              disabled={busyId === request.id}
                              className="px-[14px] py-1.5 border border-[#ffc9ca] rounded-[10px] bg-global-10 text-xs font-medium font-inter text-black hover:bg-opacity-80 transition-colors disabled:opacity-60"
                            >
                              {busyId === request.id ? 'Working…' : 'Reject'}
                            </button>
                            <button
                              onClick={() => handleApprove(request.id)}
                              disabled={busyId === request.id}
                              className="px-4 py-1.5 border border-[#c7e6c9] rounded-[10px] bg-button-3 text-xs font-medium font-inter text-black hover:bg-opacity-80 transition-colors disabled:opacity-60"
                            >
                              {busyId === request.id ? 'Working…' : 'Approve'}
                            </button>
                          </>
                        ) : (
                          <span
                            className={
                              "px-2 py-1 rounded text-xs font-medium " +
                              (request.status === 'Approved'
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-red-100 text-red-700 border border-red-200")
                            }
                            title={`This request is ${request.status.toLowerCase()}.`}
                          >
                            {request.status}
                          </span>
                        )}
                        <img
                          src="/images/img_arrow_right_gray_700.svg"
                          alt="View details"
                          className="w-2.5 h-2 cursor-pointer hover:opacity-70"
                        />
                      </div>
                    </div>

                    {/* Divider between requests */}
                    {index < filtered.length - 1 && (
                      <div className="w-full h-px bg-header-1 my-4" />
                    )}
                  </div>
                ))}

                {!loading && !filtered.length && (
                  <div className="text-sm text-gray-500 py-6">No requests found.</div>
                )}

                {/* Complaint Example (kept as-is) */}
                <div className="mt-8">
                  <div className="w-full h-px bg-header-1" />
                  <div className="flex items-start gap-[14px] py-6">
                    <img
                      src="/images/img_avatar_image_37.png"
                      alt="Complaint avatar"
                      className="w-9 h-9 rounded-full flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="text-[15px] font-bold font-inter text-black">
                        You have received a new complaint
                      </div>
                      <div className="text-[13px] font-medium font-inter text-global-3">
                        9 Mar 2025. Whistleblowing channel
                      </div>
                      <div className="text-[13px] font-medium font-inter text-global-3 mt-2">
                        I would like to request that we start implementing remote work options. This need has been expressed by several of us in the office, as we believe it would improve both productivity and work-life balance. Although we have rais...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Button */}
            <div className="absolute bottom-4 right-4 z-20">
              <img
                src="/images/img_ask_slashr_ai.svg"
                alt="Ask SlasHR AI"
                className="w-[218px] h-14 cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxTimeOffPage;
