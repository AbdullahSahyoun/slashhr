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
      value={value ?? ''} // always a string
      readOnly
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
    />
  </div>
);

function fmtDate(d) {
  if (!d) return '';
  const dt = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return '';
  return dt.toISOString().slice(0, 10); // YYYY-MM-DD
}

const EmployeePersonalPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const employeeId = Number(params.get('id'));
  const token = localStorage.getItem('token');

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
    const API = import.meta.env.VITE_API_URL;

    async function load() {
      try {
        setLoading(true);
        setErrMsg('');
        const res = await fetch(`${API}/employee/${employeeId}/personal`, {
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
          console.error('Failed to fetch employee data:', e);
          setErrMsg('Failed to load employee data.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ctrl.abort();
  }, [employeeId, token]);

  // Map backend shape (joined fields) to UI-friendly names
  const employee = useMemo(() => {
    if (!raw) return null;

    // API fields:
    // FirstName, PreferredName, PersonalEmail, Gender, DateOfBirth,
    // Nationality, MaritalStatus, PhoneNumber, CIN, PersonalAddress,
    // Position, Organization, EmployeeCreatedAt (optional display)
    return {
      FirstName: raw.FirstName ?? '',
      PreferredName: raw.PreferredName ?? '',
      PersonalEmail: raw.PersonalEmail ?? '',
      Gender: raw.Gender ?? '',
      DateOfBirth: fmtDate(raw.DateOfBirth),
      Nationality: raw.Nationality ?? '',
      MaritalStatus: raw.MaritalStatus ?? '',
      PhoneNumber: raw.PhoneNumber ?? '',
      CIN: raw.CIN ?? '',
      PersonalAddress: raw.PersonalAddress ?? '',
      Position: raw.Position ?? '-',
      Organization: raw.Organization ?? '-',
      EmployeeCreatedAt: fmtDate(raw.EmployeeCreatedAt),
      AvatarUrl: raw.AvatarUrl || '/images/img_ellipse_25.png',
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
    FirstName,
    PreferredName,
    PersonalEmail,
    Gender,
    DateOfBirth,
    Nationality,
    MaritalStatus,
    PhoneNumber,
    CIN,
    PersonalAddress,
    Position,
    Organization,
    AvatarUrl,
    EmployeeCreatedAt,
  } = employee;

  const displayName = PreferredName || FirstName || 'Employee';

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src={AvatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{displayName}</h2>
            <p className="text-sm text-gray-500 mt-1">Position: {Position}</p>
            <p className="text-sm text-gray-500">Organization: {Organization}</p>
            {EmployeeCreatedAt && (
              <p className="text-xs text-gray-400 mt-1">Employee since: {EmployeeCreatedAt}</p>
            )}
          </div>

          <div className="space-y-6">
            <FormGrid>
              <FormField label="First name" value={FirstName} />
              <FormField label="Preferred name" value={PreferredName} />
            </FormGrid>
            <FormGrid>
              <FormField label="Gender" value={Gender} />
              <FormField label="Date of birth" value={DateOfBirth} />
            </FormGrid>
            <FormGrid>
              <FormField label="Nationality" value={Nationality} />
              <FormField label="Marital status" value={MaritalStatus} />
            </FormGrid>
            <FormGrid>
              <FormField label="Phone number" value={PhoneNumber} />
              <FormField label="CIN" value={CIN} />
            </FormGrid>
            <FormGrid>
              <FormField label="Personal email" value={PersonalEmail} />
              <FormField label="Position" value={Position} />
            </FormGrid>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Personal address</label>
              <EditText
                value={PersonalAddress ?? ''}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
              />
            </div>

            {/* Placeholder block until Emergency Contact is implemented */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-semibold text-gray-700">Emergency contact</h3>
              <FormGrid>
                <FormField label="Full name" value="—" />
                <FormField label="Phone number" value="—" />
              </FormGrid>
              <FormField label="Relationship" value="—" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalPage;
