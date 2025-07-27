import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchView from '../ui/SearchView';
import Dropdown from '../ui/Dropdown';

const Sidebar = ({ 
  className = '',
  onMenuItemClick,
  activeMenuItem = 'Dashboard',
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '/images/img_frame.svg',
      badge: null,
      active: true
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: '/images/img_frame_gray_700.svg',
      badge: '53',
      active: false
    },
    {
      id: 'people-org',
      label: 'People & Org',
      icon: '/images/img_frame_gray_700_20x20.svg',
      badge: null,
      active: false
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: '/images/img_frame_gray_700_18x18.svg',
      badge: null,
      active: false
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: '/images/img_frame_20x20.svg',
      badge: null,
      active: false
    },
    {
      id: 'work-schedule',
      label: 'Work Schedule',
      icon: '/images/img_frame_18x18.svg',
      badge: null,
      active: false
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '/images/img_frame_1.svg',
      badge: null,
      active: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '/images/img_frame_2.svg',
      badge: null,
      active: false
    }
  ];

  const handleSearch = (value) => {
    console.log('Search:', value);
  };

  const handleMenuClick = (item) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
  };

  return (
    <div className={`bg-sidebar-2 border-r-2 border-global-6 h-full ${className}`} {...props}>
      {/* Mobile Menu Toggle */}
      <button 
        className="block lg:hidden p-4" 
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block h-full flex flex-col pt-[24px] pr-[22px] pl-[22px]`}>
        {/* Logo */}
        <div className="mt-[4px] mb-[20px]">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-full max-w-[248px] h-[88px]"
          />
        </div>

        {/* Search */}
        <div className="mb-[20px]">
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            className="w-full p-[12px_22px_12px_36px] border border-[#e4e4e4] rounded-[8px] bg-global-1 text-[12px] font-inter font-normal leading-[15px] text-global-3"
            leftImage={{
              src: "/images/img_search.svg",
              width: 12,
              height: 12
            }}
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-[20px] flex-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center justify-between p-[8px] cursor-pointer rounded-[8px] transition-colors duration-200 ${
                item.id === activeMenuItem.toLowerCase() || item.active
                  ? 'bg-global-3' :'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-[20px] h-[20px]" 
                />
                <span className={`ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] ${
                  item.id === activeMenuItem.toLowerCase() || item.active
                    ? 'text-global-5' :'text-global-3'
                }`}>
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <div className="bg-sidebar-1 rounded-[6px] px-[6px] py-[2px]">
                  <span className="text-[12px] font-inter font-bold leading-[15px] text-global-5">
                    {item.badge}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Dropdown */}
        <div className="mt-auto mb-[24px]">
          <Dropdown
            placeholder="Manal Battache"
            className="w-full p-[28px_28px_28px_12px] border border-[#e4e4e4] rounded-[10px] bg-global-1 text-[14px] font-poppins font-normal leading-[21px] text-global-3"
            rightImage={{
              src: "/images/img_icons_16px_arrow_down.svg",
              width: 16,
              height: 14
            }}
          >
            SlasHR
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onMenuItemClick: PropTypes.func,
  activeMenuItem: PropTypes.string,
};

export default Sidebar;