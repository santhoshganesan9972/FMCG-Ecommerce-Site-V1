import DashboardLayout from "../dashboard-layout";
import CategoryForm from "@/components/ui/admin/category-form";
import CategoryTable from "@/components/ui/admin/category-table";

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-2">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
          <CategoryForm />
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Category List
              </p>
              <h2 className="mt-1.5 text-lg font-black text-[#1a1a1a] sm:text-xl">
                Category List
              </h2>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-[#666]">
                View and manage existing categories in the inventory.
              </p>
            </div>
          </div>
          <CategoryTable />
        </section>
      </div>
    </DashboardLayout>
  );
}
