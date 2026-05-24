"use client";

import { useState } from "react";
import { 
  CheckCircle, 
  Trash2, 
  Edit, 
  Share2, 
  Printer, 
  Loader, 
  RefreshCw, 
  ClipboardList, 
  MessageCircle, 
  DollarSign, 
  Edit2, 
  MapPin, 
  AlertTriangle,
  Box,
  Truck,
  Eye
} from "lucide-react";
import { toast } from "sonner";

const columns = [
  { id: "new", title: "New", icon: AlertTriangle, count: 0 },
  { id: "confirmed", title: "Confirmed", icon: CheckCircle, count: 0 },
  { id: "picking", title: "Picking", icon: ClipboardList, count: 0 },
  { id: "packing", title: "Packing", icon: Box, count: 0 },
  { id: "ready-for-dispatch", title: "Ready for Dispatch", icon: MapPin, count: 0 },
  { id: "out-for-delivery", title: "Out for Delivery", icon: Truck, count: 0 },
  { id: "delivered", title: "Delivered", icon: CheckCircle, count: 0 },
  { id: "failed", title: "Failed", icon: AlertTriangle, count: 0 },
  { id: "returned", title: "Returned", icon: RefreshCw, count: 0 },
];

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    orderId: "ORD-001",
    customerName: "John Doe",
    items: 2,
    total: 899.00,
    status: "new",
    date: "2026-05-20",
    paymentStatus: "paid",
    priority: "normal",
  },
  {
    id: 2,
    orderId: "ORD-002",
    customerName: "Jane Smith",
    items: 1,
    total: 549.00,
    status: "confirmed",
    date: "2026-05-20",
    paymentStatus: "paid",
    priority: "high",
  },
  {
    id: 3,
    orderId: "ORD-003",
    customerName: "Bob Johnson",
    items: 3,
    total: 1299.00,
    status: "picking",
    date: "2026-05-20",
    paymentStatus: "pending",
    priority: "normal",
  },
  {
    id: 4,
    orderId: "ORD-004",
    customerName: "Alice Brown",
    items: 1,
    total: 349.00,
    status: "packing",
    date: "2026-05-20",
    paymentStatus: "paid",
    priority: "low",
  },
  {
    id: 5,
    orderId: "ORD-005",
    customerName: "Charlie Wilson",
    items: 2,
    total: 799.00,
    status: "ready-for-dispatch",
    date: "2026-05-20",
    paymentStatus: "paid",
    priority: "high",
  },
  {
    id: 6,
    orderId: "ORD-006",
    customerName: "Eva Davis",
    items: 1,
    total: 449.00,
    status: "out-for-delivery",
    date: "2026-05-20",
    paymentStatus: "paid",
    priority: "normal",
  },
  {
    id: 7,
    orderId: "ORD-007",
    customerName: "Frank Miller",
    items: 1,
    total: 649.00,
    status: "delivered",
    date: "2026-05-19",
    paymentStatus: "paid",
    priority: "normal",
  },
  {
    id: 8,
    orderId: "ORD-008",
    customerName: "Grace Lee",
    items: 2,
    total: 1099.00,
    status: "failed",
    date: "2026-05-19",
    paymentStatus: "failed",
    priority: "high",
  },
  {
    id: 9,
    orderId: "ORD-009",
    customerName: "Henry Taylor",
    items: 1,
    total: 299.00,
    status: "returned",
    date: "2026-05-18",
    paymentStatus: "refunded",
    priority: "normal",
  },
];

export default function OrderKanban() {
  const [ordersByStatus, setOrdersByStatus] = useState<Record<string, typeof mockOrders>>(() => {
    const initial: Record<string, typeof mockOrders> = {};
    columns.forEach(col => {
      initial[col.id] = mockOrders.filter(order => order.status === col.id);
    });
    return initial;
  });

  const [dragging, setDragging] = useState<{ orderId: number; status: string } | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);

  const handleDragStart = (orderId: number, status: string) => {
    setDragging({ orderId, status });
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setDragOverStatus(status);
  };

  const handleDragLeave = () => {
    setDragOverStatus(null);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setDragOverStatus(null);
    if (!dragging) return;

    // Update order status
    setOrdersByStatus(prev => {
      // Remove from current status
      const newState = { ...prev };
      newState[dragging.status] = newState[dragging.status].filter(
        order => order.id !== dragging.orderId
      );
      // Add to new status
      const order = mockOrders.find(o => o.id === dragging.orderId);
      if (order) {
        const updatedOrder = { ...order, status };
        // Update in mockOrders (in a real app, this would be an API call)
        const orderIndex = mockOrders.findIndex(o => o.id === dragging.orderId);
        if (orderIndex !== -1) {
          mockOrders[orderIndex] = updatedOrder;
        }
        newState[status] = [...(newState[status] || []), updatedOrder];
      }
      // Update counts in columns (we'll recalculate below)
      return newState;
    });

    setDragging(null);
  };

  // Update column counts based on current orders
  const columnsWithCounts = columns.map(col => ({
    ...col,
    count: ordersByStatus[col.id]?.length || 0,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
            Order Management
          </p>
          <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
            Order Kanban Board
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.success("Orders refreshed")}
            className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => toast("Switched to list view")}
            className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
          >
            <ClipboardList className="w-4 h-4" />
            View List
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {columnsWithCounts.map(column => (
          <div
            key={column.id}
            className={`rounded-2xl border border-[#e8e8e8] bg-white shadow-sm ${
              dragOverStatus === column.id
                ? "border-[#0c831f] bg-[#e8f5e9]"
                : ""
            }`}
            onDragOver={e => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, column.id)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <column.icon className={`w-5 h-5 text-[#0c831f]`} />
                  <h3 className="text-sm font-black text-[#1a1a1a]">{column.title}</h3>
                </div>
                <span className="text-xs font-semibold text-[#666]">{column.count}</span>
              </div>

              {/* Orders in this column */}
              <div className="space-y-3 min-h-[200px]">
                {ordersByStatus[column.id]?.map(order => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-3 cursor-grab"
                    draggable
                    onDragStart={() => handleDragStart(order.id, column.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-[#1a1a1a]">{order.orderId}</p>
                        <p className="text-xs text-[#666]">{order.customerName}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {order.priority === "high" && (
                          <span className="rounded-full px-2 py-0.5 bg-[#ff4f8b] text-white text-[10px]">
                            HIGH
                          </span>
                        )}
                        {order.paymentStatus === "paid" && (
                          <span className="rounded-full px-2 py-0.5 bg-[#0c831f] text-white text-[10px]">
                            Paid
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-4">
                        <div>
                          <p className="font-medium text-[#666]">Items</p>
                          <p className="text-[#1a1a1a]">{order.items}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#666]">Total</p>
                          <p className="text-[#0c831f] font-medium">₹{order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#666]">Date</p>
                          <p className="text-[#1a1a1a]">{order.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#e8e8e8]">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toast("Order " + order.orderId, { description: `Customer: ${order.customerName} | Total: ₹${order.total.toFixed(2)} | Items: ${order.items}` })}
                          className="flex items-center gap-1 rounded border border-[#e8e8e8] bg-white px-2 py-1 text-xs font-medium hover:bg-[#f8f9fa]"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        <button
                          onClick={() => toast.info("Editing order " + order.orderId)}
                          className="flex items-center gap-1 rounded border border-[#e8e8e8] bg-white px-2 py-1 text-xs font-medium hover:bg-[#f8f9fa]"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setOrdersByStatus(prev => {
                              const newState = { ...prev };
                              newState[column.id] = newState[column.id].filter(o => o.id !== order.id);
                              return newState;
                            });
                            toast.success("Order " + order.orderId + " cancelled");
                          }}
                          className="flex items-center gap-1 rounded border border-[#ff4f8b] bg-white px-2 py-1 text-xs font-medium text-[#ff4f8b] hover:bg-[#fff0f6]"
                        >
                          <Trash2 className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {ordersByStatus[column.id]?.length === 0 && (
                  <p className="text-center text-xs text-[#666] pt-8">
                    No orders in this column
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}