// Mock data for Reports & Analytics

export interface RevenueReport {
  date: string;
  grossRevenue: number;
  netRevenue: number;
  orders: number;
  avgOrderValue: number;
  refunds: number;
  discounts: number;
  promoCost: number;
}

export interface CustomerReport {
  customerId: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderDate: string;
  lifetimeValue: string;
  segment: "high" | "medium" | "low" | "new";
  acquisitionChannel: string;
  retentionRate: number;
}

export interface VendorReportEntry {
  vendorId: string;
  vendorName: string;
  category: string;
  totalOrders: number;
  grossSales: number;
  commission: number;
  netPayout: number;
  rating: number;
  performance: "excellent" | "good" | "average" | "poor";
}

export interface InventoryReportEntry {
  sku: string;
  productName: string;
  category: string;
  totalStock: number;
  reserved: number;
  available: number;
  damaged: number;
  reorderPoint: number;
  daysUntilStockout: number;
  monthlyVelocity: number;
  turnoverRate: number;
}

export interface OrderReportEntry {
  date: string;
  totalOrders: number;
  completed: number;
  cancelled: number;
  returned: number;
  pending: number;
  onTime: number;
  delayed: number;
  avgDeliveryTime: string;
  totalRevenue: number;
}

export const mockRevenueReports: RevenueReport[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 4, i + 1);
  const gross = Math.round(100000 + Math.random() * 80000 + Math.sin(i / 3) * 30000);
  return {
    date: date.toISOString().split("T")[0],
    grossRevenue: gross,
    netRevenue: Math.round(gross * 0.89),
    orders: Math.round(gross / 800),
    avgOrderValue: Math.round(gross / Math.round(gross / 800)),
    refunds: Math.round(gross * 0.025),
    discounts: Math.round(gross * 0.065),
    promoCost: Math.round(gross * 0.04),
  };
});

export const mockCustomerReports: CustomerReportEntry[] = [
  { customerId: "CUST001", name: "John Doe", email: "john.doe@example.com", totalOrders: 156, totalSpent: 125000, avgOrderValue: 801, lastOrderDate: "2026-05-21", lifetimeValue: "₹1.25L", segment: "high", acquisitionChannel: "Referral", retentionRate: 92, ordersThisMonth: 12, preferredCategory: "Groceries", city: "Mumbai" },
  { customerId: "CUST002", name: "Jane Smith", email: "jane.smith@example.com", totalOrders: 89, totalSpent: 72000, avgOrderValue: 809, lastOrderDate: "2026-05-20", lifetimeValue: "₹72K", segment: "medium", acquisitionChannel: "Organic", retentionRate: 85, ordersThisMonth: 8, preferredCategory: "Fruits", city: "Delhi" },
  { customerId: "CUST003", name: "Bob Johnson", email: "bob.johnson@example.com", totalOrders: 42, totalSpent: 32000, avgOrderValue: 762, lastOrderDate: "2026-05-18", lifetimeValue: "₹32K", segment: "low", acquisitionChannel: "Paid Ads", retentionRate: 68, ordersThisMonth: 5, preferredCategory: "Snacks", city: "Bangalore" },
  { customerId: "CUST004", name: "Alice Brown", email: "alice.brown@example.com", totalOrders: 201, totalSpent: 285000, avgOrderValue: 1418, lastOrderDate: "2026-05-21", lifetimeValue: "₹2.85L", segment: "high", acquisitionChannel: "Referral", retentionRate: 96, ordersThisMonth: 18, preferredCategory: "Dairy", city: "Chennai" },
  { customerId: "CUST005", name: "Charlie Wilson", email: "charlie.wilson@example.com", totalOrders: 12, totalSpent: 15000, avgOrderValue: 1250, lastOrderDate: "2026-05-15", lifetimeValue: "₹15K", segment: "new", acquisitionChannel: "Email Campaign", retentionRate: 45, ordersThisMonth: 3, preferredCategory: "Beverages", city: "Hyderabad" },
  { customerId: "CUST006", name: "Diana Prince", email: "diana.prince@example.com", totalOrders: 78, totalSpent: 84000, avgOrderValue: 1077, lastOrderDate: "2026-05-19", lifetimeValue: "₹84K", segment: "medium", acquisitionChannel: "Social Media", retentionRate: 78, ordersThisMonth: 6, preferredCategory: "Health", city: "Pune" },
  { customerId: "CUST007", name: "Eve Adams", email: "eve.adams@example.com", totalOrders: 3, totalSpent: 4500, avgOrderValue: 1500, lastOrderDate: "2026-05-10", lifetimeValue: "₹4.5K", segment: "new", acquisitionChannel: "Paid Ads", retentionRate: 30, ordersThisMonth: 1, preferredCategory: "Home Care", city: "Ahmedabad" },
  { customerId: "CUST008", name: "Frank Miller", email: "frank.miller@example.com", totalOrders: 145, totalSpent: 112000, avgOrderValue: 772, lastOrderDate: "2026-05-21", lifetimeValue: "₹1.12L", segment: "high", acquisitionChannel: "Organic", retentionRate: 88, ordersThisMonth: 14, preferredCategory: "Personal Care", city: "Kolkata" },
];

