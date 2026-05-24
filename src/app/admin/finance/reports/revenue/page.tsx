import DashboardLayout from "../../../dashboard-layout";
import RevenueReportsTable from "@/components/ui/admin/revenue-reports-table";

export default function RevenueReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Payment & Finance
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Revenue Reports
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
                Analyze revenue trends, track gross and net earnings, and monitor order values and refunds.
              </p>
            </div>
          </div>
        </section>

        <RevenueReportsTable />
      </div>
    </DashboardLayout>
  );
}
