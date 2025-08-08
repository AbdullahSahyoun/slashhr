import React, { useState } from 'react';
import SearchView from '../../components/ui/SearchView';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';

const PeopleOrgPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterBy, setFilterBy] = useState('Filter by');
  const [groupBy, setGroupBy] = useState('Group');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sample employee data
  const employees = [
    {
      id: 1,
      firstName: 'mohamd',
      lastName: 'Amine',
      job: 'Fullstack developer',
      hired: '2 years ago',
      status: 'Active',
      avatar: '/images/img_avatar_image_39.png'
    },
    {
      id: 2,
      firstName: 'Corbin',
      lastName: 'Preston',
      job: 'Product owner',
      hired: 'in 18 days',
      status: 'Accepted',
      avatar: '/images/img_avatar_image_39_38x38.png'
    },
    {
      id: 3,
      firstName: 'Theo',
      lastName: 'O\'brien',
      job: 'Intern',
      hired: 'a year ago',
      status: 'Active',
      avatar: '/images/img_avatar_image_39_1.png'
    },
    {
      id: 4,
      firstName: 'Ryan',
      lastName: 'Lowery',
      job: 'Product owner',
      hired: '2 years ago',
      status: 'Active',
      avatar: '/images/img_avatar_image_39.png'
    }
  ];

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleRowSelect = (rowIndex, isSelected) => {
    if (Array.isArray(rowIndex)) {
      setSelectedRows(isSelected ? rowIndex : []);
    } else {
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

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'bg-[#75cbc3] text-white',
      'Accepted': 'bg-[#2b6171] text-white'
    };
    
    return (
      <div className={`inline-flex items-center gap-[6px] px-2 py-1 rounded-[4px] ${statusClasses[status] || 'bg-gray-200 text-gray-800'}`}>
        <div className={`w-[8px] h-[8px] rounded-[4px] border border-white ${status === 'Active' ? 'bg-[#2b6171]' : 'bg-[#75cbc3]'}`}></div>
        <span className="text-[12px] font-poppins font-medium leading-[18px]">{status}</span>
      </div>
    );
  };

  const tableHeaders = ['', 'First name', 'Last name', 'Job', 'Hired', 'Status'];
  
  const tableData = employees.map((employee, index) => [
    <div className="flex items-center gap-[36px]">
      <input 
        type="checkbox" 
        className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
        checked={selectedRows.includes(index)}
        onChange={(e) => handleRowSelect(index, e.target.checked)}
      />
      <img 
        src={employee.avatar} 
        alt="avatar" 
        className="w-[38px] h-[38px] rounded-[18px]"
      />
    </div>,
    <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#292d32]">{employee.firstName}</span>,
    <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#292d32]">{employee.lastName}</span>,
    <span className="text-[14px] font-poppins font-medium leading-[21px] text-black">{employee.job}</span>,
    <span className="text-[14px] font-poppins font-medium leading-[21px] text-[#626262]">{employee.hired}</span>,
    <div className="flex items-center justify-between w-full">
      {getStatusBadge(employee.status)}
      <div className="flex items-center gap-[14px]">
        <img src="/images/img_more_vertical_svgrepo_com.svg" alt="more" className="w-[24px] h-[24px] cursor-pointer" />
        <img src="/images/img_search_blue_gray_700.svg" alt="view" className="w-[24px] h-[24px] cursor-pointer" />
      </div>
    </div>
  ]);

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full max-w-[272px] bg-[#f9f9f9] border-r-2 border-[#e4e4e4] flex flex-col lg:flex hidden">
        <div className="pt-[24px] px-[22px]">
          {/* Logo */}
          <div className="mt-[4px] mb-[20px]">
            <img src="/images/img_arrow_down.svg" alt="SlasHR Logo" className="w-[248px] h-[88px]" />
          </div>

          {/* Search */}
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            className="mb-[20px] px-[36px] py-[12px] border border-[#e4e4e4] rounded-[8px] bg-white"
            leftImage={{ src: "/images/img_search.svg", width: 12, height: 12 }}
          />

          {/* Menu Items */}
          <div className="flex flex-col gap-[20px]">
            {/* Dashboard */}
            <div className="flex items-center gap-[18px] px-[8px] py-[8px]">
              <img src="/images/img_frame_3.svg" alt="dashboard" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Dashboard</span>
            </div>

            {/* Inbox */}
            <div className="flex items-center justify-between px-[8px] py-[8px]">
              <div className="flex items-center gap-[18px]">
                <img src="/images/img_frame_gray_700.svg" alt="inbox" className="w-[20px] h-[20px]" />
                <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">inbox</span>
              </div>
              <div className="bg-[#dd2e31] rounded-[6px] px-[5px] py-[2px]">
                <span className="text-[12px] font-inter font-bold leading-[15px] text-white">53</span>
              </div>
            </div>

            {/* People & Org - Active */}
            <div className="flex items-center gap-[16px] px-[12px] py-[12px] bg-[#2b6171] rounded-lg">
              <img src="/images/img_frame_white_a700.svg" alt="people" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-white">People & Org</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center gap-[18px] px-[8px] py-[8px]">
              <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Calendar</span>
            </div>

            {/* Documents */}
            <div className="flex items-center gap-[16px] px-[12px] py-[12px]">
              <img src="/images/img_frame_20x20.svg" alt="documents" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[20px] text-[#626262]">Documents</span>
            </div>

            {/* Work Schedule */}
            <div className="flex items-center gap-[16px] px-[8px] py-[8px]">
              <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Work Schedule</span>
            </div>

            {/* Analytics */}
            <div className="flex items-center gap-[16px] px-[8px] py-[8px]">
              <img src="/images/img_frame_1.svg" alt="analytics" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Analytics</span>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-[16px] px-[8px] py-[8px]">
              <img src="/images/img_frame_2.svg" alt="settings" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Settings</span>
            </div>
          </div>
        </div>

        {/* Bottom User Dropdown */}
        <div className="mt-auto mb-[146px] px-[22px]">
          <div className="flex items-center gap-[16px] px-[12px] py-[28px] border border-[#e4e4e4] rounded-[10px] bg-white">
            <span className="text-[14px] font-poppins font-normal leading-[21px] text-[#626262] flex-1">Manal Battache</span>
            <img src="/images/img_icons_16px_arrow_down.svg" alt="dropdown" className="w-[16px] h-[14px]" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2b6171] text-white rounded-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="relative w-full h-[92px] bg-white">
          <div className="absolute right-0 top-[28px] w-[1px] h-[56px] bg-[#d0d5de] rounded-[1px]"></div>
          <div className="flex items-center px-[24px] sm:px-[56px] md:px-[102px] py-[24px] bg-white h-full">
            <div className="flex items-center justify-center w-[44px] h-[44px] bg-[#2b6171] rounded-[22px]">
              <img src="/images/img_frame_white_a700.svg" alt="people icon" className="w-[26px] h-[26px]" />
            </div>
            <h1 className="ml-[18px] text-[20px] sm:text-[25px] font-poppins font-medium leading-[38px] text-black">People & Org</h1>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#ebebeb]"></div>

        {/* Navigation Tabs */}
        <div className="px-[24px] sm:px-[96px] mt-[22px]">
          <div className="flex items-start gap-[68px] overflow-x-auto">
            <div className="flex flex-col items-center gap-[22px] min-w-0">
              <span className="text-[16px] font-inter font-bold leading-[20px] text-[#2b6171] whitespace-nowrap">People</span>
              <div className="w-[54px] h-[3px] bg-[#2b6171] rounded-[1px]"></div>
            </div>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-[#626262] whitespace-nowrap">Activity</span>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-[#626262] whitespace-nowrap">Teams</span>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-[#626262] whitespace-nowrap">Org chart</span>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-[#626262] capitalize whitespace-nowrap">department</span>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-[#626262] whitespace-nowrap">Jobs</span>
          </div>
          <div className="w-full h-[1px] bg-[#ebebeb] mt-[1px]"></div>
        </div>

        {/* Content */}
        <div className="flex-1 px-[24px] sm:px-[30px] mt-[54px]">
          <div className="max-w-[1440px] mx-auto px-[24px] sm:px-[66px]">
            {/* Stats Cards */}
            <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0px_0px_6px_#00000005] p-[28px] mb-[24px]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center justify-between px-[28px]">
                  <span className="text-[15px] font-inter font-medium leading-[19px] text-[#626262]">0 Current onboarding employee</span>
                  <img src="/images/img_group_1325.svg" alt="info" className="w-[16px] h-[16px]" />
                </div>
                <div className="w-full h-[1px] bg-[#eeeeee]"></div>
                <div className="flex items-center justify-between px-[28px]">
                  <span className="text-[15px] font-inter font-medium leading-[19px] text-[#626262]">0 employees invited</span>
                  <img src="/images/img_group_1325.svg" alt="info" className="w-[16px] h-[16px]" />
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0px_0px_6px_#00000005] p-[20px]">
              {/* Controls */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] mb-[26px]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[20px]">
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select 
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter font-medium leading-[19px] text-[#626262] focus:outline-none focus:ring-2 focus:ring-[#2b6171]"
                    >
                      <option>Filter by</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <img src="/images/img_arrowdown_gray_700.svg" alt="dropdown" className="absolute right-[18px] top-1/2 transform -translate-y-1/2 w-[16px] h-[14px] pointer-events-none" />
                  </div>

                  {/* Group Dropdown */}
                  <div className="relative">
                    <select 
                      value={groupBy}
                      onChange={(e) => setGroupBy(e.target.value)}
                      className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter font-medium leading-[19px] text-[#626262] focus:outline-none focus:ring-2 focus:ring-[#2b6171]"
                    >
                      <option>Group</option>
                      <option>Department</option>
                      <option>Role</option>
                    </select>
                    <img src="/images/img_arrowdown_gray_700.svg" alt="dropdown" className="absolute right-[18px] top-1/2 transform -translate-y-1/2 w-[16px] h-[14px] pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full lg:w-auto">
                  {/* Search */}
                  <SearchView
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearch}
                    className="flex-1 lg:w-[300px] px-[56px] py-[8px] border border-[#e6e6e6] rounded-[10px] bg-white"
                    leftImage={{ src: "/images/img_search_gray_200_03.svg", width: 18, height: 14 }}
                  />

                  {/* Add Person Button */}
                  <button className="bg-[#2b6171] text-white px-[14px] py-[8px] rounded-[10px] text-[12px] font-inter font-medium leading-[15px] whitespace-nowrap hover:bg-[#1e4a57] transition-colors">
                    + Add person
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-[16px] pr-[20px]">
                        <input 
                          type="checkbox" 
                          className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
                          onChange={(e) => handleRowSelect(employees.map((_, i) => i), e.target.checked)}
                        />
                      </th>
                      <th className="text-left py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">First name</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">Last name</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">Job</th>
                      <th className="text-left py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">Hired</th>
                      <th className="text-center py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#b5b7c0]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-[16px] pr-[20px]">
                          <div className="flex items-center gap-[36px]">
                            <input 
                              type="checkbox" 
                              className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
                              checked={selectedRows.includes(index)}
                              onChange={(e) => handleRowSelect(index, e.target.checked)}
                            />
                            <img 
                              src={employee.avatar} 
                              alt="avatar" 
                              className="w-[38px] h-[38px] rounded-[18px]"
                            />
                          </div>
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#292d32]">
                          {employee.firstName}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#292d32]">
                          {employee.lastName}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-black">
                          {employee.job}
                        </td>
                        <td className="py-[16px] text-[14px] font-poppins font-medium leading-[21px] text-[#626262]">
                          {employee.hired}
                        </td>
                        <td className="py-[16px]">
                          <div className="flex items-center justify-between">
                            {getStatusBadge(employee.status)}
                            <div className="flex items-center gap-[14px]">
                              <img src="/images/img_more_vertical_svgrepo_com.svg" alt="more" className="w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded p-1" />
                              <img src="/images/img_search_blue_gray_700.svg" alt="view" className="w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded p-1" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center gap-[26px] mt-[18px]">
                <div className="w-full h-[1px] bg-[#eeeeee]"></div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[12px] font-poppins text-[#626262]">Showing data 4 of 4 entries</span>
                  <div className="flex items-center gap-[2px]">
                    <button className="w-[26px] h-[24px] border border-[#eeeeee] rounded-[4px] bg-[#f5f5f5] flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <span className="text-[12px] font-poppins font-medium text-black">&lt;</span>
                    </button>
                    <button className="w-[26px] h-[24px] border border-[#2b6171] rounded-[4px] bg-[#2b6171] flex items-center justify-center">
                      <span className="text-[12px] font-poppins font-medium text-white">1</span>
                    </button>
                    <button className="w-[26px] h-[24px] border border-[#eeeeee] rounded-[4px] bg-[#f5f5f5] flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <span className="text-[12px] font-poppins font-medium text-black">&gt;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="fixed bottom-[148px] right-[10px] w-[36px] h-[36px] bg-[#2b6171] rounded-[18px] flex items-center justify-center cursor-pointer hover:bg-[#1e4a57] transition-colors shadow-lg">
          <img src="/images/img_group_white_a700.svg" alt="chat" className="w-[18px] h-[14px]" />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}>
          <div className="w-[272px] h-full bg-[#f9f9f9] border-r-2 border-[#e4e4e4] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="pt-[24px] px-[22px]">
              {/* Logo */}
              <div className="mt-[4px] mb-[20px]">
                <img src="/images/img_arrow_down.svg" alt="SlasHR Logo" className="w-[248px] h-[88px]" />
              </div>

              {/* Search */}
              <SearchView
                placeholder="Search....."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                className="mb-[20px] px-[36px] py-[12px] border border-[#e4e4e4] rounded-[8px] bg-white"
                leftImage={{ src: "/images/img_search.svg", width: 12, height: 12 }}
              />

              {/* Menu Items */}
              <div className="flex flex-col gap-[20px]">
                {/* Dashboard */}
                <div className="flex items-center gap-[18px] px-[8px] py-[8px]">
                  <img src="/images/img_frame_3.svg" alt="dashboard" className="w-[20px] h-[20px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Dashboard</span>
                </div>

                {/* Inbox */}
                <div className="flex items-center justify-between px-[8px] py-[8px]">
                  <div className="flex items-center gap-[18px]">
                    <img src="/images/img_frame_gray_700.svg" alt="inbox" className="w-[20px] h-[20px]" />
                    <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">inbox</span>
                  </div>
                  <div className="bg-[#dd2e31] rounded-[6px] px-[5px] py-[2px]">
                    <span className="text-[12px] font-inter font-bold leading-[15px] text-white">53</span>
                  </div>
                </div>

                {/* People & Org - Active */}
                <div className="flex items-center gap-[16px] px-[12px] py-[12px] bg-[#2b6171] rounded-lg">
                  <img src="/images/img_frame_white_a700.svg" alt="people" className="w-[20px] h-[20px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[25px] text-white">People & Org</span>
                </div>

                {/* Calendar */}
                <div className="flex items-center gap-[18px] px-[8px] py-[8px]">
                  <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-[4px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Calendar</span>
                </div>

                {/* Documents */}
                <div className="flex items-center gap-[16px] px-[12px] py-[12px]">
                  <img src="/images/img_frame_20x20.svg" alt="documents" className="w-[20px] h-[20px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[20px] text-[#626262]">Documents</span>
                </div>

                {/* Work Schedule */}
                <div className="flex items-center gap-[16px] px-[8px] py-[8px]">
                  <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-[4px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Work Schedule</span>
                </div>

                {/* Analytics */}
                <div className="flex items-center gap-[16px] px-[8px] py-[8px]">
                  <img src="/images/img_frame_1.svg" alt="analytics" className="w-[20px] h-[20px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Analytics</span>
                </div>

                {/* Settings */}
                <div className="flex items-center gap-[16px] px-[8px] py-[8px]">
                  <img src="/images/img_frame_2.svg" alt="settings" className="w-[20px] h-[20px]" />
                  <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Settings</span>
                </div>
              </div>
            </div>

            {/* Bottom User Dropdown */}
            <div className="mt-auto mb-[146px] px-[22px]">
              <div className="flex items-center gap-[16px] px-[12px] py-[28px] border border-[#e4e4e4] rounded-[10px] bg-white">
                <span className="text-[14px] font-poppins font-normal leading-[21px] text-[#626262] flex-1">Manal Battache</span>
                <img src="/images/img_icons_16px_arrow_down.svg" alt="dropdown" className="w-[16px] h-[14px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleOrgPage;