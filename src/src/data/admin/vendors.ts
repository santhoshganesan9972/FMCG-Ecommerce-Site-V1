import type {
  Vendor,
  VendorOnboarding,
  VendorProduct,
  VendorSettlement,
  VendorAnalyticsEntry,
} from "@/types/vendors";

// ── Vendors ───────────────────────────────────────────────

export const mockVendors: Vendor[] = [
  {
    id: "VND-001", vendorId: "VEND001", name: "Fortune Foods Ltd", email: "fortune@example.com",
    phone: "+91 22 4123 4567", category: "Groceries", subCategories: ["Rice", "Dal", "Spices"],
    status: "active", performance: "excellent", rating: 4.8, totalProducts: 145, activeProducts: 138,
    totalOrders: 4820, totalSales: 12500000, commissionRate: 10, totalCommission: 1250000,
    netPayout: 11045000, pendingPayout: 205000, onTimeDeliveryRate: 97.2, returnRate: 1.2,
    city: "Mumbai", state: "Maharashtra", pincode: "400001", address: "12, Nariman Point, Mumbai",
    gstin: "27AABCF1234H1Z1", pan: "AABCF1234H", bankAccount: "XXXX XXXX 4567",
    ifsc: "HDFC0001234", bankName: "HDFC Bank", contactPerson: "Rajesh Fortune",
    joinedDate: "2024-01-15", lastActiveDate: "2026-05-24", tags: ["top-seller", "verified", "fssai"],
    notes: "Premium grocery supplier with consistent quality.",
  },
  {
    id: "VND-002", vendorId: "VEND002", name: "Kashmir Fruit Co.", email: "kashmir@example.com",
    phone: "+91 11 4234 5678", category: "Fruits & Veg", subCategories: ["Apples", "Dry Fruits"],
    status: "active", performance: "excellent", rating: 4.6, totalProducts: 88, activeProducts: 82,
    totalOrders: 3240, totalSales: 7800000, commissionRate: 12, totalCommission: 936000,
    netPayout: 6864000, pendingPayout: 136000, onTimeDeliveryRate: 94.8, returnRate: 2.1,
    city: "Srinagar", state: "J&K", pincode: "190001", address: "Lal Chowk, Srinagar",
    gstin: "01AABCK5678G1Z1", pan: "AABCK5678G", bankAccount: "XXXX XXXX 8901",
    ifsc: "SBI0001234", bankName: "State Bank of India", contactPerson: "Farooq Ahmed",
    joinedDate: "2024-02-20", lastActiveDate: "2026-05-23", tags: ["seasonal", "verified"],
    notes: "Specializes in premium Kashmiri apples and dry fruits.",
  },
  {
    id: "VND-003", vendorId: "VEND003", name: "Amul Dairy Products", email: "amul@example.com",
    phone: "+91 79 4345 6789", category: "Dairy", subCategories: ["Milk", "Butter", "Cheese", "Yogurt"],
    status: "active", performance: "excellent", rating: 4.9, totalProducts: 62, activeProducts: 60,
    totalOrders: 8920, totalSales: 18900000, commissionRate: 8, totalCommission: 1512000,
    netPayout: 17388000, pendingPayout: 312000, onTimeDeliveryRate: 98.5, returnRate: 0.8,
    city: "Anand", state: "Gujarat", pincode: "388001", address: "Amul Dairy Road, Anand",
    gstin: "24AABCA9012H1Z1", pan: "AABCA9012H", bankAccount: "XXXX XXXX 2345",
    ifsc: "ICIC0001234", bankName: "ICICI Bank", contactPerson: "Suresh Patel",
    joinedDate: "2024-01-01", lastActiveDate: "2026-05-24", tags: ["top-seller", "verified", "fssai", "iso"],
    notes: "National dairy brand. Highest volume vendor.",
  },
  {
    id: "VND-004", vendorId: "VEND004", name: "Snack World Distributors", email: "snack@example.com",
    phone: "+91 33 4456 7890", category: "Snacks", subCategories: ["Chips", "Namkeen", "Biscuits"],
    status: "pending", performance: "average", rating: 3.8, totalProducts: 42, activeProducts: 28,
    totalOrders: 1240, totalSales: 4560000, commissionRate: 15, totalCommission: 684000,
    netPayout: 3876000, pendingPayout: 84000, onTimeDeliveryRate: 88.4, returnRate: 4.2,
    city: "Kolkata", state: "West Bengal", pincode: "700001", address: "Park Street, Kolkata",
    gstin: "19AABCS3456H1Z1", pan: "AABCS3456H", bankAccount: "XXXX XXXX 6789",
    ifsc: "AXIS0001234", bankName: "Axis Bank", contactPerson: "Debashish Roy",
    joinedDate: "2026-04-01", lastActiveDate: "2026-05-20", tags: ["new-vendor"],
    notes: "New vendor — pending final document verification.",
  },
  {
    id: "VND-005", vendorId: "VEND005", name: "Happilo International", email: "happilo@example.com",
    phone: "+91 44 4567 8901", category: "Health & Wellness", subCategories: ["Nuts", "Seeds", "Superfoods"],
    status: "active", performance: "good", rating: 4.5, totalProducts: 95, activeProducts: 88,
    totalOrders: 2890, totalSales: 8900000, commissionRate: 11, totalCommission: 979000,
    netPayout: 7921000, pendingPayout: 179000, onTimeDeliveryRate: 93.6, returnRate: 2.8,
    city: "Chennai", state: "Tamil Nadu", pincode: "600001", address: "Anna Salai, Chennai",
    gstin: "33AABCH7890H1Z1", pan: "AABCH7890H", bankAccount: "XXXX XXXX 0123",
    ifsc: "KOTAK0001234", bankName: "Kotak Mahindra Bank", contactPerson: "Priya Krishnan",
    joinedDate: "2024-03-10", lastActiveDate: "2026-05-22", tags: ["verified", "fssai"],
    notes: "Premium health food brand with strong online presence.",
  },
  {
    id: "VND-006", vendorId: "VEND006", name: "Dabur India Ltd", email: "dabur@example.com",
    phone: "+91 11 4678 9012", category: "Health & Wellness", subCategories: ["Juices", "Honey", "Ayurveda"],
    status: "active", performance: "excellent", rating: 4.7, totalProducts: 128, activeProducts: 122,
    totalOrders: 5640, totalSales: 15600000, commissionRate: 9, totalCommission: 1404000,
    netPayout: 14196000, pendingPayout: 204000, onTimeDeliveryRate: 96.8, returnRate: 1.5,
    city: "Delhi", state: "Delhi", pincode: "110001", address: "Connaught Place, New Delhi",
    gstin: "07AABCD1234H1Z1", pan: "AABCD1234H", bankAccount: "XXXX XXXX 3456",
    ifsc: "HDFC0005678", bankName: "HDFC Bank", contactPerson: "Amit Sharma",
    joinedDate: "2024-01-05", lastActiveDate: "2026-05-24", tags: ["top-seller", "verified", "fssai", "iso"],
    notes: "National FMCG brand. High-volume, consistent performer.",
  },
  {
    id: "VND-007", vendorId: "VEND007", name: "Spice Garden Exports", email: "spicegarden@example.com",
    phone: "+91 484 4789 0123", category: "Spices", subCategories: ["Whole Spices", "Ground Spices", "Blends"],
    status: "active", performance: "good", rating: 4.3, totalProducts: 68, activeProducts: 62,
    totalOrders: 1820, totalSales: 5200000, commissionRate: 12, totalCommission: 624000,
    netPayout: 4576000, pendingPayout: 124000, onTimeDeliveryRate: 91.2, returnRate: 3.1,
    city: "Kochi", state: "Kerala", pincode: "682001", address: "MG Road, Kochi",
    gstin: "32AABCS5678H1Z1", pan: "AABCS5678H", bankAccount: "XXXX XXXX 7890",
    ifsc: "CANARA0001234", bankName: "Canara Bank", contactPerson: "Thomas Mathew",
    joinedDate: "2024-05-15", lastActiveDate: "2026-05-21", tags: ["verified", "export-quality"],
    notes: "Kerala-based spice exporter with premium quality.",
  },
  {
    id: "VND-008", vendorId: "VEND008", name: "Frozen Delights Co.", email: "frozen@example.com",
    phone: "+91 20 4890 1234", category: "Frozen Foods", subCategories: ["Ice Cream", "Frozen Veg", "Ready Meals"],
    status: "suspended", performance: "poor", rating: 3.2, totalProducts: 38, activeProducts: 12,
    totalOrders: 680, totalSales: 2450000, commissionRate: 14, totalCommission: 343000,
    netPayout: 2107000, pendingPayout: 0, onTimeDeliveryRate: 78.4, returnRate: 8.9,
    city: "Pune", state: "Maharashtra", pincode: "411001", address: "FC Road, Pune",
    gstin: "27AABCF9012H1Z1", pan: "AABCF9012H", bankAccount: "XXXX XXXX 1234",
    ifsc: "PNB0001234", bankName: "Punjab National Bank", contactPerson: "Vikram Joshi",
    joinedDate: "2025-01-20", lastActiveDate: "2026-04-15", tags: ["suspended", "quality-issue"],
    notes: "Suspended due to repeated quality complaints and high return rate.",
  },
];

