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
      value={value || '—'}
      readOnly
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
    />
  </div>
);

const EmployeeProfessionalPage = () => {
  const employeeId = 12;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/employee/professional/${employeeId}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch employee data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="text-center py-10 text-red-500">
        Employee not found.<br />
        <span className="text-sm text-gray-600">Employee ID: {employeeId}</span>
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
    WorkMode
  } = employee;

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Professional Information</h2>
          <p className="text-sm text-gray-500 mt-1">Employee ID: {EmployeeID}</p>
        </div>

        {/* Professional Info */}
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
            <FormField label="Joining Date" value={JoiningDate ? new Date(JoiningDate).toLocaleDateString() : ''} />
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
