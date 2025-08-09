import React, { useEffect, useState } from 'react';
import EditText from '../../../components/ui/EditText';

// Layout Grid
const FormGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

// Single Field Component
const FormField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
    <EditText
      value={value}
      readOnly
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
    />
  </div>
);

const EmployeePersonalPage = () => {
  const storedUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const userId = parseInt(storedUserId, 10);

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || isNaN(userId)) {
      console.warn('Invalid user ID');
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/employee/by-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setEmployee(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch employee data:', err);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="text-center py-10 text-red-500">
        Employee not found.<br />
        <span className="text-sm text-gray-600">User ID: {userId || 'Unknown'}</span>
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
    Organization
  } = employee;

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">

        {/* Profile Photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src="/images/img_ellipse_25.png"
            alt={PreferredName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-8">
          {/* Name & ID */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{FirstName}</h2>
            <p className="text-sm text-gray-500 mt-1">Position: {Position || '-'}</p>
            <p className="text-sm text-gray-500">Organization: {Organization || '-'}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <FormGrid>
              <FormField label="First name" value={FirstName || ''} />
              <FormField label="Preferred name" value={PreferredName || ''} />
            </FormGrid>

            <FormGrid>
              <FormField label="Gender" value={Gender || ''} />
              <FormField label="Date of birth" value={DateOfBirth || ''} />
            </FormGrid>

            <FormGrid>
              <FormField label="Nationality" value={Nationality || ''} />
              <FormField label="Marital status" value={MaritalStatus || ''} />
            </FormGrid>

            <FormGrid>
              <FormField label="Phone number" value={PhoneNumber || ''} />
              <FormField label="CIN" value={CIN || ''} />
            </FormGrid>

            <FormGrid>
              <FormField label="Personal email" value={PersonalEmail || ''} />
              <FormField label="Position" value={Position || ''} />
            </FormGrid>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Personal address</label>
              <EditText
                value={PersonalAddress || ''}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
              />
            </div>

            {/* Emergency Contact - Placeholder */}
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
