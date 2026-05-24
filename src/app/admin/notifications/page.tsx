import DashboardLayout from "../dashboard-layout";
import NotificationCenter from "@/components/ui/admin/notification-center";

export default function AdminNotificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Notification Center
            </p>
            <h1 className="text-2xl font-black text-[#1a1a1a]">Notification Overview</h1>
            <p className="text-sm text-[#666]">
              Use the sidebar to access Send, Scheduled campaigns, Templates, Channel settings, and Analytics.
            </p>
          </div>
        </section>
        <NotificationCenter />
      </div>
    </DashboardLayout>
  );
}
