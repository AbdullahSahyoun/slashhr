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
     
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
     

        {/* Tab Navigation */}
    
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