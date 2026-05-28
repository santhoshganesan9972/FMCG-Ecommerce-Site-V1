// ── Mock Inventory Data ─────────────────────────────
// All mock data for Inventory Management module

import type { InventoryItem, Warehouse, StockTransfer, SafetyStockRule, FEFOBatch, DemandForecast, LowStockAlert } from "@/types/inventory";

// ── 1. Inventory Items ────────────────────────────────────
export const mockInventoryItems: InventoryItem[] = [
  { id: "INV-001", productName: "Organic Basmati Rice", sku: "RICE-BAS-001", barcode: "8901234567890", warehouse: "Mumbai Hub", warehouseId: "WH-001", stock: 120, reserved: 14, available: 106, lowStockThreshold: 10, safetyStock: 50, batch: "BATCH-001", expiryDate: "2027-01-15", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-002", productName: "Fresh Red Apples", sku: "FRUIT-APL-001", barcode: "8901234567891", warehouse: "Pune Cold Storage", warehouseId: "WH-002", stock: 85, reserved: 6, available: 79, lowStockThreshold: 15, safetyStock: 40, batch: "BATCH-002", expiryDate: "2026-06-10", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-003", productName: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", barcode: "8901234567892", warehouse: "Mumbai Hub", warehouseId: "WH-001", stock: 320, reserved: 28, available: 292, lowStockThreshold: 100, safetyStock: 150, batch: "BATCH-003", expiryDate: "2026-05-28", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-004", productName: "Natural Honey 500g", sku: "HEALTH-HNY-001", barcode: "8901234567893", warehouse: "Delhi Central", warehouseId: "WH-005", stock: 0, reserved: 0, available: 0, lowStockThreshold: 20, safetyStock: 30, batch: "BATCH-004", expiryDate: "2027-12-31", lastUpdated: "2026-05-18", status: "out_of_stock" },
  { id: "INV-005", productName: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", barcode: "8901234567894", warehouse: "Pune Cold Storage", warehouseId: "WH-002", stock: 56, reserved: 8, available: 48, lowStockThreshold: 20, safetyStock: 30, batch: "BATCH-005", expiryDate: "2026-05-26", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-006", productName: "Salted Butter 100g", sku: "DAIRY-BUT-001", barcode: "8901234567895", warehouse: "Mumbai Hub", warehouseId: "WH-001", stock: 5, reserved: 2, available: 3, lowStockThreshold: 15, safetyStock: 20, batch: "BATCH-006", expiryDate: "2026-06-15", lastUpdated: "2026-05-21", status: "low_stock" },
  { id: "INV-007", productName: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", barcode: "8901234567896", warehouse: "Bangalore Cold Room", warehouseId: "WH-003", stock: 42, reserved: 5, available: 37, lowStockThreshold: 15, safetyStock: 25, batch: "BATCH-007", expiryDate: "2026-08-20", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-008", productName: "Green Tea 100g Pouch", sku: "BEV-TEA-001", barcode: "8901234567897", warehouse: "Delhi Central", warehouseId: "WH-005", stock: 18, reserved: 3, available: 15, lowStockThreshold: 20, safetyStock: 25, batch: "BATCH-008", expiryDate: "2027-03-10", lastUpdated: "2026-05-20", status: "low_stock" },
  { id: "INV-009", productName: "Whole Wheat Atta 5kg", sku: "GROC-ATT-001", barcode: "8901234567898", warehouse: "Mumbai Hub", warehouseId: "WH-001", stock: 250, reserved: 30, available: 220, lowStockThreshold: 50, safetyStock: 80, batch: "BATCH-009", expiryDate: "2026-12-15", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-010", productName: "Toor Dal 1kg", sku: "GROC-DAL-001", barcode: "8901234567899", warehouse: "Delhi Central", warehouseId: "WH-005", stock: 180, reserved: 22, available: 158, lowStockThreshold: 40, safetyStock: 60, batch: "BATCH-010", expiryDate: "2027-06-01", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-011", productName: "Chicken Breast 500g", sku: "MEAT-CHK-001", barcode: "8901234567900", warehouse: "Pune Cold Storage", warehouseId: "WH-002", stock: 95, reserved: 12, available: 83, lowStockThreshold: 25, safetyStock: 35, batch: "BATCH-011", expiryDate: "2026-05-25", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-012", productName: "Paneer 200g", sku: "DAIRY-PAN-001", barcode: "8901234567901", warehouse: "Bangalore Cold Room", warehouseId: "WH-003", stock: 34, reserved: 5, available: 29, lowStockThreshold: 15, safetyStock: 20, batch: "BATCH-012", expiryDate: "2026-05-27", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-013", productName: "Coca Cola 2L", sku: "BEV-COK-001", barcode: "8901234567902", warehouse: "Mumbai Hub", warehouseId: "WH-001", stock: 450, reserved: 60, available: 390, lowStockThreshold: 100, safetyStock: 120, batch: "BATCH-013", expiryDate: "2026-11-30", lastUpdated: "2026-05-21", status: "in_stock" },
  { id: "INV-014", productName: "Olive Oil 1L", sku: "GROC-OIL-001", barcode: "8901234567903", warehouse: "Delhi Central", warehouseId: "WH-005", stock: 65, reserved: 8, available: 57, lowStockThreshold: 20, safetyStock: 30, batch: "BATCH-014", expiryDate: "2027-08-15", lastUpdated: "2026-05-20", status: "in_stock" },
  { id: "INV-015", productName: "Himalayan Pink Salt 500g", sku: "GROC-SLT-001", barcode: "8901234567904", warehouse: "Mumbai Hub", warehouseId: "WH-001", stock: 200, reserved: 15, available: 185, lowStockThreshold: 30, safetyStock: 50, batch: "BATCH-015", expiryDate: "2028-01-01", lastUpdated: "2026-05-19", status: "in_stock" },
];

// ── 2. Warehouses ─────────────────────────────────────────
export const mockWarehouses: Warehouse[] = [
  { id: "WH-001", name: "Mumbai Hub", type: "hub", location: "Mumbai, MH", address: "Plot 42, MIDC Industrial Area, Andheri East", city: "Mumbai", state: "Maharashtra", pincode: "400093", capacity: 50000, used: 38000, utilization: 76, status: "active", manager: "Rohit Sharma", contact: "+91 98765 43201", totalSkus: 1240, staffCount: 28, operatingHours: "24/7", products: 1240, createdAt: "2024-01-01" },
  { id: "WH-002", name: "Pune Cold Storage", type: "cold_storage", location: "Pune, MH", address: "Sector 15, Chakan Industrial Area", city: "Pune", state: "Maharashtra", pincode: "410501", capacity: 20000, used: 14500, utilization: 72.5, status: "active", manager: "Sneha Joshi", contact: "+91 98765 43202", totalSkus: 580, staffCount: 12, operatingHours: "06:00-22:00", products: 580, createdAt: "2024-02-15" },
  { id: "WH-003", name: "Bangalore Cold Room", type: "cold_storage", location: "Bangalore, KA", address: "88, Electronic City Phase 1", city: "Bangalore", state: "Karnataka", pincode: "560100", capacity: 25000, used: 19200, utilization: 76.8, status: "active", manager: "Priya Kumar", contact: "+91 98765 43204", totalSkus: 480, staffCount: 15, operatingHours: "24/7", products: 480, createdAt: "2024-03-01" },
  { id: "WH-004", name: "Hyderabad Depot", type: "depot", location: "Hyderabad, TG", address: "22, Hardware Park, Shamshabad", city: "Hyderabad", state: "Telangana", pincode: "501218", capacity: 30000, used: 21000, utilization: 70, status: "active", manager: "Rajesh Iyer", contact: "+91 98765 43206", totalSkus: 680, staffCount: 18, operatingHours: "08:00-20:00", products: 680, createdAt: "2024-04-10" },
  { id: "WH-005", name: "Delhi Central", type: "hub", location: "Delhi", address: "56, Okhla Industrial Estate, Phase 3", city: "Delhi", state: "Delhi", pincode: "110020", capacity: 60000, used: 42000, utilization: 70, status: "active", manager: "Amit Verma", contact: "+91 98765 43203", totalSkus: 2100, staffCount: 35, operatingHours: "24/7", products: 2100, createdAt: "2024-01-15" },
  { id: "WH-006", name: "Kolkata Distribution", type: "depot", location: "Kolkata, WB", address: "12, Sector V, Salt Lake City", city: "Kolkata", state: "West Bengal", pincode: "700091", capacity: 25000, used: 18000, utilization: 72, status: "maintenance", manager: "Suman Das", contact: "+91 98765 43205", totalSkus: 780, staffCount: 14, operatingHours: "08:00-20:00", products: 780, createdAt: "2024-05-01" },
  { id: "WH-007", name: "Chennai Hub", type: "hub", location: "Chennai, TN", address: "45, Guindy Industrial Estate", city: "Chennai", state: "Tamil Nadu", pincode: "600032", capacity: 30000, used: 12000, utilization: 40, status: "active", manager: "Karthik Nair", contact: "+91 98765 43207", totalSkus: 520, staffCount: 10, operatingHours: "06:00-22:00", products: 520, createdAt: "2024-06-01" },
];

// ── 3. Stock Transfers ────────────────────────────────────
export const mockStockTransfers: StockTransfer[] = [
  { id: "ST-001", product: "Organic Basmati Rice", sku: "RICE-BAS-001", fromWarehouse: "Mumbai Hub", fromWarehouseId: "WH-001", toWarehouse: "Pune Cold Storage", toWarehouseId: "WH-002", quantity: 200, status: "completed", initiatedBy: "Rohit Sharma", date: "2026-05-21", createdAt: "2026-05-21T08:00:00Z", completedAt: "2026-05-21T16:00:00Z", eta: "2026-05-21" },
  { id: "ST-002", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", fromWarehouse: "Mumbai Hub", fromWarehouseId: "WH-001", toWarehouse: "Pune Cold Storage", toWarehouseId: "WH-002", quantity: 500, status: "in_transit", initiatedBy: "Sneha Joshi", date: "2026-05-21", createdAt: "2026-05-21T10:00:00Z", completedAt: null, eta: "2026-05-22" },
  { id: "ST-003", product: "Fresh Red Apples", sku: "FRUIT-APL-001", fromWarehouse: "Pune Cold Storage", fromWarehouseId: "WH-002", toWarehouse: "Bangalore Cold Room", toWarehouseId: "WH-003", quantity: 100, status: "pending", initiatedBy: "Amit Verma", date: "2026-05-21", createdAt: "2026-05-21T14:00:00Z", completedAt: null, eta: "2026-05-23" },
  { id: "ST-004", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", fromWarehouse: "Pune Cold Storage", fromWarehouseId: "WH-002", toWarehouse: "Mumbai Hub", toWarehouseId: "WH-001", quantity: 80, status: "completed", initiatedBy: "Rohit Sharma", date: "2026-05-20", createdAt: "2026-05-20T09:00:00Z", completedAt: "2026-05-20T18:00:00Z", eta: "2026-05-20" },
  { id: "ST-005", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", fromWarehouse: "Mumbai Hub", fromWarehouseId: "WH-001", toWarehouse: "Delhi Central", toWarehouseId: "WH-005", quantity: 300, status: "cancelled", initiatedBy: "Priya Kumar", date: "2026-05-19", createdAt: "2026-05-19T11:00:00Z", completedAt: null, eta: "—" },
  { id: "ST-006", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", fromWarehouse: "Bangalore Cold Room", fromWarehouseId: "WH-003", toWarehouse: "Mumbai Hub", toWarehouseId: "WH-001", quantity: 150, status: "in_transit", initiatedBy: "Rajesh Iyer", date: "2026-05-21", createdAt: "2026-05-21T13:00:00Z", completedAt: null, eta: "2026-05-22" },
  { id: "ST-007", product: "Whole Wheat Atta 5kg", sku: "GROC-ATT-001", fromWarehouse: "Delhi Central", fromWarehouseId: "WH-005", toWarehouse: "Kolkata Distribution", toWarehouseId: "WH-006", quantity: 500, status: "pending", initiatedBy: "Suman Das", date: "2026-05-22", createdAt: "2026-05-22T06:00:00Z", completedAt: null, eta: "2026-05-24" },
  { id: "ST-008", product: "Toor Dal 1kg", sku: "GROC-DAL-001", fromWarehouse: "Delhi Central", fromWarehouseId: "WH-005", toWarehouse: "Chennai Hub", toWarehouseId: "WH-007", quantity: 200, status: "completed", initiatedBy: "Karthik Nair", date: "2026-05-18", createdAt: "2026-05-18T07:00:00Z", completedAt: "2026-05-19T12:00:00Z", eta: "2026-05-19" },
];

// ── 4. Safety Stock Rules ─────────────────────────────────
export const mockSafetyStockRules: SafetyStockRule[] = [
  { id: "SS-001", product: "Organic Basmati Rice", sku: "RICE-BAS-001", currentStock: 120, safetyLevel: 50, reorderPoint: 80, leadTime: 3, status: "safe", dailyUsage: 18, lastUpdated: "2026-05-21" },
  { id: "SS-002", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", currentStock: 320, safetyLevel: 150, reorderPoint: 200, leadTime: 1, status: "safe", dailyUsage: 95, lastUpdated: "2026-05-21" },
  { id: "SS-003", product: "Fresh Red Apples", sku: "FRUIT-APL-001", currentStock: 85, safetyLevel: 40, reorderPoint: 60, leadTime: 2, status: "safe", dailyUsage: 22, lastUpdated: "2026-05-21" },
  { id: "SS-004", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", currentStock: 0, safetyLevel: 30, reorderPoint: 50, leadTime: 5, status: "critical", dailyUsage: 8, lastUpdated: "2026-05-18" },
  { id: "SS-005", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", currentStock: 5, safetyLevel: 20, reorderPoint: 35, leadTime: 2, status: "critical", dailyUsage: 12, lastUpdated: "2026-05-21" },
  { id: "SS-006", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", currentStock: 56, safetyLevel: 30, reorderPoint: 45, leadTime: 2, status: "warning", dailyUsage: 15, lastUpdated: "2026-05-21" },
  { id: "SS-007", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", currentStock: 42, safetyLevel: 25, reorderPoint: 35, leadTime: 4, status: "safe", dailyUsage: 8, lastUpdated: "2026-05-21" },
  { id: "SS-008", product: "Green Tea 100g Pouch", sku: "BEV-TEA-001", currentStock: 18, safetyLevel: 25, reorderPoint: 40, leadTime: 3, status: "warning", dailyUsage: 9, lastUpdated: "2026-05-20" },
  { id: "SS-009", product: "Chicken Breast 500g", sku: "MEAT-CHK-001", currentStock: 95, safetyLevel: 35, reorderPoint: 50, leadTime: 2, status: "safe", dailyUsage: 28, lastUpdated: "2026-05-21" },
  { id: "SS-010", product: "Paneer 200g", sku: "DAIRY-PAN-001", currentStock: 34, safetyLevel: 20, reorderPoint: 30, leadTime: 2, status: "safe", dailyUsage: 12, lastUpdated: "2026-05-21" },
];

// ── 5. FEFO Batches ───────────────────────────────────────
export const mockFEFOBatches: FEFOBatch[] = [
  { id: "BATCH-FEFO-001", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", batch: "BATCH-003", quantity: 320, manufactured: "2026-05-14", expiry: "2026-05-28", daysLeft: 4, warehouse: "Mumbai Hub", status: "expiring_soon" },
  { id: "BATCH-FEFO-002", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", batch: "BATCH-005", quantity: 56, manufactured: "2026-05-12", expiry: "2026-05-26", daysLeft: 2, warehouse: "Pune Cold Storage", status: "expiring_soon" },
  { id: "BATCH-FEFO-003", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", batch: "BATCH-007", quantity: 42, manufactured: "2026-03-20", expiry: "2026-08-20", daysLeft: 87, warehouse: "Bangalore Cold Room", status: "fresh" },
  { id: "BATCH-FEFO-004", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", batch: "BATCH-006", quantity: 5, manufactured: "2026-04-15", expiry: "2026-06-15", daysLeft: 22, warehouse: "Mumbai Hub", status: "fresh" },
  { id: "BATCH-FEFO-005", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", batch: "BATCH-004", quantity: 0, manufactured: "2025-12-31", expiry: "2027-12-31", daysLeft: 586, warehouse: "Delhi Central", status: "fresh" },
  { id: "BATCH-FEFO-006", product: "Fresh Red Apples", sku: "FRUIT-APL-001", batch: "BATCH-002", quantity: 85, manufactured: "2026-05-10", expiry: "2026-06-10", daysLeft: 17, warehouse: "Pune Cold Storage", status: "fresh" },
  { id: "BATCH-FEFO-007", product: "Organic Basmati Rice", sku: "RICE-BAS-001", batch: "BATCH-001", quantity: 120, manufactured: "2025-07-15", expiry: "2027-01-15", daysLeft: 236, warehouse: "Mumbai Hub", status: "fresh" },
  { id: "BATCH-FEFO-008", product: "Chicken Breast 500g", sku: "MEAT-CHK-001", batch: "BATCH-011", quantity: 95, manufactured: "2026-05-18", expiry: "2026-05-25", daysLeft: 1, warehouse: "Pune Cold Storage", status: "expiring_soon" },
  { id: "BATCH-FEFO-009", product: "Paneer 200g", sku: "DAIRY-PAN-001", batch: "BATCH-012", quantity: 34, manufactured: "2026-05-17", expiry: "2026-05-27", daysLeft: 3, warehouse: "Bangalore Cold Room", status: "expiring_soon" },
  { id: "BATCH-FEFO-010", product: "Whole Wheat Atta 5kg", sku: "GROC-ATT-001", batch: "BATCH-009", quantity: 250, manufactured: "2026-04-15", expiry: "2026-12-15", daysLeft: 205, warehouse: "Mumbai Hub", status: "fresh" },
];

// ── 6. Demand Forecasts ───────────────────────────────────
export const mockDemandForecasts: DemandForecast[] = [
  { id: "FC-001", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", currentStock: 320, predictedDemand: 380, trend: "up", confidence: 92, nextOrderDate: "2026-05-28" },
  { id: "FC-002", product: "Organic Basmati Rice", sku: "RICE-BAS-001", currentStock: 120, predictedDemand: 95, trend: "down", confidence: 85, nextOrderDate: "2026-06-15" },
  { id: "FC-003", product: "Fresh Red Apples", sku: "FRUIT-APL-001", currentStock: 85, predictedDemand: 110, trend: "up", confidence: 78, nextOrderDate: "2026-06-01" },
  { id: "FC-004", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", currentStock: 56, predictedDemand: 65, trend: "up", confidence: 88, nextOrderDate: "2026-05-26" },
  { id: "FC-005", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", currentStock: 42, predictedDemand: 55, trend: "up", confidence: 72, nextOrderDate: "2026-06-10" },
  { id: "FC-006", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", currentStock: 0, predictedDemand: 25, trend: "up", confidence: 95, nextOrderDate: "2026-05-25" },
  { id: "FC-007", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", currentStock: 5, predictedDemand: 30, trend: "up", confidence: 82, nextOrderDate: "2026-05-24" },
  { id: "FC-008", product: "Green Tea 100g Pouch", sku: "BEV-TEA-001", currentStock: 18, predictedDemand: 22, trend: "stable", confidence: 76, nextOrderDate: "2026-06-05" },
  { id: "FC-009", product: "Coca Cola 2L", sku: "BEV-COK-001", currentStock: 450, predictedDemand: 520, trend: "up", confidence: 90, nextOrderDate: "2026-05-30" },
  { id: "FC-010", product: "Olive Oil 1L", sku: "GROC-OIL-001", currentStock: 65, predictedDemand: 55, trend: "down", confidence: 68, nextOrderDate: "2026-06-20" },
];

// ── 7. Low Stock Alerts ───────────────────────────────────
export const mockLowStockAlerts: LowStockAlert[] = [
  { id: "ALERT-001", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", stock: 0, threshold: 20, warehouse: "Delhi Central", status: "critical", lastRestocked: "2026-04-15", suggestedOrder: 50 },
  { id: "ALERT-002", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", stock: 5, threshold: 15, warehouse: "Mumbai Hub", status: "critical", lastRestocked: "2026-05-10", suggestedOrder: 30 },
  { id: "ALERT-003", product: "Green Tea 100g Pouch", sku: "BEV-TEA-001", stock: 18, threshold: 20, warehouse: "Delhi Central", status: "warning", lastRestocked: "2026-05-15", suggestedOrder: 25 },
  { id: "ALERT-004", product: "Paneer 200g", sku: "DAIRY-PAN-001", stock: 34, threshold: 15, warehouse: "Bangalore Cold Room", status: "warning", lastRestocked: "2026-05-18", suggestedOrder: 20 },
  { id: "ALERT-005", product: "Chicken Breast 500g", sku: "MEAT-CHK-001", stock: 95, threshold: 25, warehouse: "Pune Cold Storage", status: "warning", lastRestocked: "2026-05-19", suggestedOrder: 40 },
];
