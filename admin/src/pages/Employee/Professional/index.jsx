import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditText from '../../../components/ui/EditText';

// Layout Grid
const FormGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const FormField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
    <EditText
      value={value ?? ''} // always a string (consistent with Personal page)
      readOnly
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
    />
  </div>
);

// YYYY-MM-DD (same behavior as Personal page)
function fmtDate(d) {
  if (!d) return '';
  const dt = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return '';
  return dt.toISOString().slice(0, 10);
}

const EmployeeProfessionalPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const employeeId = Number(params.get('id'));
  const token = localStorage.getItem('token');
  const API = import.meta.env.VITE_API_URL ;

  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!employeeId || Number.isNaN(employeeId)) {
      setErrMsg('Invalid employee ID in URL');
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setErrMsg('');
        const res = await fetch(`${API}/employee/${employeeId}/professional`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: ctrl.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`API ${res.status}: ${text || res.statusText}`);
        }
        const data = await res.json();
        setRaw(data);
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('Failed to fetch professional info:', e);
          setErrMsg('Failed to load professional information.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ctrl.abort();
  }, [employeeId, token, API]);

  // Map backend shape (joined fields) to UI-friendly names
  const employee = useMemo(() => {
    if (!raw) return null;
    return {
      EmployeeID: raw.EmployeeID ?? '',
      JobTitle: raw.JobTitle ?? '',
      Department: raw.Department ?? '',
      Manager: raw.Manager ?? '',
      OfficeLocation: raw.OfficeLocation ?? '',
      JoiningDate: fmtDate(raw.JoiningDate),
      EmploymentType: raw.EmploymentType ?? '',
      WorkMode: raw.WorkMode ?? '',
    };
  }, [raw]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (errMsg) {
    return (
      <div className="text-center py-10 text-red-500">
        {errMsg}<br />
        <span className="text-sm text-gray-600">Employee ID: {employeeId || 'Unknown'}</span>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-10 text-red-500">
        Employee not found.<br />
        <span className="text-sm text-gray-600">Employee ID: {employeeId || 'Unknown'}</span>
      </div>
    );
  }

  const {
    EmployeeID,
    JobTitle,
    Department,
    Manager,
    OfficeLocation,
    JoiningDate,
    EmploymentType,
    WorkMode,
  } = employee;

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Professional Information</h2>
          <p className="text-sm text-gray-500 mt-1">Employee ID: {EmployeeID || '-'}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 space-y-6">
          <FormGrid>
            <FormField label="Job Title" value={JobTitle} />
            <FormField label="Department" value={Department} />
          </FormGrid>

          <FormGrid>
            <FormField label="Manager" value={Manager} />
            <FormField label="Office Location" value={OfficeLocation} />
          </FormGrid>

          <FormGrid>
            <FormField label="Joining Date" value={JoiningDate} />
            <FormField label="Employment Type" value={EmploymentType} />
          </FormGrid>

          <FormGrid>
            <FormField label="Work Mode" value={WorkMode} />
            <FormField label="Employee ID" value={EmployeeID} />
          </FormGrid>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfessionalPage;
