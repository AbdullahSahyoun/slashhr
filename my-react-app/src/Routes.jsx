import { Routes, Route } from 'react-router-dom';

// Auth
import Login from './pages/Login';
import LoginOne from './pages/LoginOne';
import LoginTwo from './pages/LoginTwo';
import PasswordReset from './pages/PasswordReset';
import PasswordResetSuccess from './pages/PasswordResetSuccess';
import Verification from './pages/Verification';

// Dashboard
import Dashboard from './pages/Dashboard';
import DashboardSettings from './pages/Dashboard/Settings';

// People & Org
import PeopleOrg from './pages/PeopleOrg';
import PeopleOrgAnalytics from './pages/PeopleOrg/Analytics';

// Notifications
import Notifications from './pages/Notifications';

// Employee
import Attendance from './pages/Employee/Attendance';
import Badges from './pages/Employee/Badges';
import Documents from './pages/Employee/Documents';
import Feedback from './pages/Employee/Feedback';
import Letters from './pages/Employee/Letters';
import Personal from './pages/Employee/Personal';
import Presence from './pages/Employee/Presence';
import Contracts from './pages/Employee/Professional/Contracts';
import LeaveHistory from './pages/Employee/LeaveHistory';

// Inbox & Leave
import TimeOff from './pages/Inbox/TimeOff';
import LeaveRequest from './pages/Leave/Request';

// Social
import SocialPost from './pages/Social/Post';
import SocialLikes from './pages/Social/Likes';
import SocialCreate from './pages/Social/Create';

// Tools & Misc
import Export from './pages/Export';
import ContextMenu from './pages/ContextMenu';
import AIChat from './pages/AIChat';

// Optional: fallback
const NotFound = () => <h1 style={{ padding: '2rem', color: 'red' }}>404 - Page Not Found</h1>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-one" element={<LoginOne />} />
      <Route path="/login-two" element={<LoginTwo />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
      <Route path="/verification" element={<Verification />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<DashboardSettings />} />

      {/* People & Org */}
      <Route path="/people-org" element={<PeopleOrg />} />
      <Route path="/people-org/analytics" element={<PeopleOrgAnalytics />} />

      {/* Notifications */}
      <Route path="/notifications" element={<Notifications />} />

      {/* Employee */}
      <Route path="/employee/attendance" element={<Attendance />} />
      <Route path="/employee/badges" element={<Badges />} />
      <Route path="/employee/documents" element={<Documents />} />
      <Route path="/employee/feedback" element={<Feedback />} />
      <Route path="/employee/letters" element={<Letters />} />
      <Route path="/employee/personal" element={<Personal />} />
      <Route path="/employee/presence" element={<Presence />} />
      <Route path="/employee/professional/contracts" element={<Contracts />} />
      <Route path="/employee/leave-history" element={<LeaveHistory />} />

      {/* Inbox & Leave */}
      <Route path="/inbox/time-off" element={<TimeOff />} />
      <Route path="/leave/request" element={<LeaveRequest />} />

      {/* Social */}
      <Route path="/social/post" element={<SocialPost />} />
      <Route path="/social/likes" element={<SocialLikes />} />
      <Route path="/social/create" element={<SocialCreate />} />

      {/* Tools & Misc */}
      <Route path="/context-menu" element={<ContextMenu />} />
      <Route path="/export" element={<Export />} />
      <Route path="/ai-chat" element={<AIChat />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
