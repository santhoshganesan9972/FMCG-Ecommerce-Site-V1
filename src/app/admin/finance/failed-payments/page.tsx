import DashboardLayout from "../../dashboard-layout";
import FailedPaymentsTable from "@/components/ui/admin/failed-payments-table";

export default function FailedPaymentsPage() {
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
                Failed Payments
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
                Monitor and manage failed payment attempts, retry transactions, and notify customers about payment issues.
              </p>
            </div>
          </div>
        </section>

        <FailedPaymentsTable />
      </div>
    </DashboardLayout>
  );
}
