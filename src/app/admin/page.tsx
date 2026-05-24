import DashboardLayout from "./dashboard-layout";
import AdminDashboard from "./dashboard/page";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
}
