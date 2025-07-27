import React, { useState } from 'react';
import Sidebar from '../../../components/common/Sidebar';
import SearchView from '../../../components/ui/SearchView';
import Dropdown from '../../../components/ui/Dropdown';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import BreadCrumb from '../../../components/ui/BreadCrumb';

const EmployeeAttendancePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('Attendance');

  const attendanceData = [
    {
      date: 'Wed, Aug 13, 2025',
      checkIn: '9:00 AM',
      checkOut: '5:00 PM',
      total: '8hr',
      comment: 'I love my team',
      status: 'On time',
      statusColor: 'bg-table-1'
    },
    {
      date: 'Thu, Aug 14, 2025',
      checkIn: '10:00 AM',
      checkOut: '6:00 PM',
      total: '8hr',
      comment: 'Project deadline',
      status: 'Late',
      statusColor: 'bg-table-3'
    },
    {
      date: 'Fri, Aug 15, 2025',
      checkIn: '11:00 AM',
      checkOut: '7:00 PM',
      total: '8hr',
      comment: 'Team building exercise',
      status: 'Holidays',
      statusColor: 'bg-table-2'
    }
  ];

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

  const breadcrumbItems = [
    { label: 'Profile' },
    { label: 'Manal Battache' }
  ];

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex w-full min-h-screen bg-global-1">
      {/* Sidebar */}
      <div className="w-full max-w-[280px] lg:w-[14%] border-r-2 border-global-6 bg-sidebar-2">
        <div className="flex flex-col h-full pt-[24px] pr-[22px] pl-[22px]">
          {/* Logo */}
          <div className="mt-[4px] mb-[20px]">
            <img 
              src="/images/img_arrow_down.svg" 
              alt="SlasHR Logo" 
              className="w-full max-w-[248px] h-[88px]"
            />
          </div>

          {/* Search */}
          <div className="mb-[20px]">
            <SearchView
              placeholder="Search....."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              className="w-full p-[12px_22px_12px_36px] border border-[#e4e4e4] rounded-[8px] bg-global-1 text-[12px] font-inter font-normal leading-[15px] text-global-3"
              leftImage={{
                src: "/images/img_search.svg",
                width: 12,
                height: 12
              }}
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-[20px] flex-1">
            <div className="flex items-center p-[8px] bg-global-3 rounded-[8px]">
              <img src="/images/img_frame.svg" alt="Dashboard" className="w-[20px] h-[20px]" />
              <span className="ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] text-global-5">
                Dashboard
              </span>
            </div>

            <div className="flex items-center justify-between p-[8px]">
              <div className="flex items-center">
                <img src="/images/img_frame_gray_700.svg" alt="Inbox" className="w-[20px] h-[20px]" />
                <span className="ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
                  Inbox
                </span>
              </div>
              <div className="bg-sidebar-1 rounded-[6px] px-[6px] py-[2px]">
                <span className="text-[12px] font-inter font-bold leading-[15px] text-global-5">53</span>
              </div>
            </div>

            <div className="flex items-center p-[12px]">
              <img src="/images/img_frame_gray_700_20x20.svg" alt="People & Org" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[20px] text-global-3">
                People & Org
              </span>
            </div>

            <div className="flex items-center p-[8px]">
              <img src="/images/img_frame_gray_700_18x18.svg" alt="Calendar" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
                Calendar
              </span>
            </div>

            <div className="flex items-center p-[12px]">
              <img src="/images/img_frame_20x20.svg" alt="Documents" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[20px] text-global-3">
                Documents
              </span>
            </div>

            <div className="flex items-center p-[8px]">
              <img src="/images/img_frame_18x18.svg" alt="Work Schedule" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
                Work Schedule
              </span>
            </div>

            <div className="flex items-center p-[8px]">
              <img src="/images/img_frame_1.svg" alt="Analytics" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
                Analytics
              </span>
            </div>

            <div className="flex items-center p-[8px]">
              <img src="/images/img_frame_2.svg" alt="Settings" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
                Settings
              </span>
            </div>
          </div>

          {/* User Dropdown */}
          <div className="mt-auto mb-[24px]">
            <Dropdown
              placeholder="Manal Battache"
              className="w-full p-[28px_28px_28px_12px] border border-[#e4e4e4] rounded-[10px] bg-global-1 text-[14px] font-poppins font-normal leading-[21px] text-global-3"
              rightImage={{
                src: "/images/img_icons_16px_arrow_down.svg",
                width: 16,
                height: 14
              }}
            >
              SlasHR
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-global-1 pt-[24px] pr-[6px]">
          <div className="flex items-center gap-[18px] ml-[72px] mb-[24px]">
            <img src="/images/img_group_2570.svg" alt="Profile" className="w-[44px] h-[44px]" />
            <BreadCrumb
              items={breadcrumbItems}
              separator=">"
              className="gap-[80px]"
            />
          </div>
          <div className="w-full h-[1px] bg-header-1"></div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-global-1 px-[72px] py-[24px]">
          <div className="flex items-center gap-[58px] mb-[22px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-[16px] font-inter font-bold leading-[20px] ${
                  selectedTab === tab ? 'text-global-2' : 'text-global-3'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="w-[92px] h-[3px] bg-global-2 rounded-[1px]"></div>
          </div>
          <div className="w-full h-[1px] bg-header-1 mt-[22px]"></div>
        </div>

        {/* Attendance Table */}
        <div className="flex-1 px-[66px] py-[32px]">
          <div className="bg-global-1 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005] p-[26px_24px]">
            {/* Table */}
            <div className="mb-[24px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-[18px] pl-[34px] text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                      Date
                    </th>
                    <th className="text-left pb-[18px] text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                      Check In
                    </th>
                    <th className="text-left pb-[18px] text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                      Check Out
                    </th>
                    <th className="text-left pb-[18px] text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                      Total
                    </th>
                    <th className="text-left pb-[18px] text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-[28px] pl-[34px] text-[14px] font-poppins font-medium leading-[21px] text-global-1">
                        {row.date}
                      </td>
                      <td className="py-[28px] text-[14px] font-poppins font-medium leading-[21px] text-global-1">
                        {row.checkIn}
                      </td>
                      <td className="py-[28px] text-[14px] font-poppins font-medium leading-[21px] text-global-1">
                        {row.checkOut}
                      </td>
                      <td className="py-[28px] text-[14px] font-poppins font-medium leading-[21px] text-global-1">
                        {row.total}
                      </td>
                      <td className="py-[26px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] font-poppins font-medium leading-[21px] text-global-1">
                            {row.comment}
                          </span>
                          <div className={`flex items-center gap-[6px] px-[8px] py-[4px] rounded-[4px] ${row.statusColor}`}>
                            <div className="w-[8px] h-[8px] bg-global-1 border border-global-5 rounded-[4px]"></div>
                            <span className="text-[12px] font-poppins font-medium leading-[18px] text-global-1">
                              {row.status}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                Showing data 3 of 3 entries
              </span>
              <div className="flex items-center gap-[8px]">
                <button className="w-[26px] h-[18px] border border-global-7 rounded-[4px] bg-global-9 text-[12px] font-poppins font-medium leading-[18px] text-global-1 flex items-center justify-center">
                  &lt;
                </button>
                <button className="w-[24px] h-[18px] rounded-[4px] bg-global-2 text-[12px] font-poppins font-medium leading-[18px] text-global-5 flex items-center justify-center">
                  1
                </button>
                <button className="w-[26px] h-[18px] border border-global-7 rounded-[4px] bg-global-9 text-[12px] font-poppins font-medium leading-[18px] text-global-1 flex items-center justify-center">
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

export default EmployeeAttendancePage;