import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchView from '../../../components/ui/SearchView';
import CreateEmployeeModal from '../../../components/modals/employee/Create';

function fmtSince(dateStr) {
  if (!dateStr) return '-';
  const dt = new Date(dateStr);
  if (Number.isNaN(dt.getTime())) return '-';
  const diffMs = Date.now() - dt.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

const PeopleOrgPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const qs = new URLSearchParams(location.search);
  const orgId = Number(qs.get('orgId') || '2'); // ?orgId=2
  const token = localStorage.getItem('token');
  const API = import.meta.env.VITE_API_URL; // e.g. http://localhost:3000

  const [searchValue, setSearchValue] = useState('');
  const [filterBy, setFilterBy] = useState('Filter by'); // 'Filter by' | 'Active' | 'Inactive'
  const [groupBy, setGroupBy] = useState('');            // selected Job name
  const [groups, setGroups] = useState([]);              // from /job-groups
  const [departmentBy, setDepartmentBy] = useState('');  // selected Department
  const [departments, setDepartments] = useState([]);    // from /departments

  const [selectedRows, setSelectedRows] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  // abort controller ref
  const ctrlRef = useRef(null);

  // map API => view rows
  const mapEmployees = (list) =>
    list.map((r, i) => ({
      id: r.EmployeeID ?? i + 1,
      firstName: r.FirstName ?? '',
      lastName: r.LastName ?? '',
      job: r.Job ?? '',
      department: r.Department || r.DepartmentName || '',
      hired: fmtSince(r.Hired),
      status:
        typeof r.Status === 'boolean'
          ? r.Status ? 'Active' : 'Inactive'
          : (r.Status || 'Active'),
      avatar: r.Photo || '/images/img_avatar_image_39.png',
    }));

  // fetch employees
  async function loadEmployees(signal) {
    try {
      setLoading(true);
      setErrMsg('');
      const url = `${API}/employee/company/${orgId}/employees`;
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        signal,
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const payload = await res.json();
      const list = Array.isArray(payload) ? payload : payload.items || [];
      setRows(mapEmployees(list));
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Failed to fetch employees:', e);
        setErrMsg('Failed to load employees.');
      }
    } finally {
      setLoading(false);
    }
  }

  // reload helper
  const reload = () => {
    if (ctrlRef.current) ctrlRef.current.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    loadEmployees(ctrl.signal);
  };

  // initial load & on deps change
  useEffect(() => {
    if (!orgId || Number.isNaN(orgId)) {
      setErrMsg('Invalid orgId in URL');
      setLoading(false);
      return;
    }
    reload();
    return () => {
      if (ctrlRef.current) ctrlRef.current.abort();
    };
  }, [API, orgId, token]);

  // Load job groups
  useEffect(() => {
    if (!orgId || Number.isNaN(orgId)) return;
    const ctrl = new AbortController();
    (async () => {
      try {
        const url = `${API}/employee/company/${orgId}/job-groups`;
        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
          signal: ctrl.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        setGroups(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== 'AbortError') console.warn('Failed to load job groups:', e);
      }
    })();
    return () => ctrl.abort();
  }, [API, orgId, token]);

  // Load departments
  useEffect(() => {
    if (!orgId || Number.isNaN(orgId)) return;
    const ctrl = new AbortController();
    (async () => {
      try {
        const url = `${API}/employee/company/${orgId}/departments`;
        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
          signal: ctrl.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        setDepartments(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== 'AbortError') console.warn('Failed to load departments:', e);
      }
    })();
    return () => ctrl.abort();
  }, [API, orgId, token]);

  const handleSearch = (value) => setSearchValue(value);

  const handleRowSelect = (rowIndex, isSelected) => {
    if (Array.isArray(rowIndex)) {
      setSelectedRows(isSelected ? rowIndex : []);
    } else {
      setSelectedRows((prev) =>
        isSelected ? [...prev, rowIndex] : prev.filter((i) => i !== rowIndex)
      );
    }
  };

  const getStatusBadge = (status) => {
    const isActive = String(status).toLowerCase() === 'active';
    return (
      <div
        className={`inline-flex items-center gap-[6px] px-2 py-1 rounded-[4px] ${
          isActive ? 'bg-[#75cbc3] text-white' : 'bg-[#2b6171] text-white'
        }`}
      >
        <div
          className={`w-[8px] h-[8px] rounded-[4px] border border-white ${
            isActive ? 'bg-[#2b6171]' : 'bg-[#75cbc3]'
          }`}
        />
        <span className="text-[12px] font-poppins font-medium leading-[18px]">
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    );
  };

  // filtered list
  const employees = useMemo(() => {
    let list = rows;
    if (filterBy === 'Active' || filterBy === 'Inactive') {
      list = list.filter((e) => e.status === filterBy);
    }
    if (groupBy) {
      list = list.filter(
        (e) => (e.job || '').toLowerCase() === groupBy.toLowerCase()
      );
    }
    if (departmentBy) {
      list = list.filter(
        (e) => (e.department || '').toLowerCase() === departmentBy.toLowerCase()
      );
    }
    if (searchValue.trim()) {
      const q = searchValue.trim().toLowerCase();
      list = list.filter(
        (e) =>
          (e.firstName + ' ' + e.lastName).toLowerCase().includes(q) ||
          (e.job || '').toLowerCase().includes(q) ||
          (e.department || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [rows, filterBy, groupBy, departmentBy, searchValue]);

  // called after modal creates employee
  const handleCreated = (created) => {
    if (created) {
      // Optimistic prepend
      setRows((prev) => [mapEmployees([created])[0], ...prev]);
    } else {
      // Or do a refetch if your API doesn't return the full object
      reload();
    }
    setOpenCreateModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Top divider */}
      <div className="w-full h-[1px] bg-[#ebebeb]" />

      <div className="flex-1 px-[24px] sm:px-[30px] mt-[24px]">
        <div className="max-w-[1440px] mx-auto px-[24px] sm:px-[66px]">
          {/* Stats */}
          <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0_0_6px_#00000005] p-[28px] mb-[24px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center justify-between px-[28px]">
                <span className="text-[15px] font-inter text-[#626262]">
                  {employees.length} Current onboarding employee
                </span>
                <img src="/images/img_group_1325.svg" alt="info" className="w-[16px] h-[16px]" />
              </div>
              <div className="w-full h-px bg-[#eeeeee]" />
              <div className="flex items-center justify-between px-[28px]">
                <span className="text-[15px] font-inter text-[#626262]">
                  0 employees invited
                </span>
                <img src="/images/img_group_1325.svg" alt="info" className="w-[16px] h-[16px]" />
              </div>
            </div>
          </div>

          {/* Controls + Table */}
          <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0_0_6px_#00000005] p-[20px]">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] mb-[26px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[20px]">
                {/* Filter by Active/Inactive */}
                <div className="relative">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter text-[#626262]"
                  >
                    <option>Filter by</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <img
                    src="/images/img_arrowdown_gray_700.svg"
                    alt=""
                    className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 w-[16px] h-[14px]"
                  />
                </div>

                {/* Group (Job) */}
                <div className="relative">
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter text-[#626262]"
                  >
                    <option value="">Group</option>
                    {groups.map((g, i) => (
                      <option key={i} value={g}>{g}</option>
                    ))}
                  </select>
                  <img
                    src="/images/img_arrowdown_gray_700.svg"
                    alt=""
                    className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 w-[16px] h-[14px]"
                  />
                </div>

                {/* Department */}
                <div className="relative">
                  <select
                    value={departmentBy}
                    onChange={(e) => setDepartmentBy(e.target.value)}
                    className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter text-[#626262]"
                  >
                    <option value="">Department</option>
                    {departments.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                  <img
                    src="/images/img_arrowdown_gray_700.svg"
                    alt=""
                    className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 w-[16px] h-[14px]"
                  />
                </div>
              </div>

              {/* Search + Add */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full lg:w-auto">
                <SearchView
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                  className="flex-1 lg:w-[300px] px-[56px] py-[8px] border border-[#e6e6e6] rounded-[10px] bg-white"
                  leftImage={{
                    src: '/images/img_search_gray_200_03.svg',
                    width: 18,
                    height: 14,
                  }}
                />
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="bg-[#2b6171] text-white px-[14px] py-[8px] rounded-[10px] text-[12px] font-inter hover:bg-[#1e4a57]"
                >
                  + Add person
                </button>
              </div>
            </div>

            {/* Loading / Error */}
            {loading && (
              <div className="p-6 text-center text-sm text-gray-600">Loading employees…</div>
            )}
            {errMsg && !loading && (
              <div className="p-6 text-center text-sm text-red-600">{errMsg}</div>
            )}

            {/* Table */}
            {!loading && !errMsg && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-[16px] pr-[20px]">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
                          onChange={(e) =>
                            handleRowSelect(
                              employees.map((_, i) => i),
                              e.target.checked
                            )
                          }
                        />
                      </th>
                      <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">First name</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">Last name</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">Job</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">Department</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">Hired</th>
                      <th className="text-center py-[16px] text-[14px] font-poppins text-[#b5b7c0]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-[16px] pr-[20px]">
                          <div className="flex items-center gap-[36px]">
                            <input
                              type="checkbox"
                              className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
                              checked={selectedRows.includes(index)}
                              onChange={(e) => handleRowSelect(index, e.target.checked)}
                            />
                            <img
                              src={employee.avatar}
                              alt="avatar"
                              className="w-[38px] h-[38px] rounded-[18px]"
                              onError={(ev) => { ev.currentTarget.src = '/images/img_avatar_image_39.png'; }}
                            />
                          </div>
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins text-[#292d32]">
                          {employee.firstName}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins text-[#292d32]">
                          {employee.lastName}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins text-black">
                          {employee.job || '-'}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins text-black">
                          {employee.department || '-'}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins text-[#626262]">
                          {employee.hired}
                        </td>
                        <td className="py-[16px]">
                          <div className="flex items-center justify-between">
                            {getStatusBadge(employee.status)}
                            <div className="flex items-center gap-[14px]">
                              <img
                                src="/images/img_more_vertical_svgrepo_com.svg"
                                alt="more"
                                className="w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded p-1"
                              />
                              <img
                                src="/images/img_search_blue_gray_700.svg"
                                alt="view"
                                className="w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded p-1"
                                onClick={() => navigate(`/employee?id=${employee.id}`)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {employees.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-sm text-gray-600">
                          No employees found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Floating Chat Button (example) */}
          <div className="fixed bottom-[148px] right-[10px] w-[36px] h-[36px] bg-[#2b6171] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1e4a57] transition-colors shadow-lg">
            <img src="/images/img_group_white_a700.svg" alt="chat" className="w-[18px] h-[14px]" />
          </div>
        </div>
      </div>

      {/* Create Modal – pass onCreated to refresh immediately */}
      <CreateEmployeeModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreated={handleCreated}
        orgId={orgId}
      />
    </div>
  );
};

export default PeopleOrgPage;