export const mockVendorReports: VendorReportEntry[] = [
  { vendorId: "VEND001", vendorName: "Fresh Foods Pvt Ltd", category: "Groceries", totalOrders: 156, grossSales: 125000, commission: 12500, commissionRate: 10, netPayout: 110475, pendingPayout: 0, rating: 4.8, performance: "excellent", onTimeDeliveryRate: 95, returnRate: 2, activeProducts: 45, joinedDate: "2023-01-15", lastPayoutDate: "2026-05-15" },
  { vendorId: "VEND002", vendorName: "Organic Farms", category: "Fruits & Veg", totalOrders: 89, grossSales: 78500, commission: 7850, commissionRate: 10, netPayout: 69380, pendingPayout: 5000, rating: 4.6, performance: "good", onTimeDeliveryRate: 92, returnRate: 3, activeProducts: 32, joinedDate: "2023-03-20", lastPayoutDate: "2026-05-10" },
  { vendorId: "VEND003", vendorName: "Daily Essentials Co", category: "Dairy", totalOrders: 234, grossSales: 189000, commission: 18900, commissionRate: 10, netPayout: 167045, pendingPayout: 0, rating: 4.9, performance: "excellent", onTimeDeliveryRate: 98, returnRate: 1, activeProducts: 67, joinedDate: "2024-08-01", lastPayoutDate: "2026-05-18" },
  { vendorId: "VEND004", vendorName: "Snacks World", category: "Snacks", totalOrders: 67, grossSales: 45600, commission: 4560, commissionRate: 10, netPayout: 40303, pendingPayout: 3000, rating: 4.3, performance: "average", onTimeDeliveryRate: 85, returnRate: 5, activeProducts: 28, joinedDate: "2024-11-10", lastPayoutDate: "2026-05-05" },
  { vendorId: "VEND005", vendorName: "Beverage Hub", category: "Beverages", totalOrders: 112, grossSales: 98000, commission: 9800, commissionRate: 10, netPayout: 86620, pendingPayout: 0, rating: 4.5, performance: "good", onTimeDeliveryRate: 90, returnRate: 2, activeProducts: 41, joinedDate: "2024-02-28", lastPayoutDate: "2026-05-12" },
  { vendorId: "VEND006", vendorName: "Health Plus", category: "Health", totalOrders: 45, grossSales: 52000, commission: 5200, commissionRate: 10, netPayout: 45960, pendingPayout: 2000, rating: 3.9, performance: "average", onTimeDeliveryRate: 78, returnRate: 6, activeProducts: 19, joinedDate: "2025-01-20", lastPayoutDate: "2026-05-01" },
];

export const mockInventoryReports: InventoryReportEntry[] = [
  { sku: "RICE-BAS-001", productName: "Organic Basmati Rice", category: "Groceries", warehouse: "WH-01", totalStock: 120, reserved: 14, available: 106, damaged: 0, reorderPoint: 20, daysUntilStockout: 45, monthlyVelocity: 65, turnoverRate: 4.2, stockStatus: "healthy", lastRestocked: "2026-05-10", unitCost: 80, stockValue: 9600 },
  { sku: "FRUIT-APL-001", productName: "Fresh Red Apples", category: "Fruits", warehouse: "WH-02", totalStock: 85, reserved: 6, available: 78, damaged: 1, reorderPoint: 30, daysUntilStockout: 15, monthlyVelocity: 140, turnoverRate: 8.5, stockStatus: "low", lastRestocked: "2026-05-20", unitCost: 120, stockValue: 10200 },
  { sku: "HEALTH-HNY-001", productName: "Natural Honey 500g", category: "Health", warehouse: "WH-01", totalStock: 0, reserved: 0, available: 0, damaged: 0, reorderPoint: 20, daysUntilStockout: 0, monthlyVelocity: 35, turnoverRate: 2.1, stockStatus: "out_of_stock", lastRestocked: "2026-04-28", unitCost: 280, stockValue: 0 },
  { sku: "DAIRY-MLK-001", productName: "Full Cream Milk 1L", category: "Dairy", warehouse: "WH-03", totalStock: 320, reserved: 28, available: 288, damaged: 4, reorderPoint: 100, daysUntilStockout: 2, monthlyVelocity: 1200, turnoverRate: 18.5, stockStatus: "overstocked", lastRestocked: "2026-05-22", unitCost: 45, stockValue: 14400 },
  { sku: "BEV-COF-001", productName: "Cold Brew Coffee 250ml", category: "Beverages", warehouse: "WH-01", totalStock: 42, reserved: 8, available: 33, damaged: 1, reorderPoint: 50, daysUntilStockout: 10, monthlyVelocity: 90, turnoverRate: 6.8, stockStatus: "critical", lastRestocked: "2026-05-18", unitCost: 95, stockValue: 4000 },
  { sku: "SNK-CHP-001", productName: "Baked Multigrain Chips", category: "Snacks", warehouse: "WH-02", totalStock: 210, reserved: 22, available: 185, damaged: 3, reorderPoint: 60, daysUntilStockout: 20, monthlyVelocity: 280, turnoverRate: 10.2, stockStatus: "healthy", lastRestocked: "2026-05-15", unitCost: 60, stockValue: 12600 },
];

export const mockOrderReports: OrderReportEntry[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 4, i + 1);
  const total = Math.round(120 + Math.random() * 80 + Math.sin(i / 4) * 30);
  return {
    date: date.toISOString().split("T")[0],
    totalOrders: total,
    completed: Math.round(total * 0.78),
    cancelled: Math.round(total * 0.05),
    returned: Math.round(total * 0.03),
    pending: Math.round(total * 0.14),
    onTime: Math.round(total * 0.88),
    delayed: Math.round(total * 0.12),
    avgDeliveryTime: `${Math.round(14 + Math.random() * 8)} min`,
    totalRevenue: Math.round(total * 820),
  };
});

// ── GST Reports ───────────────────────────────────────────

export interface GSTReportEntry {
  id: string;
  period: string;
  gstin: string;
  businessName: string;
  grossSales: number;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTaxLiability: number;
  inputCredit: number;
  netPayable: number;
  returnType: "GSTR-1" | "GSTR-3B" | "GSTR-9";
  status: "filed" | "pending" | "overdue" | "processing";
  dueDate: string;
  filedDate?: string;
}

export const mockGSTReports: GSTReportEntry[] = [
  { id: "GST-001", period: "Apr 2026", gstin: "27AAACR1234H1Z1", businessName: "FMCG Commerce Pvt Ltd", grossSales: 12450000, taxableValue: 11205000, cgst: 560250, sgst: 560250, igst: 0, totalTaxLiability: 1120500, inputCredit: 445000, netPayable: 675500, returnType: "GSTR-3B", status: "filed", dueDate: "2026-05-20", filedDate: "2026-05-18" },
  { id: "GST-002", period: "Mar 2026", gstin: "27AAACR1234H1Z1", businessName: "FMCG Commerce Pvt Ltd", grossSales: 11890000, taxableValue: 10701000, cgst: 535050, sgst: 535050, igst: 12500, totalTaxLiability: 1082600, inputCredit: 412000, netPayable: 670600, returnType: "GSTR-3B", status: "filed", dueDate: "2026-04-20", filedDate: "2026-04-19" },
  { id: "GST-003", period: "Feb 2026", gstin: "27AAACR1234H1Z1", businessName: "FMCG Commerce Pvt Ltd", grossSales: 10230000, taxableValue: 9207000, cgst: 460350, sgst: 460350, igst: 8400, totalTaxLiability: 929100, inputCredit: 398000, netPayable: 531100, returnType: "GSTR-3B", status: "filed", dueDate: "2026-03-20", filedDate: "2026-03-18" },
  { id: "GST-004", period: "Jan 2026", gstin: "27AAACR1234H1Z1", businessName: "FMCG Commerce Pvt Ltd", grossSales: 9870000, taxableValue: 8883000, cgst: 444150, sgst: 444150, igst: 0, totalTaxLiability: 888300, inputCredit: 375000, netPayable: 513300, returnType: "GSTR-3B", status: "filed", dueDate: "2026-02-20", filedDate: "2026-02-17" },
  { id: "GST-005", period: "FY 2025-26", gstin: "27AAACR1234H1Z1", businessName: "FMCG Commerce Pvt Ltd", grossSales: 124500000, taxableValue: 112050000, cgst: 5602500, sgst: 5602500, igst: 125000, totalTaxLiability: 11330000, inputCredit: 4850000, netPayable: 6480000, returnType: "GSTR-9", status: "pending", dueDate: "2026-12-31" },
  { id: "GST-006", period: "Apr 2026", gstin: "29AABCF5678G1Z1", businessName: "FMCG Commerce - Bangalore Hub", grossSales: 5230000, taxableValue: 4707000, cgst: 235350, sgst: 235350, igst: 0, totalTaxLiability: 470700, inputCredit: 185000, netPayable: 285700, returnType: "GSTR-1", status: "processing", dueDate: "2026-05-11" },
  { id: "GST-007", period: "Mar 2026", gstin: "29AABCF5678G1Z1", businessName: "FMCG Commerce - Bangalore Hub", grossSales: 4980000, taxableValue: 4482000, cgst: 224100, sgst: 224100, igst: 0, totalTaxLiability: 448200, inputCredit: 172000, netPayable: 276200, returnType: "GSTR-1", status: "filed", dueDate: "2026-04-11", filedDate: "2026-04-10" },
];

// ── Customer Reports ───────────────────────────────────────

export interface CustomerReportEntry {
  id: string;
  customerId: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderDate: string;
  lifetimeValue: string;
  segment: "platinum" | "gold" | "silver" | "bronze" | "new";
  acquisitionChannel: string;
  retentionRate: number;
  ordersThisMonth: number;
  preferredCategory: string;
  city: string;
}

export const mockCustomerReportEntries: CustomerReportEntry[] = [
  { id: "CR-001", customerId: "CUST001", name: "Ravi Kumar", email: "ravi.k@example.com", totalOrders: 245, totalSpent: 312000, avgOrderValue: 1273, lastOrderDate: "2026-05-24", lifetimeValue: "₹3.12L", segment: "platinum", acquisitionChannel: "Referral", retentionRate: 96, ordersThisMonth: 12, preferredCategory: "Groceries", city: "Mumbai" },
  { id: "CR-002", customerId: "CUST002", name: "Anita Singh", email: "anita.s@example.com", totalOrders: 189, totalSpent: 198000, avgOrderValue: 1048, lastOrderDate: "2026-05-23", lifetimeValue: "₹1.98L", segment: "gold", acquisitionChannel: "Organic", retentionRate: 91, ordersThisMonth: 8, preferredCategory: "Dairy", city: "Delhi" },
  { id: "CR-003", customerId: "CUST003", name: "Priya Patel", email: "priya.p@example.com", totalOrders: 156, totalSpent: 175000, avgOrderValue: 1122, lastOrderDate: "2026-05-22", lifetimeValue: "₹1.75L", segment: "gold", acquisitionChannel: "Social Media", retentionRate: 88, ordersThisMonth: 7, preferredCategory: "Beverages", city: "Bangalore" },
  { id: "CR-004", customerId: "CUST004", name: "Mohammed Ali", email: "mohd.a@example.com", totalOrders: 98, totalSpent: 89000, avgOrderValue: 908, lastOrderDate: "2026-05-20", lifetimeValue: "₹89K", segment: "silver", acquisitionChannel: "Paid Ads", retentionRate: 82, ordersThisMonth: 5, preferredCategory: "Snacks", city: "Hyderabad" },
  { id: "CR-005", customerId: "CUST005", name: "Sarah Johnson", email: "sarah.j@example.com", totalOrders: 67, totalSpent: 72000, avgOrderValue: 1075, lastOrderDate: "2026-05-19", lifetimeValue: "₹72K", segment: "silver", acquisitionChannel: "Email Campaign", retentionRate: 76, ordersThisMonth: 4, preferredCategory: "Health", city: "Pune" },
  { id: "CR-006", customerId: "CUST006", name: "Arun Sharma", email: "arun.s@example.com", totalOrders: 42, totalSpent: 38000, avgOrderValue: 905, lastOrderDate: "2026-05-17", lifetimeValue: "₹38K", segment: "bronze", acquisitionChannel: "Organic", retentionRate: 65, ordersThisMonth: 2, preferredCategory: "Groceries", city: "Chennai" },
  { id: "CR-007", customerId: "CUST007", name: "Deepa Krishnan", email: "deepa.k@example.com", totalOrders: 28, totalSpent: 24000, avgOrderValue: 857, lastOrderDate: "2026-05-15", lifetimeValue: "₹24K", segment: "bronze", acquisitionChannel: "Referral", retentionRate: 58, ordersThisMonth: 1, preferredCategory: "Dairy", city: "Kochi" },
  { id: "CR-008", customerId: "CUST008", name: "Vikram Reddy", email: "vikram.r@example.com", totalOrders: 12, totalSpent: 15000, avgOrderValue: 1250, lastOrderDate: "2026-05-10", lifetimeValue: "₹15K", segment: "new", acquisitionChannel: "Paid Ads", retentionRate: 35, ordersThisMonth: 3, preferredCategory: "Beverages", city: "Bangalore" },
  { id: "CR-009", customerId: "CUST009", name: "Neha Gupta", email: "neha.g@example.com", totalOrders: 312, totalSpent: 425000, avgOrderValue: 1362, lastOrderDate: "2026-05-24", lifetimeValue: "₹4.25L", segment: "platinum", acquisitionChannel: "Referral", retentionRate: 98, ordersThisMonth: 15, preferredCategory: "Groceries", city: "Delhi" },
  { id: "CR-010", customerId: "CUST010", name: "Rahul Verma", email: "rahul.v@example.com", totalOrders: 5, totalSpent: 6200, avgOrderValue: 1240, lastOrderDate: "2026-05-08", lifetimeValue: "₹6.2K", segment: "new", acquisitionChannel: "Social Media", retentionRate: 25, ordersThisMonth: 1, preferredCategory: "Snacks", city: "Lucknow" },
];

// ── Cohort Analysis ────────────────────────────────────────

export interface CohortEntry {
  id: string;
  cohort: string;
  period: string;
  users: number;
  week0: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
  week5: number;
  week6: number;
  week7: number;
  week8: number;
  week9: number;
  week10: number;
  week11: number;
}

export const mockCohortData: CohortEntry[] = [
  { id: "CH-001", cohort: "Mar 1-7", period: "Week 1", users: 2450, week0: 100, week1: 42.8, week2: 36.5, week3: 32.1, week4: 28.6, week5: 26.2, week6: 24.8, week7: 23.1, week8: 21.5, week9: 20.2, week10: 19.1, week11: 18.3 },
  { id: "CH-002", cohort: "Mar 8-14", period: "Week 2", users: 2320, week0: 100, week1: 44.1, week2: 37.8, week3: 33.5, week4: 30.1, week5: 27.8, week6: 25.9, week7: 24.2, week8: 22.8, week9: 21.4, week10: 20.1, week11: 0 },
  { id: "CH-003", cohort: "Mar 15-21", period: "Week 3", users: 2180, week0: 100, week1: 41.5, week2: 35.2, week3: 31.8, week4: 28.5, week5: 26.1, week6: 24.3, week7: 22.6, week8: 21.2, week9: 19.8, week10: 0, week11: 0 },
  { id: "CH-004", cohort: "Mar 22-28", period: "Week 4", users: 2050, week0: 100, week1: 43.2, week2: 36.8, week3: 32.5, week4: 29.2, week5: 26.8, week6: 24.9, week7: 23.1, week8: 21.8, week9: 0, week10: 0, week11: 0 },
  { id: "CH-005", cohort: "Mar 29-Apr 4", period: "Week 5", users: 1980, week0: 100, week1: 42.6, week2: 36.1, week3: 31.8, week4: 28.4, week5: 25.9, week6: 24.1, week7: 22.5, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-006", cohort: "Apr 5-11", period: "Week 6", users: 2150, week0: 100, week1: 45.3, week2: 38.5, week3: 34.2, week4: 30.8, week5: 28.2, week6: 26.1, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-007", cohort: "Apr 12-18", period: "Week 7", users: 2280, week0: 100, week1: 43.8, week2: 37.2, week3: 32.9, week4: 29.5, week5: 27.1, week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-008", cohort: "Apr 19-25", period: "Week 8", users: 2340, week0: 100, week1: 44.5, week2: 38.1, week3: 33.8, week4: 30.2, week5: 0, week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-009", cohort: "Apr 26-May 2", period: "Week 9", users: 2210, week0: 100, week1: 42.1, week2: 35.8, week3: 31.5, week4: 0, week5: 0, week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-010", cohort: "May 3-9", period: "Week 10", users: 2450, week0: 100, week1: 43.5, week2: 36.9, week3: 0, week4: 0, week5: 0, week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-011", cohort: "May 10-16", period: "Week 11", users: 2560, week0: 100, week1: 44.2, week2: 0, week3: 0, week4: 0, week5: 0, week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
  { id: "CH-012", cohort: "May 17-23", period: "Week 12", users: 2310, week0: 100, week1: 0, week2: 0, week3: 0, week4: 0, week5: 0, week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0 },
];

// ── Abandoned Cart Reports ─────────────────────────────────

export interface AbandonedCartEntry {
  id: string;
  customerName: string;
  customerEmail: string;
  items: number;
  cartValue: number;
  status: "abandoned" | "recovered" | "lost";
  abandonedAt: string;
  recoveredAt?: string;
  recoveryMethod?: string;
  itemsList: string[];
}

export const mockAbandonedCartData: AbandonedCartEntry[] = [
  { id: "AC-001", customerName: "Amit Jain", customerEmail: "amit.j@example.com", items: 5, cartValue: 2450, status: "recovered", abandonedAt: "2026-05-24 14:30", recoveredAt: "2026-05-24 16:45", recoveryMethod: "Email Reminder", itemsList: ["Organic Basmati Rice 5kg", "Fresh Milk 1L x2", "Greek Yogurt", "Honey 500g"] },
  { id: "AC-002", customerName: "Pooja Mehta", customerEmail: "pooja.m@example.com", items: 3, cartValue: 1890, status: "recovered", abandonedAt: "2026-05-24 10:15", recoveredAt: "2026-05-24 12:30", recoveryMethod: "Push Notification", itemsList: ["Green Tea Pack", "Almonds 250g", "Cold Brew Coffee"] },
  { id: "AC-003", customerName: "Suresh Reddy", customerEmail: "suresh.r@example.com", items: 8, cartValue: 4560, status: "abandoned", abandonedAt: "2026-05-23 18:45", itemsList: ["Premium Almonds", "Organic Honey", "Fresh Fruits Box", "Muesli Pack", "Protein Bars", "Coconut Water x2", "Salted Butter", "Whole Wheat Bread"] },
  { id: "AC-004", customerName: "Kavita Sharma", customerEmail: "kavita.s@example.com", items: 2, cartValue: 840, status: "lost", abandonedAt: "2026-05-23 09:30", itemsList: ["Cold Brew Coffee", "Greek Yogurt"] },
  { id: "AC-005", customerName: "Rohit Kumar", customerEmail: "rohit.k@example.com", items: 4, cartValue: 3250, status: "recovered", abandonedAt: "2026-05-22 20:00", recoveredAt: "2026-05-23 08:15", recoveryMethod: "SMS Reminder", itemsList: ["Organic Basmati Rice", "Pure Ghee 1L", "Cashews 500g", "Dates 500g"] },
  { id: "AC-006", customerName: "Meera Nair", customerEmail: "meera.n@example.com", items: 6, cartValue: 5200, status: "abandoned", abandonedAt: "2026-05-22 15:20", itemsList: ["Fresh Apples x3kg", "Pomegranate x2kg", "Grapes 1kg", "Orange Juice 1L", "Mixed Nuts", "Protein Powder"] },
  { id: "AC-007", customerName: "Vijay Singh", customerEmail: "vijay.s@example.com", items: 3, cartValue: 1670, status: "recovered", abandonedAt: "2026-05-21 11:10", recoveredAt: "2026-05-21 14:25", recoveryMethod: "Email Reminder", itemsList: ["Organic Turmeric", "Cold Pressed Oil", "Honey"] },
  { id: "AC-008", customerName: "Sunita Patel", customerEmail: "sunita.p@example.com", items: 7, cartValue: 4100, status: "abandoned", abandonedAt: "2026-05-21 08:45", itemsList: ["Full Cream Milk x3", "Cheese Block", "Butter Pack", "Cream", "Yogurt Pack", "Paneer 500g", "Flavored Milk"] },
  { id: "AC-009", customerName: "Arvind Joshi", customerEmail: "arvind.j@example.com", items: 4, cartValue: 2890, status: "lost", abandonedAt: "2026-05-20 19:30", itemsList: ["Chicken Breast 1kg", "Fish Fillet 500g", "Eggs 30pk", "Olive Oil"] },
  { id: "AC-010", customerName: "Lakshmi Iyer", customerEmail: "lakshmi.i@example.com", items: 5, cartValue: 3780, status: "recovered", abandonedAt: "2026-05-20 16:00", recoveredAt: "2026-05-20 18:30", recoveryMethod: "WhatsApp Notification", itemsList: ["Fresh Veg Box", "Dal Mix", "Spices Set", "Coconut Oil", "Brown Rice"] },
];

// ── Revenue Analytics ─────────────────────────────────────

export interface RevenueAnalyticsEntry {
  id: string;
  month: string;
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number;
  operatingExpenses: number;
  operatingProfit: number;
  netProfit: number;
  ebitda: number;
  revenuePerOrder: number;
  costPerOrder: number;
}

export const mockRevenueAnalytics: RevenueAnalyticsEntry[] = [
  { id: "RA-001", month: "Jan 2026", revenue: 9850000, cogs: 6895000, grossProfit: 2955000, grossMargin: 30.0, operatingExpenses: 1870000, operatingProfit: 1085000, netProfit: 785000, ebitda: 1245000, revenuePerOrder: 845, costPerOrder: 592 },
  { id: "RA-002", month: "Feb 2026", revenue: 10230000, cogs: 7161000, grossProfit: 3069000, grossMargin: 30.0, operatingExpenses: 1920000, operatingProfit: 1149000, netProfit: 832000, ebitda: 1312000, revenuePerOrder: 852, costPerOrder: 597 },
  { id: "RA-003", month: "Mar 2026", revenue: 11890000, cogs: 8204100, grossProfit: 3685900, grossMargin: 31.0, operatingExpenses: 2050000, operatingProfit: 1635900, netProfit: 1185000, ebitda: 1820000, revenuePerOrder: 868, costPerOrder: 599 },
  { id: "RA-004", month: "Apr 2026", revenue: 12450000, cogs: 8466000, grossProfit: 3984000, grossMargin: 32.0, operatingExpenses: 2150000, operatingProfit: 1834000, netProfit: 1328000, ebitda: 2015000, revenuePerOrder: 875, costPerOrder: 595 },
  { id: "RA-005", month: "May 2026", revenue: 13200000, cogs: 8976000, grossProfit: 4224000, grossMargin: 32.0, operatingExpenses: 2210000, operatingProfit: 2014000, netProfit: 1458000, ebitda: 2190000, revenuePerOrder: 882, costPerOrder: 600 },
];

// ── Promotion ROI Reports ─────────────────────────────────

export interface PromotionROIEntry {
  id: string;
  promotionName: string;
  type: "percentage" | "fixed" | "bogo" | "free_shipping";
  cost: number;
  revenueGenerated: number;
  ordersIncremented: number;
  redemptionCount: number;
  roi: number;
  conversionRate: number;
  avgOrderValue: number;
  status: "active" | "completed" | "scheduled" | "ended";
  startDate: string;
  endDate: string;
}

export const mockPromotionROIData: PromotionROIEntry[] = [
  { id: "PROI-001", promotionName: "Summer Sale - 20% Off", type: "percentage", cost: 450000, revenueGenerated: 2850000, ordersIncremented: 3450, redemptionCount: 4200, roi: 533, conversionRate: 12.5, avgOrderValue: 678, status: "active", startDate: "2026-05-01", endDate: "2026-06-15" },
  { id: "PROI-002", promotionName: "Free Delivery Weekend", type: "free_shipping", cost: 185000, revenueGenerated: 980000, ordersIncremented: 1820, redemptionCount: 2100, roi: 430, conversionRate: 18.2, avgOrderValue: 467, status: "completed", startDate: "2026-04-12", endDate: "2026-04-14" },
  { id: "PROI-003", promotionName: "Buy 1 Get 1 Free - Snacks", type: "bogo", cost: 320000, revenueGenerated: 1560000, ordersIncremented: 2100, redemptionCount: 2800, roi: 388, conversionRate: 15.8, avgOrderValue: 743, status: "completed", startDate: "2026-03-15", endDate: "2026-04-15" },
  { id: "PROI-004", promotionName: "New User - ₹200 Off", type: "fixed", cost: 280000, revenueGenerated: 1240000, ordersIncremented: 1650, redemptionCount: 1850, roi: 343, conversionRate: 9.8, avgOrderValue: 752, status: "active", startDate: "2026-05-01", endDate: "2026-06-30" },
  { id: "PROI-005", promotionName: "Weekend Flash Sale - 40% Off", type: "percentage", cost: 520000, revenueGenerated: 3200000, ordersIncremented: 3800, redemptionCount: 4500, roi: 515, conversionRate: 14.2, avgOrderValue: 711, status: "ended", startDate: "2026-02-14", endDate: "2026-02-16" },
  { id: "PROI-006", promotionName: "Dairy Combo - Flat 15% Off", type: "percentage", cost: 195000, revenueGenerated: 890000, ordersIncremented: 1250, redemptionCount: 1450, roi: 356, conversionRate: 11.5, avgOrderValue: 614, status: "completed", startDate: "2026-04-01", endDate: "2026-04-30" },
  { id: "PROI-007", promotionName: "Monsoon Magic - Free Gift", type: "bogo", cost: 240000, revenueGenerated: 1120000, ordersIncremented: 1580, redemptionCount: 1750, roi: 367, conversionRate: 13.1, avgOrderValue: 640, status: "scheduled", startDate: "2026-06-01", endDate: "2026-07-15" },
  { id: "PROI-008", promotionName: "Premium Members - Extra 10%", type: "percentage", cost: 150000, revenueGenerated: 980000, ordersIncremented: 1100, redemptionCount: 1250, roi: 553, conversionRate: 22.5, avgOrderValue: 891, status: "active", startDate: "2026-05-15", endDate: "2026-07-31" },
];

// ── Sales Report Entries (daily granularity) ──────────────

export interface SalesReportEntry {
  id: string;
  date: string;
  grossRevenue: number;
  netRevenue: number;
  orders: number;
  avgOrderValue: number;
  refunds: number;
  discounts: number;
  promoCost: number;
  cashTransactions: number;
  cardTransactions: number;
  upiTransactions: number;
  topCategory: string;
  returnRate: number;
}

export const mockSalesReportEntries: SalesReportEntry[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 4, i + 1);
  const gross = Math.round(380000 + Math.random() * 120000 + Math.sin(i / 3) * 60000);
  const orders = Math.round(gross / 820);
  const categories = ["Groceries", "Dairy", "Beverages", "Snacks", "Fruits & Veg", "Health"];
  return {
    id: `SR-${String(i + 1).padStart(3, "0")}`,
    date: date.toISOString().split("T")[0],
    grossRevenue: gross,
    netRevenue: Math.round(gross * 0.89),
    orders,
    avgOrderValue: Math.round(gross / orders),
    refunds: Math.round(gross * 0.025),
    discounts: Math.round(gross * 0.065),
    promoCost: Math.round(gross * 0.04),
    cashTransactions: Math.round(orders * 0.12),
    cardTransactions: Math.round(orders * 0.35),
    upiTransactions: Math.round(orders * 0.53),
    topCategory: categories[i % categories.length],
    returnRate: Math.round((Math.random() * 3 + 1) * 10) / 10,
  };
});

