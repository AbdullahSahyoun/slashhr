import React, { useState } from 'react';
import Dropdown from '../../../components/ui/Dropdown';

const EmployeeProfessionalContractsPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Professional info');

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

  const menuItems = [
    { icon: '/images/img_frame.svg', text: 'Dashboard', active: true },
    { icon: '/images/img_frame_gray_700.svg', text: 'inbox', badge: '53' },
    { icon: '/images/img_frame_gray_700_20x20.svg', text: 'People & Org' },
    { icon: '/images/img_frame_gray_700_18x18.svg', text: 'Calendar' },
    { icon: '/images/img_frame_20x20.svg', text: 'Documents' },
    { icon: '/images/img_frame_18x18.svg', text: 'Work Schedule' },
    { icon: '/images/img_frame_1.svg', text: 'Analytics' },
    { icon: '/images/img_frame_2.svg', text: 'Settings' }
  ];

  return (
    <div className="flex w-full min-h-screen bg-global-1">
      {/* Sidebar */}
      <div className="w-full lg:w-[14%] bg-sidebar-2 border-r-2 border-[#e4e4e4] flex flex-col">
        {/* Logo */}
        <div className="pt-6 pr-[22px] pl-[22px] mt-1">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-full h-[88px] object-contain"
          />
        </div>

        {/* Search */}
        <div className="mt-5 px-6">
          <div className="flex items-center bg-global-3 rounded-lg px-3 py-3">
            <img 
              src="/images/img_search.svg" 
              alt="search" 
              className="w-3 h-3"
            />
            <input 
              type="text" 
              placeholder="Search....." 
              className="ml-3 bg-transparent text-global-5 placeholder-global-5 text-base font-poppins font-semibold leading-[25px] outline-none flex-1"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-5 px-6 flex-1">
          <div className="space-y-5">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center px-2 py-2 rounded ${
                  item.active ? 'bg-global-3' : ''
                }`}
              >
                <img 
                  src={item.icon} 
                  alt={item.text} 
                  className="w-5 h-5"
                />
                <span className={`ml-4 text-base font-poppins font-semibold leading-[25px] ${
                  item.active ? 'text-global-5' : 'text-global-3'
                }`}>
                  {item.text}
                </span>
                {item.badge && (
                  <div className="ml-auto bg-sidebar-1 rounded-md px-2 py-1">
                    <span className="text-xs font-inter font-bold text-global-5">
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Dropdown */}
        <div className="px-[22px] pb-6">
          <Dropdown
            placeholder="Manal Battache"
            className="w-full"
            rightImage={{
              src: "/images/img_icons_16px_arrow_down.svg",
              width: 16,
              height: 16
            }}
            options={[
              { value: 'manal', label: 'Manal Battache' },
              { value: 'profile', label: 'View Profile' },
              { value: 'settings', label: 'Settings' },
              { value: 'logout', label: 'Logout' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-global-1 px-6 lg:px-[72px] py-6">
          <div className="flex items-center gap-[18px] mb-6">
            <img 
              src="/images/img_group_2570.svg" 
              alt="profile" 
              className="w-11 h-11"
            />
            <h1 className="text-[25px] font-poppins font-medium leading-[38px] text-global-1">
              Profile &gt; Manal Battache
            </h1>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-header-1 mb-[22px]"></div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 lg:gap-8 mb-6">
            {tabs.map((tab, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`text-base font-inter font-bold leading-5 ${
                    activeTab === tab ? 'text-global-2' : 'text-global-3'
                  }`}
                >
                  {tab}
                </button>
                {activeTab === tab && (
                  <div className="w-[130px] h-[3px] bg-global-2 rounded-sm mt-6"></div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Divider */}
          <div className="w-full h-px bg-header-1"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-[72px] py-8">
          <div className="max-w-[1440px] mx-auto">
            {/* Contracts Header */}
            <div className="flex flex-col items-start gap-7 mb-8">
              <img 
                src="/images/img_group_blue_gray_700.svg" 
                alt="contracts icon" 
                className="w-[38px] h-8"
              />
              <h2 className="text-xl font-poppins font-semibold leading-[30px] text-global-1">
                Contracts
              </h2>
            </div>

            {/* Form Container */}
            <div className="border border-[#ebebeb] rounded-[14px] p-6 lg:p-7">
              {/* First Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[10px] mb-5">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Date of Hire
                  </label>
                  <input
                    type="text"
                    placeholder="13 Dec 2024"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Probation End Date
                  </label>
                  <input
                    type="text"
                    placeholder="13 Dec 2024"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[10px] mb-5">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Country of Legal Residence
                  </label>
                  <input
                    type="text"
                    placeholder="France"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Residence Visa Issuance Location
                  </label>
                  <input
                    type="text"
                    placeholder="France"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[10px] mb-5">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Workplace
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-nunito leading-[22px] text-global-1 placeholder-global-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Work Week
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-nunito leading-[22px] text-global-1 placeholder-global-1"
                  />
                </div>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[10px] mb-5">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-nunito leading-[22px] text-global-1 placeholder-global-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Office
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-nunito leading-[22px] text-global-1 placeholder-global-1"
                  />
                </div>
              </div>

              {/* Reports to */}
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-base font-inter font-bold leading-5 text-global-2">
                  Reports to
                </label>
                <input
                  type="text"
                  placeholder="Anass Bougrine"
                  className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-nunito leading-[22px] text-global-1 placeholder-global-1"
                />
              </div>

              {/* Current Section */}
              <div className="mb-5">
                <h3 className="text-xl font-poppins font-semibold leading-[30px] text-global-2 mb-[6px]">
                  Current
                </h3>
                <p className="text-[15px] font-poppins font-semibold leading-[23px] text-global-3 mb-5">
                  Permanent contract Start May 10, 2024
                </p>

                {/* Contract Details Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[10px] mb-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-inter font-bold leading-5 text-global-2">
                      Contract start date
                    </label>
                    <input
                      type="text"
                      placeholder="10 May 2024"
                      className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-inter font-bold leading-5 text-global-2">
                      Contract template
                    </label>
                    <input
                      type="text"
                      placeholder="CDI"
                      className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                    />
                  </div>
                </div>

                {/* Reason for starting */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    Reason for starting the contract
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                  />
                </div>

                {/* End of second trial period */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    End of second trial period
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-5 text-global-1 placeholder-global-1"
                  />
                </div>

                {/* End of the second half */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-base font-inter font-bold leading-5 text-global-2">
                    End of the second half
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-[19px] text-global-1 placeholder-global-1"
                  />
                </div>

                {/* Establishment and CSP Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[10px] mb-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-inter font-bold leading-[19px] text-global-2">
                      Establishment
                    </label>
                    <input
                      type="text"
                      placeholder="France"
                      className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-[19px] text-global-1 placeholder-global-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-inter font-bold leading-[19px] text-global-2">
                      CSP
                    </label>
                    <input
                      type="text"
                      placeholder="-"
                      className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-[19px] text-global-1 placeholder-global-1"
                    />
                  </div>
                </div>

                {/* Contract end date */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-base font-inter font-bold leading-[19px] text-global-2">
                    Contract end date
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-[19px] text-global-1 placeholder-global-1"
                  />
                </div>

                {/* Reason for end of contract */}
                <div className="flex flex-col gap-1">
                  <label className="text-base font-inter font-bold leading-[19px] text-global-2">
                    Reason for end of contract
                  </label>
                  <input
                    type="text"
                    placeholder="-"
                    className="px-[10px] py-[10px] border border-[#e4e4e4] rounded-lg bg-global-1 text-base font-inter leading-[19px] text-global-1 placeholder-global-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfessionalContractsPage;