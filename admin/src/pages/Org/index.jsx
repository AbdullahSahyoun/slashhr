import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';

// tab sections
import Overview from './Overview';
import People from './People';
import Departments from './Departments';
import Teams from './Teams';
import OrgChart from './OrgChart';
import Jobs from './Jobs';
import Documents from './Documents';
import Analytics from './Analytics';
import Settings from './Settings';

const OrgPage = () => {
  const [selectedOrg, setSelectedOrg] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [activeTab, setActiveTab] = useState('Overview');

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const token = localStorage.getItem('token');

  const tabs = [
    'Overview',
    'People',
    'Departments',
    'Teams',
    'OrgChart',
    'Jobs',
    'Documents',
    'Analytics',
    'Settings',
  ];

  useEffect(() => {
    if (!selectedOrg) return;
    (async () => {
      try {
        const res = await fetch(`${API}/organization/${selectedOrg}/name`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        setOrgName(data.OrgName || `#${selectedOrg}`);
      } catch (e) {
        console.error('Load org name failed:', e);
        setOrgName(`#${selectedOrg}`);
      }
    })();
  }, [selectedOrg, API, token]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':   return <Overview orgId={selectedOrg} />;
      case 'People':     return <People orgId={selectedOrg} />;
      case 'Departments':return <Departments orgId={selectedOrg} />;
      case 'Teams':      return <Teams orgId={selectedOrg} />;
      case 'OrgChart':   return <OrgChart orgId={selectedOrg} />;
      case 'Jobs':       return <Jobs orgId={selectedOrg} />;
      case 'Documents':  return <Documents orgId={selectedOrg} />;
      case 'Analytics':  return <Analytics orgId={selectedOrg} />;
      case 'Settings':   return <Settings orgId={selectedOrg} />;
      default:           return <Overview orgId={selectedOrg} />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar (same component you use with Employee) */}
      <Sidebar className="shrink-0" />

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        {/* Header */}
        <div className="w-full bg-white">
          <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-12 pt-6 pb-0">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <img src="/images/img_group_2570.svg" alt="Org Icon" className="w-11 h-11" />
              <h1 className="text-xl sm:text-2xl font-medium text-black">
                Organization &gt; {orgName}
              </h1>
            </div>
            <div className="w-full h-[1px] bg-header-1" />
          </div>

          {/* Tabs (same look & feel as Employee) */}
          <div className="flex flex-col px-4 sm:px-6 lg:px-12">
            <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto">
              {tabs.map((tab) => (
                <div key={tab} className="flex flex-col items-center min-w-max">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm sm:text-base font-bold py-3 whitespace-nowrap ${
                      activeTab === tab ? 'text-global-2' : 'text-global-3'
                    }`}
                  >
                    {tab === 'OrgChart' ? 'Org chart' : tab}
                  </button>
                  {activeTab === tab && (
                    <div className="w-full h-[3px] bg-global-2 rounded mt-3" />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-header-1 mt-0" />
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-screen-xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default OrgPage;
