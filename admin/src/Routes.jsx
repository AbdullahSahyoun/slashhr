// src/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

/* =========================
   Auth
   ========================= */
import Login from "./pages/Login";
import LoginOne from "./pages/LoginOne";
import LoginTwo from "./pages/LoginTwo";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import Verification from "./pages/Verification";

/* =========================
   Dashboard
   ========================= */
import Dashboard from "./pages/Dashboard";
import DashboardSettings from "./pages/Dashboard/Settings";

/* =========================
   People & Organization
   ========================= */
import OrgPage from "./pages/Org";
import Team from "./pages/Org/Teams/team";
import Department from "./pages/Org/Departments/department";
import Job from "./pages/Org/Jobs/job";

/* =========================
   Global / Analytics / Calendar / Settings
   ========================= */
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import TimeManagement from "./pages/TimeManagement";
import WorkSchedule from "./pages/WorkSchedule";
import Settings from "./pages/Settings";

/* ===== Settings sub-pages (General) ===== */
import CompanyDetails from "./pages/Settings/CompanyDetails";
import CompanyPage from "./pages/Settings/CompanyPage";
import Customization from "./pages/Settings/Customization";
import Documents from "./pages/Settings/Documents";
import EmploymentData from "./pages/Settings/EmploymentData";
import ExternalUsers from "./pages/Settings/ExternalUsers";
import InformationMissing from "./pages/Settings/InformationMissing";
import Permissions from "./pages/Settings/Permissions";
import SecuritySettings from "./pages/Settings/SecuritySettings";
import Subscription from "./pages/Settings/Subscription";
import Workplaces from "./pages/Settings/Workplaces";

/* ===== Settings sub-pages (Time) ===== */
import TimeCategories from "./pages/Settings/Time/TimeCategories";
import TimeOff from "./pages/Settings/Time/TimeOff";
import TimeTracking from "./pages/Settings/Time/TimeTracking";
import WorkSchedules from "./pages/Settings/Time/WorkSchedules";

/* =========================
   Employee
   ========================= */
import Employee from "./pages/Employee";
import Attendance from "./pages/Employee/Attendance";
import Badges from "./pages/Employee/Badges";
import DocumentsGlobal from "./pages/Documents"; // Global docs page
import Feedback from "./pages/Employee/Feedback";
import Letters from "./pages/Employee/Letters";
import Personal from "./pages/Employee/Personal";
import Presence from "./pages/Employee/Presence";
import LeaveHistory from "./pages/Employee/LeaveHistory";

/* =========================
   Inbox & Leave
   ========================= */
import Inbox from "./pages/Inbox";
import LeaveRequest from "./pages/Leave/Request";

/* =========================
   Social
   ========================= */
import SocialPost from "./pages/Social/Post";
import SocialLikes from "./pages/Social/Likes";
import SocialCreate from "./pages/Social/Create";

/* =========================
   Tools & Misc
   ========================= */
import Export from "./pages/Export";
import ContextMenu from "./pages/ContextMenu";
import AIChat from "./pages/AIChat";

/* =========================
   Placeholder / Fallback
   ========================= */
// Optional: use this for pages still being built
// import UnderProgress from "./pages/UnderProgress";

const NotFound = () => (
  <h1 style={{ padding: "2rem", color: "red" }}>404 - Page Not Found</h1>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================
          Auth
          ========================= */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-one" element={<LoginOne />} />
      <Route path="/login-two" element={<LoginTwo />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
      <Route path="/verification" element={<Verification />} />

      {/* =========================
          Dashboard
          ========================= */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<DashboardSettings />} />

      {/* =========================
          People & Organization
          ========================= */}
      <Route path="/organization" element={<OrgPage />} />
      <Route path="/organization/team" element={<Team />} />
      <Route path="/organization/department" element={<Department />} />
      <Route path="/organization/job" element={<Job />} />

      {/* =========================
          Employee
          ========================= */}
      <Route path="/employee" element={<Employee />} />
      <Route path="/employee/attendance" element={<Attendance />} />
      <Route path="/employee/badges" element={<Badges />} />
      <Route path="/employee/feedback" element={<Feedback />} />
      <Route path="/employee/letters" element={<Letters />} />
      <Route path="/employee/personal" element={<Personal />} />
      <Route path="/employee/presence" element={<Presence />} />
      <Route path="/employee/leave-history" element={<LeaveHistory />} />

      {/* Global Documents (not under /employee) */}
      <Route path="/documents" element={<DocumentsGlobal />} />

      {/* =========================
          Global / Analytics / Calendar / Settings
          ========================= */}
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/time-management" element={<TimeManagement />} />
      <Route path="/work-schedule" element={<WorkSchedule />} />
      <Route path="/settings" element={<Settings />} />

      {/* ===== Settings sub-routes (General) ===== */}
      <Route path="/settings/company-details" element={<CompanyDetails />} />
      <Route path="/settings/company-page" element={<CompanyPage />} />
      <Route path="/settings/customization" element={<Customization />} />
      <Route path="/settings/documents" element={<Documents />} />
      <Route path="/settings/employment-data" element={<EmploymentData />} />
      <Route path="/settings/external-users" element={<ExternalUsers />} />
      <Route path="/settings/information-missing" element={<InformationMissing />} />
      <Route path="/settings/permissions" element={<Permissions />} />
      <Route path="/settings/security-settings" element={<SecuritySettings />} />
      <Route path="/settings/subscription" element={<Subscription />} />
      <Route path="/settings/workplaces" element={<Workplaces />} />

      {/* ===== Settings sub-routes (Time) ===== */}
      <Route path="/settings/time/time-categories" element={<TimeCategories />} />
      <Route path="/settings/time/time-off" element={<TimeOff />} />
      <Route path="/settings/time/time-tracking" element={<TimeTracking />} />
      <Route path="/settings/time/work-schedules" element={<WorkSchedules />} />

      {/* =========================
          Inbox & Leave
          ========================= */}
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/leave" element={<LeaveRequest />} />

      {/* =========================
          Social
          ========================= */}
      <Route path="/social/post" element={<SocialPost />} />
      <Route path="/social/likes" element={<SocialLikes />} />
      <Route path="/social/create" element={<SocialCreate />} />

      {/* =========================
          Tools & Misc
          ========================= */}
      <Route path="/context-menu" element={<ContextMenu />} />
      <Route path="/export" element={<Export />} />
      <Route path="/ai-chat" element={<AIChat />} />

      {/* =========================
          Backwards-compatible aliases (temporary)
          TODO: remove these once all links use lowercase paths
          ========================= */}
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/TimeManagement" element={<TimeManagement />} />
      <Route path="/WorkSchedule" element={<WorkSchedule />} />
      <Route path="/Settings" element={<Settings />} />

      {/* =========================
          Fallback
          ========================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
