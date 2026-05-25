// ── Executive Dashboard Mock Data ────────────────────────
// Designed to mirror the exact shape of DashboardOverview from types/dashboard.ts.
// Swapping in real API data requires only replacing the service layer — no UI changes.

import type {
  DashboardOverview,
  RevenueKpi,
  OrdersKpi,
  CustomersKpi,
  LiveOrder,
  StockAlert,
  VendorPayment,
  TopProduct,
  AcquisitionMetric,
} from "@/types/dashboard";

// ── 1. Revenue KPI ───────────────────────────────────────

export const mockRevenue: RevenueKpi = {
  total: 12_456_890,
  formatted: "₹1.24Cr",
  growth: 12.5,
  currency: "INR",
  period: "MTD",
  chart: [
    { label: "Jan", value: 850000 },
    { label: "Feb", value: 920000 },
    { label: "Mar", value: 1050000 },
    { label: "Apr", value: 1150000 },
    { label: "May", value: 1280000 },
    { label: "Jun", value: 1420000 },
    { label: "Jul", value: 1560000 },
    { label: "Aug", value: 1480000 },
    { label: "Sep", value: 1650000 },
    { label: "Oct", value: 1720000 },
    { label: "Nov", value: 1580000 },
    { label: "Dec", value: 1890000 },
  ],
};

// ── 2. Orders KPI ────────────────────────────────────────

export const mockOrders: OrdersKpi = {
  total: 245_678,
  growth: 8.3,
  pending: 345,
  processing: 1_892,
  delivered: 184_250,
  cancelled: 5_048,
  period: "MTD",
  chart: [
    { label: "Mon", value: 420 },
    { label: "Tue", value: 380 },
    { label: "Wed", value: 510 },
    { label: "Thu", value: 490 },
    { label: "Fri", value: 580 },
    { label: "Sat", value: 620 },
    { label: "Sun", value: 450 },
  ],
};

// ── 3. Customers KPI ─────────────────────────────────────

export const mockCustomers: CustomersKpi = {
  total: 38_452,
  growth: 15.3,
  active: 12_450,
  newThisWeek: 1_234,
  churnRate: 3.2,
  lifetimeValue: 2847,
  acquisition: [
    { source: "Organic Search", count: 12300, percentage: 32, trend: "+12%", color: "#0c831f" },
    { source: "Social Media", count: 8900, percentage: 23, trend: "+28%", color: "#2563eb" },
    { source: "Referrals", count: 7200, percentage: 19, trend: "+45%", color: "#ff4f8b" },
    { source: "Paid Ads", count: 5400, percentage: 14, trend: "+8%", color: "#9333ea" },
    { source: "Email Campaigns", count: 3100, percentage: 8, trend: "+5%", color: "#d97706" },
    { source: "Direct", count: 1552, percentage: 4, trend: "+2%", color: "#666" },
  ],
};

// ── 4. Live Orders ───────────────────────────────────────

export const mockLiveOrders: LiveOrder[] = [
  { id: "ORD-001", customer: "Ravi Kumar", items: 5, total: 1240, status: "preparing", time: "5 min ago", area: "Andheri West", estimatedDelivery: "10:25 AM" },
  { id: "ORD-002", customer: "Anita Singh", items: 3, total: 680, status: "out_for_delivery", time: "12 min ago", area: "Bandra West", assignedPartner: "Rahul S.", estimatedDelivery: "10:18 AM" },
  { id: "ORD-003", customer: "Vikram Patel", items: 8, total: 2150, status: "confirmed", time: "18 min ago", area: "Koramangala", estimatedDelivery: "10:35 AM" },
  { id: "ORD-004", customer: "Priya Sharma", items: 2, total: 450, status: "preparing", time: "22 min ago", area: "Indiranagar", estimatedDelivery: "10:30 AM" },
  { id: "ORD-005", customer: "Deepak Joshi", items: 12, total: 3800, status: "confirmed", time: "28 min ago", area: "Baner Road", estimatedDelivery: "10:45 AM" },
  { id: "ORD-006", customer: "Neha Gupta", items: 4, total: 920, status: "out_for_delivery", time: "8 min ago", area: "HSR Layout", assignedPartner: "Suresh R.", estimatedDelivery: "10:22 AM" },
  { id: "ORD-007", customer: "Arjun Mehta", items: 6, total: 1560, status: "preparing", time: "15 min ago", area: "Powai", estimatedDelivery: "10:32 AM" },
  { id: "ORD-008", customer: "Kavita Reddy", items: 1, total: 299, status: "delivered", time: "35 min ago", area: "Gachibowli" },
];

// ── 5. Low Stock Alerts ──────────────────────────────────

export const mockStockAlerts: StockAlert[] = [
  { id: "PRD-003", name: "Natural Honey 500g", sku: "HEALTH-HNY-001", stock: 0, threshold: 20, warehouse: "Delhi Central", category: "Health", status: "critical", lastRestocked: "2026-04-28" },
  { id: "PRD-007", name: "Salted Butter 100g", sku: "DAIRY-BUT-001", stock: 5, threshold: 15, warehouse: "Mumbai Hub", category: "Dairy", status: "critical", lastRestocked: "2026-05-10" },
  { id: "PRD-010", name: "Green Tea Pack 25 bags", sku: "BEV-GT-001", stock: 8, threshold: 20, warehouse: "Bangalore Cold Room", category: "Beverages", status: "warning", lastRestocked: "2026-05-12" },
  { id: "PRD-015", name: "Organic Whole Wheat Flour", sku: "GROC-WHF-001", stock: 12, threshold: 25, warehouse: "Delhi Central", category: "Groceries", status: "warning", lastRestocked: "2026-05-14" },
  { id: "PRD-022", name: "Cold Pressed Coconut Oil", sku: "HEALTH-CNO-001", stock: 3, threshold: 10, warehouse: "Mumbai Hub", category: "Health", status: "critical" },
];

// ── 6. Vendor Payments ───────────────────────────────────

export const mockVendorPayments: VendorPayment[] = [
  { id: "PO-001", vendor: "Fortune Foods Ltd", invoiceRef: "INV-FF-0426", amount: 245000, dueDate: "2026-05-28", status: "pending", priority: "high", paymentMethod: "NEFT" },
  { id: "PO-002", vendor: "Amul Dairy", invoiceRef: "INV-AD-0426", amount: 136000, dueDate: "2026-05-25", status: "overdue", priority: "high", paymentMethod: "UPI" },
  { id: "PO-003", vendor: "Happilo International", invoiceRef: "INV-HI-0426", amount: 78000, dueDate: "2026-06-05", status: "pending", priority: "medium", paymentMethod: "NEFT" },
  { id: "PO-004", vendor: "Kashmir Fruit Co.", invoiceRef: "INV-KF-0426", amount: 52000, dueDate: "2026-06-02", status: "pending", priority: "medium" },
  { id: "PO-005", vendor: "Hindustan Unilever", invoiceRef: "INV-HU-0426", amount: 312000, dueDate: "2026-05-20", status: "overdue", priority: "high" },
  { id: "PO-006", vendor: "Dabur India Ltd", invoiceRef: "INV-DI-0426", amount: 94000, dueDate: "2026-06-10", status: "pending", priority: "low" },
];

// ── 7. Top Selling Products ──────────────────────────────

export const mockTopProducts: TopProduct[] = [
  { id: "PRD-004", name: "Full Cream Milk 1L", sales: 1400, revenue: 95200, growth: "+12%", rank: 1 },
  { id: "PRD-001", name: "Organic Basmati Rice 5kg", sales: 1170, revenue: 58400, growth: "+8%", rank: 2 },
  { id: "PRD-002", name: "Fresh Red Apples 1kg", sales: 980, revenue: 41800, growth: "+22%", rank: 3 },
  { id: "PRD-008", name: "Cold Brew Coffee 250ml", sales: 720, revenue: 37400, growth: "+45%", rank: 4 },
  { id: "PRD-005", name: "Greek Yogurt 400g", sales: 650, revenue: 29200, growth: "+18%", rank: 5 },
  { id: "PRD-009", name: "Fresh Orange Juice 1L", sales: 580, revenue: 24800, growth: "+6%", rank: 6 },
];

// ── 8. Customer Acquisition Metrics ──────────────────────

export const mockAcquisitionMetrics: AcquisitionMetric[] = [
  { channel: "Organic Search", users: 12300, percentage: 32, costPerAcquisition: 0, conversionRate: 4.2, trend: "+12%", color: "#0c831f" },
  { channel: "Social Media", users: 8900, percentage: 23, costPerAcquisition: 18, conversionRate: 3.8, trend: "+28%", color: "#2563eb" },
  { channel: "Referral", users: 7200, percentage: 19, costPerAcquisition: 5, conversionRate: 8.5, trend: "+45%", color: "#ff4f8b" },
  { channel: "Paid Ads", users: 5400, percentage: 14, costPerAcquisition: 42, conversionRate: 2.1, trend: "+8%", color: "#9333ea" },
  { channel: "Email Campaigns", users: 3100, percentage: 8, costPerAcquisition: 12, conversionRate: 6.3, trend: "+5%", color: "#d97706" },
  { channel: "Direct", users: 1552, percentage: 4, costPerAcquisition: 0, conversionRate: 9.1, trend: "+2%", color: "#666" },
];

// ── Extended Presentation Mock Data ─────────────────────

export const mockHourlyActivity = [
  { label: "6AM", value: 45 },
  { label: "8AM", value: 180 },
  { label: "10AM", value: 320 },
  { label: "12PM", value: 410 },
  { label: "2PM", value: 380 },
  { label: "4PM", value: 490 },
  { label: "6PM", value: 520 },
  { label: "8PM", value: 440 },
  { label: "10PM", value: 280 },
];

