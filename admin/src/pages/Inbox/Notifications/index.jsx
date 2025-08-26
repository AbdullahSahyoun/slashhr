/* inbox/Notifications/index.jsx */
import React, { useState } from 'react';

const NotificationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All notification');

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
    }
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
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
              <img
                src="/images/img_vector_white_a700_10x14.svg"
                alt="mark read"
                className="w-[14px] h-[10px]"
              />
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-12">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-[14px]">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 bg-global-2 rounded-full p-2 flex items-center justify-center">
                    <img
                      src={n.avatar}
                      alt="user avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-medium font-inter text-global-1 leading-[19px] mb-2">
                    <span className="font-bold">{n.user} </span>
                    <span className="text-global-3">{n.message}</span>
                  </div>
                  <div className="text-[13px] font-medium font-inter text-global-3 leading-4 mb-2">
                    {n.timestamp}
                  </div>
                  <div className="text-xs font-medium font-inter text-global-3 leading-[15px]">
                    {n.description}
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

            {/* Separator Line */}
            <div className="w-full h-[1px] bg-header-1 my-6"></div>
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
  );
};

export default NotificationsPage;
