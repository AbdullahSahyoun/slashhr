import React, { useState } from 'react';
import SearchView from '../../../components/ui/SearchView';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import BreadCrumb from '../../../components/ui/BreadCrumb';

const EmployeeLeaveHistory = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('Leave history');

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

  const leaveData = [
    {
      leaveType: 'Vacation',
      by: {
        name: 'Manale Battache',
        avatar: '/images/img_ellipse_26.png'
      },
      from: '27 Dec 2025',
      to: '30 Dec 2025',
      reason: 'Friend\'s wedding celebration',
      status: 'Pending'
    },
    {
      leaveType: 'Vacation',
      by: {
        name: 'Manale Battache',
        avatar: '/images/img_ellipse_26.png'
      },
      from: '27 Dec 2025',
      to: '30 Dec 2025',
      reason: 'Friend\'s wedding celebration',
      status: 'Approved'
    },
    {
      leaveType: 'Vacation',
      by: {
        name: 'Manale Battache',
        avatar: '/images/img_ellipse_26.png'
      },
      from: '27 Dec 2025',
      to: '30 Dec 2025',
      reason: 'Friend\'s wedding celebration',
      status: 'Rejected'
    }
  ];

  const breadcrumbItems = [
    { label: 'Profile' },
    { label: 'Manal Battache' }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'bg-global-11 text-global-1',
      'Approved': 'bg-table-1 text-global-1',
      'Rejected': 'bg-table-3 text-global-1'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const renderTableRow = (item, index) => (
    <tr key={index} className="border-b border-gray-100">
      <td className="px-5 py-7 text-sm font-medium text-global-1">
        {item.leaveType}
      </td>
      <td className="px-0 py-4">
        <div className="flex items-center gap-6">
          <img 
            src={item.by.avatar} 
            alt="avatar" 
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-medium text-global-1">
            {item.by.name}
          </span>
        </div>
      </td>
      <td className="px-0 py-7 text-sm font-medium text-global-1">
        {item.from}
      </td>
      <td className="px-0 py-7 text-sm font-medium text-global-1">
        {item.to}
      </td>
      <td className="px-0 py-7 text-sm font-medium text-global-1">
        {item.reason}
      </td>
      <td className="px-0 py-7">
        {getStatusBadge(item.status)}
      </td>
    </tr>
  );

  return (
    <div className="flex w-full min-h-screen bg-global-1">
      {/* Sidebar */}
      <div className="w-full max-w-[280px] bg-sidebar-2 border-r-2 border-global-6 flex flex-col">
        {/* Logo */}
        <div className="px-6 pt-6 pb-1">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-full max-w-[248px] h-[88px]"
          />
        </div>

        {/* Search */}
        <div className="px-6 mt-5">
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-9 py-3 text-xs font-normal text-global-3 bg-global-1 border border-edittext-1 rounded-lg"
            leftImage={{
              src: "/images/img_search.svg",
              width: 12,
              height: 12
            }}
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-5 px-6 mt-5">
          <div className="flex items-center gap-[18px] px-2 py-2 bg-global-3 rounded">
            <img src="/images/img_frame.svg" alt="dashboard" className="w-5 h-5" />
            <span className="text-base font-semibold text-global-5 font-poppins">Dashboard</span>
          </div>

          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-[18px]">
              <img src="/images/img_frame_gray_700.svg" alt="inbox" className="w-5 h-5" />
              <span className="text-base font-semibold text-global-3 font-poppins">Inbox</span>
            </div>
            <div className="bg-sidebar-1 rounded-md px-2 py-1">
              <span className="text-xs font-bold text-global-5">53</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-3 py-3">
            <img src="/images/img_frame_gray_700_20x20.svg" alt="people" className="w-5 h-5" />
            <span className="text-base font-semibold text-global-3 font-poppins">People & Org</span>
          </div>

          <div className="flex items-center gap-[18px] px-2 py-2">
            <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-1" />
            <span className="text-base font-semibold text-global-3 font-poppins">Calendar</span>
          </div>

          <div className="flex items-center gap-4 px-3 py-3">
            <img src="/images/img_frame_20x20.svg" alt="documents" className="w-5 h-5" />
            <span className="text-base font-semibold text-global-3 font-poppins">Documents</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-2">
            <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-1" />
            <span className="text-base font-semibold text-global-3 font-poppins">Work Schedule</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-2">
            <img src="/images/img_frame_1.svg" alt="analytics" className="w-5 h-5" />
            <span className="text-base font-semibold text-global-3 font-poppins">Analytics</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-2">
            <img src="/images/img_frame_2.svg" alt="settings" className="w-5 h-5" />
            <span className="text-base font-semibold text-global-3 font-poppins">Settings</span>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="mt-auto px-6 pb-6">
          <div className="flex items-center gap-4 px-3 py-7 bg-global-1 border border-edittext-1 rounded-[10px]">
            <span className="text-sm font-normal text-global-3 font-poppins flex-1">Manal Battache</span>
            <img src="/images/img_icons_16px_arrow_down.svg" alt="dropdown" className="w-4 h-[14px]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-global-1 px-6 sm:px-12 lg:px-18 pt-6 pb-0">
          <div className="flex items-center gap-[18px] mb-6">
            <img src="/images/img_group_2570.svg" alt="profile" className="w-11 h-11" />
            <BreadCrumb 
              items={breadcrumbItems}
              separator=">"
              className="text-2xl font-medium text-global-1 font-poppins"
            />
          </div>
          <div className="w-full h-px bg-header-1"></div>
        </div>

        {/* Tabs */}
        <div className="bg-global-1 px-6 sm:px-12 lg:px-18 pt-6">
          <div className="flex flex-wrap gap-14 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`text-base font-bold font-inter pb-1 ${
                  selectedTab === tab 
                    ? 'text-global-2 border-b-[3px] border-global-2' 
                    : 'text-global-3'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-full h-px bg-header-1"></div>
        </div>

        {/* Table Content */}
        <div className="flex-1 bg-global-1 px-6 sm:px-12 lg:px-16 pt-8 pb-8">
          <div className="bg-global-1 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005] p-6">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 pb-[18px] text-sm font-medium text-global-8 font-poppins">
                      Leave type
                    </th>
                    <th className="text-left px-0 pb-[18px] text-sm font-medium text-global-8 font-poppins">
                      By
                    </th>
                    <th className="text-left px-0 pb-[18px] text-sm font-medium text-global-8 font-poppins">
                      From
                    </th>
                    <th className="text-left px-0 pb-[18px] text-sm font-medium text-global-8 font-poppins">
                      To
                    </th>
                    <th className="text-left px-0 pb-[18px] text-sm font-medium text-global-8 font-poppins">
                      Reason
                    </th>
                    <th className="text-left px-0 pb-[18px] text-sm font-medium text-global-8 font-poppins">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaveData.map((item, index) => renderTableRow(item, index))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm font-medium text-global-8 font-poppins">
                Showing data 3 of 3 entries
              </span>
              <div className="flex items-center gap-2">
                <button className="w-[26px] h-[18px] bg-global-9 border border-global-7 rounded text-xs font-medium text-global-1 font-poppins flex items-center justify-center">
                  &lt;
                </button>
                <button className="w-6 h-[18px] bg-global-3 rounded text-xs font-medium text-global-5 font-poppins flex items-center justify-center">
                  1
                </button>
                <button className="w-[26px] h-[18px] bg-global-9 border border-global-7 rounded text-xs font-medium text-global-1 font-poppins flex items-center justify-center">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveHistory;