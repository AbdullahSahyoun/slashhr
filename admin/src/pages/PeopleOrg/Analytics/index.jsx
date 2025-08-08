import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SearchView from '../../../components/ui/SearchView';
import Dropdown from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

const PeopleOrgAnalyticsPage = () => {
  const [selectedTab, setSelectedTab] = useState('Activity');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  // Chart data
  const chartData = [
    { name: 'Jan', value: 25 },
    { name: 'Feb', value: 27 },
    { name: 'Mar', value: 24 },
    { name: 'Apr', value: 28 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 29 },
    { name: 'Jul', value: 31 },
    { name: 'Aug', value: 30 },
    { name: 'Sep', value: 28 },
    { name: 'Oct', value: 26 },
    { name: 'Nov', value: 25 },
    { name: 'Dec', value: 32 }
  ];

  // Table data
  const tableHeaders = ['Full name', 'Start date', 'Manager'];
  const tableData = [
    ['Manal Battache', '01/02/2023', 'Trey Fields'],
    ['Conor English', '04/07/2022', 'Sylvia Weber'],
    ['Adalynn Sharp', '13/03/2022', 'Eddie Perez'],
    ['Aylin Austin', '13/03/2022', 'Roy Hubbard'],
    ['Joselyn Cannon', '13/03/2022', 'Elisha Boyd'],
    ['Cailyn Savage', '13/03/2022', 'Susan Lewis']
  ];

  const tabs = [
    { id: 'People', label: 'People' },
    { id: 'Activity', label: 'Activity' },
    { id: 'Teams', label: 'Teams' },
    { id: 'Org chart', label: 'Org chart' },
    { id: 'Department', label: 'Department' },
    { id: 'Jobs', label: 'Jobs' }
  ];

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex w-full min-h-screen bg-global-1">
      {/* Sidebar */}
      <div className="w-full max-w-[272px] bg-sidebar-2 border-r-2 border-[#e4e4e4] flex flex-col">
        {/* Logo */}
        <div className="pt-[24px] pr-[22px] pl-[22px] mt-[4px]">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-[248px] h-[88px]"
          />
        </div>

        {/* Search */}
        <div className="pt-[22px] pr-[22px] pl-[22px] mt-[20px]">
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={handleSearchChange}
            className="bg-global-1 border border-[#e4e4e4] rounded-[8px] text-[12px] font-inter font-normal leading-[15px] text-global-3"
            leftImage={{
              src: "/images/img_search.svg",
              width: 12,
              height: 12
            }}
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-[20px] mt-[20px] px-[24px]">
          {/* Dashboard */}
          <div className="flex items-center gap-[18px] p-[8px]">
            <img src="/images/img_frame_3.svg" alt="dashboard" className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3">Dashboard</span>
          </div>

          {/* Inbox */}
          <div className="flex items-center justify-between p-[8px]">
            <div className="flex items-center gap-[18px]">
              <img src="/images/img_frame_gray_700.svg" alt="inbox" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3">Inbox</span>
            </div>
            <div className="bg-sidebar-1 rounded-[6px] px-[5px] py-[1px]">
              <span className="text-[12px] font-inter font-bold leading-[15px] text-global-5">53</span>
            </div>
          </div>

          {/* People & Org - Active */}
          <div className="flex items-center gap-[16px] p-[12px] bg-global-3 rounded-[8px]">
            <img src="/images/img_frame_white_a700.svg" alt="people org" className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-5">People & Org</span>
          </div>

          {/* Calendar */}
          <div className="flex items-center gap-[18px] p-[8px]">
            <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-[4px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3">Calendar</span>
          </div>

          {/* Documents */}
          <div className="flex items-center gap-[16px] p-[12px]">
            <img src="/images/img_frame_20x20.svg" alt="documents" className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[20px] text-global-3">Documents</span>
          </div>

          {/* Work Schedule */}
          <div className="flex items-center gap-[16px] p-[8px]">
            <img src="/images/img_frame_18x18.svg" alt="work schedule" className="w-[18px] h-[18px] ml-[4px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3">Work Schedule</span>
          </div>

          {/* Analytics */}
          <div className="flex items-center gap-[16px] p-[8px]">
            <img src="/images/img_frame_1.svg" alt="analytics" className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3">Analytics</span>
          </div>

          {/* Settings */}
          <div className="flex items-center gap-[16px] p-[8px]">
            <img src="/images/img_frame_2.svg" alt="settings" className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3">Settings</span>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="mt-auto mb-[24px] px-[22px]">
          <Dropdown
            placeholder="Manal Battache"
            className="bg-global-1 border border-[#e4e4e4] rounded-[10px] text-[14px] font-poppins font-normal leading-[21px] text-global-3"
            rightImage={{
              src: "/images/img_icons_16px_arrow_down.svg",
              width: 16,
              height: 14
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-global-1 flex items-center justify-between px-[102px] py-[24px]">
          <div className="flex items-center gap-[18px]">
            <div className="bg-global-3 rounded-[22px] p-[8px]">
              <img src="/images/img_frame_white_a700.svg" alt="people org icon" className="w-[26px] h-[26px]" />
            </div>
            <h1 className="text-[25px] font-poppins font-medium leading-[38px] text-global-1">People & Org</h1>
          </div>
        </div>

        {/* Header Line */}
        <div className="w-full h-[1px] bg-header-1"></div>

        {/* Navigation Tabs */}
        <div className="bg-global-1 px-[96px] py-[24px]">
          <div className="flex items-start gap-[68px]">
            {tabs.map((tab) => (
              <div key={tab.id} className="flex flex-col items-center gap-[22px]">
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`text-[16px] font-inter font-bold leading-[20px] ${
                    selectedTab === tab.id ? 'text-global-2' : 'text-global-3'
                  }`}
                >
                  {tab.label}
                </button>
                {selectedTab === tab.id && (
                  <div className="w-[60px] h-[3px] bg-global-2 rounded-[1px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Line */}
        <div className="w-full h-[1px] bg-header-1"></div>

        {/* Filters and Controls */}
        <div className="px-[96px] py-[24px] bg-global-1">
          <div className="flex items-start justify-between">
            {/* Filter Dropdowns */}
            <div className="flex items-start gap-[32px]">
              <Dropdown
                placeholder="Gender"
                className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
                rightImage={{
                  src: "/images/img_arrowdown_gray_700.svg",
                  width: 16,
                  height: 16
                }}
              />
              <Dropdown
                placeholder="Legal entity"
                className="border border-[#e6e6e6] rounded-[10px] text-[15px] font-inter font-medium leading-[19px] text-global-3"
                rightImage={{
                  src: "/images/img_arrowdown_gray_700_14x8.svg",
                  width: 8,
                  height: 14
                }}
              />
              <Dropdown
                placeholder="Workplace"
                className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
                rightImage={{
                  src: "/images/img_arrowdown_gray_700_14x8.svg",
                  width: 8,
                  height: 6
                }}
              />
              <Dropdown
                placeholder="Manager"
                className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
                rightImage={{
                  src: "/images/img_arrowdown_gray_700_14x8.svg",
                  width: 8,
                  height: 6
                }}
              />
              <Dropdown
                placeholder="Team"
                className="border border-[#e6e6e6] rounded-[10px] text-[15px] font-inter font-medium leading-[19px] text-global-3"
                rightImage={{
                  src: "/images/img_arrowdown_gray_700.svg",
                  width: 16,
                  height: 14
                }}
              />
              <Dropdown
                placeholder="Nationality"
                className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
                rightImage={{
                  src: "/images/img_arrowdown_gray_700_14x8.svg",
                  width: 8,
                  height: 6
                }}
              />
            </div>

            {/* Right Controls */}
            <div className="flex items-start gap-[16px]">
              {/* Monthly Button */}
              <Button className="border border-header-1 rounded-[10px] px-[14px] py-[6px] text-[16px] font-inter font-medium leading-[20px] text-global-3 bg-global-1">
                <img src="/images/img_frame_4.svg" alt="monthly" className="w-[20px] h-[20px] mr-[4px]" />
                Monthly
              </Button>

              {/* Date Range Selector */}
              <div className="flex items-center gap-[6px] border border-header-1 rounded-[10px] px-[10px] py-[4px] shadow-[0px_0px_6px_#00000005]">
                <button className="p-[2px]">
                  <img src="/images/img_arrow_left.svg" alt="previous" className="w-[18px] h-[18px]" />
                </button>
                <span className="text-[16px] font-poppins font-medium leading-[24px] text-global-3 px-[20px]">Last 12 months</span>
                <button className="p-[2px]">
                  <img src="/images/img_arrow_right.svg" alt="next" className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Export Button */}
              <Button className="bg-global-3 rounded-[10px] px-[20px] py-[6px] text-[16px] font-inter font-medium leading-[20px] text-global-5">
                <img src="/images/img_frame_white_a700_12x12.svg" alt="export" className="w-[12px] h-[12px] mr-[10px]" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Chart Section */}
        <div className="px-[96px] py-[32px] bg-global-1">
          <div className="bg-global-1 border border-header-1 rounded-[14px] p-[38px]">
            <div className="flex items-start gap-[48px]">
              {/* Left Stats */}
              <div className="flex flex-col gap-[24px] w-[200px]">
                {/* March 2025 */}
                <div>
                  <h3 className="text-[15px] font-inter font-bold leading-[19px] text-global-1 mb-[24px]">March 2025</h3>
                  
                  {/* Headcount */}
                  <div className="mb-[20px]">
                    <p className="text-[15px] font-inter font-medium leading-[19px] text-global-3 mb-[4px]">Headcount</p>
                    <div className="flex items-center gap-[18px]">
                      <div className="w-[12px] h-[12px] bg-global-4 rounded-[6px]"></div>
                      <span className="text-[26px] font-inter font-medium leading-[32px] text-global-1">35</span>
                    </div>
                  </div>

                  {/* Joiners */}
                  <div className="mb-[20px]">
                    <p className="text-[15px] font-inter font-medium leading-[19px] text-global-3 mb-[10px]">Joiners</p>
                    <div className="flex items-center gap-[18px]">
                      <div className="w-[12px] h-[12px] bg-global-4 rounded-[6px]"></div>
                      <span className="text-[26px] font-inter font-medium leading-[32px] text-global-1">1</span>
                    </div>
                  </div>

                  {/* Leavers */}
                  <div>
                    <p className="text-[15px] font-inter font-medium leading-[19px] text-global-3 mb-[12px]">Leavers</p>
                    <div className="flex items-center gap-[18px]">
                      <div className="w-[12px] h-[12px] bg-global-4 rounded-[6px]"></div>
                      <span className="text-[26px] font-inter font-medium leading-[32px] text-global-1">0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#626262' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#626262' }}
                      domain={[0, 40]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#75cbc3" 
                      strokeWidth={2}
                      dot={{ fill: '#75cbc3', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#75cbc3' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="px-[96px] pb-[32px] bg-global-1">
          <div className="bg-global-1 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005]">
            {/* Table Header Tabs */}
            <div className="flex items-start gap-[58px] px-[50px] pt-[24px]">
              <div className="flex flex-col items-center gap-[10px]">
                <span className="text-[16px] font-inter font-bold leading-[20px] text-global-2">Headcount</span>
                <div className="w-[84px] h-[3px] bg-global-2 rounded-[1px]"></div>
              </div>
              <span className="text-[16px] font-inter font-bold leading-[20px] text-global-3">Joiners</span>
              <span className="text-[16px] font-inter font-bold leading-[20px] text-global-3">Leavers</span>
              
              {/* Date Selector */}
              <div className="ml-auto flex items-center gap-[14px]">
                <img src="/images/img_vector_black_900.svg" alt="calendar" className="w-[6px] h-[10px]" />
                <span className="text-[16px] font-inter font-medium leading-[20px] text-global-1">Mar 2025</span>
              </div>
            </div>

            {/* Table Header Line */}
            <div className="w-full h-[1px] bg-header-1 mt-[12px]"></div>

            {/* Table Content */}
            <div className="px-[50px] py-[24px]">
              <Table
                headers={tableHeaders}
                data={tableData}
                className="w-full"
              />

              {/* Table Footer */}
              <div className="flex items-center justify-between mt-[24px] pt-[20px]">
                <span className="text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                  Showing data 6 of 6 entries
                </span>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={1}
                  onPageChange={setCurrentPage}
                  className="flex items-center gap-[8px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-[40px] right-[40px]">
          <button className="bg-global-3 rounded-[18px] p-[10px] shadow-lg hover:shadow-xl transition-shadow">
            <img src="/images/img_group_white_a700.svg" alt="chat" className="w-[18px] h-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeopleOrgAnalyticsPage;