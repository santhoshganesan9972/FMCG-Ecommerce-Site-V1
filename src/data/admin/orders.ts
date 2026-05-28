// ── Order Management Mock Data ──────────────────────────
// Swap with real API responses when backend is ready

import type { Order, DeliveryPartner, Substitution, BulkJob } from "@/types/orders";

// ── Delivery Partners ────────────────────────────────────

export const mockDeliveryPartners: DeliveryPartner[] = [
  { id: "DP-001", name: "Rahul Sharma", phone: "+91 98765 43201", vehicleType: "bike", status: "online", currentOrders: 2, totalDeliveries: 1842, rating: 4.9, earnings: 45200, zone: "Mumbai Metro", joinedAt: "2024-03-15" },
  { id: "DP-002", name: "Suresh Reddy", phone: "+91 98765 43202", vehicleType: "scooter", status: "busy", currentOrders: 3, totalDeliveries: 1256, rating: 4.7, earnings: 32800, zone: "Mumbai Metro", joinedAt: "2024-06-01" },
  { id: "DP-003", name: "Amit Kumar", phone: "+91 98765 43203", vehicleType: "bike", status: "online", currentOrders: 1, totalDeliveries: 2105, rating: 4.8, earnings: 51000, zone: "Delhi NCR", joinedAt: "2023-11-20" },
  { id: "DP-004", name: "Manoj Patil", phone: "+91 98765 43205", vehicleType: "bike", status: "online", currentOrders: 0, totalDeliveries: 892, rating: 4.6, earnings: 21400, zone: "Pune City", joinedAt: "2025-01-10" },
  { id: "DP-005", name: "Sneha Kulkarni", phone: "+91 98765 43206", vehicleType: "scooter", status: "online", currentOrders: 1, totalDeliveries: 1567, rating: 4.9, earnings: 38900, zone: "Pune City", joinedAt: "2024-08-05" },
  { id: "DP-006", name: "Rajesh Gupta", phone: "+91 98765 43207", vehicleType: "bike", status: "online", currentOrders: 2, totalDeliveries: 1102, rating: 4.7, earnings: 27600, zone: "Bangalore Central", joinedAt: "2024-04-20" },
  { id: "DP-007", name: "Vikram Singh", phone: "+91 98765 43208", vehicleType: "van", status: "offline", currentOrders: 0, totalDeliveries: 2450, rating: 4.5, earnings: 58900, zone: "Delhi NCR", joinedAt: "2023-09-01" },
  { id: "DP-008", name: "Priya Patel", phone: "+91 98765 43209", vehicleType: "scooter", status: "available", currentOrders: 0, totalDeliveries: 678, rating: 4.8, earnings: 16500, zone: "Bangalore Central", joinedAt: "2025-02-14" },
  { id: "DP-009", name: "Arun Nair", phone: "+91 98765 43210", vehicleType: "bike", status: "busy", currentOrders: 2, totalDeliveries: 1890, rating: 4.6, earnings: 44500, zone: "Mumbai Metro", joinedAt: "2024-01-20" },
  { id: "DP-010", name: "Kavita Reddy", phone: "+91 98765 43211", vehicleType: "cycle", status: "online", currentOrders: 1, totalDeliveries: 345, rating: 4.9, earnings: 8900, zone: "Pune City", joinedAt: "2025-03-01" },
];

// ── Orders ───────────────────────────────────────────────

export const mockOrders: Order[] = [
  {
    id: "ORD-001", customer: "Ravi Kumar", customerId: "CUST-001", email: "ravi.k@example.com", phone: "+91 98765 10001",
    items: [
      { product: "Fresh Red Apples 500g", productId: "PRD-001", quantity: 2, price: 120 },
      { product: "Banana 1kg", productId: "PRD-002", quantity: 1, price: 60 },
      { product: "Greek Yogurt 400g", productId: "PRD-003", quantity: 1, price: 180 },
      { product: "Almond Milk 1L", productId: "PRD-004", quantity: 1, price: 220 },
      { product: "Mixed Nuts 200g", productId: "PRD-005", quantity: 1, price: 250 },
    ],
    total: 1240, status: "preparing", paymentMethod: "UPI", paymentStatus: "paid",
    deliveryPartner: "Rahul Sharma", deliveryAddress: "42, Andheri West, Mumbai", zone: "Mumbai Metro",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 14:30", note: "Order placed via mobile app" },
      { status: "confirmed", timestamp: "2026-05-21 14:32", note: "Payment confirmed - UPI" },
      { status: "out_for_delivery", timestamp: "2026-05-21 14:35", note: "Order confirmed and sent to kitchen" },
    ],
    createdAt: "2026-05-21 14:30", updatedAt: "2026-05-21 14:35",
  },
  {
    id: "ORD-002", customer: "Anita Singh", customerId: "CUST-002", email: "anita.s@example.com", phone: "+91 98765 10002",
    items: [
      { product: "Fresh Milk 1L", productId: "PRD-006", quantity: 2, price: 120 },
      { product: "Brown Bread 400g", productId: "PRD-007", quantity: 1, price: 55 },
      { product: "Free Range Eggs 6pk", productId: "PRD-008", quantity: 1, price: 85 },
    ],
    total: 680, status: "out_for_delivery", paymentMethod: "Card", paymentStatus: "paid",
    deliveryPartner: "Sneha Kulkarni", deliveryAddress: "15, Bandra West, Mumbai", zone: "Mumbai Metro",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 13:00" },
      { status: "confirmed", timestamp: "2026-05-21 13:02", note: "Payment confirmed - Card" },
      { status: "out_for_delivery", timestamp: "2026-05-21 13:10", note: "Order confirmed" },
      { status: "out_for_delivery", timestamp: "2026-05-21 13:25", note: "Order prepared & packed" },
      { status: "out_for_delivery", timestamp: "2026-05-21 13:50", note: "Out for delivery" },
    ],
    createdAt: "2026-05-21 13:00", updatedAt: "2026-05-21 13:50",
  },
  {
    id: "ORD-003", customer: "Vikram Patel", customerId: "CUST-003", email: "vikram.p@example.com", phone: "+91 98765 10003",
    items: [
      { product: "Organic Fruits Mixed 2kg", productId: "PRD-009", quantity: 2, price: 180 },
      { product: "Organic Vegetables Mixed 2kg", productId: "PRD-010", quantity: 3, price: 240 },
      { product: "Cold Pressed Juice 1L", productId: "PRD-011", quantity: 2, price: 160 },
      { product: "Organic Arhar Dal 500g", productId: "PRD-012", quantity: 1, price: 90 },
    ],
    total: 2150, status: "delivered", paymentMethod: "Net Banking", paymentStatus: "paid",
    deliveryPartner: "Rajesh Gupta", deliveryAddress: "88, Koramangala, Bangalore", zone: "Bangalore Central",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 10:00" },
      { status: "confirmed", timestamp: "2026-05-21 10:02", note: "Payment confirmed" },
      { status: "out_for_delivery", timestamp: "2026-05-21 10:10" },
      { status: "out_for_delivery", timestamp: "2026-05-21 10:25", note: "Delivered successfully" },
    ],
    createdAt: "2026-05-21 10:00", updatedAt: "2026-05-21 10:25",
  },
  {
    id: "ORD-004", customer: "Sunita Verma", customerId: "CUST-004", email: "sunita.v@example.com", phone: "+91 98765 10004",
    items: [
      { product: "Cold Brew Coffee 250ml", productId: "PRD-013", quantity: 2, price: 120 },
      { product: "Granola 500g", productId: "PRD-014", quantity: 1, price: 150 },
    ],
    total: 450, status: "cancelled", paymentMethod: "COD", paymentStatus: "refunded",
    deliveryAddress: "5, Connaught Place, Delhi", zone: "Delhi NCR",
    timeline: [
      { status: "pending", timestamp: "2026-05-20 18:00" },
      { status: "cancelled", timestamp: "2026-05-20 19:00", note: "Customer requested cancellation" },
    ],
    createdAt: "2026-05-20 18:00", updatedAt: "2026-05-20 19:00",
  },
  {
    id: "ORD-005", customer: "Deepak Joshi", customerId: "CUST-005", email: "deepak.j@example.com", phone: "+91 98765 10005",
    items: [
      { product: "Fresh Vegetables Mixed 1kg", productId: "PRD-015", quantity: 3, price: 150 },
      { product: "Cooking Oil 1L", productId: "PRD-016", quantity: 2, price: 320 },
      { product: "Spices Combo Pack", productId: "PRD-017", quantity: 2, price: 240 },
      { product: "Salted Butter 100g", productId: "PRD-018", quantity: 1, price: 60 },
    ],
    total: 3800, status: "confirmed", paymentMethod: "UPI", paymentStatus: "paid",
    deliveryPartner: null, deliveryAddress: "22, Baner Road, Pune", zone: "Pune City",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 15:00" },
      { status: "confirmed", timestamp: "2026-05-21 15:05", note: "Payment confirmed - UPI" },
    ],
    createdAt: "2026-05-21 15:00", updatedAt: "2026-05-21 15:05",
  },
  {
    id: "ORD-006", customer: "Priya Sharma", customerId: "CUST-006", email: "priya.s@example.com", phone: "+91 98765 10006",
    items: [
      { product: "Fresh Red Apples 500g", productId: "PRD-001", quantity: 1, price: 120 },
      { product: "Cold Brew Coffee 250ml", productId: "PRD-013", quantity: 1, price: 60 },
      { product: "Organic Honey 500g", productId: "PRD-019", quantity: 1, price: 180 },
      { product: "Free Range Eggs 6pk", productId: "PRD-008", quantity: 1, price: 85 },
    ],
    total: 890, status: "pending", paymentMethod: "COD", paymentStatus: "pending",
    deliveryAddress: "7, JP Nagar, Bangalore", zone: "Bangalore Central",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 16:00", note: "Order placed via website" },
    ],
    createdAt: "2026-05-21 16:00", updatedAt: "2026-05-21 16:00",
  },
  {
    id: "ORD-007", customer: "Amit Gupta", customerId: "CUST-007", email: "amit.g@example.com", phone: "+91 98765 10007",
    items: [
      { product: "Basmati Rice 1kg", productId: "PRD-020", quantity: 2, price: 220 },
      { product: "Toor Dal 1kg", productId: "PRD-021", quantity: 1, price: 180 },
      { product: "Ghee 500ml", productId: "PRD-022", quantity: 1, price: 260 },
      { product: "Natural Honey 500g", productId: "PRD-023", quantity: 1, price: 120 },
      { product: "Mix Pickle 400g", productId: "PRD-024", quantity: 1, price: 95 },
      { product: "Papad 200g", productId: "PRD-025", quantity: 1, price: 45 },
    ],
    total: 1570, status: "preparing", paymentMethod: "Card", paymentStatus: "paid",
    deliveryPartner: "Amit Kumar", deliveryAddress: "12, GK-2, Delhi", zone: "Delhi NCR",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 14:45" },
      { status: "confirmed", timestamp: "2026-05-21 14:48", note: "Payment confirmed - Card" },
      { status: "out_for_delivery", timestamp: "2026-05-21 15:00", note: "Order preparing" },
    ],
    createdAt: "2026-05-21 14:45", updatedAt: "2026-05-21 15:00",
  },
  {
    id: "ORD-008", customer: "Neha Patel", customerId: "CUST-008", email: "neha.p@example.com", phone: "+91 98765 10008",
    items: [
      { product: "Premium Tea 250g", productId: "PRD-026", quantity: 1, price: 249 },
    ],
    total: 249, status: "returned", paymentMethod: "UPI", paymentStatus: "refunded",
    deliveryPartner: "Suresh Reddy", deliveryAddress: "33, Banjara Hills, Hyderabad", zone: "Hyderabad",
    timeline: [
      { status: "pending", timestamp: "2026-05-19 09:00" },
      { status: "confirmed", timestamp: "2026-05-19 09:02" },
      { status: "out_for_delivery", timestamp: "2026-05-19 09:20" },
      { status: "delivered", timestamp: "2026-05-19 09:45" },
      { status: "returned", timestamp: "2026-05-20 11:00", note: "Damaged product - refund processed" },
    ],
    createdAt: "2026-05-19 09:00", updatedAt: "2026-05-20 11:00",
  },
  {
    id: "ORD-009", customer: "Rohit Sharma", customerId: "CUST-009", email: "rohit.s@example.com", phone: "+91 98765 10009",
    items: [
      { product: "Protein Powder 1kg", productId: "PRD-027", quantity: 1, price: 899 },
      { product: "Almond Milk 1L", productId: "PRD-004", quantity: 2, price: 220 },
      { product: "Mixed Nuts 200g", productId: "PRD-005", quantity: 2, price: 250 },
    ],
    total: 1840, status: "confirmed", paymentMethod: "Wallet", paymentStatus: "paid",
    deliveryPartner: null, deliveryAddress: "55, Powai, Mumbai", zone: "Mumbai Metro",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 16:30" },
      { status: "confirmed", timestamp: "2026-05-21 16:32", note: "Payment via Wallet" },
    ],
    createdAt: "2026-05-21 16:30", updatedAt: "2026-05-21 16:32",
  },
  {
    id: "ORD-010", customer: "Meera Jain", customerId: "CUST-010", email: "meera.j@example.com", phone: "+91 98765 10010",
    items: [
      { product: "Fresh Vegetables Mixed 1kg", productId: "PRD-015", quantity: 2, price: 150 },
      { product: "Paneer 250g", productId: "PRD-028", quantity: 1, price: 120 },
      { product: "Fresh Cream 200ml", productId: "PRD-029", quantity: 1, price: 80 },
    ],
    total: 650, status: "pending", paymentMethod: "UPI", paymentStatus: "pending",
    deliveryAddress: "18, Wakad, Pune", zone: "Pune City",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 17:00" },
    ],
    createdAt: "2026-05-21 17:00", updatedAt: "2026-05-21 17:00",
  },
  {
    id: "ORD-011", customer: "Karan Mehta", customerId: "CUST-011", email: "karan.m@example.com", phone: "+91 98765 10011",
    items: [
      { product: "Soft Drinks 12pk", productId: "PRD-030", quantity: 2, price: 180 },
      { product: "Potato Chips 200g", productId: "PRD-031", quantity: 4, price: 40 },
      { product: "Nachos 150g", productId: "PRD-032", quantity: 2, price: 60 },
    ],
    total: 640, status: "delivered", paymentMethod: "UPI", paymentStatus: "paid",
    deliveryPartner: "Rahul Sharma", deliveryAddress: "8, GK-1, Delhi", zone: "Delhi NCR",
    timeline: [
      { status: "pending", timestamp: "2026-05-21 08:00" },
      { status: "confirmed", timestamp: "2026-05-21 08:02" },
      { status: "out_for_delivery", timestamp: "2026-05-21 08:15" },
      { status: "delivered", timestamp: "2026-05-21 08:30" },
    ],
    createdAt: "2026-05-21 08:00", updatedAt: "2026-05-21 08:30",
  },
  {
    id: "ORD-012", customer: "Pooja Desai", customerId: "CUST-012", email: "pooja.d@example.com", phone: "+91 98765 10012",
    items: [
      { product: "Organic Cold Pressed Oil 1L", productId: "PRD-033", quantity: 1, price: 180 },
      { product: "Brown Rice 1kg", productId: "PRD-034", quantity: 2, price: 140 },
      { product: "Moong Dal 500g", productId: "PRD-035", quantity: 1, price: 80 },
    ],
    total: 540, status: "cancelled", paymentMethod: "COD", paymentStatus: "refunded",
    deliveryAddress: "25, Thane West, Mumbai", zone: "Mumbai Metro",
    timeline: [
      { status: "pending", timestamp: "2026-05-20 12:00" },
      { status: "cancelled", timestamp: "2026-05-20 12:30", note: "Out of stock - cancelled by system" },
    ],
    createdAt: "2026-05-20 12:00", updatedAt: "2026-05-20 12:30",
  },
];

