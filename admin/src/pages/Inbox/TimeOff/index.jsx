import React, { useState } from 'react';
import SearchView from '../../../components/ui/SearchView';
import Dropdown from '../../../components/ui/Dropdown';

const InboxTimeOffPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Requests');
  const [selectedTab, setSelectedTab] = useState('Requests');

  const handleSearch = (value) => {
    console.log('Search:', value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleApprove = (requestId) => {
    console.log('Approve request:', requestId);
  };

  const handleReject = (requestId) => {
    console.log('Reject request:', requestId);
  };

  const requests = [
    {
      id: 1,
      name: 'Manal Battache',
      avatar: '/images/img_ellipse_44.png',
      type: 'time off request is pending',
      status: 'Overdue',
      dueDate: '3 Mar 2025',
      requestDate: '9 Mar 2025. Time off',
      description: 'Holidays from 03 March, 2025 to 10 March, 2025',
      isOverdue: true
    },
    {
      id: 2,
      name: 'Briana Pope',
      avatar: '/images/img_ellipse_44.png',
      type: 'time off request is pending',
      status: 'Pending',
      dueDate: '3 Mar 2025',
      requestDate: '9 Mar 2025. Time off',
      description: 'Holidays from 03 March, 2025 to 10 March, 2025',
      isOverdue: false
    },
    {
      id: 3,
      name: 'Maddison Hammond',
      avatar: '/images/img_ellipse_44.png',
      type: 'time off request is pending',
      status: 'Overdue',
      dueDate: '3 Mar 2025',
      requestDate: '9 Mar 2025. Time off',
      description: 'Holidays from 03 March, 2025 to 10 March, 2025',
      isOverdue: true
    }
  ];

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full max-w-[272px] bg-sidebar-2 border-r-2 border-[#e4e4e4] flex flex-col">
        {/* Logo */}
        <div className="pt-6 pr-[22px] pl-6 pb-1">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-full max-w-[248px] h-[88px]"
          />
        </div>

        {/* Search */}
        <div className="px-6 mt-5">
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            className="border border-[#e4e4e4] rounded-lg bg-white"
            leftImage={{
              src: "/images/img_search.svg",
              width: 12,
              height: 12
            }}
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-6 mt-5">
          <div className="flex flex-col gap-5">
            {/* Dashboard */}
            <div className="flex items-center gap-[18px] p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_3.svg" alt="Dashboard" className="w-5 h-5" />
              <span className="text-base font-semibold font-poppins text-global-3">Dashboard</span>
            </div>

            {/* Inbox - Active */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
              <div className="flex items-center gap-[18px]">
                <img src="/images/img_frame_white_a700_20x20.svg" alt="Inbox" className="w-5 h-5" />
                <span className="text-base font-semibold font-poppins text-global-3">Inbox</span>
              </div>
              <div className="bg-sidebar-1 text-white text-xs font-bold font-inter px-2 py-1 rounded-md">
                53
              </div>
            </div>

            {/* People & Org */}
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_gray_700_20x20.svg" alt="People & Org" className="w-5 h-5" />
              <span className="text-base font-semibold font-poppins text-global-3">People & Org</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center gap-[18px] p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_gray_700_18x18.svg" alt="Calendar" className="w-[18px] h-[18px] ml-1" />
              <span className="text-base font-semibold font-poppins text-global-3">Calendar</span>
            </div>

            {/* Documents */}
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_20x20.svg" alt="Documents" className="w-5 h-5" />
              <span className="text-base font-semibold font-poppins text-global-3">Documents</span>
            </div>

            {/* Work Schedule */}
            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_18x18.svg" alt="Work Schedule" className="w-[18px] h-[18px] ml-1" />
              <span className="text-base font-semibold font-poppins text-global-3">Work Schedule</span>
            </div>

            {/* Analytics */}
            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_1.svg" alt="Analytics" className="w-5 h-5" />
              <span className="text-base font-semibold font-poppins text-global-3">Analytics</span>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="/images/img_frame_2.svg" alt="Settings" className="w-5 h-5" />
              <span className="text-base font-semibold font-poppins text-global-3">Settings</span>
            </div>
          </div>
        </nav>

        {/* User Profile Dropdown */}
        <div className="px-6 pb-6 mt-auto">
          <div className="border border-[#e4e4e4] rounded-[10px] bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-poppins text-global-3">Manal Battache</span>
              <img src="/images/img_icons_16px_arrow_down.svg" alt="Dropdown" className="w-4 h-[14px]" />
            </div>
            <div className="text-sm font-poppins text-global-3 mt-1">SlasHR</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-[72px] py-6 border-b border-gray-200">
          <div className="flex items-center gap-[18px]">
            <img 
              src="/images/img_ellipse_238.png" 
              alt="User Avatar" 
              className="w-11 h-11 rounded-full"
            />
            <div className="text-[25px] font-medium font-inter text-black">
              <span className="font-medium font-poppins">Good afternoon,</span>
              <span className="font-bold"> </span>
              <span className="font-bold font-poppins text-global-2">Manal!</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 bg-white">
          {/* Divider */}
          <div className="w-full h-px bg-header-1"></div>

          {/* Tab Navigation */}
          <div className="px-[72px] pt-[22px]">
            <div className="flex items-start gap-16">
              <div className="flex flex-col items-center gap-[22px]">
                <button
                  onClick={() => handleTabChange('Requests')}
                  className={`text-base font-bold font-inter ${
                    selectedTab === 'Requests' ? 'text-global-2' : 'text-global-3'
                  }`}
                >
                  Requests
                </button>
                {selectedTab === 'Requests' && (
                  <div className="w-[74px] h-[3px] bg-global-2 rounded-[1px]"></div>
                )}
              </div>
              <button
                onClick={() => handleTabChange('Notifications')}
                className={`text-base font-bold font-inter ${
                  selectedTab === 'Notifications' ? 'text-global-2' : 'text-global-3'
                }`}
              >
                Notifications
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-header-1 mt-6"></div>

          {/* Main Content */}
          <div className="px-[62px] pt-12 pb-8">
            <div className="flex flex-col lg:flex-row gap-9">
              {/* Active Requests Card */}
              <div className="w-full lg:w-[28%] border border-header-1 rounded-[14px] p-5">
                <div className="flex flex-col gap-[18px]">
                  <h3 className="text-lg font-medium font-poppins text-black">Active requests</h3>
                  <div className="text-[48px] font-medium font-poppins text-black">53</div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium font-poppins text-global-10">Overdue</span>
                    <span className="text-lg font-medium font-poppins text-global-10">2</span>
                  </div>
                </div>
              </div>

              {/* Requests List */}
              <div className="flex-1 relative">
                {/* Background Container */}
                <div className="absolute inset-0 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005]"></div>
                
                {/* Filter Dropdown */}
                <div className="relative z-10 px-6 pt-4">
                  <div className="w-full max-w-[200px]">
                    <Dropdown
                      value={selectedFilter}
                      onChange={handleFilterChange}
                      options={['All Requests', 'Pending', 'Overdue', 'Approved']}
                      className="border border-[#e6e6e6] rounded-[10px] bg-white"
                      rightImage={{
                        src: "/images/img_arrowdown_gray_700.svg",
                        width: 16,
                        height: 18
                      }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="relative z-10 px-6 mt-4">
                  <div className="w-full h-px bg-header-1"></div>
                </div>

                {/* Requests List */}
                <div className="relative z-10 px-6 py-6 max-h-[600px] overflow-y-auto">
                  <div className="flex flex-col">
                    {requests.map((request, index) => (
                      <div key={request.id}>
                        <div className="flex items-start justify-between py-4">
                          {/* Request Info */}
                          <div className="flex items-start gap-[14px] flex-1">
                            <img 
                              src={request.avatar} 
                              alt={`${request.name} avatar`} 
                              className="w-9 h-9 rounded-full flex-shrink-0"
                            />
                            <div className="flex flex-col gap-1.5 flex-1">
                              <div className="text-[15px] font-medium font-inter text-black">
                                <span className="font-bold">{request.name}</span>
                                <span className="text-global-3"> {request.type}</span>
                              </div>
                              
                              {/* Status and Due Date */}
                              <div className="flex items-center gap-2">
                                {request.isOverdue && (
                                  <div className="bg-white rounded border px-1 py-0.5">
                                    <span className="text-xs font-medium font-poppins text-global-9">Overdue</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                  <img 
                                    src={request.isOverdue ? "/images/img_frame_red_600.svg" : "/images/img_frame_5.svg"} 
                                    alt="Calendar" 
                                    className="w-5 h-5"
                                  />
                                  <span className={`text-xs font-medium font-poppins ${
                                    request.isOverdue ? 'text-global-9' : 'text-global-3'
                                  }`}>
                                    Due date: {request.dueDate}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-[13px] font-medium font-inter text-global-3">
                                {request.requestDate}
                              </div>
                              <div className="text-xs font-medium font-inter text-global-3">
                                {request.description}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-5 ml-4">
                            <button
                              onClick={() => handleReject(request.id)}
                              className="px-[14px] py-1.5 border border-[#ffc9ca] rounded-[10px] bg-global-10 text-xs font-medium font-inter text-black hover:bg-opacity-80 transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="px-4 py-1.5 border border-[#c7e6c9] rounded-[10px] bg-button-3 text-xs font-medium font-inter text-black hover:bg-opacity-80 transition-colors"
                            >
                              Approve
                            </button>
                            <img 
                              src="/images/img_arrow_right_gray_700.svg" 
                              alt="View details" 
                              className="w-2.5 h-2 cursor-pointer hover:opacity-70"
                            />
                          </div>
                        </div>
                        
                        {/* Divider between requests */}
                        {index < requests.length - 1 && (
                          <div className="w-full h-px bg-header-1 my-4"></div>
                        )}
                      </div>
                    ))}

                    {/* Additional Items */}
                    <div className="mt-8">
                      <div className="w-full h-px bg-header-1"></div>
                      <div className="flex items-start gap-[14px] py-6">
                        <img 
                          src="/images/img_avatar_image_37.png" 
                          alt="Complaint avatar" 
                          className="w-9 h-9 rounded-full flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1">
                          <div className="text-[15px] font-bold font-inter text-black">
                            You have received a new complaint
                          </div>
                          <div className="text-[13px] font-medium font-inter text-global-3">
                            9 Mar 2025. Whistleblowing channel
                          </div>
                          <div className="text-[13px] font-medium font-inter text-global-3 mt-2">
                            I would like to request that we start implementing remote work options. This need has been expressed by several of us on the office, as we believe it would improve both productivity and work-life balance. Although we have rais...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Assistant Button */}
                <div className="absolute bottom-4 right-4 z-20">
                  <img 
                    src="/images/img_ask_slashr_ai.svg" 
                    alt="Ask SlasHR AI" 
                    className="w-[218px] h-14 cursor-pointer hover:opacity-90 transition-opacity"
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

export default InboxTimeOffPage;