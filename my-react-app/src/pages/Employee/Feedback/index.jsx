import React, { useState } from 'react';
import SearchView from '../../../components/ui/SearchView';
import RatingBar from '../../../components/ui/RatingBar';

const EmployeeFeedbackPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTab, setSelectedTab] = useState('Feedback');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const feedbackData = [
    {
      id: 1,
      fullName: 'Manal Battache',
      feedback: 'Perfect work',
      date: '01/11/2025',
      rating: 4
    },
    {
      id: 2,
      fullName: 'Manal Battache',
      feedback: 'Perfect work',
      date: '01/11/2025',
      rating: 4
    },
    {
      id: 3,
      fullName: 'Manal Battache',
      feedback: 'Perfect work',
      date: '01/11/2025',
      rating: 4
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

  return (
    <div className="flex w-full bg-white min-h-screen">
      {/* Sidebar */}
      <div className="w-full max-w-[280px] bg-sidebar-2 border-r-2 border-[#e4e4e4] flex flex-col">
        {/* Logo */}
        <div className="pt-[24px] pr-[22px] pl-[22px] ml-[6px]">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-full max-w-[248px] h-[88px]"
          />
        </div>

        {/* Search */}
        <div className="mt-[20px] px-[22px]">
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={handleSearchChange}
            className="border border-[#e4e4e4] rounded-[8px] bg-white"
            leftImage={{
              src: "/images/img_search.svg",
              width: 12,
              height: 12
            }}
          />
        </div>

        {/* Menu Items */}
        <div className="mt-[20px] px-[24px] flex-1">
          <div className="flex flex-col gap-[20px]">
            {/* Dashboard */}
            <div className="flex items-center p-[8px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame.svg" alt="dashboard" className="w-[20px] h-[20px]" />
              <span className="ml-[18px] text-[16px] font-poppins font-semibold text-global-3">Dashboard</span>
            </div>

            {/* Inbox */}
            <div className="flex items-center p-[8px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_gray_700.svg" alt="inbox" className="w-[20px] h-[20px]" />
              <span className="ml-[18px] text-[16px] font-poppins font-semibold text-global-3">Inbox</span>
              <div className="ml-auto bg-sidebar-1 text-white text-[12px] font-inter font-bold px-[5px] py-[2px] rounded-[6px]">
                53
              </div>
            </div>

            {/* People & Org */}
            <div className="flex items-center p-[12px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_gray_700_20x20.svg" alt="people" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold text-global-3">People & Org</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center p-[8px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="ml-[18px] text-[16px] font-poppins font-semibold text-global-3">Calendar</span>
            </div>

            {/* Documents */}
            <div className="flex items-center p-[12px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_20x20.svg" alt="documents" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold text-global-3">Documents</span>
            </div>

            {/* Work Schedule */}
            <div className="flex items-center p-[8px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold text-global-3">Work Schedule</span>
            </div>

            {/* Analytics */}
            <div className="flex items-center p-[8px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_1.svg" alt="analytics" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold text-global-3">Analytics</span>
            </div>

            {/* Settings */}
            <div className="flex items-center p-[8px] cursor-pointer hover:bg-gray-100 rounded">
              <img src="/images/img_frame_2.svg" alt="settings" className="w-[20px] h-[20px]" />
              <span className="ml-[16px] text-[16px] font-poppins font-semibold text-global-3">Settings</span>
            </div>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="mt-auto mb-[24px] px-[22px]">
          <div className="flex items-center justify-between p-[12px] bg-white border border-[#e4e4e4] rounded-[10px] cursor-pointer">
            <span className="text-[14px] font-poppins text-global-3">Manal Battache</span>
            <img src="/images/img_icons_16px_arrow_down.svg" alt="dropdown" className="w-[16px] h-[14px]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white pt-[24px] pr-[6px]">
          <div className="flex items-center gap-[18px] ml-[72px]">
            <img src="/images/img_group_2570.svg" alt="profile" className="w-[44px] h-[44px]" />
            <h1 className="text-[25px] font-poppins font-medium text-black">Profile &gt; Manal Battache</h1>
          </div>
          <div className="w-full h-[1px] bg-header-1 mt-[24px]"></div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white px-[72px] pt-[24px]">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-[16px] font-inter font-bold ${
                  selectedTab === tab ? 'text-global-2' : 'text-global-3'
                } hover:text-global-2 transition-colors`}
              >
                {tab}
              </button>
            ))}
          </div>
          {selectedTab === 'Feedback' && (
            <div className="mt-[22px] flex justify-end">
              <div className="w-[76px] h-[3px] bg-global-2 rounded-[1px]"></div>
            </div>
          )}
          <div className="w-full h-[1px] bg-header-1 mt-[6px]"></div>
        </div>

        {/* Feedback Content */}
        <div className="flex-1 px-[98px] py-[42px]">
          <div className="flex flex-col gap-[28px]">
            {feedbackData.map((feedback, index) => (
              <div key={feedback.id} className="flex gap-[18px]">
                {/* QR Code */}
                <div className="bg-white border border-header-1 rounded-[14px] p-[24px] shadow-[0px_0px_6px_#00000005]">
                  <img 
                    src="/images/img_frame_black_900_100x100.svg" 
                    alt="QR Code" 
                    className="w-[100px] h-[100px]"
                  />
                </div>

                {/* Feedback Details */}
                <div className="flex-1 bg-white border border-header-1 rounded-[14px] p-[20px] shadow-[0px_0px_6px_#00000005]">
                  {/* Header Row */}
                  <div className="flex justify-between items-center mb-[16px]">
                    <span className="text-[14px] font-poppins font-medium text-global-8">Full name</span>
                    <span className="text-[14px] font-poppins font-medium text-global-8 ml-[164px]">Feedback</span>
                    <span className="text-[14px] font-poppins font-medium text-global-8">Date</span>
                    <span className="text-[14px] font-poppins font-medium text-global-8">Reviews</span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-global-7 mb-[18px]"></div>

                  {/* Data Row */}
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-poppins font-medium text-black">{feedback.fullName}</span>
                    <span className="text-[14px] font-poppins font-medium text-black ml-[56px]">{feedback.feedback}</span>
                    <span className="text-[14px] font-poppins font-medium text-black ml-[130px]">{feedback.date}</span>
                    <div className="ml-auto">
                      <RatingBar 
                        rating={feedback.rating} 
                        maxRating={5} 
                        readOnly={true}
                        size="small"
                        color="yellow"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFeedbackPage;