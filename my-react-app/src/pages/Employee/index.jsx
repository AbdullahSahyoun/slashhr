import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import EditText from '../../components/ui/EditText';
import Dropdown from '../../components/ui/Dropdown';

// Import each tab section component
import PersonalInfo from './Personal';
import ProfessionalInfo from './Professional';
import Documents from './Documents';
import LeaveHistory from './LeaveHistory';
import LetterHistory from './Letters';
import Attendance from './Attendance';
import Badges from './Badges';
import Feedback from './Feedback';

const EmployeeProfilePage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('Manal Battache');
  const [activeTab, setActiveTab] = useState('Personal info');

  const tabs = [
    'Personal info',
    'Professional info',
    'Documents',
    'Leave history',
    'Letter history',
    'Attendance',
    'Badges',
    'Feedback'
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal info':
        return <PersonalInfo />;
      case 'Professional info':
        return <ProfessionalInfo />;
      case 'Documents':
        return <Documents />;
      case 'Leave history':
        return <LeaveHistory />;
      case 'Letter history':
        return <LetterHistory />;
      case 'Attendance':
        return <Attendance />;
      case 'Badges':
        return <Badges />;
      case 'Feedback':
        return <Feedback />;
      default:
        return <div>Select a Tab</div>;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white">
          <div className="flex flex-col gap-[22px] pt-6 pr-6 pl-[72px] pb-0">
            <div className="flex items-center gap-[18px]">
              <img src="/images/img_group_2570.svg" alt="Profile Icon" className="w-11 h-11" />
              <h1 className="text-[25px] font-poppins font-medium text-black leading-[38px]">
                Profile &gt; {selectedEmployee}
              </h1>
            </div>
            <div className="w-full h-[1px] bg-header-1"></div>
          </div>

          <div className="flex flex-col px-[72px]">
            <div className="flex items-start gap-[58px] overflow-x-auto">
              {tabs.map((tab, index) => (
                <div key={index} className="flex flex-col items-center min-w-max">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`text-base font-inter font-bold leading-5 py-4 whitespace-nowrap ${activeTab === tab ? 'text-global-2' : 'text-global-3'}`}
                  >
                    {tab}
                  </button>
                  {activeTab === tab && (
                    <div className="w-full h-[3px] bg-global-2 rounded-[1px] mt-6"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-header-1 mt-0"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-[1440px] mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