// ── Inventory Report Entries ──────────────────────────────

export interface InventoryReportEntry {
  id: string;
  sku: string;
  productName: string;
  category: string;
  warehouse: string;
  totalStock: number;
  reserved: number;
  available: number;
  damaged: number;
  reorderPoint: number;
  daysUntilStockout: number;
  monthlyVelocity: number;
  turnoverRate: number;
  stockStatus: "healthy" | "low" | "critical" | "out_of_stock" | "overstocked";
  lastRestocked: string;
  unitCost: number;
  stockValue: number;
}

export const mockInventoryReportEntries: InventoryReportEntry[] = [
  { id: "INV-001", sku: "RICE-BAS-001", productName: "Organic Basmati Rice 5kg", category: "Groceries", warehouse: "Mumbai Central", totalStock: 420, reserved: 38, available: 382, damaged: 0, reorderPoint: 80, daysUntilStockout: 45, monthlyVelocity: 260, turnoverRate: 4.2, stockStatus: "healthy", lastRestocked: "2026-05-15", unitCost: 285, stockValue: 119700 },
  { id: "INV-002", sku: "FRUIT-APL-001", productName: "Fresh Red Apples 1kg", category: "Fruits & Veg", warehouse: "Delhi Hub", totalStock: 85, reserved: 12, available: 73, damaged: 2, reorderPoint: 60, daysUntilStockout: 8, monthlyVelocity: 320, turnoverRate: 12.5, stockStatus: "low", lastRestocked: "2026-05-20", unitCost: 120, stockValue: 10200 },
  { id: "INV-003", sku: "DAIRY-MLK-001", productName: "Full Cream Milk 1L", category: "Dairy", warehouse: "Mumbai Central", totalStock: 0, reserved: 0, available: 0, damaged: 0, reorderPoint: 200, daysUntilStockout: 0, monthlyVelocity: 1800, turnoverRate: 22.5, stockStatus: "out_of_stock", lastRestocked: "2026-05-18", unitCost: 68, stockValue: 0 },
  { id: "INV-004", sku: "BEV-COF-001", productName: "Cold Brew Coffee 250ml", category: "Beverages", warehouse: "Bangalore Hub", totalStock: 38, reserved: 8, available: 30, damaged: 1, reorderPoint: 80, daysUntilStockout: 6, monthlyVelocity: 180, turnoverRate: 8.2, stockStatus: "critical", lastRestocked: "2026-05-12", unitCost: 145, stockValue: 5510 },
  { id: "INV-005", sku: "SNK-CHP-001", productName: "Baked Multigrain Chips 200g", category: "Snacks", warehouse: "Mumbai Central", totalStock: 680, reserved: 45, available: 635, damaged: 5, reorderPoint: 120, daysUntilStockout: 38, monthlyVelocity: 520, turnoverRate: 7.8, stockStatus: "overstocked", lastRestocked: "2026-05-10", unitCost: 85, stockValue: 57800 },
  { id: "INV-006", sku: "HEALTH-HNY-001", productName: "Natural Honey 500g", category: "Health", warehouse: "Delhi Hub", totalStock: 145, reserved: 18, available: 127, damaged: 0, reorderPoint: 40, daysUntilStockout: 28, monthlyVelocity: 155, turnoverRate: 3.8, stockStatus: "healthy", lastRestocked: "2026-05-08", unitCost: 320, stockValue: 46400 },
  { id: "INV-007", sku: "DAIRY-YOG-001", productName: "Greek Yogurt 400g", category: "Dairy", warehouse: "Bangalore Hub", totalStock: 22, reserved: 6, available: 16, damaged: 0, reorderPoint: 50, daysUntilStockout: 4, monthlyVelocity: 165, turnoverRate: 14.2, stockStatus: "critical", lastRestocked: "2026-05-19", unitCost: 95, stockValue: 2090 },
  { id: "INV-008", sku: "GROC-OIL-001", productName: "Cold Pressed Coconut Oil 1L", category: "Groceries", warehouse: "Mumbai Central", totalStock: 310, reserved: 28, available: 282, damaged: 3, reorderPoint: 60, daysUntilStockout: 52, monthlyVelocity: 175, turnoverRate: 5.1, stockStatus: "healthy", lastRestocked: "2026-05-05", unitCost: 420, stockValue: 130200 },
  { id: "INV-009", sku: "BEV-JUI-001", productName: "Fresh Orange Juice 1L", category: "Beverages", warehouse: "Delhi Hub", totalStock: 55, reserved: 10, available: 45, damaged: 2, reorderPoint: 80, daysUntilStockout: 9, monthlyVelocity: 185, turnoverRate: 9.8, stockStatus: "low", lastRestocked: "2026-05-17", unitCost: 110, stockValue: 6050 },
  { id: "INV-010", sku: "SNCK-NUT-001", productName: "Premium Cashews 250g", category: "Snacks", warehouse: "Bangalore Hub", totalStock: 195, reserved: 22, available: 173, damaged: 1, reorderPoint: 50, daysUntilStockout: 35, monthlyVelocity: 165, turnoverRate: 6.2, stockStatus: "healthy", lastRestocked: "2026-05-14", unitCost: 380, stockValue: 74100 },
  { id: "INV-011", sku: "GROC-DAL-001", productName: "Toor Dal 1kg", category: "Groceries", warehouse: "Mumbai Central", totalStock: 520, reserved: 42, available: 478, damaged: 0, reorderPoint: 100, daysUntilStockout: 60, monthlyVelocity: 260, turnoverRate: 4.5, stockStatus: "overstocked", lastRestocked: "2026-04-28", unitCost: 145, stockValue: 75400 },
  { id: "INV-012", sku: "HLTH-PRO-001", productName: "Whey Protein 1kg", category: "Health", warehouse: "Delhi Hub", totalStock: 12, reserved: 4, available: 8, damaged: 0, reorderPoint: 30, daysUntilStockout: 5, monthlyVelocity: 72, turnoverRate: 5.8, stockStatus: "critical", lastRestocked: "2026-05-10", unitCost: 1850, stockValue: 22200 },
];

