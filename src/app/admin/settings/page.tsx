import DashboardLayout from "../dashboard-layout";
import LiveOrders from "@/components/ui/admin/live-orders";
import DeliveryMonitor from "@/components/ui/admin/delivery-monitor";
import CommandPalette from "@/components/ui/admin/command-palette";
import TenantBranding from "@/components/ui/admin/tenant-branding";
import SettingsPanel from "@/components/ui/admin/settings-panel";
import GlobalSearch from "@/components/ui/admin/global-search";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";

const settingsCategories = [
  {
    id: "general",
    label: "General Settings",
    description: "Website name, logo, favicon, theme mode, currency, timezone, language & maintenance mode",
    icon: "Settings",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["Website/App name", "Logo upload", "Favicon", "Theme mode", "Default currency", "Timezone", "Language", "Maintenance mode"],
  },
  {
    id: "store",
    label: "Store Settings",
    description: "Store profile, contact info, business hours, status & multi-store management",
    icon: "Store",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Store name & description", "Store address", "Contact number & email", "Business hours", "Store status", "Multiple stores"],
  },
  {
    id: "payment",
    label: "Payment Settings",
    description: "UPI, Razorpay, card, wallet, COD & refund settings with gateway keys",
    icon: "CreditCard",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["UPI settings", "Razorpay setup", "Card payment", "Wallet & COD", "Refund settings", "Gateway keys"],
  },
  {
    id: "tax",
    label: "Tax Settings",
    description: "GST %, tax rules, invoice numbering, tax categories & regional tax setup",
    icon: "Percent",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["GST configuration", "Tax rules", "Invoice numbering", "Tax categories", "Regional tax"],
  },
  {
    id: "delivery",
    label: "Delivery Settings",
    description: "Charges, free delivery threshold, radius, slots, express charges & pickup",
    icon: "Truck",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["Delivery charges", "Free delivery threshold", "Delivery radius", "Time slots", "Express charges", "Pickup settings"],
  },
  {
    id: "notification",
    label: "Notification Settings",
    description: "Push, order, promotion & reminder notifications with scheduling",
    icon: "Bell",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Push notifications", "Order notifications", "Promotion notifications", "Reminders", "Scheduling"],
  },
  {
    id: "email",
    label: "Email Settings",
    description: "SMTP config, sender email, templates & email verification settings",
    icon: "Mail",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["SMTP configuration", "Sender email", "Email templates", "Verification settings"],
  },
  {
    id: "sms-whatsapp",
    label: "SMS & WhatsApp Settings",
    description: "SMS provider, WhatsApp API, OTP & promotional templates, sender ID",
    icon: "MessageSquare",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["SMS provider API", "WhatsApp API", "OTP templates", "Promotional templates", "Sender ID"],
  },
  {
    id: "security",
    label: "Security Settings",
    description: "Password rules, session timeout, 2FA, IP whitelist & device restrictions",
    icon: "Shield",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["Password rules", "Session timeout", "Two-factor auth", "IP whitelist", "Login attempts", "Device restrictions"],
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "RBAC — create roles, assign/revoke permissions, manage access control",
    icon: "Lock",
    color: "bg-[#fef2f2] text-[#b91c1c]",
    items: ["Create role", "Assign permissions", "Edit permissions", "Revoke permissions", "View user roles", "Bulk actions"],
  },
  {
    id: "user-auth",
    label: "User & Authentication",
    description: "Registration, login methods, OTP, social login & account verification",
    icon: "Users",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Registration settings", "Login methods", "OTP login", "Social login", "Account verification", "User restrictions"],
  },
  {
    id: "loyalty",
    label: "Loyalty Settings",
    description: "Point value rules, expiry, tier rules, referral & cashback settings",
    icon: "Gift",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["Point value rules", "Point expiry", "Tier rules", "Referral settings", "Cashback settings"],
  },
  {
    id: "seo",
    label: "SEO Settings",
    description: "Meta title, description, sitemap, robots.txt & Open Graph tags",
    icon: "TrendingUp",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Meta title & description", "Sitemap settings", "Robots.txt", "Open Graph tags"],
  },
  {
    id: "localization",
    label: "Localization Settings",
    description: "Languages, currency formats, regional settings & translations",
    icon: "Globe",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["Languages", "Currency formats", "Regional settings", "Translation management"],
  },
  {
    id: "storage",
    label: "Storage Settings",
    description: "File upload size, storage provider, CDN config & image optimization",
    icon: "Folder",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["File upload size", "Storage provider", "CDN configuration", "Image optimization"],
  },
  {
    id: "api-integration",
    label: "API & Integration",
    description: "API keys, third-party integrations, webhooks, Maps & Analytics API",
    icon: "Zap",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["API keys", "Third-party integrations", "Webhooks", "Maps API", "Analytics API"],
  },
  {
    id: "feature-flags",
    label: "Feature Flags",
    description: "Enable/disable modules, experimental features & beta features",
    icon: "FlaskConical",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Module toggles", "Experimental features", "Beta features", "A/B testing"],
  },
  {
    id: "backup",
    label: "Backup & Restore",
    description: "Backup schedule, manual backup, restore & database export",
    icon: "Copy",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    items: ["Backup schedule", "Manual backup", "Restore backup", "Export database"],
  },
  {
    id: "system",
    label: "System Settings",
    description: "Cache, queue, log settings, cron jobs & system health monitoring",
    icon: "Terminal",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Cache settings", "Queue settings", "Log settings", "Cron jobs", "System health"],
  },
  {
    id: "developer",
    label: "Developer Tools",
    description: "Git integration, version control, staging, commits, branch management & code diff viewer",
    icon: "Terminal",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    items: ["Git status", "Stage/unstage files", "Commit & push", "Branch management", "Diff viewer", "Commit history"],
  },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Store: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M6 7v-.8A2.2 2.2 0 0 1 8.2 4h7.6A2.2 2.2 0 0 1 18 6.2V7"/></svg>,
  CreditCard: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
  Percent: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  Truck: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
  Bell: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Mail: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  MessageSquare: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Shield: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>,
  Lock: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Users: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Gift: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  TrendingUp: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Globe: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Folder: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>,
  Zap: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  FlaskConical: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><line x1="7" x2="17" y1="16" y2="16"/></svg>,
  Copy: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
  Terminal: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>,
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsErrorBoundary>
      <div className="space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                System Configuration
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Settings
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666]">
                Configure and manage all aspects of your platform — from store and payments to security and integrations.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#999]">
              <span className="flex h-2 w-2 rounded-full bg-[#0c831f]" />
              All systems operational
            </div>
          </div>
        </section>

        {/* Quick Controls — existing widgets */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-[#ff4f8b]" />
            <h2 className="text-sm font-black uppercase tracking-wide text-[#666]">Quick Controls</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <LiveOrders />
            <DeliveryMonitor />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
            <CommandPalette />
            <GlobalSearch />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <TenantBranding company="FreshMart" theme="green" />
            <SettingsPanel />
          </div>
        </section>

        {/* All 18 Settings Categories — Amazon-style Grid */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-[#0c831f]" />
            <h2 className="text-sm font-black uppercase tracking-wide text-[#666]">All Settings</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {settingsCategories.map((cat) => {
              const IconComp = categoryIcons[cat.icon];
              return (
                <Link
                  key={cat.id}
                  href={cat.id === "developer" ? "/admin/developer/git" : `/admin/settings/${cat.id}`}
                  className="group rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm transition-all hover:border-[#ff4f8b]/30 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${cat.color}`}>
                      {IconComp && <IconComp className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black text-[#1a1a1a] group-hover:text-[#ff4f8b] transition-colors">
                        {cat.label}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#666] line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <svg className="mt-1 h-4 w-4 flex-shrink-0 text-[#ccc] transition-colors group-hover:text-[#ff4f8b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  {/* Item chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cat.items.slice(0, 4).map((item) => (
                      <span key={item} className="rounded-md bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-semibold text-[#999]">
                        {item}
                      </span>
                    ))}
                    {cat.items.length > 4 && (
                      <span className="rounded-md bg-[#fff0f6] px-2 py-0.5 text-[10px] font-semibold text-[#ff4f8b]">
                        +{cat.items.length - 4}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Category Quick Stats Footer */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {[
              { label: "General", val: "8 settings", color: "text-[#0c831f]" },
              { label: "Store", val: "6 settings", color: "text-[#ff4f8b]" },
              { label: "Payment", val: "6 gateways", color: "text-[#0c831f]" },
              { label: "Tax", val: "5 rules", color: "text-[#ff4f8b]" },
              { label: "Delivery", val: "6 zones", color: "text-[#0c831f]" },
              { label: "Security", val: "6 protocols", color: "text-[#ff4f8b]" },
              { label: "Notifications", val: "4 channels", color: "text-[#0c831f]" },
              { label: "Integrations", val: "5 APIs", color: "text-[#ff4f8b]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-[#f6f7f6] px-3 py-2 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{stat.label}</p>
                <p className={`text-xs font-black ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