// ── Vendor Onboarding ─────────────────────────────────────

export const mockVendorOnboarding: VendorOnboarding[] = [
  {
    id: "ONB-001", company: "Fresh Farms Ltd.", owner: "Rajesh Patel",
    email: "rajesh@freshfarms.com", phone: "+91-98765-43210",
    category: "Fruits & Vegetables", status: "pending_review",
    appliedDate: "2026-05-18", city: "Ahmedabad", state: "Gujarat",
    expectedMonthlyVolume: 500000,
    documents: [
      { type: "GST", status: "uploaded", uploadedAt: "2026-05-18" },
      { type: "PAN", status: "uploaded", uploadedAt: "2026-05-18" },
      { type: "Bank Details", status: "uploaded", uploadedAt: "2026-05-18" },
    ],
  },
  {
    id: "ONB-002", company: "Daily Dairy Co.", owner: "Meena Sharma",
    email: "meena@dailydairy.com", phone: "+91-98765-43211",
    category: "Dairy", status: "approved",
    appliedDate: "2026-05-16", reviewedDate: "2026-05-19", reviewedBy: "Admin",
    city: "Jaipur", state: "Rajasthan", expectedMonthlyVolume: 800000,
    documents: [
      { type: "GST", status: "verified", uploadedAt: "2026-05-16", verifiedAt: "2026-05-19" },
      { type: "PAN", status: "verified", uploadedAt: "2026-05-16", verifiedAt: "2026-05-19" },
      { type: "Bank Details", status: "verified", uploadedAt: "2026-05-16", verifiedAt: "2026-05-19" },
      { type: "FSSAI", status: "verified", uploadedAt: "2026-05-17", verifiedAt: "2026-05-19" },
    ],
  },
  {
    id: "ONB-003", company: "Organic Harvest", owner: "Vikram Singh",
    email: "vikram@organicharvest.com", phone: "+91-98765-43212",
    category: "Organic Foods", status: "pending_documents",
    appliedDate: "2026-05-15", city: "Bengaluru", state: "Karnataka",
    expectedMonthlyVolume: 300000,
    documents: [
      { type: "GST", status: "uploaded", uploadedAt: "2026-05-15" },
      { type: "PAN", status: "uploaded", uploadedAt: "2026-05-15" },
      { type: "FSSAI", status: "pending" },
      { type: "Bank Details", status: "pending" },
    ],
  },
  {
    id: "ONB-004", company: "Spice World", owner: "Anita Gupta",
    email: "anita@spiceworld.com", phone: "+91-98765-43213",
    category: "Spices", status: "rejected",
    appliedDate: "2026-05-14", reviewedDate: "2026-05-17", reviewedBy: "Admin",
    rejectionReason: "Incomplete documentation — FSSAI license missing",
    city: "Hyderabad", state: "Telangana", expectedMonthlyVolume: 200000,
    documents: [
      { type: "GST", status: "verified", uploadedAt: "2026-05-14", verifiedAt: "2026-05-17" },
      { type: "PAN", status: "verified", uploadedAt: "2026-05-14", verifiedAt: "2026-05-17" },
      { type: "Bank Details", status: "verified", uploadedAt: "2026-05-14", verifiedAt: "2026-05-17" },
      { type: "FSSAI", status: "rejected", uploadedAt: "2026-05-14", rejectionReason: "License expired" },
    ],
  },
  {
    id: "ONB-005", company: "Baker's Delight", owner: "Suresh Reddy",
    email: "suresh@bakersdelight.com", phone: "+91-98765-43214",
    category: "Bakery", status: "pending_review",
    appliedDate: "2026-05-13", city: "Chennai", state: "Tamil Nadu",
    expectedMonthlyVolume: 400000,
    documents: [
      { type: "GST", status: "uploaded", uploadedAt: "2026-05-13" },
      { type: "PAN", status: "uploaded", uploadedAt: "2026-05-13" },
      { type: "FSSAI", status: "uploaded", uploadedAt: "2026-05-14" },
      { type: "Bank Details", status: "uploaded", uploadedAt: "2026-05-14" },
    ],
  },
  {
    id: "ONB-006", company: "Green Valley Farms", owner: "Priya Nair",
    email: "priya@greenvalley.com", phone: "+91-98765-43215",
    category: "Organic Foods", status: "processing",
    appliedDate: "2026-05-20", city: "Kochi", state: "Kerala",
    expectedMonthlyVolume: 600000,
    documents: [
      { type: "GST", status: "verified", uploadedAt: "2026-05-20", verifiedAt: "2026-05-22" },
      { type: "PAN", status: "verified", uploadedAt: "2026-05-20", verifiedAt: "2026-05-22" },
      { type: "FSSAI", status: "verified", uploadedAt: "2026-05-21", verifiedAt: "2026-05-22" },
      { type: "Bank Details", status: "verified", uploadedAt: "2026-05-21", verifiedAt: "2026-05-22" },
      { type: "Trade License", status: "uploaded", uploadedAt: "2026-05-22" },
    ],
  },
];

