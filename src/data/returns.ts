// Mock data for Returns & Refunds Management module

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: ReturnItem[];
  totalAmount: number;
  refundAmount: number;
  status: "pending" | "approved" | "rejected" | "pickup_scheduled" | "in_transit" | "completed" | "cancelled";
  returnReason: string;
  returnCategory: "damaged" | "wrong_item" | "missing_item" | "quality_issue" | "expired" | "changed_mind" | "other";
  refundMethod: "source" | "wallet" | "partial";
  pickupAddress: string;
  requestedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  pickupScheduledAt?: string;
  deliveredAt?: string;
  refundedAt?: string;
  notes?: string;
  images?: string[];
}

export interface ReturnItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  refundAmount: number;
  condition: "unopened" | "opened" | "damaged" | "used";
}

export interface ReturnReasonStats {
  reason: string;
  category: string;
  count: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

export interface ReturnAnalytics {
  totalReturns: number;
  pendingReturns: number;
  completedReturns: number;
  rejectedReturns: number;
  avgProcessingTime: string;
  returnRate: number;
  topReasons: ReturnReasonStats[];
  dailyReturns: { date: string; count: number }[];
}

export const mockReturnRequests: ReturnRequest[] = [
  {
    id: "RET001",
    orderId: "ORD-2026-050",
    customerId: "CUST004",
    customerName: "Alice Brown",
    customerEmail: "alice.brown@example.com",
    items: [
      { productId: "PROD001", productName: "Organic Apples (1kg)", quantity: 2, unitPrice: 180, refundAmount: 360, condition: "damaged" }
    ],
    totalAmount: 560.75,
    refundAmount: 360,
    status: "pending",
    returnReason: "Apples received were bruised and damaged",
    returnCategory: "damaged",
    refundMethod: "source",
    pickupAddress: "123, Green Park, New Delhi - 110016",
    requestedAt: "2026-05-21 14:00:00",
  },
  {
    id: "RET002",
    orderId: "ORD-2026-055",
    customerId: "CUST010",
    customerName: "Tom Hardy",
    customerEmail: "tom.hardy@example.com",
    items: [
      { productId: "PROD045", productName: "Basmati Rice (5kg)", quantity: 1, unitPrice: 1200, refundAmount: 1200, condition: "unopened" }
    ],
    totalAmount: 1200,
    refundAmount: 1200,
    status: "approved",
    returnReason: "Received wrong variant - asked for Premium but got Regular",
    returnCategory: "wrong_item",
    refundMethod: "source",
    pickupAddress: "45, MG Road, Bangalore - 560001",
    requestedAt: "2026-05-21 10:30:00",
    approvedAt: "2026-05-21 11:15:00",
    approvedBy: "Admin User",
    pickupScheduledAt: "2026-05-22 10:00:00",
  },
  {
    id: "RET003",
    orderId: "ORD-2026-060",
    customerId: "CUST015",
    customerName: "Lisa Ray",
    customerEmail: "lisa.ray@example.com",
    items: [
      { productId: "PROD089", productName: "Fresh Milk (1L)", quantity: 3, unitPrice: 60, refundAmount: 180, condition: "unopened" },
      { productId: "PROD090", productName: "Paneer (200g)", quantity: 2, unitPrice: 90, refundAmount: 180, condition: "unopened" }
    ],
    totalAmount: 450.25,
    refundAmount: 360,
    status: "pickup_scheduled",
    returnReason: "Milk packets were leaking and paneer was not sealed properly",
    returnCategory: "quality_issue",
    refundMethod: "wallet",
    pickupAddress: "78, Sector 15, Gurgaon - 122001",
    requestedAt: "2026-05-21 09:00:00",
    approvedAt: "2026-05-21 09:45:00",
    approvedBy: "Support Agent",
    pickupScheduledAt: "2026-05-21 16:00:00",
  },
  {
    id: "RET004",
    orderId: "ORD-2026-065",
    customerId: "CUST020",
    customerName: "Raj Kumar",
    customerEmail: "raj.kumar@example.com",
    items: [
      { productId: "PROD123", productName: "Wheat Flour (10kg)", quantity: 1, unitPrice: 890, refundAmount: 890, condition: "unopened" }
    ],
    totalAmount: 890,
    refundAmount: 890,
    status: "rejected",
    returnReason: "Changed mind - ordered by mistake",
    returnCategory: "changed_mind",
    refundMethod: "source",
    pickupAddress: "234, Anna Nagar, Chennai - 600040",
    requestedAt: "2026-05-20 16:00:00",
    approvedAt: "2026-05-20 18:00:00",
    approvedBy: "Admin User",
    notes: "Rejected - Product is non-returnable as per policy (changed mind for groceries)",
  },
  {
    id: "RET005",
    orderId: "ORD-2026-070",
    customerId: "CUST025",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    items: [
      { productId: "PROD156", productName: "Orange Juice (1L)", quantity: 2, unitPrice: 120, refundAmount: 240, condition: "unopened" }
    ],
    totalAmount: 340,
    refundAmount: 240,
    status: "in_transit",
    returnReason: "Juice bottles expired - MRP date shows expiry yesterday",
    returnCategory: "expired",
    refundMethod: "source",
    pickupAddress: "56, Park Street, Kolkata - 700016",
    requestedAt: "2026-05-20 11:00:00",
    approvedAt: "2026-05-20 12:00:00",
    approvedBy: "Support Agent",
    pickupScheduledAt: "2026-05-21 14:00:00",
  },
  {
    id: "RET006",
    orderId: "ORD-2026-075",
    customerId: "CUST030",
    customerName: "Amit Patel",
    customerEmail: "amit.patel@example.com",
    items: [
      { productId: "PROD200", productName: "Mixed Nuts (500g)", quantity: 1, unitPrice: 650, refundAmount: 650, condition: "unopened" },
      { productId: "PROD201", productName: "Honey (500ml)", quantity: 1, unitPrice: 280, refundAmount: 280, condition: "unopened" }
    ],
    totalAmount: 930,
    refundAmount: 930,
    status: "completed",
    returnReason: "Items were missing from the delivery bag",
    returnCategory: "missing_item",
    refundMethod: "source",
    pickupAddress: "89, Satellite Road, Ahmedabad - 380015",
    requestedAt: "2026-05-19 15:00:00",
    approvedAt: "2026-05-19 15:30:00",
    approvedBy: "Admin User",
    refundedAt: "2026-05-20 10:00:00",
  },
  {
    id: "RET007",
    orderId: "ORD-2026-080",
    customerId: "CUST035",
    customerName: "Sneha Reddy",
    customerEmail: "sneha.reddy@example.com",
    items: [
      { productId: "PROD234", productName: "Chocolate Chips (200g)", quantity: 3, unitPrice: 150, refundAmount: 225, condition: "opened" }
    ],
    totalAmount: 450,
    refundAmount: 225,
    status: "pending",
    returnReason: "Only 2 packs in the 3-pack combo",
    returnCategory: "missing_item",
    refundMethod: "partial",
    pickupAddress: "12, Banjara Hills, Hyderabad - 500034",
    requestedAt: "2026-05-21 08:00:00",
  },
  {
    id: "RET008",
    orderId: "ORD-2026-085",
    customerId: "CUST040",
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@example.com",
    items: [
      { productId: "PROD267", productName: "Eggs (Dozen)", quantity: 2, unitPrice: 120, refundAmount: 240, condition: "damaged" }
    ],
    totalAmount: 340,
    refundAmount: 240,
    status: "approved",
    returnReason: "4 eggs were broken in the carton",
    returnCategory: "damaged",
    refundMethod: "wallet",
    pickupAddress: "67, Civil Lines, Jaipur - 302006",
    requestedAt: "2026-05-21 07:00:00",
    approvedAt: "2026-05-21 08:30:00",
    approvedBy: "Support Agent",
    pickupScheduledAt: "2026-05-21 18:00:00",
  },
];

export const mockReturnReasons: ReturnReasonStats[] = [
  { reason: "Damaged Product", category: "damaged", count: 145, percentage: 28.5, trend: "up" },
  { reason: "Wrong Item Delivered", category: "wrong_item", count: 98, percentage: 19.3, trend: "down" },
  { reason: "Missing Items", category: "missing_item", count: 87, percentage: 17.1, trend: "stable" },
  { reason: "Quality Issues", category: "quality_issue", count: 76, percentage: 14.9, trend: "up" },
  { reason: "Expired Products", category: "expired", count: 54, percentage: 10.6, trend: "down" },
  { reason: "Changed Mind", category: "changed_mind", count: 32, percentage: 6.3, trend: "stable" },
  { reason: "Other Reasons", category: "other", count: 17, percentage: 3.3, trend: "stable" },
];

export const mockReturnAnalytics: ReturnAnalytics = {
  totalReturns: 509,
  pendingReturns: 45,
  completedReturns: 412,
  rejectedReturns: 52,
  avgProcessingTime: "18.5 hours",
  returnRate: 2.8,
  topReasons: mockReturnReasons,
  dailyReturns: [
    { date: "2026-05-15", count: 18 },
    { date: "2026-05-16", count: 22 },
    { date: "2026-05-17", count: 15 },
    { date: "2026-05-18", count: 28 },
    { date: "2026-05-19", count: 24 },
    { date: "2026-05-20", count: 31 },
    { date: "2026-05-21", count: 19 },
  ],
};