// ── Vendor Report Entries ─────────────────────────────────

export interface VendorReportEntry {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  totalOrders: number;
  grossSales: number;
  commission: number;
  commissionRate: number;
  netPayout: number;
  pendingPayout: number;
  rating: number;
  performance: "excellent" | "good" | "average" | "poor";
  onTimeDeliveryRate: number;
  returnRate: number;
  activeProducts: number;
  joinedDate: string;
  lastPayoutDate: string;
}

export const mockVendorReportEntries: VendorReportEntry[] = [
  { id: "VND-001", vendorId: "VEND001", vendorName: "Fresh Foods Pvt Ltd", category: "Groceries", totalOrders: 1845, grossSales: 2450000, commission: 245000, commissionRate: 10, netPayout: 2165500, pendingPayout: 39500, rating: 4.8, performance: "excellent", onTimeDeliveryRate: 97.2, returnRate: 1.2, activeProducts: 145, joinedDate: "2024-03-15", lastPayoutDate: "2026-05-15" },
  { id: "VND-002", vendorId: "VEND002", vendorName: "Organic Farms Co", category: "Fruits & Veg", totalOrders: 1240, grossSales: 1680000, commission: 168000, commissionRate: 10, netPayout: 1484400, pendingPayout: 27600, rating: 4.6, performance: "excellent", onTimeDeliveryRate: 94.8, returnRate: 2.1, activeProducts: 88, joinedDate: "2024-06-20", lastPayoutDate: "2026-05-15" },
  { id: "VND-003", vendorId: "VEND003", vendorName: "Daily Essentials Co", category: "Dairy", totalOrders: 2890, grossSales: 3120000, commission: 312000, commissionRate: 10, netPayout: 2757600, pendingPayout: 50400, rating: 4.9, performance: "excellent", onTimeDeliveryRate: 98.5, returnRate: 0.8, activeProducts: 62, joinedDate: "2024-01-10", lastPayoutDate: "2026-05-15" },
  { id: "VND-004", vendorId: "VEND004", vendorName: "Snacks World Ltd", category: "Snacks", totalOrders: 780, grossSales: 890000, commission: 89000, commissionRate: 10, netPayout: 786660, pendingPayout: 14340, rating: 4.3, performance: "good", onTimeDeliveryRate: 91.2, returnRate: 3.4, activeProducts: 112, joinedDate: "2024-08-05", lastPayoutDate: "2026-05-01" },
  { id: "VND-005", vendorId: "VEND005", vendorName: "Beverage Hub Pvt Ltd", category: "Beverages", totalOrders: 1120, grossSales: 1340000, commission: 134000, commissionRate: 10, netPayout: 1183800, pendingPayout: 22200, rating: 4.5, performance: "good", onTimeDeliveryRate: 93.6, returnRate: 2.8, activeProducts: 78, joinedDate: "2024-04-22", lastPayoutDate: "2026-05-15" },
  { id: "VND-006", vendorId: "VEND006", vendorName: "Health Plus India", category: "Health", totalOrders: 520, grossSales: 780000, commission: 78000, commissionRate: 10, netPayout: 689220, pendingPayout: 12780, rating: 3.9, performance: "average", onTimeDeliveryRate: 87.4, returnRate: 5.2, activeProducts: 95, joinedDate: "2024-09-18", lastPayoutDate: "2026-04-30" },
  { id: "VND-007", vendorId: "VEND007", vendorName: "Spice Garden", category: "Groceries", totalOrders: 340, grossSales: 420000, commission: 42000, commissionRate: 10, netPayout: 371160, pendingPayout: 6840, rating: 4.2, performance: "good", onTimeDeliveryRate: 90.8, returnRate: 2.5, activeProducts: 54, joinedDate: "2025-01-12", lastPayoutDate: "2026-05-01" },
  { id: "VND-008", vendorId: "VEND008", vendorName: "Frozen Delights", category: "Frozen Foods", totalOrders: 185, grossSales: 245000, commission: 24500, commissionRate: 10, netPayout: 216585, pendingPayout: 3915, rating: 3.6, performance: "poor", onTimeDeliveryRate: 82.1, returnRate: 7.8, activeProducts: 38, joinedDate: "2025-03-08", lastPayoutDate: "2026-04-15" },
];

// ── Tax Report Entries ────────────────────────────────────

export interface TaxReportEntry {
  id: string;
  reportTitle: string;
  period: string;
  type: "GSTR-1" | "GSTR-3B" | "GSTR-9" | "TDS" | "ITC" | "Annual";
  totalTaxAmount: number;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  tds: number;
  status: "ready" | "generating" | "filed" | "pending" | "overdue";
  format: "xlsx" | "pdf" | "csv";
  fileSize: string;
  dueDate: string;
  generatedAt: string;
  filedDate?: string;
}

export const mockTaxReportEntries: TaxReportEntry[] = [
  { id: "TAX-001", reportTitle: "GSTR-3B Monthly Return - Apr 2026", period: "Apr 2026", type: "GSTR-3B", totalTaxAmount: 1120500, taxableValue: 11205000, cgst: 560250, sgst: 560250, igst: 0, tds: 0, status: "filed", format: "xlsx", fileSize: "3.2 MB", dueDate: "2026-05-20", generatedAt: "2026-05-18 10:30", filedDate: "2026-05-18" },
  { id: "TAX-002", reportTitle: "GSTR-1 Outward Supplies - Apr 2026", period: "Apr 2026", type: "GSTR-1", totalTaxAmount: 1120500, taxableValue: 11205000, cgst: 560250, sgst: 560250, igst: 0, tds: 0, status: "filed", format: "xlsx", fileSize: "2.8 MB", dueDate: "2026-05-11", generatedAt: "2026-05-10 14:20", filedDate: "2026-05-10" },
  { id: "TAX-003", reportTitle: "GSTR-3B Monthly Return - Mar 2026", period: "Mar 2026", type: "GSTR-3B", totalTaxAmount: 1082600, taxableValue: 10701000, cgst: 535050, sgst: 535050, igst: 12500, tds: 0, status: "filed", format: "xlsx", fileSize: "3.0 MB", dueDate: "2026-04-20", generatedAt: "2026-04-19 09:15", filedDate: "2026-04-19" },
  { id: "TAX-004", reportTitle: "Input Tax Credit Report - Q1 2026", period: "Jan-Mar 2026", type: "ITC", totalTaxAmount: 1185000, taxableValue: 31800000, cgst: 0, sgst: 0, igst: 0, tds: 0, status: "ready", format: "xlsx", fileSize: "1.5 MB", dueDate: "—", generatedAt: "2026-04-05 11:00" },
  { id: "TAX-005", reportTitle: "TDS Certificate Summary - FY 2025-26", period: "FY 2025-26", type: "TDS", totalTaxAmount: 1124500, taxableValue: 0, cgst: 0, sgst: 0, igst: 0, tds: 1124500, status: "ready", format: "pdf", fileSize: "1.1 MB", dueDate: "2026-07-31", generatedAt: "2026-04-10 16:45" },
  { id: "TAX-006", reportTitle: "GSTR-3B Monthly Return - May 2026", period: "May 2026", type: "GSTR-3B", totalTaxAmount: 1245000, taxableValue: 12450000, cgst: 622500, sgst: 622500, igst: 0, tds: 0, status: "pending", format: "xlsx", fileSize: "—", dueDate: "2026-06-20", generatedAt: "—" },
  { id: "TAX-007", reportTitle: "Annual GST Return - FY 2025-26", period: "FY 2025-26", type: "GSTR-9", totalTaxAmount: 11330000, taxableValue: 124500000, cgst: 5602500, sgst: 5602500, igst: 125000, tds: 0, status: "pending", format: "pdf", fileSize: "—", dueDate: "2026-12-31", generatedAt: "—" },
  { id: "TAX-008", reportTitle: "GSTR-1 Outward Supplies - Feb 2026", period: "Feb 2026", type: "GSTR-1", totalTaxAmount: 929100, taxableValue: 9207000, cgst: 460350, sgst: 460350, igst: 8400, tds: 0, status: "filed", format: "xlsx", fileSize: "2.5 MB", dueDate: "2026-03-11", generatedAt: "2026-03-10 13:20", filedDate: "2026-03-10" },
];