// ── Substitutions ─────────────────────────────────────────

export const mockSubstitutions: Substitution[] = [
  { id: "SUB-001", orderId: "ORD-001", original: "Fresh Red Apples 500g", substitute: "Red Delicious Apples 500g", reason: "Out of stock", status: "accepted", amount: 199, customer: "Ravi Kumar", decidedBy: "System", decidedAt: "2026-05-21 14:31", createdAt: "2026-05-21 14:30" },
  { id: "SUB-002", orderId: "ORD-001", original: "Greek Yogurt 400g", substitute: "Greek Yogurt 300g", reason: "Size unavailable", status: "accepted", amount: 99, customer: "Ravi Kumar", decidedBy: "System", decidedAt: "2026-05-21 14:31", createdAt: "2026-05-21 14:30" },
  { id: "SUB-003", orderId: "ORD-005", original: "Salted Butter 100g", substitute: "Unsalted Butter 100g", reason: "Stockout", status: "pending", amount: 59, customer: "Deepak Joshi", createdAt: "2026-05-21 15:01" },
  { id: "SUB-004", orderId: "ORD-006", original: "Cold Brew Coffee 250ml", substitute: "Iced Coffee 250ml", reason: "Discontinued", status: "rejected", amount: 179, customer: "Priya Sharma", decidedBy: "Priya Sharma", decidedAt: "2026-05-21 16:05", createdAt: "2026-05-21 16:01" },
  { id: "SUB-005", orderId: "ORD-007", original: "Natural Honey 500g", substitute: "Organic Honey 500g", reason: "Out of stock", status: "pending", amount: 349, customer: "Amit Gupta", createdAt: "2026-05-21 14:46" },
  { id: "SUB-006", orderId: "ORD-009", original: "Mixed Nuts 200g", substitute: "Premium Mixed Nuts 200g", reason: "Supplier issue", status: "accepted", amount: 299, customer: "Rohit Sharma", decidedBy: "System", decidedAt: "2026-05-21 16:31", createdAt: "2026-05-21 16:30" },
  { id: "SUB-007", orderId: "ORD-012", original: "Organic Cold Pressed Oil 1L", substitute: "Premium Cold Pressed Oil 1L", reason: "Out of stock", status: "pending", amount: 159, customer: "Pooja Desai", createdAt: "2026-05-20 12:00" },
  { id: "SUB-008", orderId: "ORD-003", original: "Organic Fruits Mixed 2kg", substitute: "Seasonal Fruits Mixed 2kg", reason: "Seasonal change", status: "accepted", amount: 199, customer: "Vikram Patel", decidedBy: "Vikram Patel", decidedAt: "2026-05-21 10:05", createdAt: "2026-05-21 10:01" },
];

// ── Bulk Jobs ─────────────────────────────────────────────

export const mockBulkJobs: BulkJob[] = [
  { id: "BULK-001", date: "2026-05-21", type: "Status Update", count: 12, success: 10, failed: 2, status: "completed", processedBy: "Super Admin", details: "Bulk status transition to 'preparing'" },
  { id: "BULK-002", date: "2026-05-20", type: "Assign Partners", count: 8, success: 8, failed: 0, status: "completed", processedBy: "Rohit Sharma", details: "Auto-assigned partners to Mumbai zone orders" },
  { id: "BULK-003", date: "2026-05-19", type: "Bulk Cancel", count: 5, success: 3, failed: 2, status: "partial", processedBy: "Priya Patel", details: "Cancel orders with overdue payments" },
  { id: "BULK-004", date: "2026-05-18", type: "Bulk Status Update", count: 25, success: 25, failed: 0, status: "completed", processedBy: "Super Admin", details: "Bulk update for flash sale orders" },
  { id: "BULK-005", date: "2026-05-21", type: "Bulk Assign", count: 15, success: 13, failed: 2, status: "partial", processedBy: "System", details: "Auto-assignment for high-priority orders" },
  { id: "BULK-006", date: "2026-05-21", type: "Status Update", count: 20, status: "processing", processedBy: "System", details: "Processing bulk status update for pending orders" },
  { id: "BULK-007", date: "2026-05-17", type: "Assign Partners", count: 10, success: 9, failed: 1, status: "completed", processedBy: "Rohit Sharma", details: "Assign partners to Bangalore zone" },
  { id: "BULK-008", date: "2026-05-16", type: "Bulk Cancel", count: 3, success: 3, failed: 0, status: "completed", processedBy: "System", details: "Cancel duplicate orders" },
];
