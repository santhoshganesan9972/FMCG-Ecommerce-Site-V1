// ── Admin Data Service ─────────────────────────────────

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

// ── Dashboard Service ──────────────────────────────────

export const dashboardService = {
  async getOverview() {
    await delay(300);
    return {
      revenue: { total: 12456890, growth: 12.5, chart: [
        { label: "Jan", value: 850000 }, { label: "Feb", value: 920000 },
        { label: "Mar", value: 1050000 }, { label: "Apr", value: 1150000 },
        { label: "May", value: 1280000 }, { label: "Jun", value: 1420000 },
      ]},
      orders: { total: 245678, growth: 8.3, pending: 345, chart: [
        { label: "Mon", value: 420 }, { label: "Tue", value: 380 },
        { label: "Wed", value: 510 }, { label: "Thu", value: 490 },
        { label: "Fri", value: 580 }, { label: "Sat", value: 620 },
        { label: "Sun", value: 450 },
      ]},
      customers: { total: 38452, growth: 15.3, active: 12450 },
      topProducts: [
        { id: "PRD-001", name: "Organic Basmati Rice", sales: 117, revenue: 58400, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
        { id: "PRD-002", name: "Fresh Red Apples", sales: 210, revenue: 41800, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
        { id: "PRD-004", name: "Full Cream Milk 1L", sales: 1400, revenue: 95200, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
        { id: "PRD-008", name: "Cold Brew Coffee 250ml", sales: 150, revenue: 37400, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
      ],
      lowStockAlerts: [
        { id: "PRD-003", name: "Natural Honey 500g", stock: 0, threshold: 20, warehouse: "Delhi Central" },
        { id: "PRD-007", name: "Salted Butter 100g", stock: 5, threshold: 15, warehouse: "Mumbai Hub" },
        { id: "PRD-010", name: "Green Tea Pack", stock: 8, threshold: 20, warehouse: "Bangalore" },
      ],
      vendorPayments: [
        { id: "PO-001", vendor: "Fortune Foods Ltd", amount: 245000, dueDate: "2026-05-28", status: "pending" as const },
        { id: "PO-002", vendor: "Amul Dairy", amount: 136000, dueDate: "2026-05-25", status: "overdue" as const },
      ],
      liveOrders: [
        { id: "ORD-001", customer: "Ravi Kumar", items: 5, total: 1240, status: "preparing", time: "5 min ago" },
        { id: "ORD-002", customer: "Anita Singh", items: 3, total: 680, status: "out_for_delivery", time: "12 min ago" },
      ],
    };
  },
};

// ── Product Service ───────────────────────────────────

export const productService = {
  async getProducts(params?: { search?: string; category?: string; status?: string; page?: number; pageSize?: number }) {
    await delay(250);
    const allProducts = [
      { id: "PRD-001", name: "Organic Basmati Rice", sku: "RICE-BAS-001", category: "Groceries", brand: "Fortune", price: 499, costPrice: 380, mrp: 699, stock: 120, lowStockThreshold: 10, status: "active", unit: "kg", weight: "5 kg", warehouse: "Mumbai Hub", supplier: "Fortune Foods Ltd", createdAt: "2024-01-10", updatedAt: "2024-05-20" },
      { id: "PRD-002", name: "Fresh Red Apples", sku: "FRUIT-APL-001", category: "Fruits", brand: "Local Farm", price: 199, costPrice: 140, mrp: 249, stock: 85, lowStockThreshold: 15, status: "active", unit: "kg", weight: "1 kg", warehouse: "Pune Cold Storage", supplier: "Kashmir Fruit Co.", createdAt: "2024-02-10", updatedAt: "2024-05-21" },
      { id: "PRD-003", name: "Natural Honey 500g", sku: "HEALTH-HNY-001", category: "Health", brand: "Dabur", price: 349, costPrice: 230, mrp: 449, stock: 0, lowStockThreshold: 20, status: "inactive", unit: "bottle", weight: "500 ml", warehouse: "Delhi Central", supplier: "Dabur India Ltd", createdAt: "2024-01-05", updatedAt: "2024-05-18" },
      { id: "PRD-004", name: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", category: "Dairy", brand: "Amul", price: 68, costPrice: 48, mrp: 75, stock: 320, lowStockThreshold: 100, status: "active", unit: "L", weight: "1 L", warehouse: "Mumbai Hub", supplier: "Amul Dairy", createdAt: "2024-01-01", updatedAt: "2024-05-22" },
      { id: "PRD-005", name: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", category: "Dairy", brand: "Epigamia", price: 129, costPrice: 89, mrp: 159, stock: 56, lowStockThreshold: 20, status: "active", unit: "cup", weight: "400 g", warehouse: "Pune Cold Storage", supplier: "Epigamia Foods", createdAt: "2024-01-15", updatedAt: "2024-05-19" },
      { id: "PRD-006", name: "Premium Almonds 250g", sku: "SNK-ALM-001", category: "Snacks", brand: "Happilo", price: 349, costPrice: 240, mrp: 429, stock: 42, lowStockThreshold: 15, status: "draft", unit: "pack", weight: "250 g", warehouse: "Delhi Central", supplier: "Happilo International", createdAt: "2024-03-01", updatedAt: "2024-05-15" },
      { id: "PRD-007", name: "Salted Butter 100g", sku: "DAIRY-BUT-001", category: "Dairy", brand: "Amul", price: 55, costPrice: 38, mrp: 65, stock: 5, lowStockThreshold: 15, status: "active", unit: "pack", weight: "100 g", warehouse: "Mumbai Hub", supplier: "Amul Dairy", createdAt: "2024-01-10", updatedAt: "2024-05-20" },
      { id: "PRD-008", name: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", category: "Beverages", brand: "Bru", price: 249, costPrice: 170, mrp: 299, stock: 42, lowStockThreshold: 15, status: "active", unit: "bottle", weight: "250 ml", warehouse: "Bangalore Cold Room", supplier: "Hindustan Unilever", createdAt: "2024-02-20", updatedAt: "2024-05-21" },
      { id: "PRD-009", name: "Fresh Orange Juice 1L", sku: "BEV-OJ-001", category: "Beverages", brand: "Real", price: 149, costPrice: 98, mrp: 179, stock: 78, lowStockThreshold: 25, status: "active", unit: "L", weight: "1 L", warehouse: "Mumbai Hub", supplier: "Dabur India Ltd", createdAt: "2024-01-20", updatedAt: "2024-05-21" },
      { id: "PRD-010", name: "Green Tea Pack 25 bags", sku: "BEV-GT-001", category: "Beverages", brand: "Tetley", price: 199, costPrice: 130, mrp: 249, stock: 8, lowStockThreshold: 20, status: "active", unit: "pack", weight: "25 bags", warehouse: "Delhi Central", supplier: "Tetley India", createdAt: "2024-02-01", updatedAt: "2024-05-18" },
    ];
    let filtered = [...allProducts];
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (params?.category) filtered = filtered.filter(p => p.category === params.category);
    if (params?.status) filtered = filtered.filter(p => p.status === params.status);
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return { products: filtered.slice(start, start + pageSize), pagination: { page, pageSize, total } };
  },
  async getProductById(id: string) {
    await delay(100);
    return { id, name: "Organic Basmati Rice", status: "active" };
  },
};

// ── Order Service ─────────────────────────────────────

export const orderService = {
  async getOrders(params?: { status?: string; page?: number; pageSize?: number }) {
    await delay(250);
    const orders = [
      { id: "ORD-001", customer: "Ravi Kumar", items: 5, total: 1240, status: "preparing", paymentMethod: "UPI", paymentStatus: "paid", createdAt: "2026-05-21 14:30", updatedAt: "2026-05-21 14:35", deliveryAddress: "42, Andheri West, Mumbai" },
      { id: "ORD-002", customer: "Anita Singh", items: 3, total: 680, status: "out_for_delivery", paymentMethod: "Card", paymentStatus: "paid", createdAt: "2026-05-21 13:00", updatedAt: "2026-05-21 13:50", deliveryAddress: "15, Bandra West, Mumbai" },
      { id: "ORD-003", customer: "Vikram Patel", items: 8, total: 2150, status: "delivered", paymentMethod: "Net Banking", paymentStatus: "paid", createdAt: "2026-05-21 10:00", updatedAt: "2026-05-21 10:25", deliveryAddress: "88, Koramangala, Bangalore" },
      { id: "ORD-004", customer: "Sunita Verma", items: 2, total: 450, status: "cancelled", paymentMethod: "COD", paymentStatus: "refunded", createdAt: "2026-05-20 18:00", updatedAt: "2026-05-20 19:00", deliveryAddress: "5, Connaught Place, Delhi" },
      { id: "ORD-005", customer: "Deepak Joshi", items: 12, total: 3800, status: "confirmed", paymentMethod: "UPI", paymentStatus: "paid", createdAt: "2026-05-21 15:00", updatedAt: "2026-05-21 15:05", deliveryAddress: "22, Baner Road, Pune" },
    ];
    let filtered = [...orders];
    if (params?.status) filtered = filtered.filter(o => o.status === params.status);
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    return { orders: filtered.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: filtered.length } };
  },
};

// ── Customer Service ──────────────────────────────────

export const customerService = {
  async getCustomers(params?: { search?: string; page?: number; pageSize?: number }) {
    await delay(250);
    const customers = [
      { id: "CUST001", name: "Ravi Kumar", email: "ravi.k@example.com", phone: "+91 98765 43210", totalOrders: 48, totalSpent: 45600, segment: "regular", status: "active", lastOrderDate: "2026-05-21", city: "Mumbai" },
      { id: "CUST002", name: "Anita Singh", email: "anita.s@example.com", phone: "+91 87654 32109", totalOrders: 24, totalSpent: 28900, segment: "regular", status: "active", lastOrderDate: "2026-05-20", city: "Delhi" },
      { id: "CUST003", name: "Vikram Patel", email: "vikram.p@example.com", phone: "+91 76543 21098", totalOrders: 156, totalSpent: 125000, segment: "vip", status: "active", lastOrderDate: "2026-05-21", city: "Bangalore" },
      { id: "CUST004", name: "Sunita Verma", email: "sunita.v@example.com", phone: "+91 65432 10987", totalOrders: 2, totalSpent: 4500, segment: "new", status: "active", lastOrderDate: "2026-05-20", city: "Pune" },
      { id: "CUST005", name: "Deepak Joshi", email: "deepak.j@example.com", phone: "+91 54321 09876", totalOrders: 8, totalSpent: 12400, segment: "regular", status: "inactive", lastOrderDate: "2026-04-15", city: "Hyderabad" },
    ];
    let filtered = [...customers];
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    return { customers: filtered.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: filtered.length } };
  },
};

// ── Inventory Service ─────────────────────────────────

export const inventoryService = {
  async getInventory() {
    await delay(250);
    return {
      items: [
        { id: "INV-001", product: "Organic Basmati Rice", sku: "RICE-BAS-001", warehouse: "Mumbai Hub", stock: 120, reserved: 14, available: 106, threshold: 10, batch: "BATCH-001", lastUpdated: "2026-05-21" },
        { id: "INV-002", product: "Fresh Red Apples", sku: "FRUIT-APL-001", warehouse: "Pune Cold Storage", stock: 85, reserved: 6, available: 78, threshold: 15, batch: "BATCH-002", lastUpdated: "2026-05-21" },
        { id: "INV-003", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", warehouse: "Mumbai Hub", stock: 320, reserved: 28, available: 288, threshold: 100, batch: "BATCH-003", lastUpdated: "2026-05-21" },
      ],
      warehouses: [
        { id: "WH-001", name: "Mumbai Hub", location: "Mumbai, MH", capacity: 50000, used: 38000, status: "active" as const },
        { id: "WH-002", name: "Pune Cold Storage", location: "Pune, MH", capacity: 20000, used: 14500, status: "active" as const },
        { id: "WH-003", name: "Delhi Central", location: "Delhi", capacity: 60000, used: 42000, status: "active" as const },
      ],
    };
  },
};

// ── Promotion Service ─────────────────────────────────

export const promotionService = {
  async getPromotions() {
    await delay(250);
    return {
      promotions: [
        { id: "PROMO-001", name: "Summer Sale 40% Off", type: "discount", discountType: "percentage", discountValue: 40, startDate: "2026-05-01", endDate: "2026-06-15", status: "active", usageCount: 1245, maxUses: 5000 },
        { id: "PROMO-002", name: "New User ₹100 Off", type: "coupon", discountType: "fixed", discountValue: 100, startDate: "2026-04-01", endDate: "2026-12-31", status: "active", usageCount: 3420, maxUses: 10000, minOrder: 499 },
        { id: "PROMO-003", name: "Buy 2 Get 1 Free - Chips", type: "buy_x_get_y", discountType: "percentage", discountValue: 100, startDate: "2026-05-15", endDate: "2026-06-01", status: "active", usageCount: 890, maxUses: 2000 },
        { id: "PROMO-004", name: "Flash Sale - Dairy Products", type: "flash_sale", discountType: "percentage", discountValue: 30, startDate: "2026-06-01", endDate: "2026-06-02", status: "scheduled", usageCount: 0, maxUses: 1000 },
      ],
    };
  },
};

// ── Report Service ────────────────────────────────────

export const reportService = {
  async getReports() {
    await delay(250);
    return {
      reports: [
        { id: "RPT-001", title: "Monthly Sales Report - May 2026", type: "sales", dateRange: "May 2026", format: "xlsx", size: "2.4 MB", status: "ready", generatedAt: "2026-05-21" },
        { id: "RPT-002", title: "Inventory Summary - Q2 2026", type: "inventory", dateRange: "Apr-Jun 2026", format: "xlsx", size: "1.8 MB", status: "ready", generatedAt: "2026-05-20" },
        { id: "RPT-003", title: "Vendor Payout Report - April", type: "vendor", dateRange: "Apr 2026", format: "pdf", size: "856 KB", status: "ready", generatedAt: "2026-05-15" },
        { id: "RPT-004", title: "GST Filing Data - April 2026", type: "tax", dateRange: "Apr 2026", format: "xlsx", size: "3.2 MB", status: "ready", generatedAt: "2026-05-10" },
      ],
      salesData: [],
      inventoryData: [],
    };
  },
};

// ── Vendor Service ────────────────────────────────────

export const vendorService = {
  async getVendors() {
    await delay(250);
    return {
      vendors: [
        { id: "VEND-001", name: "Fortune Foods Ltd", email: "fortune@example.com", phone: "+91 22 4123 4567", category: "Groceries", status: "active" as const, totalProducts: 45, totalSales: 125000, commission: 10, paymentTerms: "Net 30", rating: 4.8, city: "Mumbai", joinedAt: "2024-01-01" },
        { id: "VEND-002", name: "Kashmir Fruit Co.", email: "kashmir@example.com", phone: "+91 11 4234 5678", category: "Fruits", status: "active" as const, totalProducts: 28, totalSales: 78000, commission: 12, paymentTerms: "Net 15", rating: 4.6, city: "Srinagar", joinedAt: "2024-02-15" },
        { id: "VEND-003", name: "Amul Dairy", email: "amul@example.com", phone: "+91 79 4345 6789", category: "Dairy", status: "active" as const, totalProducts: 56, totalSales: 189000, commission: 8, paymentTerms: "Net 45", rating: 4.9, city: "Anand", joinedAt: "2024-01-01" },
        { id: "VEND-004", name: "Snack World Distributors", email: "snack@example.com", phone: "+91 33 4456 7890", category: "Snacks", status: "pending" as const, totalProducts: 12, totalSales: 45600, commission: 15, paymentTerms: "Net 30", rating: 3.8, city: "Kolkata", joinedAt: "2026-05-01" },
      ],
    };
  },
};

// ── Delivery Service ──────────────────────────────────

export const deliveryService = {
  async getDeliveryPartners() {
    await delay(250);
    return {
      partners: [
        { id: "DP-001", name: "Rahul Sharma", phone: "+91 98765 43201", vehicleType: "bike", status: "online" as const, currentOrders: 2, totalDeliveries: 3420, rating: 4.9, zone: "Mumbai Metro", earnings: "₹1.82L" },
        { id: "DP-002", name: "Suresh Reddy", phone: "+91 98765 43202", vehicleType: "ev_scooter", status: "busy" as const, currentOrders: 1, totalDeliveries: 2150, rating: 4.7, zone: "Mumbai Metro", earnings: "₹1.20L" },
        { id: "DP-003", name: "Amit Kumar", phone: "+91 98765 43203", vehicleType: "scooter", status: "online" as const, currentOrders: 0, totalDeliveries: 1890, rating: 4.8, zone: "Delhi NCR", earnings: "₹98K" },
        { id: "DP-004", name: "Vijay Singh", phone: "+91 98765 43204", vehicleType: "cycle", status: "offline" as const, currentOrders: 0, totalDeliveries: 890, rating: 4.5, zone: "Delhi NCR", earnings: "₹45K" },
        { id: "DP-005", name: "Manoj Patil", phone: "+91 98765 43205", vehicleType: "bike", status: "online" as const, currentOrders: 3, totalDeliveries: 1560, rating: 4.6, zone: "Pune City", earnings: "₹78K" },
      ],
    };
  },
};

// ── Settings Service ──────────────────────────────────

export const settingsService = {
  async getSettings() {
    await delay(200);
    return {
      store: { name: "FMCG Commerce", email: "support@fmcg.com", phone: "+91 1800-123-456", currency: "INR", timezone: "Asia/Kolkata" },
      payment: { methods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "COD", "Wallet"], gateway: "Razorpay", commission: 2.0 },
      tax: { gstin: "27AAOFH1234H1Z5", rate: 5, pan: "AAOFH1234H" },
      featureFlags: [
        { id: "FF-001", name: "New Checkout Flow", key: "new_checkout", description: "Enable new streamlined checkout", enabled: true },
        { id: "FF-002", name: "AI Recommendations", key: "ai_recommendations", description: "Enable ML-based product recommendations", enabled: true },
        { id: "FF-003", name: "Dark Mode", key: "dark_mode", description: "Enable dark mode toggle", enabled: false },
        { id: "FF-004", name: "Voice Search", key: "voice_search", description: "Enable voice-based product search", enabled: false },
      ],
    };
  },
};
