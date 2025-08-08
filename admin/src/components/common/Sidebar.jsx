import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../ui/Dropdown';
import { HiMenu, HiX } from 'react-icons/hi';

const Sidebar = ({
  className = '',
  onMenuItemClick,
  activeMenuItem = 'Dashboard',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '/images/img_frame.svg', badge: null },
    { id: 'inbox', label: 'Inbox', icon: '/images/img_frame_gray_700.svg', badge: '53' },
    { id: 'people-org', label: 'People & Org', icon: '/images/img_frame_gray_700_20x20.svg' },
    { id: 'calendar', label: 'Calendar', icon: '/images/img_frame_gray_700_18x18.svg' },
    { id: 'documents', label: 'Documents', icon: '/images/img_frame_20x20.svg' },
    { id: 'work-schedule', label: 'Work Schedule', icon: '/images/img_frame_18x18.svg' },
    { id: 'analytics', label: 'Analytics', icon: '/images/img_frame_1.svg' },
    { id: 'settings', label: 'Settings', icon: '/images/img_frame_2.svg' }
  ];

  const handleMenuClick = (item) => {
    if (onMenuItemClick) onMenuItemClick(item);
    setMobileMenuOpen(false); // close mobile menu on click
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Top Nav Button */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white flex items-center justify-between px-4 py-3 shadow-md">
        <img src="/images/img_arrow_down.svg" alt="SlasHR Logo" className="h-8" />
        <button onClick={() => setMobileMenuOpen(true)} className="text-gray-700 text-2xl">
          <HiMenu />
        </button>
      </div>

      {/* Mobile Slide Down Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src="/images/img_arrow_down.svg" alt="SlasHR Logo" className="h-10" />
          <button onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700">
            <HiX />
          </button>
        </div>

        {/* Search (Mobile) */}
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-400"
            />
            <img
              src="/images/img_search.svg"
              alt="Search"
              className="absolute left-3 top-2.5 w-4 h-4 opacity-60"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-2 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition ${
                item.id === activeMenuItem.toLowerCase()
                  ? 'bg-global-3 text-global-5'
                  : 'hover:bg-gray-100 text-global-3'
              }`}
            >
              <div className="flex items-center">
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span className="ml-4 text-sm font-semibold">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-sidebar-1 text-global-5 text-xs font-bold px-2 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Dropdown */}
        <div className="p-4">
          <Dropdown
            placeholder="Manal Battache"
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700"
            rightImage={{
              src: "/images/img_icons_16px_arrow_down.svg",
              width: 16,
              height: 14
            }}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-[270px] h-screen fixed top-0 left-0 bg-sidebar-2 border-r-2 border-global-6 z-40 ${className}`}
        {...props}
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/images/img_arrow_down.svg"
              alt="SlasHR Logo"
              className="w-full max-w-[220px] h-[70px] object-contain"
            />
          </div>

          {/* Search */}
          <div className="mb-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-400"
              />
              <img
                src="/images/img_search.svg"
                alt="Search"
                className="absolute left-3 top-2.5 w-4 h-4 opacity-60"
              />
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition ${
                  item.id === activeMenuItem.toLowerCase()
                    ? 'bg-global-3 text-global-5'
                    : 'hover:bg-gray-100 text-global-3'
                }`}
              >
                <div className="flex items-center">
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="ml-4 text-sm font-semibold">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-sidebar-1 text-global-5 text-xs font-bold px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Dropdown */}
          <div className="pt-4">
            <Dropdown
              placeholder="Manal Battache"
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700"
              rightImage={{
                src: "/images/img_icons_16px_arrow_down.svg",
                width: 16,
                height: 14
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onMenuItemClick: PropTypes.func,
  activeMenuItem: PropTypes.string,
};

export default Sidebar;
