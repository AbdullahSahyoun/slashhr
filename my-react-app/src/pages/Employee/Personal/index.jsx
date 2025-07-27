import React, { useState } from 'react';
import Sidebar from '../../../components/common/Sidebar';
import SearchView from '../../../components/ui/SearchView';
import EditText from '../../../components/ui/EditText';
import Dropdown from '../../../components/ui/Dropdown';

const EmployeePersonalPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('Manal Battache');
  const [activeTab, setActiveTab] = useState('Personal info');

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

  const sidebarMenuItems = [
    {
      icon: '/images/img_frame.svg',
      label: 'Dashboard',
      isActive: true
    },
    {
      icon: '/images/img_frame_gray_700.svg',
      label: 'Inbox',
      badge: '53'
    },
    {
      icon: '/images/img_frame_gray_700_20x20.svg',
      label: 'People & Org'
    },
    {
      icon: '/images/img_frame_gray_700_18x18.svg',
      label: 'Calendar'
    },
    {
      icon: '/images/img_frame_20x20.svg',
      label: 'Documents'
    },
    {
      icon: '/images/img_frame_18x18.svg',
      label: 'Work Schedule'
    },
    {
      icon: '/images/img_frame_1.svg',
      label: 'Analytics'
    },
    {
      icon: '/images/img_frame_2.svg',
      label: 'Settings'
    }
  ];

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full max-w-[280px] bg-sidebar-2 border-r-2 border-[#e4e4e4] lg:block hidden">
        <div className="flex flex-col pt-6 pr-[22px] pl-[22px] pb-6">
          {/* Logo */}
          <div className="mt-1 mb-5">
            <img 
              src="/images/img_arrow_down.svg" 
              alt="SlasHR Logo" 
              className="w-[248px] h-[88px]"
            />
          </div>

          {/* Search */}
          <div className="mt-5 mb-5">
            <SearchView
              placeholder="Search....."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-3 border border-[#e4e4e4] rounded-lg bg-white text-xs font-inter text-[#626262]"
              leftImage={{
                src: '/images/img_search.svg',
                width: 12,
                height: 12
              }}
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-5">
            {sidebarMenuItems.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  item.isActive ? 'bg-button-1 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <img 
                  src={item.icon} 
                  alt={item.label}
                  className="w-5 h-5"
                />
                <span className="ml-[18px] text-base font-poppins font-semibold text-[#626262]">
                  {item.label}
                </span>
                {item.badge && (
                  <div className="ml-auto bg-sidebar-1 text-white text-xs font-inter font-bold px-2 py-1 rounded-md">
                    {item.badge}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Dropdown */}
          <div className="mt-auto pt-[136px]">
            <Dropdown
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              className="w-full p-7 border border-[#e4e4e4] rounded-[10px] bg-white text-sm font-poppins text-[#626262]"
              rightImage={{
                src: '/images/img_icons_16px_arrow_down.svg',
                width: 16,
                height: 14
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="w-full bg-white">
          <div className="flex flex-col gap-[22px] pt-6 pr-6 pl-[72px] pb-0">
            {/* Profile Header */}
            <div className="flex items-center gap-[18px]">
              <img 
                src="/images/img_group_2570.svg" 
                alt="Profile Icon"
                className="w-11 h-11"
              />
              <h1 className="text-[25px] font-poppins font-medium text-black leading-[38px]">
                Profile &gt; Manal Battache
              </h1>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-header-1"></div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col px-[72px]">
            <div className="flex items-start gap-[58px] overflow-x-auto">
              {tabs.map((tab, index) => (
                <div key={index} className="flex flex-col items-center min-w-max">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`text-base font-inter font-bold leading-5 py-4 whitespace-nowrap ${
                      activeTab === tab ? 'text-global-2' : 'text-global-3'
                    }`}
                  >
                    {tab}
                  </button>
                  {activeTab === tab && (
                    <div className="w-full h-[3px] bg-global-2 rounded-[1px] mt-6"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-header-1 mt-0"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
              
              {/* General Information Section */}
              <div className="flex flex-col items-start gap-5 mt-16">
                <img 
                  src="/images/img_group_2723.svg" 
                  alt="General Info Icon"
                  className="w-[38px] h-10"
                />
                <h2 className="text-xl font-poppins font-semibold text-black leading-[30px]">
                  General information
                </h2>
              </div>

              {/* Profile Card */}
              <div className="flex flex-col items-end self-center w-full lg:w-auto">
                <div className="flex flex-col items-center gap-8 lg:gap-16">
                  {/* Profile Image */}
                  <img 
                    src="/images/img_ellipse_25.png" 
                    alt="Manal Battache"
                    className="w-32 h-32 rounded-full object-cover"
                  />

                  {/* Profile Info Card */}
                  <div className="w-full max-w-[610px] border border-header-1 rounded-[14px] p-6 lg:p-8 bg-white">
                    <div className="flex flex-col items-center gap-8 lg:gap-10">
                      
                      {/* Name and ID */}
                      <div className="flex flex-col items-center gap-2 mt-10">
                        <h3 className="text-[25px] font-inter font-semibold text-black leading-[31px] text-center">
                          Manal Battache
                        </h3>
                        <p className="text-[15px] font-poppins font-medium text-global-3 leading-[23px] text-center">
                          ID : 123 567 890 542
                        </p>
                      </div>

                      {/* Form Fields */}
                      <div className="w-full flex flex-col gap-5">
                        
                        {/* First Row - First Name & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              First name
                            </label>
                            <EditText
                              placeholder="Manal"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Last name
                            </label>
                            <EditText
                              placeholder="BATTACHE"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                            />
                          </div>
                        </div>

                        {/* Second Row - Preferred Name & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Preferred name
                            </label>
                            <EditText
                              placeholder="Manal"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Gender
                            </label>
                            <EditText
                              placeholder="Female"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                            />
                          </div>
                        </div>

                        {/* Third Row - Nationality & Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Nationality
                            </label>
                            <EditText
                              placeholder="Moroccan"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-nunito text-black leading-[22px]"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Date of birth
                            </label>
                            <EditText
                              placeholder="10/11/1990"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-nunito text-black leading-[22px]"
                            />
                          </div>
                        </div>

                        {/* Fourth Row - Marital Status & Phone Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Marital status
                            </label>
                            <EditText
                              placeholder="Single"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-nunito text-black leading-[22px]"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Phone number
                            </label>
                            <EditText
                              placeholder="+212 608 945 067"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-nunito text-black leading-[22px]"
                            />
                          </div>
                        </div>

                        {/* Fifth Row - CIN & Personal Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              CIN
                            </label>
                            <EditText
                              placeholder="BL18388"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-nunito text-black leading-[22px]"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-base font-inter font-bold text-global-2 leading-5">
                              Personal email
                            </label>
                            <EditText
                              placeholder="Manal.BATTACHE@gmail.com"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-nunito text-black leading-[22px]"
                            />
                          </div>
                        </div>

                        {/* Personal Address */}
                        <div className="flex flex-col gap-1 mt-5">
                          <label className="text-base font-inter font-bold text-global-2 leading-5">
                            Personal address
                          </label>
                          <EditText
                            placeholder="Bd Zertkouni, Maarif, Casablanca 20610"
                            className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                          />
                        </div>

                        {/* Emergency Contact Section */}
                        <div className="flex flex-col gap-5 mt-[22px]">
                          <h4 className="text-xl font-poppins font-semibold text-global-2 leading-[30px] self-start">
                            Emergency contact
                          </h4>

                          {/* Emergency Contact Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                            <div className="flex flex-col gap-1">
                              <label className="text-base font-inter font-bold text-global-2 leading-5">
                                Full name
                              </label>
                              <EditText
                                placeholder="Full name"
                                className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-base font-inter font-bold text-global-2 leading-5">
                                Phone number
                              </label>
                              <EditText
                                placeholder="+212 608 945 067"
                                className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-5"
                              />
                            </div>
                          </div>

                          {/* Relationship */}
                          <div className="flex flex-col gap-1 mt-[22px]">
                            <label className="text-base font-inter font-bold text-global-2 leading-[19px]">
                              Relationship
                            </label>
                            <EditText
                              placeholder="-"
                              className="w-full p-[10px] border border-[#e4e4e4] rounded-lg bg-white text-base font-inter text-black leading-[19px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalPage;