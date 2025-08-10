import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';

// Tab section components
import PersonalInfo from './Personal';
import ProfessionalInfo from './Professional';
import Documents from './Documents';
import LeaveHistory from './LeaveHistory';
import LetterHistory from './Letters';
import Attendance from './Attendance';
import Badges from './Badges';
import Feedback from './Feedback';

const EmployeeProfilePage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(12); // default to ID 12
  const [employeeName, setEmployeeName] = useState('');
  const [activeTab, setActiveTab] = useState('Personal');

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const token = localStorage.getItem('token');

  const tabs = [
    'Personal',
    'Professional',
    'Documents',
    'Leave history',
    'Letter history',
    'Attendance',
    'Badges',
    'Feedback'
  ];

  // Fetch employee name
  useEffect(() => {
    if (!selectedEmployee) return;

    async function loadName() {
      try {
        const res = await fetch(`${API}/employee/${selectedEmployee}/name`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`API ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setEmployeeName(data.EmployeeName || `#${selectedEmployee}`);
      } catch (err) {
        console.error('Failed to load employee name:', err);
        setEmployeeName(`#${selectedEmployee}`);
      }
    }

    loadName();
  }, [selectedEmployee, API, token]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal':
        return <PersonalInfo employeeId={selectedEmployee} />;
      case 'Professional':
        return <ProfessionalInfo employeeId={selectedEmployee} />;
      case 'Documents':
        return <Documents employeeId={selectedEmployee} />;
      case 'Leave history':
        return <LeaveHistory employeeId={selectedEmployee} />;
      case 'Letter history':
        return <LetterHistory employeeId={selectedEmployee} />;
      case 'Attendance':
        return <Attendance employeeId={selectedEmployee} />;
      case 'Badges':
        return <Badges employeeId={selectedEmployee} />;
      case 'Feedback':
        return <Feedback employeeId={selectedEmployee} />;
      default:
        return <PersonalInfo employeeId={selectedEmployee} />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        className="shrink-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[270px]">
        {/* Header */}
        <div className="w-full bg-white">
          <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-12 pt-6 pb-0">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <img src="/images/img_group_2570.svg" alt="Profile Icon" className="w-11 h-11" />
              <h1 className="text-xl sm:text-2xl font-medium text-black">
                Profile &gt; {employeeName}
              </h1>
            </div>
            <div className="w-full h-[1px] bg-header-1"></div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col px-4 sm:px-6 lg:px-12">
            <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto">
              {tabs.map((tab, index) => (
                <div key={index} className="flex flex-col items-center min-w-max">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm sm:text-base font-bold py-3 whitespace-nowrap ${
                      activeTab === tab ? 'text-global-2' : 'text-global-3'
                    }`}
                  >
                    {tab}
                  </button>
                  {activeTab === tab && (
                    <div className="w-full h-[3px] bg-global-2 rounded mt-3"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-header-1 mt-0"></div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-screen-xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
