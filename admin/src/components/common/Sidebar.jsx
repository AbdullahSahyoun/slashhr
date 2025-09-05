// Sidebar.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// If you have auth/context, pass the employeeId as a prop or grab from store
const DEFAULT_EMPLOYEE_ID = 12;

// Updated: inserted Time Management before settings
const BASE_MENU = [
  { id: 'dashboard',       label: 'Dashboard',       icon: '/images/img_dashboard.svg' },
  { id: 'inbox',           label: 'Inbox',           icon: '/images/img_frame_gray_700.svg' },
  { id: 'people-org',      label: 'People & Org',    icon: '/images/img_frame_gray_700_20x20.svg' },
  { id: 'calendar',        label: 'Calendar',        icon: '/images/img_frame_gray_700_18x18.svg' },
  { id: 'documents',       label: 'Documents',       icon: '/images/img_frame_20x20.svg' },
  { id: 'work-schedule',   label: 'Work Schedule',   icon: '/images/img_frame_18x18.svg' },
  { id: 'analytics',       label: 'Analytics',       icon: '/images/img_frame_1.svg' },
  { id: 'time-management', label: 'Time Management', icon: '/images/img_time.svg' }, // <— new
  { id: 'settings',        label: 'Settings',        icon: '/images/img_frame_2.svg' },
];

const ROUTE_MAP = {
  dashboard: '/dashboard',
  inbox: '/inbox',
  'people-org': '/organization',
  calendar: '/calendar',
  documents: '/documents',
  'work-schedule': '/work-schedule',   // normalized lowercase
  analytics: '/analytics',             // normalized lowercase
  'time-management': '/time-management',
  settings: '/settings',
};

const Sidebar = ({
  className = '',
  // Removed activeMenuItem prop to avoid forcing an active state by default
  employeeId: propEmployeeId,
  pollMs = 60000, // set to null/0 to disable polling
}) => {
  const employeeId = propEmployeeId ?? DEFAULT_EMPLOYEE_ID;

  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(false);
  const [countErr, setCountErr] = useState('');
  const menuRef = useRef(null);

  // --- Close mobile drawer on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // --- Load Unread count
 // --- Load Unread count
const loadInboxCount = async (signal) => {
  if (!employeeId) return;
  setLoadingCount(true);
  setCountErr('');
  try {
    const countUrl = `${API_BASE}/notifications/employee/${employeeId}/count?status=Unread`;
    const r1 = await fetch(countUrl, { credentials: 'include', signal });
    if (r1.ok) {
      const data = await r1.json();
      if (typeof data?.count === 'number') {
        // ✅ only update state if value changed
        setInboxCount((prev) => (prev !== data.count ? data.count : prev));
        return;
      }
    }

    const listUrl = `${API_BASE}/notifications/employee/${employeeId}?status=Unread&limit=50&offset=0`;
    const r2 = await fetch(listUrl, { credentials: 'include', signal });
    if (!r2.ok) throw new Error(`HTTP ${r2.status}`);
    const data2 = await r2.json();
    const newCount = Array.isArray(data2) ? data2.length : 0;

    // ✅ only update state if value changed
    setInboxCount((prev) => (prev !== newCount ? newCount : prev));
  } catch (e) {
    setCountErr(e.message || 'Failed to load inbox count');
    setInboxCount(0);
  } finally {
    setLoadingCount(false);
  }
};

  // initial + polling
  useEffect(() => {
    const ac = new AbortController();
    loadInboxCount(ac.signal);
    let t;
    if (pollMs && pollMs > 0) {
      t = setInterval(() => loadInboxCount(ac.signal), pollMs);
    }
    return () => {
      ac.abort();
      if (t) clearInterval(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, API_BASE, pollMs]);

  // Compose menu with dynamic Inbox badge
  const MENU = useMemo(() => {
    return BASE_MENU.map((m) =>
      m.id === 'inbox'
        ? { ...m, badge: loadingCount ? '…' : inboxCount > 0 ? String(inboxCount) : undefined }
        : m
    );
  }, [inboxCount, loadingCount]);

  // Only exact match for these (parents should remain active on sub-routes)
  const EXACT_IDS = new Set(['dashboard']);

  const MenuItem = ({ item, onClick }) => {
    const to = ROUTE_MAP[item.id] || '/';
    const isExact = EXACT_IDS.has(item.id); // exact match only for dashboard

    return (
      <NavLink to={to} onClick={onClick} end={isExact}>
        {({ isActive }) => (
          <div
            className={`flex items-center justify-between p-2 rounded-md transition ${
              isActive ? 'bg-global-3 text-global-5' : 'hover:bg-gray-100 text-global-3'
            }`}
          >
            <div className="flex items-center">
              <img
                src={item.icon}
                alt={item.label}
                className={`w-5 h-5 ${isActive ? 'brightness-0 invert' : ''}`}
              />
              <span className="ml-4 text-sm font-semibold">{item.label}</span>
            </div>
            {item.badge && (
              <span
                className="bg-sidebar-1 text-global-5 text-xs font-bold px-2 py-0.5 rounded-md min-w-[1.5rem] text-center"
                title={countErr ? `Inbox: ${countErr}` : 'Unread'}
              >
                {item.badge}
              </span>
            )}
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white flex items-center justify-between px-4 py-3 shadow-md">
        <img src="/images/img_arrow_down.svg" alt="SlasHR Logo" className="h-8" />
        <button onClick={() => setMobileMenuOpen(true)} className="text-gray-700 text-2xl">
          <HiMenu />
        </button>
      </div>

      {/* Mobile Drawer */}
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

        {/* Mobile search */}
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-400"
            />
            <img src="/images/img_search.svg" alt="Search" className="absolute left-3 top-2.5 w-4 h-4 opacity-60" />
          </div>
        </div>

        {/* Mobile menu items */}
        <div className="px-4 py-2 space-y-2">
          {MENU.map((m) => (
            <MenuItem key={m.id} item={m} onClick={() => setMobileMenuOpen(false)} />
          ))}
        </div>

        {/* Mobile user dropdown placeholder */}
        <div className="p-4 border-t">
          <div className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700 flex items-center justify-between">
            <span>Manal Battache</span>
            <img src="/images/img_icons_16px_arrow_down.svg" alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col h-screen fixed top-0 left-0 bg-sidebar-2 border-r-2 border-global-6 z-40 ${className}`}>
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
              <img src="/images/img_search.svg" alt="Search" className="absolute left-3 top-2.5 w-4 h-4 opacity-60" />
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            {MENU.map((m) => (
              <MenuItem key={m.id} item={m} />
            ))}
          </div>

          {/* User */}
          <div className="pt-4">
            <div className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700 flex items-center justify-between">
              <span>Manal Battache</span>
              <img src="/images/img_icons_16px_arrow_down.svg" alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </aside>

      {/* spacer for desktop layout */}
      <div className="hidden lg:block" aria-hidden />
    </>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  employeeId: PropTypes.number,
  pollMs: PropTypes.number,
};

export default Sidebar;
