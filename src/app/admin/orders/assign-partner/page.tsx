"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Truck, UserPlus, Eye, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const orders = [
  { id: "ORD-001", customer: "Ravi Kumar", status: "preparing", items: 5, total: 1240, address: "42, Andheri West, Mumbai", zone: "Mumbai Metro", partner: null },
  { id: "ORD-002", customer: "Anita Singh", status: "confirmed", items: 3, total: 680, address: "15, Bandra West, Mumbai", zone: "Mumbai Metro", partner: null },
  { id: "ORD-003", customer: "Vikram Patel", status: "out_for_delivery", items: 8, total: 2150, address: "88, Koramangala, Bangalore", zone: "Bangalore Central", partner: "Rahul Sharma" },
  { id: "ORD-004", customer: "Deepak Joshi", status: "confirmed", items: 12, total: 3800, address: "22, Baner Road, Pune", zone: "Pune City", partner: null },
  { id: "ORD-005", customer: "Priya Sharma", status: "pending", items: 4, total: 890, address: "7, JP Nagar, Bangalore", zone: "Bangalore Central", partner: null },
];

const partners = [
  { name: "Rahul Sharma", phone: "+91 98765 43201", zone: "Mumbai Metro", status: "online", rating: 4.9 },
  { name: "Suresh Reddy", phone: "+91 98765 43202", zone: "Mumbai Metro", status: "busy", rating: 4.7 },
  { name: "Amit Kumar", phone: "+91 98765 43203", zone: "Delhi NCR", status: "online", rating: 4.8 },
  { name: "Manoj Patil", phone: "+91 98765 43205", zone: "Pune City", status: "online", rating: 4.6 },
  { name: "Sneha Kulkarni", phone: "+91 98765 43206", zone: "Pune City", status: "online", rating: 4.9 },
  { name: "Rajesh Gupta", phone: "+91 98765 43207", zone: "Bangalore Central", status: "online", rating: 4.7 },
];

export default function AssignPartnerPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAssignModal, setShowAssignModal] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter(o => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Assign Delivery Partner</h1>
          <p className="mt-2 text-sm text-[#666]">Assign delivery partners to orders based on zone and availability.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Unassigned" value={orders.filter(o => !o.partner).length} icon={<Truck className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Assigned" value={orders.filter(o => o.partner).length} icon={<UserPlus className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Available Partners" value={partners.filter(p => p.status === "online").length} icon={<Truck className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Delivery Zones" value={new Set(partners.map(p => p.zone)).size} icon={<MapPin className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(o) => o.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "id", header: "Order ID", width: "110px", render: (o) => <span className="font-bold text-[#0c831f]">{o.id}</span> },
            { key: "customer", header: "Customer", sortable: true, render: (o) => <span className="font-bold text-[#1a1a1a]">{o.customer}</span> },
            { key: "zone", header: "Zone", width: "130px" },
            { key: "status", header: "Status", width: "130px", render: (o) => <StatusBadge status={o.status} /> },
            { key: "partner", header: "Partner", width: "130px", render: (o) => o.partner ? <span className="font-bold text-[#0c831f]">{o.partner}</span> : <span className="text-[#999]">—</span> },
            { key: "total", header: "Total", width: "90px", align: "right", render: (o) => <span className="font-bold">₹{o.total}</span> },
          ]}
          actions={[
            { label: "Assign Partner", icon: <UserPlus className="h-3.5 w-3.5" />, onClick: (o) => setShowAssignModal(o) },
          ]}
        />
      </div>

      <ReusableModal open={!!showAssignModal} onClose={() => setShowAssignModal(null)} title={`Assign Partner — ${showAssignModal?.id}`} subtitle={`Delivery zone: ${showAssignModal?.zone}`} size="md">
        {showAssignModal && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#666]">Available partners in <span className="text-[#0c831f]">{showAssignModal.zone}</span>:</p>
            {partners.filter(p => p.zone === showAssignModal.zone || true).map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] p-3 transition-all hover:border-[#0c831f]/30 cursor-pointer" onClick={() => { toast.success(`${p.name} assigned to ${showAssignModal.id}`); setShowAssignModal(null); }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5e9] text-xs font-black text-[#0c831f]">{p.name[0]}</div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{p.name}</p>
                    <div className="flex items-center gap-2 text-xs text-[#999]"><Phone className="h-3 w-3" />{p.phone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={p.status} />
                  <p className="mt-1 text-xs text-[#999]">⭐ {p.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ReusableModal>
    </DashboardLayout>
  );
}
