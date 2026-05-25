// ── Customer Management Mock Data ───────────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Replace mock arrays with API calls when backend is ready.

import type {
  Customer,
  CustomerActivity,
  Segment,
  AnalyticsMetric,
  CohortData,
  SupportTicket,
  TicketMessage,
  FraudAlert,
  SuspiciousActivity,
  ExportRequest,
} from "@/types/customers";

// ── Customer Profiles (15 customers) ─────────────────────

export const mockCustomers: Customer[] = [
  { id: "CUST-001", name: "Ravi Kumar", email: "ravi.k@example.com", phone: "+91 98765 43210", totalOrders: 48, totalSpent: 45600, avgOrderValue: 950, segment: "regular", status: "active", tags: ["frequent", "organic_buyer"], lastOrderDate: "2026-05-21", registeredAt: "2024-01-15", updatedAt: "2026-05-21", city: "Mumbai", state: "Maharashtra", lifetimeValue: "₹45.6K", acquisitionChannel: "Referral", notes: [], addresses: [{ id: "ADDR-001", label: "Home", address: "42, Andheri West, Near Station", city: "Mumbai", state: "Maharashtra", pincode: "400058", isDefault: true }] },
  { id: "CUST-002", name: "Anita Singh", email: "anita.s@example.com", phone: "+91 87654 32109", totalOrders: 24, totalSpent: 28900, avgOrderValue: 1204, segment: "regular", status: "active", tags: ["premium", "dairy_lover"], lastOrderDate: "2026-05-20", registeredAt: "2024-03-10", updatedAt: "2026-05-20", city: "Delhi", state: "Delhi", lifetimeValue: "₹28.9K", acquisitionChannel: "Organic", notes: [], addresses: [{ id: "ADDR-002", label: "Home", address: "55, GK II, Block C", city: "Delhi", state: "Delhi", pincode: "110048", isDefault: true }] },
  { id: "CUST-003", name: "Vikram Patel", email: "vikram.p@example.com", phone: "+91 76543 21098", totalOrders: 156, totalSpent: 125000, avgOrderValue: 801, segment: "vip", status: "active", tags: ["vip", "wholesale", "early_adopter"], lastOrderDate: "2026-05-21", registeredAt: "2023-11-01", updatedAt: "2026-05-21", city: "Bangalore", state: "Karnataka", lifetimeValue: "₹1.25L", acquisitionChannel: "Referral", notes: [], addresses: [{ id: "ADDR-003", label: "Office", address: "88, Electronic City Phase 1", city: "Bangalore", state: "Karnataka", pincode: "560100", isDefault: true }] },
  { id: "CUST-004", name: "Sunita Verma", email: "sunita.v@example.com", phone: "+91 65432 10987", totalOrders: 2, totalSpent: 4500, avgOrderValue: 2250, segment: "new", status: "active", tags: ["new"], lastOrderDate: "2026-05-20", registeredAt: "2026-05-15", updatedAt: "2026-05-20", city: "Pune", state: "Maharashtra", lifetimeValue: "₹4.5K", acquisitionChannel: "Paid Ads", notes: [], addresses: [{ id: "ADDR-004", label: "Home", address: "12, Baner Road", city: "Pune", state: "Maharashtra", pincode: "411045", isDefault: true }] },
  { id: "CUST-005", name: "Deepak Joshi", email: "deepak.j@example.com", phone: "+91 54321 09876", totalOrders: 8, totalSpent: 12400, avgOrderValue: 1550, segment: "at_risk", status: "inactive", tags: ["at_risk"], lastOrderDate: "2026-04-15", registeredAt: "2024-06-01", updatedAt: "2026-05-01", city: "Hyderabad", state: "Telangana", lifetimeValue: "₹12.4K", acquisitionChannel: "Email Campaign", notes: [], addresses: [{ id: "ADDR-005", label: "Home", address: "22, Jubilee Hills", city: "Hyderabad", state: "Telangana", pincode: "500033", isDefault: true }] },
  { id: "CUST-006", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 43210 98765", totalOrders: 92, totalSpent: 78500, avgOrderValue: 853, segment: "vip", status: "active", tags: ["vip", "organic_buyer", "subscription"], lastOrderDate: "2026-05-21", registeredAt: "2024-02-01", updatedAt: "2026-05-21", city: "Mumbai", state: "Maharashtra", lifetimeValue: "₹78.5K", acquisitionChannel: "Referral", notes: [], addresses: [{ id: "ADDR-006", label: "Home", address: "7, Bandra West, Hill Road", city: "Mumbai", state: "Maharashtra", pincode: "400050", isDefault: true }] },
  { id: "CUST-007", name: "Amit Gupta", email: "amit.g@example.com", phone: "+91 32109 87654", totalOrders: 15, totalSpent: 18200, avgOrderValue: 1213, segment: "regular", status: "active", tags: ["regular"], lastOrderDate: "2026-05-18", registeredAt: "2024-08-15", updatedAt: "2026-05-18", city: "Delhi", state: "Delhi", lifetimeValue: "₹18.2K", acquisitionChannel: "Social Media", notes: [], addresses: [{ id: "ADDR-007", label: "Home", address: "34, Rohini, Sector 7", city: "Delhi", state: "Delhi", pincode: "110085", isDefault: true }] },
  { id: "CUST-008", name: "Neha Patel", email: "neha.p@example.com", phone: "+91 21098 76543", totalOrders: 1, totalSpent: 1240, avgOrderValue: 1240, segment: "new", status: "active", tags: ["new"], lastOrderDate: "2026-05-22", registeredAt: "2026-05-22", updatedAt: "2026-05-22", city: "Ahmedabad", state: "Gujarat", lifetimeValue: "₹1.2K", acquisitionChannel: "Paid Ads", notes: [], addresses: [{ id: "ADDR-008", label: "Home", address: "8, Satellite Road", city: "Ahmedabad", state: "Gujarat", pincode: "380015", isDefault: true }] },
  { id: "CUST-009", name: "Rohit Mehta", email: "rohit.m@example.com", phone: "+91 99887 76655", totalOrders: 34, totalSpent: 41200, avgOrderValue: 1212, segment: "regular", status: "active", tags: ["regular", "snacks_lover"], lastOrderDate: "2026-05-19", registeredAt: "2024-04-20", updatedAt: "2026-05-19", city: "Chennai", state: "Tamil Nadu", lifetimeValue: "₹41.2K", acquisitionChannel: "Organic", notes: [], addresses: [{ id: "ADDR-009", label: "Home", address: "15, T Nagar", city: "Chennai", state: "Tamil Nadu", pincode: "600017", isDefault: true }] },
  { id: "CUST-010", name: "Kavita Reddy", email: "kavita.r@example.com", phone: "+91 88776 65544", totalOrders: 67, totalSpent: 58900, avgOrderValue: 879, segment: "premium", status: "active", tags: ["premium", "frequent"], lastOrderDate: "2026-05-21", registeredAt: "2024-05-12", updatedAt: "2026-05-21", city: "Bangalore", state: "Karnataka", lifetimeValue: "₹58.9K", acquisitionChannel: "Referral", notes: [], addresses: [{ id: "ADDR-010", label: "Home", address: "5, Koramangala, 4th Block", city: "Bangalore", state: "Karnataka", pincode: "560034", isDefault: true }] },
  { id: "CUST-011", name: "Suresh Nair", email: "suresh.n@example.com", phone: "+91 77665 54433", totalOrders: 0, totalSpent: 0, avgOrderValue: 0, segment: "new", status: "active", tags: ["new", "no_purchase"], lastOrderDate: undefined, registeredAt: "2026-05-20", updatedAt: "2026-05-20", city: "Kochi", state: "Kerala", lifetimeValue: "₹0", acquisitionChannel: "Social Media", notes: [], addresses: [{ id: "ADDR-011", label: "Home", address: "28, MG Road", city: "Kochi", state: "Kerala", pincode: "682016", isDefault: true }] },
  { id: "CUST-012", name: "Meera Jain", email: "meera.j@example.com", phone: "+91 66554 43322", totalOrders: 5, totalSpent: 8900, avgOrderValue: 1780, segment: "at_risk", status: "inactive", tags: ["at_risk"], lastOrderDate: "2026-03-28", registeredAt: "2024-09-05", updatedAt: "2026-04-01", city: "Jaipur", state: "Rajasthan", lifetimeValue: "₹8.9K", acquisitionChannel: "Email Campaign", notes: [], addresses: [{ id: "ADDR-012", label: "Home", address: "12, MI Road", city: "Jaipur", state: "Rajasthan", pincode: "302001", isDefault: true }] },
  { id: "CUST-013", name: "Arun Kumar", email: "arun.k@example.com", phone: "+91 55443 32211", totalOrders: 210, totalSpent: 198000, avgOrderValue: 943, segment: "vip", status: "active", tags: ["vip", "wholesale", "subscription"], lastOrderDate: "2026-05-22", registeredAt: "2023-08-01", updatedAt: "2026-05-22", city: "Mumbai", state: "Maharashtra", lifetimeValue: "₹1.98L", acquisitionChannel: "Referral", notes: [], addresses: [{ id: "ADDR-013", label: "Office", address: "100, BKC, Bandra East", city: "Mumbai", state: "Maharashtra", pincode: "400051", isDefault: true }] },
  { id: "CUST-014", name: "Pooja Reddy", email: "pooja.r@example.com", phone: "+91 44332 21100", totalOrders: 18, totalSpent: 22100, avgOrderValue: 1228, segment: "regular", status: "active", tags: ["regular"], lastOrderDate: "2026-05-17", registeredAt: "2024-10-10", updatedAt: "2026-05-17", city: "Hyderabad", state: "Telangana", lifetimeValue: "₹22.1K", acquisitionChannel: "Organic", notes: [], addresses: [{ id: "ADDR-014", label: "Home", address: "45, Gachibowli", city: "Hyderabad", state: "Telangana", pincode: "500032", isDefault: true }] },
  { id: "CUST-015", name: "Divya Singh", email: "divya.s@example.com", phone: "+91 33221 10099", totalOrders: 3, totalSpent: 5600, avgOrderValue: 1867, segment: "new", status: "active", tags: ["new"], lastOrderDate: "2026-05-15", registeredAt: "2026-05-10", updatedAt: "2026-05-15", city: "Lucknow", state: "Uttar Pradesh", lifetimeValue: "₹5.6K", acquisitionChannel: "Paid Ads", notes: [], addresses: [{ id: "ADDR-015", label: "Home", address: "9, Gomti Nagar", city: "Lucknow", state: "Uttar Pradesh", pincode: "226010", isDefault: true }] },
];

// ── Customer Activities / Timeline ───────────────────────

export const mockCustomerActivities: CustomerActivity[] = [
  { id: "ACT-001", customerId: "CUST-003", action: "order_placed", description: "Order ORD-012 placed — ₹3,240", timestamp: "2026-05-21 14:30" },
  { id: "ACT-002", customerId: "CUST-006", action: "login", description: "Logged in from Mumbai, IN", performedBy: "System", timestamp: "2026-05-21 12:00" },
  { id: "ACT-003", customerId: "CUST-001", action: "segment_changed", description: "Segment changed to VIP", performedBy: "Admin User", timestamp: "2026-05-21 10:00" },
  { id: "ACT-004", customerId: "CUST-013", action: "order_placed", description: "Order ORD-015 placed — ₹5,800", timestamp: "2026-05-21 09:15" },
  { id: "ACT-005", customerId: "CUST-005", action: "note_added", description: "Note: Risk assessment pending", performedBy: "Support Agent", timestamp: "2026-05-20 16:00" },
  { id: "ACT-006", customerId: "CUST-010", action: "order_placed", description: "Order ORD-014 placed — ₹1,890", timestamp: "2026-05-20 14:00" },
  { id: "ACT-007", customerId: "CUST-008", action: "created", description: "Account registered via Paid Ads", timestamp: "2026-05-22 08:00" },
  { id: "ACT-008", customerId: "CUST-002", action: "blocked", description: "Account blocked due to suspicious activity", performedBy: "Admin User", timestamp: "2026-05-20 11:00" },
  { id: "ACT-009", customerId: "CUST-002", action: "updated", description: "Account reinstated after review", performedBy: "Super Admin", timestamp: "2026-05-20 15:00" },
  { id: "ACT-010", customerId: "CUST-012", action: "note_added", description: "Note: Sent re-engagement email", performedBy: "Marketing", timestamp: "2026-05-19 10:00" },
];

// ── Segments ─────────────────────────────────────────────

export const mockSegments: Segment[] = [
  { id: "SEG-001", name: "VIP Customers", description: "High-value customers with >50 orders & >₹50K spent", color: "#9333ea", icon: "Star", customerCount: 3, avgOrderValue: 865, totalRevenue: 401500, avgLifetimeValue: "₹1.34L", retentionRate: 94, criteria: { minOrders: 50, minSpent: 50000 } },
  { id: "SEG-002", name: "Premium Buyers", description: "Regular high-spenders with 30-50 orders", color: "#2563eb", icon: "Award", customerCount: 1, avgOrderValue: 879, totalRevenue: 58900, avgLifetimeValue: "₹58.9K", retentionRate: 88, criteria: { minOrders: 30, minSpent: 25000 } },
  { id: "SEG-003", name: "Regular Buyers", description: "Consistent monthly purchasers", color: "#0c831f", icon: "Users", customerCount: 4, avgOrderValue: 1145, totalRevenue: 131900, avgLifetimeValue: "₹33.0K", retentionRate: 76, criteria: { minOrders: 10, minSpent: 10000 } },
  { id: "SEG-004", name: "New Users", description: "Registered within last 30 days", color: "#d97706", icon: "Zap", customerCount: 5, avgOrderValue: 1716, totalRevenue: 11340, avgLifetimeValue: "₹2.3K", retentionRate: 45, criteria: { maxInactiveDays: 30 } },
  { id: "SEG-005", name: "At Risk", description: "No purchase in last 30-60 days", color: "#dc2626", icon: "AlertTriangle", customerCount: 2, avgOrderValue: 1665, totalRevenue: 21300, avgLifetimeValue: "₹10.7K", retentionRate: 32, criteria: { minOrders: 1, maxInactiveDays: 60 } },
  { id: "SEG-006", name: "Churned", description: "Inactive >90 days, likely lost", color: "#6b7280", icon: "TrendingDown", customerCount: 0, avgOrderValue: 0, totalRevenue: 0, avgLifetimeValue: "₹0", retentionRate: 0, criteria: { maxInactiveDays: 90 } },
];

// ── Analytics Metrics ────────────────────────────────────

export const mockAnalyticsMetrics: AnalyticsMetric[] = [
  { id: "MET-001", label: "Customer Lifetime Value", value: "₹12,450", change: "+15.3%", trend: "up", icon: "DollarSign", category: "value" },
  { id: "MET-002", label: "Avg Orders Per Customer", value: "18.2", change: "+8.7%", trend: "up", icon: "ShoppingCart", category: "behavior" },
  { id: "MET-003", label: "Repeat Purchase Rate", value: "62.4%", change: "+5.2%", trend: "up", icon: "RefreshCw", category: "retention" },
  { id: "MET-004", label: "Avg Acquisition Cost", value: "₹185", change: "-8.2%", trend: "down", icon: "DollarSign", category: "cost" },
  { id: "MET-005", label: "Customer Churn Rate", value: "8.3%", change: "-1.2%", trend: "down", icon: "TrendingDown", category: "retention" },
  { id: "MET-006", label: "NPS Score", value: "72", change: "+5", trend: "up", icon: "ThumbsUp", category: "satisfaction" },
  { id: "MET-007", label: "Avg Days Between Orders", value: "14", change: "-2 days", trend: "down", icon: "Clock", category: "behavior" },
  { id: "MET-008", label: "New Customers (MTD)", value: "890", change: "+22.1%", trend: "up", icon: "UserPlus", category: "acquisition" },
  { id: "MET-009", label: "Customer Retention Rate", value: "78.5%", change: "+4.2%", trend: "up", icon: "Heart", category: "retention" },
  { id: "MET-010", label: "Avg Revenue Per User", value: "₹3,420", change: "+11.8%", trend: "up", icon: "TrendingUp", category: "value" },
];

export const mockCohortData: CohortData[] = [
  { month: "Jan 2026", acquired: 620, retentionRates: [100, 65, 48, 38, 32, 28] },
  { month: "Feb 2026", acquired: 580, retentionRates: [100, 68, 52, 41, 35, 30] },
  { month: "Mar 2026", acquired: 650, retentionRates: [100, 70, 55, 44, 37] },
  { month: "Apr 2026", acquired: 720, retentionRates: [100, 72, 58, 48] },
  { month: "May 2026", acquired: 890, retentionRates: [100, 74, 60] },
];

export const mockAcquisitionChannels = [
  { channel: "Referral", count: 3, percentage: 20, revenue: 269100 },
  { channel: "Organic", count: 4, percentage: 26.7, revenue: 110600 },
  { channel: "Paid Ads", count: 4, percentage: 26.7, revenue: 26340 },
  { channel: "Social Media", count: 2, percentage: 13.3, revenue: 22100 },
  { channel: "Email Campaign", count: 2, percentage: 13.3, revenue: 21300 },
];

// ── Support Tickets ──────────────────────────────────────

const ticketMessages: Record<string, TicketMessage[]> = {
  "TKT-001": [
    { id: "MSG-001", sender: "Ravi Kumar", senderRole: "customer", content: "My order ORD-001 says delivered but I haven't received it. Please help!", attachments: [], createdAt: "2026-05-21 14:30" },
    { id: "MSG-002", sender: "Neha Singh", senderRole: "agent", content: "I'm looking into this. Let me check with the delivery partner.", attachments: [], createdAt: "2026-05-21 14:45" },
    { id: "MSG-003", sender: "Neha Singh", senderRole: "agent", content: "The delivery partner marked it delivered by mistake. I've requested a re-delivery for tomorrow.", attachments: [], createdAt: "2026-05-21 15:00" },
  ],
  "TKT-002": [
    { id: "MSG-004", sender: "Anita Singh", senderRole: "customer", content: "I ordered wheat flour but received rice flour instead.", attachments: [], createdAt: "2026-05-21 10:00" },
    { id: "MSG-005", sender: "Neha Singh", senderRole: "agent", content: "I apologize for the mix-up. I'll process a replacement immediately.", attachments: [], createdAt: "2026-05-21 10:30" },
  ],
};

export const mockSupportTickets: SupportTicket[] = [
  { id: "TKT-001", customerId: "CUST-001", customer: "Ravi Kumar", email: "ravi.k@example.com", subject: "Order not delivered", description: "Order marked as delivered but not received", priority: "high", status: "in_progress", category: "delivery", assignedTo: "Neha Singh", messages: ticketMessages["TKT-001"], createdAt: "2026-05-21 14:30", updatedAt: "2026-05-21 15:00", resolvedAt: null },
  { id: "TKT-002", customerId: "CUST-002", customer: "Anita Singh", email: "anita.s@example.com", subject: "Wrong item received", description: "Received rice flour instead of wheat flour", priority: "medium", status: "in_progress", category: "order_issue", assignedTo: "Neha Singh", messages: ticketMessages["TKT-002"], createdAt: "2026-05-21 10:00", updatedAt: "2026-05-21 10:30", resolvedAt: null },
  { id: "TKT-003", customerId: "CUST-005", customer: "Deepak Joshi", email: "deepak.j@example.com", subject: "Refund not processed", description: "Return was accepted 5 days ago but refund not received", priority: "high", status: "open", category: "refund", assignedTo: null, messages: [], createdAt: "2026-05-20 18:30", updatedAt: "2026-05-20 18:30", resolvedAt: null },
  { id: "TKT-004", customerId: "CUST-006", customer: "Priya Sharma", email: "priya.s@example.com", subject: "Delivery partner rude", description: "Delivery partner was rude and did not follow instructions", priority: "low", status: "resolved", category: "delivery", assignedTo: "Support Team", messages: [], createdAt: "2026-05-19 09:00", updatedAt: "2026-05-20 14:00", resolvedAt: "2026-05-20 14:00" },
  { id: "TKT-005", customerId: "CUST-007", customer: "Amit Gupta", email: "amit.g@example.com", subject: "Subscription cancellation", description: "Requesting cancellation of weekly milk subscription", priority: "medium", status: "in_progress", category: "subscription", assignedTo: "Neha Singh", messages: [], createdAt: "2026-05-18 16:45", updatedAt: "2026-05-19 10:00", resolvedAt: null },
  { id: "TKT-006", customerId: "CUST-003", customer: "Vikram Patel", email: "vikram.p@example.com", subject: "Bulk order discount not applied", description: "Ordered 20kg rice but bulk discount not applied", priority: "medium", status: "open", category: "billing", assignedTo: null, messages: [], createdAt: "2026-05-22 08:00", updatedAt: "2026-05-22 08:00", resolvedAt: null },
  { id: "TKT-007", customerId: "CUST-010", customer: "Kavita Reddy", email: "kavita.r@example.com", subject: "Payment failed but amount deducted", description: "UPI payment failed but amount was debited", priority: "urgent", status: "open", category: "payment", assignedTo: null, messages: [], createdAt: "2026-05-22 07:30", updatedAt: "2026-05-22 07:30", resolvedAt: null },
  { id: "TKT-008", customerId: "CUST-013", customer: "Arun Kumar", email: "arun.k@example.com", subject: "Invoice required for GST", description: "Need GST invoice for last 3 months orders", priority: "low", status: "resolved", category: "billing", assignedTo: "Billing Team", messages: [], createdAt: "2026-05-17 11:00", updatedAt: "2026-05-18 16:00", resolvedAt: "2026-05-18 16:00" },
];

// ── Fraud Detection ──────────────────────────────────────

export const mockFraudAlerts: FraudAlert[] = [
  { id: "FRD-001", customerId: "CUST-F01", customerName: "Mark Davis", email: "mark.davis@example.com", riskScore: 85, riskLevel: "high", reason: "Multiple failed payment attempts from different cards", status: "blocked", ipAddress: "103.45.67.89", device: "Chrome / Windows", lastFlagged: "2026-05-21 16:30", totalFlags: 7, actionTaken: "Account auto-blocked", flaggedBy: "System", resolvedAt: null },
  { id: "FRD-002", customerId: "CUST-F02", customerName: "Sarah Connor", email: "sarah.c@example.com", riskScore: 92, riskLevel: "critical", reason: "Suspicious bulk ordering pattern with stolen cards", status: "flagged", ipAddress: "203.xx.xx.12", device: "Safari / macOS", lastFlagged: "2026-05-21 15:00", totalFlags: 12, actionTaken: "Pending manual review", flaggedBy: "AI Engine", resolvedAt: null },
  { id: "FRD-003", customerId: "CUST-F03", customerName: "Mike Ross", email: "mike.ross@example.com", riskScore: 45, riskLevel: "medium", reason: "Shipping address mismatch with billing address", status: "monitoring", ipAddress: "45.23.12.78", device: "Firefox / Windows", lastFlagged: "2026-05-20 10:00", totalFlags: 3, actionTaken: "Under observation", flaggedBy: "System", resolvedAt: null },
  { id: "FRD-004", customerId: "CUST-F04", customerName: "Emily Clark", email: "emily.c@example.com", riskScore: 15, riskLevel: "low", reason: "Single failed OTP attempt", status: "cleared", ipAddress: "182.56.34.12", device: "Chrome / Android", lastFlagged: "2026-05-19 09:00", totalFlags: 1, actionTaken: "Cleared - legitimate user", flaggedBy: "System", resolvedAt: "2026-05-19 12:00" },
  { id: "FRD-005", customerId: "CUST-F05", customerName: "Tom Hardy", email: "tom.hardy@example.com", riskScore: 78, riskLevel: "high", reason: "Multiple accounts registered with same phone number", status: "investigating", ipAddress: "34.56.78.90", device: "Mobile / Android", lastFlagged: "2026-05-21 14:00", totalFlags: 5, actionTaken: "Investigation in progress", flaggedBy: "AI Engine", resolvedAt: null },
  { id: "FRD-006", customerId: "CUST-F06", customerName: "Alex Turner", email: "alex.t@example.com", riskScore: 55, riskLevel: "medium", reason: "Login from unusual location (Nigeria)", status: "flagged", ipAddress: "67.89.01.23", device: "Mobile / Android", lastFlagged: "2026-05-21 12:00", totalFlags: 2, actionTaken: "Password reset required", flaggedBy: "System", resolvedAt: null },
  { id: "FRD-007", customerId: "CUST-F07", customerName: "Lisa Wong", email: "lisa.w@example.com", riskScore: 72, riskLevel: "high", reason: "Rapid-fire coupon usage across 12 accounts", status: "investigating", ipAddress: "89.01.23.45", device: "Chrome / Android", lastFlagged: "2026-05-20 18:00", totalFlags: 4, actionTaken: "Coupons revoked", flaggedBy: "AI Engine", resolvedAt: null },
];

export const mockSuspiciousActivities: SuspiciousActivity[] = [
  { id: "SA-001", customerId: "CUST-F01", customerName: "Mark Davis", activity: "Bulk order cancellation after delivery", severity: "high", timestamp: "2026-05-21 16:30", ipAddress: "103.xx.xx.45", device: "Chrome / Windows", details: "Customer ordered 15 items worth ₹4,200 and cancelled all within 5 min of delivery", status: "new" },
  { id: "SA-002", customerId: "CUST-F02", customerName: "Sarah Connor", activity: "Multiple failed transactions with different cards", severity: "high", timestamp: "2026-05-21 15:00", ipAddress: "203.xx.xx.12", device: "Safari / macOS", details: "Attempted 8 payments with 4 different credit cards in 10 minutes", status: "new" },
  { id: "SA-003", customerId: "CUST-F06", customerName: "Alex Turner", activity: "Login from unusual location", severity: "medium", timestamp: "2026-05-21 12:00", ipAddress: "45.xx.xx.78", device: "Mobile / Android", details: "Account accessed from IP in Nigeria — user is based in Mumbai", status: "new" },
  { id: "SA-004", customerId: "CUST-F07", customerName: "Lisa Wong", activity: "Rapid-fire coupon usage", severity: "medium", timestamp: "2026-05-20 18:00", ipAddress: "182.xx.xx.34", device: "Chrome / Android", details: "Used 12 different new-user coupons on 12 accounts in 30 mins", status: "investigating" },
  { id: "SA-005", customerId: "CUST-F08", customerName: "Raj Mehta", activity: "Changed delivery address after payment", severity: "low", timestamp: "2026-05-20 14:00", ipAddress: "120.xx.xx.56", device: "Firefox / Windows", details: "Changed delivery address to different city post-payment", status: "resolved" },
];

// ── Data Export Requests ─────────────────────────────────

export const mockExportRequests: ExportRequest[] = [
  { id: "EXP-001", customerId: "CUST-001", customerName: "Ravi Kumar", type: "csv", scope: "all", status: "completed", fileUrl: "/exports/cust-001-all.csv", requestedBy: "Ravi Kumar", requestedAt: "2026-05-20 10:00", completedAt: "2026-05-20 10:05" },
  { id: "EXP-002", customerId: "CUST-003", customerName: "Vikram Patel", type: "pdf", scope: "orders", status: "completed", fileUrl: "/exports/cust-003-orders.pdf", requestedBy: "Vikram Patel", requestedAt: "2026-05-19 14:00", completedAt: "2026-05-19 14:03" },
  { id: "EXP-003", customerId: "CUST-006", customerName: "Priya Sharma", type: "xlsx", scope: "all", status: "processing", fileUrl: null, requestedBy: "Priya Sharma", requestedAt: "2026-05-22 09:00", completedAt: null },
  { id: "EXP-004", customerId: "CUST-010", customerName: "Kavita Reddy", type: "csv", scope: "transactions", status: "pending", fileUrl: null, requestedBy: "Kavita Reddy", requestedAt: "2026-05-22 08:30", completedAt: null },
  { id: "EXP-005", customerId: "CUST-013", customerName: "Arun Kumar", type: "pdf", scope: "invoices", status: "failed", fileUrl: null, requestedBy: "System (GDPR)", requestedAt: "2026-05-18 12:00", completedAt: null },
];