// ── Vendor Products ───────────────────────────────────────

export const mockVendorProducts: VendorProduct[] = [
  { id: "VP-001", vendorId: "VEND001", vendorName: "Fortune Foods Ltd", productName: "Organic Basmati Rice 5kg", sku: "FF-RICE-001", category: "Groceries", price: 485, mrp: 550, costPrice: 380, margin: 21.6, stock: 420, reserved: 38, sold: 2840, status: "active", rating: 4.7, returnRate: 0.8, lastRestocked: "2026-05-15", createdAt: "2024-02-01" },
  { id: "VP-002", vendorId: "VEND003", vendorName: "Amul Dairy Products", productName: "Full Cream Milk 1L", sku: "AD-MILK-001", category: "Dairy", price: 68, mrp: 72, costPrice: 52, margin: 23.5, stock: 1200, reserved: 145, sold: 18500, status: "active", rating: 4.9, returnRate: 0.3, lastRestocked: "2026-05-24", createdAt: "2024-01-10" },
  { id: "VP-003", vendorId: "VEND002", vendorName: "Kashmir Fruit Co.", productName: "Premium Kashmiri Apples 1kg", sku: "KF-APL-001", category: "Fruits & Veg", price: 280, mrp: 320, costPrice: 210, margin: 25.0, stock: 85, reserved: 12, sold: 3200, status: "active", rating: 4.8, returnRate: 1.2, lastRestocked: "2026-05-20", createdAt: "2024-03-01" },
  { id: "VP-004", vendorId: "VEND006", vendorName: "Dabur India Ltd", productName: "Real Fruit Juice 1L", sku: "DI-JUI-001", category: "Beverages", price: 120, mrp: 135, costPrice: 88, margin: 26.7, stock: 680, reserved: 55, sold: 8900, status: "active", rating: 4.6, returnRate: 0.9, lastRestocked: "2026-05-18", createdAt: "2024-01-15" },
  { id: "VP-005", vendorId: "VEND005", vendorName: "Happilo International", productName: "Premium Cashews 250g", sku: "HI-CSH-001", category: "Health & Wellness", price: 380, mrp: 420, costPrice: 290, margin: 23.7, stock: 195, reserved: 22, sold: 2100, status: "active", rating: 4.5, returnRate: 1.8, lastRestocked: "2026-05-14", createdAt: "2024-04-01" },
  { id: "VP-006", vendorId: "VEND007", vendorName: "Spice Garden Exports", productName: "Turmeric Powder 200g", sku: "SG-TUR-001", category: "Spices", price: 95, mrp: 110, costPrice: 68, margin: 28.4, stock: 340, reserved: 28, sold: 4500, status: "active", rating: 4.4, returnRate: 1.5, lastRestocked: "2026-05-10", createdAt: "2024-06-01" },
  { id: "VP-007", vendorId: "VEND003", vendorName: "Amul Dairy Products", productName: "Amul Butter 500g", sku: "AD-BUT-001", category: "Dairy", price: 285, mrp: 310, costPrice: 220, margin: 22.8, stock: 380, reserved: 42, sold: 6200, status: "active", rating: 4.8, returnRate: 0.5, lastRestocked: "2026-05-22", createdAt: "2024-01-10" },
  { id: "VP-008", vendorId: "VEND004", vendorName: "Snack World Distributors", productName: "Baked Multigrain Chips 200g", sku: "SW-CHP-001", category: "Snacks", price: 85, mrp: 95, costPrice: 62, margin: 27.1, stock: 0, reserved: 0, sold: 1800, status: "out_of_stock", rating: 3.9, returnRate: 3.8, lastRestocked: "2026-04-28", createdAt: "2026-04-15" },
  { id: "VP-009", vendorId: "VEND006", vendorName: "Dabur India Ltd", productName: "Dabur Honey 500g", sku: "DI-HNY-001", category: "Health & Wellness", price: 320, mrp: 360, costPrice: 240, margin: 25.0, stock: 245, reserved: 18, sold: 5400, status: "active", rating: 4.7, returnRate: 0.7, lastRestocked: "2026-05-16", createdAt: "2024-01-15" },
  { id: "VP-010", vendorId: "VEND001", vendorName: "Fortune Foods Ltd", productName: "Toor Dal 1kg", sku: "FF-DAL-001", category: "Groceries", price: 145, mrp: 165, costPrice: 112, margin: 22.8, stock: 520, reserved: 42, sold: 3800, status: "active", rating: 4.6, returnRate: 1.1, lastRestocked: "2026-05-08", createdAt: "2024-02-01" },
  { id: "VP-011", vendorId: "VEND005", vendorName: "Happilo International", productName: "Mixed Nuts 500g", sku: "HI-NUT-001", category: "Health & Wellness", price: 680, mrp: 750, costPrice: 520, margin: 23.5, stock: 88, reserved: 10, sold: 1240, status: "active", rating: 4.6, returnRate: 2.1, lastRestocked: "2026-05-12", createdAt: "2024-04-01" },
  { id: "VP-012", vendorId: "VEND008", vendorName: "Frozen Delights Co.", productName: "Vanilla Ice Cream 500ml", sku: "FD-ICE-001", category: "Frozen Foods", price: 180, mrp: 200, costPrice: 140, margin: 22.2, stock: 45, reserved: 5, sold: 890, status: "inactive", rating: 3.2, returnRate: 9.2, lastRestocked: "2026-04-10", createdAt: "2025-02-01" },
];

// ── Vendor Settlements ────────────────────────────────────

export const mockVendorSettlements: VendorSettlement[] = [
  { id: "STL-001", vendorId: "VEND001", vendorName: "Fortune Foods Ltd", period: "May 1-15, 2026", periodStart: "2026-05-01", periodEnd: "2026-05-15", totalOrders: 245, grossSales: 458000, returns: 5500, netSales: 452500, commissionRate: 10, commission: 45250, tax: 8145, adjustments: 0, netPayable: 399105, status: "pending", dueDate: "2026-05-25", bankAccount: "XXXX XXXX 4567", ifsc: "HDFC0001234" },
  { id: "STL-002", vendorId: "VEND003", vendorName: "Amul Dairy Products", period: "May 1-15, 2026", periodStart: "2026-05-01", periodEnd: "2026-05-15", totalOrders: 412, grossSales: 762000, returns: 6100, netSales: 755900, commissionRate: 8, commission: 60472, tax: 10885, adjustments: 0, netPayable: 684543, status: "processing", dueDate: "2026-05-26", bankAccount: "XXXX XXXX 2345", ifsc: "ICIC0001234" },
  { id: "STL-003", vendorId: "VEND007", vendorName: "Spice Garden Exports", period: "Apr 16-30, 2026", periodStart: "2026-04-16", periodEnd: "2026-04-30", totalOrders: 156, grossSales: 284000, returns: 8500, netSales: 275500, commissionRate: 12, commission: 33060, tax: 5951, adjustments: 0, netPayable: 236489, status: "completed", dueDate: "2026-05-10", paidDate: "2026-05-12", paymentRef: "NEFT2026051200123", bankAccount: "XXXX XXXX 7890", ifsc: "CANARA0001234" },
  { id: "STL-004", vendorId: "VEND002", vendorName: "Kashmir Fruit Co.", period: "May 1-15, 2026", periodStart: "2026-05-01", periodEnd: "2026-05-15", totalOrders: 98, grossSales: 123000, returns: 2500, netSales: 120500, commissionRate: 12, commission: 14460, tax: 2603, adjustments: 0, netPayable: 103437, status: "pending", dueDate: "2026-05-28", bankAccount: "XXXX XXXX 8901", ifsc: "SBI0001234" },
  { id: "STL-005", vendorId: "VEND006", vendorName: "Dabur India Ltd", period: "Apr 16-30, 2026", periodStart: "2026-04-16", periodEnd: "2026-04-30", totalOrders: 289, grossSales: 520000, returns: 7800, netSales: 512200, commissionRate: 9, commission: 46098, tax: 8298, adjustments: 0, netPayable: 457804, status: "completed", dueDate: "2026-05-10", paidDate: "2026-05-11", paymentRef: "NEFT2026051100456", bankAccount: "XXXX XXXX 3456", ifsc: "HDFC0005678" },
  { id: "STL-006", vendorId: "VEND005", vendorName: "Happilo International", period: "May 1-15, 2026", periodStart: "2026-05-01", periodEnd: "2026-05-15", totalOrders: 145, grossSales: 245000, returns: 6900, netSales: 238100, commissionRate: 11, commission: 26191, tax: 4714, adjustments: 0, netPayable: 207195, status: "pending", dueDate: "2026-05-27", bankAccount: "XXXX XXXX 0123", ifsc: "KOTAK0001234" },
  { id: "STL-007", vendorId: "VEND001", vendorName: "Fortune Foods Ltd", period: "Apr 16-30, 2026", periodStart: "2026-04-16", periodEnd: "2026-04-30", totalOrders: 198, grossSales: 380000, returns: 4600, netSales: 375400, commissionRate: 10, commission: 37540, tax: 6757, adjustments: 0, netPayable: 331103, status: "completed", dueDate: "2026-05-05", paidDate: "2026-05-06", paymentRef: "NEFT2026050600789", bankAccount: "XXXX XXXX 4567", ifsc: "HDFC0001234" },
  { id: "STL-008", vendorId: "VEND004", vendorName: "Snack World Distributors", period: "May 1-15, 2026", periodStart: "2026-05-01", periodEnd: "2026-05-15", totalOrders: 62, grossSales: 89000, returns: 3800, netSales: 85200, commissionRate: 15, commission: 12780, tax: 2300, adjustments: -5000, netPayable: 75120, status: "on_hold", dueDate: "2026-05-30", bankAccount: "XXXX XXXX 6789", ifsc: "AXIS0001234", notes: "On hold pending quality dispute resolution." },
];

// ── Vendor Analytics ──────────────────────────────────────

export const mockVendorAnalytics: VendorAnalyticsEntry[] = [
  { id: "VA-001", vendorId: "VEND003", vendorName: "Amul Dairy Products", category: "Dairy", month: "May 2026", totalSales: 1890000, totalOrders: 892, avgOrderValue: 2119, returns: 15120, returnRate: 0.8, rating: 4.9, onTimeDelivery: 98.5, newProducts: 2, growth: 18.7, rank: 1 },
  { id: "VA-002", vendorId: "VEND006", vendorName: "Dabur India Ltd", category: "Health & Wellness", month: "May 2026", totalSales: 1560000, totalOrders: 564, avgOrderValue: 2766, returns: 23400, returnRate: 1.5, rating: 4.7, onTimeDelivery: 96.8, newProducts: 3, growth: 12.4, rank: 2 },
  { id: "VA-003", vendorId: "VEND001", vendorName: "Fortune Foods Ltd", category: "Groceries", month: "May 2026", totalSales: 1250000, totalOrders: 482, avgOrderValue: 2593, returns: 15000, returnRate: 1.2, rating: 4.8, onTimeDelivery: 97.2, newProducts: 1, growth: 15.2, rank: 3 },
  { id: "VA-004", vendorId: "VEND005", vendorName: "Happilo International", category: "Health & Wellness", month: "May 2026", totalSales: 890000, totalOrders: 289, avgOrderValue: 3080, returns: 24920, returnRate: 2.8, rating: 4.5, onTimeDelivery: 93.6, newProducts: 4, growth: 22.1, rank: 4 },
  { id: "VA-005", vendorId: "VEND002", vendorName: "Kashmir Fruit Co.", category: "Fruits & Veg", month: "May 2026", totalSales: 780000, totalOrders: 324, avgOrderValue: 2407, returns: 16380, returnRate: 2.1, rating: 4.6, onTimeDelivery: 94.8, newProducts: 0, growth: 8.9, rank: 5 },
  { id: "VA-006", vendorId: "VEND007", vendorName: "Spice Garden Exports", category: "Spices", month: "May 2026", totalSales: 520000, totalOrders: 182, avgOrderValue: 2857, returns: 16120, returnRate: 3.1, rating: 4.3, onTimeDelivery: 91.2, newProducts: 2, growth: 5.4, rank: 6 },
  { id: "VA-007", vendorId: "VEND004", vendorName: "Snack World Distributors", category: "Snacks", month: "May 2026", totalSales: 456000, totalOrders: 124, avgOrderValue: 3677, returns: 19152, returnRate: 4.2, rating: 3.8, onTimeDelivery: 88.4, newProducts: 0, growth: -2.1, rank: 7 },
  { id: "VA-008", vendorId: "VEND008", vendorName: "Frozen Delights Co.", category: "Frozen Foods", month: "May 2026", totalSales: 245000, totalOrders: 68, avgOrderValue: 3603, returns: 21805, returnRate: 8.9, rating: 3.2, onTimeDelivery: 78.4, newProducts: 0, growth: -15.3, rank: 8 },
];
