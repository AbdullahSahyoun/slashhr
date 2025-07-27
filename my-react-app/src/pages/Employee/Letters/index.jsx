import React, { useState } from 'react';
import Sidebar from '../../../components/common/Sidebar';
import Header from '../../../components/common/Header';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

const EmployeeLettersPage = () => {
  const [activeTab, setActiveTab] = useState('Letter history');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const breadcrumbItems = [
    { label: 'Profile', disabled: false },
    { label: 'Manal Battache', disabled: true }
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

  const tableHeaders = [
    'Letter type',
    'By', 
    'Date',
    'Purpose',
    'Recipient',
    'Information',
    'Status'
  ];

  const tableData = [
    [
      'Work Certificate',
      <div key="user1" className="flex items-center gap-[22px]">
        <img 
          src="/images/img_ellipse_26.png" 
          alt="Manale Battache"
          className="w-[40px] h-[40px] rounded-full"
        />
        <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
          Manale Battache
        </span>
      </div>,
      '27 Dec 2025',
      '-',
      '-', 
      '-',
      <div key="status1" className="inline-flex items-center justify-center px-[8px] py-[4px] bg-global-11 rounded-[4px]">
        <span className="text-[12px] font-poppins font-medium leading-[18px] text-black">
          Pending
        </span>
      </div>
    ],
    [
      'Work Certificate',
      <div key="user2" className="flex items-center gap-[22px]">
        <img 
          src="/images/img_ellipse_26.png" 
          alt="Manale Battache"
          className="w-[40px] h-[40px] rounded-full"
        />
        <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
          Manale Battache
        </span>
      </div>,
      '27 Dec 2025',
      '-',
      '-',
      '-', 
      <div key="status2" className="inline-flex items-center justify-center px-[8px] py-[4px] bg-table-1 rounded-[4px]">
        <span className="text-[12px] font-poppins font-medium leading-[18px] text-black">
          Approved
        </span>
      </div>
    ],
    [
      'Work Certificate',
      <div key="user3" className="flex items-center gap-[22px]">
        <img 
          src="/images/img_ellipse_26.png" 
          alt="Manale Battache"
          className="w-[40px] h-[40px] rounded-full"
        />
        <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
          Manale Battache
        </span>
      </div>,
      '27 Dec 2025',
      '-',
      '-',
      '-',
      <div key="status3" className="inline-flex items-center justify-center px-[8px] py-[4px] bg-table-3 rounded-[4px]">
        <span className="text-[12px] font-poppins font-medium leading-[18px] text-black">
          Rejected
        </span>
      </div>
    ]
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeMenuItem="People & Org" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header breadcrumbItems={breadcrumbItems} />

        {/* Tab Navigation */}
        <div className="px-[72px] py-[22px] bg-white border-b border-header-1">
          <div className="flex flex-wrap items-center gap-[58px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`
                  text-[16px] font-inter font-bold leading-[20px] pb-[22px] relative transition-colors duration-200
                  ${activeTab === tab 
                    ? 'text-global-2' :'text-global-3 hover:text-global-2'
                  }
                `}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-[114px] h-[3px] bg-global-2 rounded-[1px]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-[66px] py-[32px]">
          <div className="bg-white border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005] p-[24px]">
            {/* Table */}
            <div className="mb-[24px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className={`
                          text-left pb-[18px] text-[14px] font-poppins font-medium leading-[21px] text-global-8
                          ${index === 0 ? 'pl-[20px]' : ''}
                        `}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-100 last:border-b-0">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`
                            py-[28px] text-[14px] font-poppins font-medium leading-[21px] text-black
                            ${cellIndex === 0 ? 'pl-[20px]' : ''}
                          `}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                Showing data 3 of 3 entries
              </span>
              
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-[26px] h-[26px] flex items-center justify-center text-[12px] font-poppins font-medium leading-[18px] text-black bg-global-9 border border-global-7 rounded-[4px] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                
                <button className="w-[24px] h-[26px] flex items-center justify-center text-[12px] font-poppins font-medium leading-[18px] text-white bg-global-2 rounded-[4px]">
                  1
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-[26px] h-[26px] flex items-center justify-center text-[12px] font-poppins font-medium leading-[18px] text-black bg-global-9 border border-global-7 rounded-[4px] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
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

export default EmployeeLettersPage;