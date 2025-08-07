import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import EditText from '../../components/ui/EditText';
import Dropdown from '../../components/ui/Dropdown';

// Tab section components
import PersonalInfo from './Personal';
import Documents from './Documents';
import LeaveHistory from './LeaveHistory';
import LetterHistory from './Letters';
import Attendance from './Attendance';
import Badges from './Badges';
import Feedback from './Feedback';

const ProfessionalInfo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Professional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <EditText label="Job Title" placeholder="e.g. Software Engineer" />
        <EditText label="Department" placeholder="e.g. IT" />
        <EditText label="Manager" placeholder="e.g. John Doe" />
        <EditText label="Office Location" placeholder="e.g. HQ - Floor 3" />
        <EditText label="Employee ID" placeholder="e.g. 123456" />
        <EditText label="Joining Date" type="date" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Dropdown label="Employment Type" options={['Full-Time', 'Part-Time', 'Contract', 'Intern']} />
        <Dropdown label="Work Mode" options={['On-site', 'Remote', 'Hybrid']} />
      </div>
    </div>
  );
};

const EmployeeProfilePage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('Manal Battache');
  const [activeTab, setActiveTab] = useState('Personal info');

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

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal': return <PersonalInfo />;
      case 'Professional': return <ProfessionalInfo />;
      case 'Documents': return <Documents />;
      case 'Leave history': return <LeaveHistory />;
      case 'Letter history': return <LetterHistory />;
      case 'Attendance': return <Attendance />;
      case 'Badges': return <Badges />;
      case 'Feedback': return <Feedback />;
      default: return <PersonalInfo />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} className="shrink-0" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[270px]">
        {/* Header */}
        <div className="w-full bg-white">
          <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-12 pt-6 pb-0">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <img src="/images/img_group_2570.svg" alt="Profile Icon" className="w-11 h-11" />
              <h1 className="text-xl sm:text-2xl font-medium text-black">
                Profile &gt; {selectedEmployee}
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