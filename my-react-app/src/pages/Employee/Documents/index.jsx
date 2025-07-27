import React, { useState } from 'react';
import Sidebar from '../../../components/common/Sidebar';


import Pagination from '../../../components/ui/Pagination';

const EmployeeDocumentsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleRowSelect = (rowIndex, isSelected) => {
    if (Array.isArray(rowIndex)) {
      // Handle select all
      setSelectedRows(isSelected ? rowIndex : []);
    } else {
      // Handle individual row selection
      setSelectedRows(prev => 
        isSelected 
          ? [...prev, rowIndex]
          : prev.filter(index => index !== rowIndex)
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const breadcrumbItems = [
    { label: 'Profile' },
    { label: 'Manal Battache' }
  ];

  const tabItems = [
    { label: 'Personal info', active: false },
    { label: 'Professional info', active: false },
    { label: 'Documents', active: true },
    { label: 'Leave history', active: false },
    { label: 'Letter history', active: false },
    { label: 'Attendance', active: false },
    { label: 'Badges', active: false },
    { label: 'Feedback', active: false }
  ];

  const documentData = [
    {
      fileName: 'Identity Documents.pdf',
      uploadedBy: 'Manale Battache',
      createdOn: '01/11/2025',
      category: 'Family Documents',
      avatar: '/images/img_ellipse_26.png',
      fileIcon: '/images/img_frame_gray_300_02.svg'
    }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeMenuItem="People & Org" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="w-full bg-white">
          <div className="px-4 sm:px-6 lg:px-[72px] pt-[24px]">
            {/* Breadcrumb and Profile Icon */}
            <div className="flex items-center gap-[18px] mb-[24px]">
              <img 
                src="/images/img_group_2570.svg" 
                alt="Profile" 
                className="w-[44px] h-[44px]"
              />
              <div className="flex items-center gap-[80px]">
                <span className="text-[25px] font-poppins font-medium leading-[38px] text-black">
                  Profile
                </span>
                <span className="text-[25px] font-poppins font-medium leading-[38px] text-black">
                  Manal Battache
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#ebebeb] mb-[24px]"></div>

            {/* Tab Navigation */}
            <div className="flex items-start gap-[58px] mb-[24px] overflow-x-auto">
              {tabItems.map((tab, index) => (
                <div key={index} className="flex flex-col items-center gap-[24px] min-w-max">
                  <span className={`text-[16px] font-inter font-bold leading-[20px] ${
                    tab.active ? 'text-[#2b6171]' : 'text-[#626262]'
                  }`}>
                    {tab.label}
                  </span>
                  {tab.active && (
                    <div className="w-[90px] h-[3px] bg-[#2b6171] rounded-[1px]"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Final Divider */}
            <div className="w-full h-[1px] bg-[#ebebeb]"></div>
          </div>
        </div>

        {/* Documents Table Section */}
        <div className="flex-1 px-4 sm:px-6 lg:px-[66px] py-[32px]">
          <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0px_0px_6px_#00000005] p-[20px]">
            {/* Table Header */}
            <div className="px-[12px] mb-[14px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[40px]">
                  <div className="flex items-center gap-[22px]">
                    <div className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"></div>
                    <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">
                      File name
                    </span>
                  </div>
                  <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">
                    Uploaded by
                  </span>
                </div>
                <div className="flex items-center gap-[244px]">
                  <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">
                    Created on
                  </span>
                  <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0] mr-[116px]">
                    Category
                  </span>
                </div>
              </div>
            </div>

            {/* Table Data */}
            <div className="px-[12px]">
              {documentData.map((doc, index) => (
                <div key={index} className="mb-[18px]">
                  <div className="flex items-center justify-between">
                    {/* Left Section - Checkbox, File Icon, File Name */}
                    <div className="flex items-center gap-[20px]">
                      <div className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"></div>
                      <div className="flex items-center gap-[20px]">
                        <img 
                          src={doc.fileIcon} 
                          alt="file icon" 
                          className="w-[34px] h-[34px]"
                        />
                        <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
                          {doc.fileName}
                        </span>
                      </div>
                    </div>

                    {/* Right Section - Avatar, Uploaded By, Created On, Category, Action */}
                    <div className="flex items-center gap-[64px]">
                      <div className="flex items-center gap-[64px]">
                        <img 
                          src={doc.avatar} 
                          alt="user avatar" 
                          className="w-[40px] h-[40px] rounded-[20px]"
                        />
                        <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
                          {doc.uploadedBy}
                        </span>
                      </div>
                      <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
                        {doc.createdOn}
                      </span>
                      <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">
                        {doc.category}
                      </span>
                      <img 
                        src="/images/img_search_blue_gray_700.svg" 
                        alt="action" 
                        className="w-[24px] h-[24px] cursor-pointer hover:opacity-70"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="w-full h-[1px] bg-[#eeeeee] my-[16px]"></div>

              {/* Pagination Section */}
              <div className="flex items-center justify-between pt-[16px]">
                <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">
                  Showing data 1 of 1 entries
                </span>
                
                <div className="flex items-center gap-[8px]">
                  <button className="w-[26px] h-[18px] bg-[#f5f5f5] border border-[#eeeeee] rounded-[4px] text-[12px] font-poppins font-medium leading-[18px] text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                    &lt;
                  </button>
                  <button className="w-[24px] h-[18px] bg-[#2b6171] rounded-[4px] text-[12px] font-poppins font-medium leading-[18px] text-white flex items-center justify-center">
                    1
                  </button>
                  <button className="w-[26px] h-[18px] bg-[#f5f5f5] border border-[#eeeeee] rounded-[4px] text-[12px] font-poppins font-medium leading-[18px] text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentsPage;