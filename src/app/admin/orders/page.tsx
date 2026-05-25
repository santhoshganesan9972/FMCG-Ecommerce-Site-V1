"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { ShoppingCart, Eye, Edit3, Filter, Clock, RefreshCw, CheckCircle, XCircle, Truck, MoreHorizontal, ChevronRight, LayoutDashboard, List } from "lucide-react";
import { toast } from "sonner";

type OrderStatus = "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled" | "returned";

interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
}

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "Ravi Kumar", email: "ravi.k@example.com", items: 5, total: 1240, status: "preparing", paymentMethod: "UPI", paymentStatus: "paid", deliveryAddress: "42, Andheri West, Mumbai", createdAt: "2026-05-21 14:30", updatedAt: "2026-05-21 14:35" },
  { id: "ORD-002", customer: "Anita Singh", email: "anita.s@example.com", items: 3, total: 680, status: "out_for_delivery", paymentMethod: "Card", paymentStatus: "paid", deliveryAddress: "15, Bandra West, Mumbai", createdAt: "2026-05-21 13:00", updatedAt: "2026-05-21 13:50" },
  { id: "ORD-003", customer: "Vikram Patel", email: "vikram.p@example.com", items: 8, total: 2150, status: "delivered", paymentMethod: "Net Banking", paymentStatus: "paid", deliveryAddress: "88, Koramangala, Bangalore", createdAt: "2026-05-21 10:00", updatedAt: "2026-05-21 10:25" },
  { id: "ORD-004", customer: "Sunita Verma", email: "sunita.v@example.com", items: 2, total: 450, status: "cancelled", paymentMethod: "COD", paymentStatus: "refunded", deliveryAddress: "5, Connaught Place, Delhi", createdAt: "2026-05-20 18:00", updatedAt: "2026-05-20 19:00" },
  { id: "ORD-005", customer: "Deepak Joshi", email: "deepak.j@example.com", items: 12, total: 3800, status: "confirmed", paymentMethod: "UPI", paymentStatus: "paid", deliveryAddress: "22, Baner Road, Pune", createdAt: "2026-05-21 15:00", updatedAt: "2026-05-21 15:05" },
  { id: "ORD-006", customer: "Priya Sharma", email: "priya.s@example.com", items: 4, total: 890, status: "pending", paymentMethod: "COD", paymentStatus: "pending", deliveryAddress: "7, JP Nagar, Bangalore", createdAt: "2026-05-21 16:00", updatedAt: "2026-05-21 16:00" },
  { id: "ORD-007", customer: "Amit Gupta", email: "amit.g@example.com", items: 6, total: 1570, status: "preparing", paymentMethod: "Card", paymentStatus: "paid", deliveryAddress: "12, GK-2, Delhi", createdAt: "2026-05-21 14:45", updatedAt: "2026-05-21 15:00" },
  { id: "ORD-008", customer: "Neha Patel", email: "neha.p@example.com", items: 1, total: 249, status: "returned", paymentMethod: "UPI", paymentStatus: "refunded", deliveryAddress: "33, Banjara Hills, Hyderabad", createdAt: "2026-05-19 09:00", updatedAt: "2026-05-20 11:00" },
];

const statusFlow: OrderStatus[] = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState<Order | null>(null);

  const filtered = mockOrders.filter((o) => {
    const matchesSearch = !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = useMemo(() => ({
    pending: mockOrders.filter(o => o.status === "pending").length,
    confirmed: mockOrders.filter(o => o.status === "confirmed").length,
    preparing: mockOrders.filter(o => o.status === "preparing").length,
    out_for_delivery: mockOrders.filter(o => o.status === "out_for_delivery").length,
    delivered: mockOrders.filter(o => o.status === "delivered").length,
    cancelled: mockOrders.filter(o => o.status === "cancelled").length,
  }), []);

  const kanbanGroups = useMemo(() => {
    const groups: Record<string, Order[]> = { pending: [], confirmed: [], preparing: [], out_for_delivery: [], delivered: [], cancelled: [], returned: [] };
    filtered.forEach((o) => { if (groups[o.status]) groups[o.status].push(o); });
    return groups;
  }, [filtered]);

  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = mockOrders.filter(o => o.status === "pending" || o.status === "confirmed").length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Order Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Track, manage, and fulfill orders. View order timelines, assign delivery partners, and process substitutions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-xl border border-[#e8e8e8] bg-white p-0.5">
                <button onClick={() => setViewMode("table")} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "table" ? "bg-[#0c831f] text-white" : "text-[#666] hover:text-[#1a1a1a]"}`}><List className="h-3.5 w-3.5" />Table</button>
                <button onClick={() => setViewMode("kanban")} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "kanban" ? "bg-[#0c831f] text-white" : "text-[#666] hover:text-[#1a1a1a]"}`}><LayoutDashboard className="h-3.5 w-3.5" />Kanban</button>
              </div>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Orders" value={mockOrders.length} icon={<ShoppingCart className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Pending" value={pendingOrders} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Delivered" value={statusCounts.delivered} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<ShoppingCart className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        {/* Status Quick View */}
        <div className="flex flex-wrap gap-2">
          {(["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                statusFilter === s
                  ? "bg-[#0c831f] text-white"
                  : "border border-[#e8e8e8] bg-white text-[#666] hover:border-[#0c831f]/30"
              }`}
            >
              {s === "cancelled" ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} ({statusCounts[s as keyof typeof statusCounts] || 0})
            </button>
          ))}
          {statusFilter !== "all" && (
            <button onClick={() => setStatusFilter("all")} className="rounded-xl px-3 py-2 text-xs font-bold text-[#999] hover:text-[#666]">Clear</button>
          )}
        </div>

        {/* Search */}
        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer name..." />

        {viewMode === "table" ? (
          <ReusableTable
            data={filtered.slice((page - 1) * pageSize, page * pageSize)}
            keyExtractor={(o) => o.id}
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
            onRowClick={(o) => setShowDetailModal(o)}
            columns={[
              { key: "id", header: "Order ID", width: "110px", render: (o) => <span className="font-bold text-[#0c831f]">{o.id}</span> },
              { key: "customer", header: "Customer", sortable: true, render: (o) => (
                <div><span className="font-bold text-[#1a1a1a]">{o.customer}</span><span className="block text-[10px] text-[#999]">{o.email}</span></div>
              )},
              { key: "items", header: "Items", width: "60px", align: "center" },
              { key: "total", header: "Total", width: "90px", align: "right", sortable: true, render: (o) => <span className="font-bold">₹{o.total}</span> },
              { key: "status", header: "Status", width: "140px", render: (o) => <StatusBadge status={o.status} /> },
              { key: "paymentStatus", header: "Payment", width: "100px", hideOnMobile: true, render: (o) => <StatusBadge status={o.paymentStatus} /> },
              { key: "createdAt", header: "Date", width: "140px", hideOnMobile: true },
            ]}
          />
        ) : (
          /* Kanban Board */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {["pending", "confirmed", "preparing", "out_for_delivery", "delivered"].map((status) => {
              const orders = kanbanGroups[status] || [];
              return (
                <div key={status} className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                  <div className="border-b border-[#e8e8e8] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#1a1a1a]">{status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h3>
                      <span className="rounded-full bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-bold text-[#666]">{orders.length}</span>
                    </div>
                  </div>
                  <div className="space-y-2 p-3 min-h-[200px]">
                    {orders.length === 0 ? (
                      <p className="py-8 text-center text-xs text-[#999]">No orders</p>
                    ) : (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          onClick={() => setShowDetailModal(order)}
                          className="cursor-pointer rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-3 transition-all hover:shadow-sm hover:-translate-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0c831f]">{order.id}</span>
                            <span className="text-[10px] text-[#999]">{order.createdAt.split(" ")[1]}</span>
                          </div>
                          <p className="mt-1 text-sm font-bold text-[#1a1a1a]">{order.customer}</p>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-[#666]">{order.items} items</span>
                            <span className="font-bold text-[#1a1a1a]">₹{order.total}</span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#999]">
                            <span>{order.paymentMethod}</span>
                            {order.status === "out_for_delivery" && <Truck className="h-3 w-3 ml-1 text-[#0c831f]" />}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <ReusableModal open={!!showDetailModal} onClose={() => setShowDetailModal(null)} title={`Order ${showDetailModal?.id}`} subtitle="Order details and timeline" size="lg">
        {showDetailModal && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Customer", value: showDetailModal.customer },
                { label: "Email", value: showDetailModal.email },
                { label: "Items", value: `${showDetailModal.items} items` },
                { label: "Total", value: `₹${showDetailModal.total}` },
                { label: "Status", value: <StatusBadge status={showDetailModal.status} /> },
                { label: "Payment", value: <StatusBadge status={showDetailModal.paymentStatus} /> },
                { label: "Payment Method", value: showDetailModal.paymentMethod },
                { label: "Delivery", value: showDetailModal.deliveryAddress },
              ].map((f) => (
                <div key={f.label} className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{f.label}</p>
                  <div className="mt-1 text-sm font-bold text-[#1a1a1a]">{f.value}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#666]">Order Timeline</p>
              <div className="space-y-0">
                {statusFlow.slice(0, statusFlow.indexOf(showDetailModal.status) + 1).map((s, i) => (
                  <div key={s} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${i === statusFlow.indexOf(showDetailModal.status) ? "bg-[#0c831f] text-white" : "bg-[#e8f5e9] text-[#0c831f]"}`}>
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      {i < statusFlow.indexOf(showDetailModal.status) && <div className="w-0.5 flex-1 bg-[#e8f5e9]" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-bold text-[#1a1a1a]">{s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                      <p className="text-xs text-[#999]">{new Date(showDetailModal.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
              <button className="rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Assign Partner</button>
              <button className="rounded-xl bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]">Update Status</button>
            </div>
          </div>
        )}
      </ReusableModal>
    </DashboardLayout>
  );
}
