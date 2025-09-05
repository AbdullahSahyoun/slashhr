import React from "react";
import Sidebar from "../../components/common/Sidebar";
import {
  Settings as SettingsIcon,
  Building2,
  Globe,
  Palette,
  Folder,
  FileText,
  Users,
  ShieldCheck,
  Shield,
  CreditCard,
  MapPin,
  Tags,
  Plane,
  Timer,
  CalendarDays,
  CircleHelp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------- Small UI helpers ---------- */
const Section = ({ icon: Icon, title, children }) => (
  <section className="mt-8">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-slate-600" />
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    </div>
    {children}
  </section>
);

const Card = ({ icon: Icon, title, desc, hint, to }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => to && navigate(to)}
      role="button"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all cursor-pointer"
    >
      {/* top bar (matches sidebar color) */}
      <div
        className="flex items-center justify-between px-4 py-2 text-[var(--on-brand,#ffffff)]"
        style={{ background: "var(--brand, #0e4b3b)" }}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <CircleHelp className="w-4 h-4 opacity-90" />
      </div>

      {/* body */}
      <div className="p-4">
        <p className="text-sm text-slate-600">{desc}</p>
        {hint && (
          <span className="mt-2 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
};

/* ---------- Page ---------- */
export default function SettingsPage() {
  // Cards → paths aligned with your folders in /src/pages/Settings/*
  const general = [
    {
      icon: Building2,
      title: "Company details",
      desc: "View and update your company details.",
      hint: "Information missing",
      to: "/settings/company-details",
    },
    {
      icon: Globe,
      title: "Company page",
      desc: "Publish and customize a public page to share information.",
      to: "/settings/company-page",
    },
    {
      icon: Palette,
      title: "Customization",
      desc: "Personalize your workspace branding.",
      to: "/settings/customization",
    },
    {
      icon: Folder,
      title: "Documents",
      desc: "Organize your document folders.",
      to: "/settings/documents",
    },
    {
      icon: FileText,
      title: "Employment data",
      desc: "Define work conditions and approval groups.",
      to: "/settings/employment-data",
    },
    {
      icon: Users,
      title: "External users",
      desc: "Manage users without contracts who access SlashHR.",
      to: "/settings/external-users",
    },
    {
      icon: CircleHelp,
      title: "Information missing",
      desc: "Fill in missing company information.",
      to: "/settings/information-missing",
    },
    {
      icon: ShieldCheck,
      title: "Permissions",
      desc: "Control who can see and do what.",
      to: "/settings/permissions",
    },
    {
      icon: Shield,
      title: "Security settings",
      desc: "Configure login and other security settings.",
      to: "/settings/security-settings",
    },
    {
      icon: CreditCard,
      title: "Subscription",
      desc: "Manage your subscription details.",
      to: "/settings/subscription",
    },
    {
      icon: MapPin,
      title: "Workplaces",
      desc: "Set and assign company workplaces and holidays.",
      to: "/settings/workplaces",
    },
  ];

  const time = [
    {
      icon: Tags,
      title: "Time categories",
      desc: "Categorize working hours and set values.",
      to: "/settings/time/time-categories",
    },
    {
      icon: Plane,
      title: "Time off",
      desc: "Set and assign your company’s time-off policies.",
      to: "/settings/time/time-off",
    },
    {
      icon: Timer,
      title: "Time tracking",
      desc: "Define time tracking policies.",
      to: "/settings/time/time-tracking",
    },
    {
      icon: CalendarDays,
      title: "Work schedules",
      desc: "Set and assign work schedules.",
      to: "/settings/time/work-schedules",
    },
  ];

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{
        ["--sidebar-w"]: "300px",
        ["--brand"]: "var(--sidebar-bg,var(--global-bg-3))",
        ["--on-brand"]: "#ffffff",
      }}
    >
      <Sidebar />

      <main className="lg:pl-[var(--sidebar-w)] px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "var(--brand,#0e4b3b)" }}
          >
            <SettingsIcon className="h-5 w-5 text-[var(--on-brand,#ffffff)]" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        </div>

        {/* General */}
        <Section icon={SettingsIcon} title="General">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {general.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </Section>

        {/* Time */}
        <Section icon={Timer} title="Time">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {time.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