export const mockCategorySales = [
  { category: "Fruits & Veggies", sales: 12500, revenue: 2450000, color: "#0c831f" },
  { category: "Dairy & Eggs", sales: 9800, revenue: 1890000, color: "#2563eb" },
  { category: "Beverages", sales: 7200, revenue: 1450000, color: "#ff4f8b" },
  { category: "Snacks", sales: 6500, revenue: 980000, color: "#9333ea" },
  { category: "Household", sales: 4200, revenue: 720000, color: "#d97706" },
];

export const mockOrderStatusBreakdown = [
  { status: "delivered", count: 184250, color: "#0c831f" },
  { status: "in_transit", count: 28900, color: "#2563eb" },
  { status: "processing", count: 18920, color: "#d97706" },
  { status: "pending", count: 8560, color: "#9333ea" },
  { status: "cancelled", count: 5048, color: "#dc2626" },
];

export const mockPaymentMethods = [
  { method: "UPI", percentage: 58, count: 142500, color: "#0c831f" },
  { method: "Cards", percentage: 22, count: 54000, color: "#2563eb" },
  { method: "Wallets", percentage: 12, count: 29500, color: "#9333ea" },
  { method: "Net Banking", percentage: 5, count: 12300, color: "#d97706" },
  { method: "COD", percentage: 3, count: 7378, color: "#ff4f8b" },
];

export const mockConversionFunnel = [
  { stage: "Visitors", count: 245000, percentage: 100 },
  { stage: "Added to Cart", count: 89200, percentage: 36.4 },
  { stage: "Checkout Started", count: 52400, percentage: 21.4 },
  { stage: "Orders Placed", count: 38400, percentage: 15.7 },
  { stage: "Delivered", count: 36200, percentage: 14.8 },
];

export const mockTopCategories = [
  { name: "Fruits & Vegetables", revenue: 2450000, growth: "+18.2%", color: "#0c831f" },
  { name: "Dairy & Eggs", revenue: 1890000, growth: "+12.4%", color: "#2563eb" },
  { name: "Beverages", revenue: 1450000, growth: "+8.7%", color: "#ff4f8b" },
  { name: "Snacks & Packaged", revenue: 980000, growth: "+22.1%", color: "#9333ea" },
  { name: "Household Essentials", revenue: 720000, growth: "-2.3%", color: "#d97706" },
];

export const mockDeliveryPerformance = {
  onTime: 22800,
  delayed: 1875,
  total: 24675,
  avgTime: "28 min",
};

export const mockSystemHealth = {
  uptime: "99.97%",
  apiLatency: "124ms",
  errorRate: "0.02%",
  activeUsers: 142,
};

export const mockReturnRate = {
  total: 245678,
  returned: 8560,
  rate: 3.48,
  refundAmount: 1234500,
};

export const mockPromotionMetrics = {
  active: 12,
  redeemed: 24500,
  revenue: 3420000,
  conversion: "18.5%",
};

export const mockRecentActivity = [
  { id: "A1", type: "order", message: "New order #ORD-1245 placed by Ravi Kumar", time: "2 min ago", icon: "ShoppingCart" },
  { id: "A2", type: "payment", message: "Payment of ₹1,240 confirmed via UPI", time: "3 min ago", icon: "CreditCard" },
  { id: "A3", type: "delivery", message: "Order #ORD-1242 delivered to Anita Singh", time: "5 min ago", icon: "Truck" },
  { id: "A4", type: "alert", message: "Low stock alert: Natural Honey (0 units)", time: "8 min ago", icon: "AlertTriangle" },
  { id: "A5", type: "vendor", message: "Vendor payout processed for Fortune Foods", time: "12 min ago", icon: "DollarSign" },
  { id: "A6", type: "customer", message: "New customer signup: Meera Joshi", time: "15 min ago", icon: "UserPlus" },
];

// ── Aggregated Dashboard Mock ────────────────────────────

export const mockDashboardOverview: DashboardOverview = {
  revenue: mockRevenue,
  orders: mockOrders,
  customers: mockCustomers,
  liveOrders: mockLiveOrders,
  lowStockAlerts: mockStockAlerts,
  vendorPayments: mockVendorPayments,
  topProducts: mockTopProducts,
  acquisitionMetrics: mockAcquisitionMetrics,
  categorySales: mockCategorySales,
  orderStatusBreakdown: mockOrderStatusBreakdown,
  paymentMethods: mockPaymentMethods,
  conversionFunnel: mockConversionFunnel,
  topCategories: mockTopCategories,
  deliveryPerformance: mockDeliveryPerformance,
  systemHealth: mockSystemHealth,
  returnRate: mockReturnRate,
  promotionMetrics: mockPromotionMetrics,
  recentActivity: mockRecentActivity,
  hourlyActivity: mockHourlyActivity,
  lastUpdated: new Date().toISOString(),
};

// ── Helper: Simulated network delay ─────────────────────

export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
