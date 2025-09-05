/* inbox/Notifications/index.jsx */
import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function formatDate(dtStr) {
  if (!dtStr) return '';
  const d = new Date(dtStr);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const NotificationsPage = ({ employeeId: propEmployeeId }) => {
  // TODO: replace fallback 12 with your logged-in employee id
  const employeeId = propEmployeeId ?? 12;

  const [selectedFilter, setSelectedFilter] = useState('All notification');
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const statusQuery = useMemo(() => {
    if (selectedFilter === 'Unread') return 'Unread';
    if (selectedFilter === 'Read') return 'Read';
    return null;
  }, [selectedFilter]);

  async function loadData() {
    setLoading(true);
    setErr('');
    try {
      const url = new URL(`${API_BASE}/notifications/employee/${employeeId}`);
      if (statusQuery) url.searchParams.set('status', statusQuery);
      url.searchParams.set('limit', '100');
      url.searchParams.set('offset', '0');

      const res = await fetch(url.toString(), { credentials: 'include' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // API returns fields like: NotificationID, Title, Message, Status, CreatedAt, ReadAt, ...
      const mapped = (data || []).map((n) => ({
        id: n.NotificationID,
        user: 'System', // or map from your auth context if you want sender
        message: n.Title || n.Message || '',
        description: n.Message || '',
        timestamp: formatDate(n.CreatedAt),
        status: n.Status,
        avatar: '/images/img_group_290.png',
      }));

      setItems(mapped);

      // If filtering "All notification", we need unread count separately.
      if (!statusQuery) {
        const unread = mapped.filter((x) => x.status === 'Unread').length;
        setUnreadCount(unread);
      } else if (statusQuery === 'Unread') {
        setUnreadCount(mapped.length);
      } else {
        // statusQuery === 'Read'
        setUnreadCount(0);
      }
    } catch (e) {
      setErr(e.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, statusQuery]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const markAllAsRead = async () => {
    try {
      const unread = items.filter((n) => n.status === 'Unread');
      if (unread.length === 0) return;

      await Promise.all(
        unread.map((n) =>
          fetch(`${API_BASE}/notifications/${n.id}/read`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          })
        )
      );
      // Optimistic update:
      setItems((prev) => prev.map((n) => (n.status === 'Unread' ? { ...n, status: 'Read' } : n)));
      setUnreadCount(0);
    } catch (e) {
      console.error(e);
      alert('Failed to mark all as read');
    }
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
              {loading && !items.length ? '...' : unreadCount}
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

            <button
              onClick={markAllAsRead}
              disabled={items.every((n) => n.status === 'Read')}
              className="flex items-center gap-[6px] bg-global-2 text-white px-[30px] py-[10px] rounded-lg text-xs font-medium font-poppins disabled:opacity-50"
            >
              <img
                src="/images/img_vector_white_a700_10x14.svg"
                alt="mark read"
                className="w-[14px] h-[10px]"
              />
              Mark all as read
            </button>
          </div>

          {/* Errors */}
          {err && (
            <div className="mb-4 text-sm text-red-600">
              {err}
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-12">
            {loading && items.length === 0 ? (
              <div className="text-sm text-global-3">Loading...</div>
            ) : items.length === 0 ? (
              <div className="text-sm text-global-3">No notifications</div>
            ) : (
              items.map((n) => (
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
                      {n.status === 'Unread' && (
                        <span className="ml-2 inline-block text-[11px] px-2 py-[2px] rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          Unread
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] font-medium font-inter text-global-3 leading-4 mb-2">
                      {n.timestamp}
                    </div>
                    <div className="text-xs font-medium font-inter text-global-3 leading-[15px]">
                      {n.description}
                    </div>
                  </div>

                  {/* Action Button: mark single as read */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={async () => {
                        try {
                          await fetch(`${API_BASE}/notifications/${n.id}/read`, {
                            method: 'PATCH',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                          });
                          setItems((prev) =>
                            prev.map((x) => (x.id === n.id ? { ...x, status: 'Read' } : x))
                          );
                          setUnreadCount((c) => (n.status === 'Unread' ? Math.max(0, c - 1) : c));
                        } catch (_) {
                          alert('Failed to update notification');
                        }
                      }}
                      className="w-[30px] h-[30px] border-2 border-global-2 rounded-[14px] flex items-center justify-center hover:bg-gray-50"
                      title="Mark as read"
                    >
                      <img
                        src="/images/img_vector_blue_gray_700_10x14.svg"
                        alt="action"
                        className="w-[14px] h-[10px]"
                      />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Separator Line */}
            <div className="w-full h-[1px] bg-header-1 my-6"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={loadData}
          className="w-9 h-9 bg-global-2 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title="Refresh"
        >
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
