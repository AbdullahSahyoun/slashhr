import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Requests from './Requests';
import Notifications from './Notifications';

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState('Requests'); // 'Requests' | 'Notifications'

  const tabs = ['Requests', 'Notifications'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Requests':
        return <Requests />;
      case 'Notifications':
        return <Notifications />;
      default:
        return <Requests />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar (reused like your EmployeeProfile) */}
      <Sidebar className="shrink-0" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[270px]">
        {/* Header */}
        <div className="w-full bg-white">
          <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-12 pt-6 pb-0">
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src="/images/img_ellipse_238.png"
                alt="User Avatar"
                className="w-11 h-11 rounded-full"
              />
              <h1 className="text-xl sm:text-2xl font-medium text-black">
                Inbox
              </h1>
            </div>
            <div className="w-full h-px bg-header-1" />
          </div>

          {/* Tabs */}
          <div className="flex flex-col px-4 sm:px-6 lg:px-12">
            <div className="flex items-start gap-6 overflow-x-auto">
              {tabs.map((tab) => (
                <div key={tab} className="flex flex-col items-center min-w-max">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm sm:text-base font-bold py-3 whitespace-nowrap ${
                      activeTab === tab ? 'text-global-2' : 'text-global-3'
                    }`}
                  >
                    {tab}
                  </button>
                  {activeTab === tab && (
                    <div className="w-full h-[3px] bg-global-2 rounded mt-3" />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-header-1" />
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

export default InboxPage;
