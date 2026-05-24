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

export const mockCustomerReports: CustomerReport[] = [
  { customerId: "CUST001", name: "John Doe", email: "john.doe@example.com", totalOrders: 156, totalSpent: 125000, avgOrderValue: 801, lastOrderDate: "2026-05-21", lifetimeValue: "₹1.25L", segment: "high", acquisitionChannel: "Referral", retentionRate: 92 },
  { customerId: "CUST002", name: "Jane Smith", email: "jane.smith@example.com", totalOrders: 89, totalSpent: 72000, avgOrderValue: 809, lastOrderDate: "2026-05-20", lifetimeValue: "₹72K", segment: "medium", acquisitionChannel: "Organic", retentionRate: 85 },
  { customerId: "CUST003", name: "Bob Johnson", email: "bob.johnson@example.com", totalOrders: 42, totalSpent: 32000, avgOrderValue: 762, lastOrderDate: "2026-05-18", lifetimeValue: "₹32K", segment: "low", acquisitionChannel: "Paid Ads", retentionRate: 68 },
  { customerId: "CUST004", name: "Alice Brown", email: "alice.brown@example.com", totalOrders: 201, totalSpent: 285000, avgOrderValue: 1418, lastOrderDate: "2026-05-21", lifetimeValue: "₹2.85L", segment: "high", acquisitionChannel: "Referral", retentionRate: 96 },
  { customerId: "CUST005", name: "Charlie Wilson", email: "charlie.wilson@example.com", totalOrders: 12, totalSpent: 15000, avgOrderValue: 1250, lastOrderDate: "2026-05-15", lifetimeValue: "₹15K", segment: "new", acquisitionChannel: "Email Campaign", retentionRate: 45 },
  { customerId: "CUST006", name: "Diana Prince", email: "diana.prince@example.com", totalOrders: 78, totalSpent: 84000, avgOrderValue: 1077, lastOrderDate: "2026-05-19", lifetimeValue: "₹84K", segment: "medium", acquisitionChannel: "Social Media", retentionRate: 78 },
  { customerId: "CUST007", name: "Eve Adams", email: "eve.adams@example.com", totalOrders: 3, totalSpent: 4500, avgOrderValue: 1500, lastOrderDate: "2026-05-10", lifetimeValue: "₹4.5K", segment: "new", acquisitionChannel: "Paid Ads", retentionRate: 30 },
  { customerId: "CUST008", name: "Frank Miller", email: "frank.miller@example.com", totalOrders: 145, totalSpent: 112000, avgOrderValue: 772, lastOrderDate: "2026-05-21", lifetimeValue: "₹1.12L", segment: "high", acquisitionChannel: "Organic", retentionRate: 88 },
];

export const mockVendorReports: VendorReportEntry[] = [
  { vendorId: "VEND001", vendorName: "Fresh Foods Pvt Ltd", category: "Groceries", totalOrders: 156, grossSales: 125000, commission: 12500, netPayout: 110475, rating: 4.8, performance: "excellent" },
  { vendorId: "VEND002", vendorName: "Organic Farms", category: "Fruits & Veg", totalOrders: 89, grossSales: 78500, commission: 7850, netPayout: 69380, rating: 4.6, performance: "good" },
  { vendorId: "VEND003", vendorName: "Daily Essentials Co", category: "Dairy", totalOrders: 234, grossSales: 189000, commission: 18900, netPayout: 167045, rating: 4.9, performance: "excellent" },
  { vendorId: "VEND004", vendorName: "Snacks World", category: "Snacks", totalOrders: 67, grossSales: 45600, commission: 4560, netPayout: 40303, rating: 4.3, performance: "average" },
  { vendorId: "VEND005", vendorName: "Beverage Hub", category: "Beverages", totalOrders: 112, grossSales: 98000, commission: 9800, netPayout: 86620, rating: 4.5, performance: "good" },
  { vendorId: "VEND006", vendorName: "Health Plus", category: "Health", totalOrders: 45, grossSales: 52000, commission: 5200, netPayout: 45960, rating: 3.9, performance: "average" },
];

export const mockInventoryReports: InventoryReportEntry[] = [
  { sku: "RICE-BAS-001", productName: "Organic Basmati Rice", category: "Groceries", totalStock: 120, reserved: 14, available: 106, damaged: 0, reorderPoint: 20, daysUntilStockout: 45, monthlyVelocity: 65, turnoverRate: 4.2 },
  { sku: "FRUIT-APL-001", productName: "Fresh Red Apples", category: "Fruits", totalStock: 85, reserved: 6, available: 78, damaged: 1, reorderPoint: 30, daysUntilStockout: 15, monthlyVelocity: 140, turnoverRate: 8.5 },
  { sku: "HEALTH-HNY-001", productName: "Natural Honey 500g", category: "Health", totalStock: 0, reserved: 0, available: 0, damaged: 0, reorderPoint: 20, daysUntilStockout: 0, monthlyVelocity: 35, turnoverRate: 2.1 },
  { sku: "DAIRY-MLK-001", productName: "Full Cream Milk 1L", category: "Dairy", totalStock: 320, reserved: 28, available: 288, damaged: 4, reorderPoint: 100, daysUntilStockout: 2, monthlyVelocity: 1200, turnoverRate: 18.5 },
  { sku: "BEV-COF-001", productName: "Cold Brew Coffee 250ml", category: "Beverages", totalStock: 42, reserved: 8, available: 33, damaged: 1, reorderPoint: 50, daysUntilStockout: 10, monthlyVelocity: 90, turnoverRate: 6.8 },
  { sku: "SNK-CHP-001", productName: "Baked Multigrain Chips", category: "Snacks", totalStock: 210, reserved: 22, available: 185, damaged: 3, reorderPoint: 60, daysUntilStockout: 20, monthlyVelocity: 280, turnoverRate: 10.2 },
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
