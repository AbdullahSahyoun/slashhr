import React from 'react';

const EmployeeBadgesPage = () => {
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

  return (
    <div className="w-full bg-global-1 min-h-screen flex justify-center items-start p-[44px] lg:px-[72px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[34px] max-w-[996px] w-full">
        {badgeItems.map((badge, index) => (
          <div
            key={index}
            className="bg-global-1 border border-global-6 rounded-[14px] flex flex-col items-center p-[24px] hover:shadow-lg transition-shadow duration-300"
          >
            {/* Badge Icon */}
            <div className="w-[64px] h-[64px] bg-global-3 rounded-full flex items-center justify-center mb-[16px]">
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
  );
};

export default EmployeeBadgesPage;
