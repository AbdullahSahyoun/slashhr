import React, { useState } from 'react';
import SearchView from '../../../components/ui/SearchView';
import BreadCrumb from '../../../components/ui/BreadCrumb';

const EmployeeBadgesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('Manal Battache');
  const [activeTab, setActiveTab] = useState('Badges');

  const sidebarMenuItems = [
    { icon: '/images/img_frame.svg', text: 'Dashboard', active: false },
    { icon: '/images/img_frame_gray_700.svg', text: 'Inbox', badge: '53', active: false },
    { icon: '/images/img_frame_gray_700_20x20.svg', text: 'People & Org', active: false },
    { icon: '/images/img_frame_gray_700_18x18.svg', text: 'Calendar', active: false },
    { icon: '/images/img_frame_20x20.svg', text: 'Documents', active: false },
    { icon: '/images/img_frame_18x18.svg', text: 'Work Schedule', active: false },
    { icon: '/images/img_frame_1.svg', text: 'Analytics', active: false },
    { icon: '/images/img_frame_2.svg', text: 'Settings', active: false }
  ];

  const tabItems = [
    'Personal info',
    'Professional info', 
    'Documents',
    'Leave history',
    'Letter history',
    'Attendance',
    'Badges',
    'Feedback'
  ];

  const badgeItems = [
    {
      icon: '/images/img_search_white_a700.svg',
      title: 'SlasHR Pioneer',
      date: '22/01/2025'
    },
    {
      icon: '/images/img_group_2882.svg',
      title: 'SlasHR Commentator',
      date: '22/01/2025'
    },
    {
      icon: '/images/img_group_2882_white_a700.svg',
      title: 'SlasHR Star',
      date: '22/01/2025'
    }
  ];

  const breadcrumbItems = [
    { label: 'Profile' },
    { label: 'Manal Battache' }
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full bg-global-1 flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full max-w-[270px] bg-sidebar-2 border-r-2 border-global-6 flex flex-col lg:flex hidden">
        <div className="pt-[24px] pr-[22px] pl-[28px] pb-[24px]">
          {/* Logo */}
          <div className="mt-[4px] mb-[20px]">
            <img 
              src="/images/img_arrow_down.svg" 
              alt="SlasHR Logo" 
              className="w-[248px] h-[88px]"
            />
          </div>

          {/* Search */}
          <div className="mb-[20px]">
            <SearchView
              placeholder="Search....."
              value={searchValue}
              onChange={handleSearchChange}
              className="pt-[12px] pr-[22px] pb-[12px] pl-[36px] border border-[#e4e4e4] rounded-[8px] bg-global-1"
              leftImage={{
                src: "/images/img_search.svg",
                width: 12,
                height: 12
              }}
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-[20px]">
            {sidebarMenuItems.map((item, index) => (
              <div 
                key={index}
                className={`flex flex-row items-center gap-[18px] p-[8px] cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                  item.active ? 'bg-global-3 text-global-5' : ''
                }`}
              >
                <img 
                  src={item.icon} 
                  alt={item.text}
                  className="w-[20px] h-[20px]"
                />
                <span className="text-[16px] font-poppins font-semibold leading-[25px] text-global-3 flex-1">
                  {item.text}
                </span>
                {item.badge && (
                  <div className="bg-sidebar-1 rounded-[6px] px-[8px] py-[2px]">
                    <span className="text-[12px] font-inter font-bold leading-[15px] text-global-5">
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom User Section */}
        <div className="mt-auto p-[22px]">
          <div className="border border-[#e4e4e4] rounded-[10px] bg-global-1 p-[16px] flex flex-row items-center gap-[16px]">
            <span className="text-[14px] font-poppins font-normal leading-[21px] text-global-3 flex-1">
              SlasHR
            </span>
            <img 
              src="/images/img_icons_16px_arrow_down.svg" 
              alt="dropdown"
              className="w-[16px] h-[14px]"
            />
          </div>
          <div className="text-[14px] font-poppins font-normal leading-[21px] text-global-3 mt-[8px]">
            Manal Battache
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-global-1 rounded-md shadow-md">
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className="block w-5 h-0.5 bg-global-3 mb-1"></span>
          <span className="block w-5 h-0.5 bg-global-3 mb-1"></span>
          <span className="block w-5 h-0.5 bg-global-3"></span>
        </div>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-global-1 border-b border-global-6">
          <div className="pt-[24px] pr-[6px] pl-[72px] pb-[24px]">
            <div className="flex flex-row items-center gap-[18px] mb-[24px]">
              <img 
                src="/images/img_group_2570.svg" 
                alt="profile"
                className="w-[44px] h-[44px]"
              />
              <BreadCrumb 
                items={breadcrumbItems}
                separator=">"
                className="text-[25px] font-poppins font-medium leading-[38px] text-global-1"
              />
            </div>
            <div className="w-full h-[1px] bg-global-6"></div>
          </div>

          {/* Tabs */}
          <div className="px-[72px] pb-[22px]">
            <div className="flex flex-row items-center gap-[58px] mb-[22px] overflow-x-auto">
              {tabItems.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(tab)}
                  className={`text-[16px] font-inter font-bold leading-[20px] whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab ? 'text-global-2' : 'text-global-3 hover:text-global-2'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Active Tab Indicator */}
            <div className="relative">
              <div className="w-full h-[1px] bg-global-6"></div>
              {activeTab === 'Badges' && (
                <div className="absolute top-0 left-[1345px] w-[58px] h-[3px] bg-global-2 rounded-[1px]"></div>
              )}
            </div>
          </div>
        </div>

        {/* Badges Content */}
        <div className="flex-1 p-[44px] lg:px-[72px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[34px] max-w-[996px]">
            {badgeItems.map((badge, index) => (
              <div 
                key={index}
                className="bg-global-1 border border-global-6 rounded-[14px] flex flex-col items-center p-[24px] hover:shadow-lg transition-shadow duration-300"
              >
                {/* Badge Icon */}
                <div className="w-[64px] h-[64px] bg-global-3 rounded-[32px] flex items-center justify-center mb-[16px]">
                  <img 
                    src={badge.icon} 
                    alt={badge.title}
                    className="w-[32px] h-[32px]"
                  />
                </div>

                {/* Badge Title */}
                <h3 className="text-[15px] font-poppins font-medium leading-[23px] text-global-1 text-center mb-[16px]">
                  {badge.title}
                </h3>

                {/* Badge Date */}
                <div className="w-full bg-global-3 rounded-b-[14px] py-[14px] px-[34px] text-center">
                  <span className="text-[15px] font-poppins font-medium leading-[23px] text-global-5">
                    {badge.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBadgesPage;