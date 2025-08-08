import React, { useState } from 'react';
import SearchView from '../../components/ui/SearchView';

const NotificationsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All notification');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const notifications = [
    {
      id: 1,
      user: 'Manal',
      message: 'your purchase request has been approved',
      timestamp: '09/03/2025 04:30',
      description: 'Just letting you know your purchase request has been approved.',
      avatar: '/images/img_group_290.png'
    },
    {
      id: 2,
      user: 'Manal',
      message: 'your purchase request has been approved',
      timestamp: '09/03/2025 04:30',
      description: 'Just letting you know your purchase request has been approved.',
      avatar: '/images/img_group_290.png'
    },
    {
      id: 3,
      user: 'Manal',
      message: 'your purchase request has been approved',
      timestamp: '09/03/2025 04:30',
      description: 'Just letting you know your purchase request has been approved.',
      avatar: '/images/img_group_290.png'
    },
    {
      id: 4,
      user: 'Manal',
      message: 'your purchase request has been approved',
      timestamp: '09/03/2025 04:30',
      description: 'Just letting you know your purchase request has been approved.',
      avatar: '/images/img_group_290.png'
    },
    {
      id: 5,
      user: 'Manal',
      message: 'your purchase request has been approved',
      timestamp: '09/03/2025 04:30',
      description: 'Just letting you know your purchase request has been approved.',
      avatar: '/images/img_group_290.png'
    }
  ];

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full max-w-[272px] bg-sidebar-2 border-r-2 border-[#e4e4e4] hidden lg:block">
        <div className="pt-6 pr-[22px] pl-[22px]">
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
              onChange={handleSearchChange}
              className="border border-[#e4e4e4] rounded-lg bg-white"
              leftImage={{
                src: "/images/img_search.svg",
                width: 12,
                height: 12
              }}
            />
          </div>

          {/* Menu Items */}
          <nav className="space-y-5">
            {/* Dashboard */}
            <div className="flex items-center p-2 rounded-lg">
              <img src="/images/img_frame_3.svg" alt="dashboard" className="w-5 h-5" />
              <span className="ml-[18px] text-base font-semibold font-poppins text-global-3">Dashboard</span>
            </div>

            {/* Inbox - Active */}
            <div className="flex items-center justify-between p-2 rounded-lg">
              <div className="flex items-center">
                <img src="/images/img_frame_white_a700_20x20.svg" alt="inbox" className="w-5 h-5" />
                <span className="ml-[18px] text-base font-semibold font-poppins text-global-3">Inbox</span>
              </div>
              <div className="bg-sidebar-1 text-white text-xs font-bold font-inter px-2 py-1 rounded-md">
                53
              </div>
            </div>

            {/* People & Org */}
            <div className="flex items-center p-3 rounded-lg">
              <img src="/images/img_frame_gray_700_20x20.svg" alt="people" className="w-5 h-5" />
              <span className="ml-4 text-base font-semibold font-poppins text-global-3">People & Org</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center p-2 rounded-lg">
              <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-1" />
              <span className="ml-[18px] text-base font-semibold font-poppins text-global-3">Calendar</span>
            </div>

            {/* Documents */}
            <div className="flex items-center p-3 rounded-lg">
              <img src="/images/img_frame_20x20.svg" alt="documents" className="w-5 h-5" />
              <span className="ml-4 text-base font-semibold font-poppins text-global-3">Documents</span>
            </div>

            {/* Work Schedule */}
            <div className="flex items-center p-2 rounded-lg">
              <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-1" />
              <span className="ml-4 text-base font-semibold font-poppins text-global-3">Work Schedule</span>
            </div>

            {/* Analytics */}
            <div className="flex items-center p-2 rounded-lg">
              <img src="/images/img_frame_1.svg" alt="analytics" className="w-5 h-5 ml-1" />
              <span className="ml-4 text-base font-semibold font-poppins text-global-3">Analytics</span>
            </div>

            {/* Settings */}
            <div className="flex items-center p-2 rounded-lg">
              <img src="/images/img_frame_2.svg" alt="settings" className="w-5 h-5 ml-1" />
              <span className="ml-4 text-base font-semibold font-poppins text-global-3">Settings</span>
            </div>
          </nav>

          {/* User Dropdown */}
          <div className="mt-[136px] mb-6">
            <div className="flex items-center justify-between p-4 border border-[#e4e4e4] rounded-lg bg-white">
              <span className="text-sm font-poppins text-global-3">Manal Battache</span>
              <img src="/images/img_icons_16px_arrow_down.svg" alt="dropdown" className="w-4 h-[14px]" />
            </div>
            <div className="text-sm font-poppins text-global-3 mt-2">SlasHR</div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-4 sm:px-6 lg:px-[72px] py-6 border-b border-header-1">
          <div className="flex items-center gap-[18px]">
            <img 
              src="/images/img_ellipse_238.png" 
              alt="User Avatar" 
              className="w-11 h-11 rounded-full"
            />
            <div className="text-lg sm:text-xl lg:text-[25px] font-medium font-poppins leading-[31px]">
              <span className="text-global-1">Good afternoon, </span>
              <span className="text-global-2 font-bold">Manal!</span>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="border-b border-header-1">
          <div className="w-full h-[1px] bg-header-1"></div>
          <div className="px-4 sm:px-6 lg:px-[72px] py-6">
            <div className="flex items-start gap-16">
              <button className="text-base font-bold font-inter text-global-3">
                Requests
              </button>
              <div className="flex flex-col items-center gap-6">
                <button className="text-base font-bold font-inter text-global-2">
                  Notifications
                </button>
                <div className="w-[100px] h-[3px] bg-global-2 rounded-[1px]"></div>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-header-1"></div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-[62px] py-11">
          <div className="max-w-full">
            {/* Unread Notifications Card */}
            <div className="border border-header-1 rounded-[14px] p-6 mb-10 w-full max-w-[429px]">
              <h2 className="text-lg font-medium font-poppins text-global-1 mb-[18px]">
                Unread notifications
              </h2>
              <div className="text-[48px] font-medium font-poppins text-global-1 leading-[72px]">
                21
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-6">
              {/* Filter and Mark All Read */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="relative">
                  <select 
                    value={selectedFilter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="border border-[#e6e6e6] rounded-lg px-3 py-3 pr-10 text-[15px] font-medium font-inter text-global-1 bg-white min-w-[200px]"
                  >
                    <option value="All notification">All notification</option>
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                  </select>
                  <img 
                    src="/images/img_arrowdown_gray_700.svg" 
                    alt="dropdown" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-[18px] pointer-events-none"
                  />
                </div>

                <button className="flex items-center gap-[6px] bg-global-2 text-white px-[30px] py-[10px] rounded-lg text-xs font-medium font-poppins">
                  <img src="/images/img_vector_white_a700_10x14.svg" alt="mark read" className="w-[14px] h-[10px]" />
                  Mark all as read
                </button>
              </div>

              {/* Notification Items */}
              <div className="space-y-12">
                {notifications.map((notification, index) => (
                  <div key={notification.id} className="flex items-start gap-[14px]">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 bg-global-2 rounded-full p-2 flex items-center justify-center">
                        <img 
                          src={notification.avatar} 
                          alt="user avatar" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-medium font-inter text-global-1 leading-[19px] mb-2">
                        <span className="font-bold">{notification.user} </span>
                        <span className="text-global-3">{notification.message}</span>
                      </div>
                      <div className="text-[13px] font-medium font-inter text-global-3 leading-4 mb-2">
                        {notification.timestamp}
                      </div>
                      <div className="text-xs font-medium font-inter text-global-3 leading-[15px]">
                        {notification.description}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <button className="w-[30px] h-[30px] border-2 border-global-2 rounded-[14px] flex items-center justify-center hover:bg-gray-50">
                        <img 
                          src="/images/img_vector_blue_gray_700_10x14.svg" 
                          alt="action" 
                          className="w-[14px] h-[10px]"
                        />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Separator Lines */}
                <div className="w-full h-[1px] bg-header-1 my-6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <button className="w-9 h-9 bg-global-2 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <img 
              src="/images/img_group_white_a700.svg" 
              alt="floating action" 
              className="w-[18px] h-[14px]"
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-72 bg-sidebar-2 border-r-2 border-[#e4e4e4] overflow-y-auto">
            <div className="pt-6 pr-[22px] pl-[22px]">
              {/* Mobile menu content - same as desktop sidebar */}
              <div className="mt-1 mb-5">
                <img 
                  src="/images/img_arrow_down.svg" 
                  alt="SlasHR Logo" 
                  className="w-[248px] h-[88px]"
                />
              </div>

              <div className="mt-5 mb-5">
                <SearchView
                  placeholder="Search....."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="border border-[#e4e4e4] rounded-lg bg-white"
                  leftImage={{
                    src: "/images/img_search.svg",
                    width: 12,
                    height: 12
                  }}
                />
              </div>

              <nav className="space-y-5">
                <div className="flex items-center p-2 rounded-lg">
                  <img src="/images/img_frame_3.svg" alt="dashboard" className="w-5 h-5" />
                  <span className="ml-[18px] text-base font-semibold font-poppins text-global-3">Dashboard</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg">
                  <div className="flex items-center">
                    <img src="/images/img_frame_white_a700_20x20.svg" alt="inbox" className="w-5 h-5" />
                    <span className="ml-[18px] text-base font-semibold font-poppins text-global-3">Inbox</span>
                  </div>
                  <div className="bg-sidebar-1 text-white text-xs font-bold font-inter px-2 py-1 rounded-md">
                    53
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-lg">
                  <img src="/images/img_frame_gray_700_20x20.svg" alt="people" className="w-5 h-5" />
                  <span className="ml-4 text-base font-semibold font-poppins text-global-3">People & Org</span>
                </div>

                <div className="flex items-center p-2 rounded-lg">
                  <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-1" />
                  <span className="ml-[18px] text-base font-semibold font-poppins text-global-3">Calendar</span>
                </div>

                <div className="flex items-center p-3 rounded-lg">
                  <img src="/images/img_frame_20x20.svg" alt="documents" className="w-5 h-5" />
                  <span className="ml-4 text-base font-semibold font-poppins text-global-3">Documents</span>
                </div>

                <div className="flex items-center p-2 rounded-lg">
                  <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-1" />
                  <span className="ml-4 text-base font-semibold font-poppins text-global-3">Work Schedule</span>
                </div>

                <div className="flex items-center p-2 rounded-lg">
                  <img src="/images/img_frame_1.svg" alt="analytics" className="w-5 h-5 ml-1" />
                  <span className="ml-4 text-base font-semibold font-poppins text-global-3">Analytics</span>
                </div>

                <div className="flex items-center p-2 rounded-lg">
                  <img src="/images/img_frame_2.svg" alt="settings" className="w-5 h-5 ml-1" />
                  <span className="ml-4 text-base font-semibold font-poppins text-global-3">Settings</span>
                </div>
              </nav>

              <div className="mt-[136px] mb-6">
                <div className="flex items-center justify-between p-4 border border-[#e4e4e4] rounded-lg bg-white">
                  <span className="text-sm font-poppins text-global-3">Manal Battache</span>
                  <img src="/images/img_icons_16px_arrow_down.svg" alt="dropdown" className="w-4 h-[14px]" />
                </div>
                <div className="text-sm font-poppins text-global-3 mt-2">SlasHR</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;