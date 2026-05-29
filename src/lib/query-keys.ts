// ── React Query Key Factory ───────────────────────────────
// Single source of truth for all query keys.
// Enables fine-grained cache invalidation across modules.
//
// Usage:
//   queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
//   queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.overview })

export const queryKeys = {
  // ── Dashboard ───────────────────────────────────────────
  dashboard: {
    all: ["dashboard"] as const,
    overview: (params?: Record<string, unknown>) =>
      ["dashboard", "overview", params] as const,
    revenue: (params?: Record<string, unknown>) =>
      ["dashboard", "revenue", params] as const,
    orders: (params?: Record<string, unknown>) =>
      ["dashboard", "orders", params] as const,
    customers: (params?: Record<string, unknown>) =>
      ["dashboard", "customers", params] as const,
    liveOrders: (params?: Record<string, unknown>) =>
      ["dashboard", "liveOrders", params] as const,
    lowStockAlerts: (params?: Record<string, unknown>) =>
      ["dashboard", "lowStockAlerts", params] as const,
    topProducts: (params?: Record<string, unknown>) =>
      ["dashboard", "topProducts", params] as const,
    vendorPayments: (params?: Record<string, unknown>) =>
      ["dashboard", "vendorPayments", params] as const,
    acquisitionMetrics: (params?: Record<string, unknown>) =>
      ["dashboard", "acquisitionMetrics", params] as const,
  },

  // ── Products ────────────────────────────────────────────
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    categories: {
      all: ["categories"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["categories", "list", filters] as const,
    },
    pricing: {
      all: ["productPricing"] as const,
      list: (search?: string) => ["productPricing", "list", search] as const,
    },
    media: {
      all: ["productMedia"] as const,
      list: (search?: string) => ["productMedia", "list", search] as const,
    },
    seo: {
      all: ["productSEO"] as const,
      list: (search?: string) => ["productSEO", "list", search] as const,
    },
    auditLogs: {
      all: ["productAuditLogs"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["productAuditLogs", "list", filters] as const,
    },
    bulkUpload: {
      all: ["bulkUpload"] as const,
      list: () => ["bulkUpload", "list"] as const,
    },
  },

  // ── Inventory ───────────────────────────────────────────
  inventory: {
    all: ["inventory"] as const,
    list: (params?: Record<string, unknown>) =>
      ["inventory", "list", params] as const,
    warehouses: {
      all: ["warehouses"] as const,
      list: () => ["warehouses", "list"] as const,
    },
    transfers: {
      all: ["stockTransfers"] as const,
      list: (params?: Record<string, unknown>) =>
        ["stockTransfers", "list", params] as const,
    },
    safetyStock: {
      all: ["safetyStock"] as const,
      list: (status?: string) => ["safetyStock", "list", status] as const,
    },
    fefo: {
      all: ["fefo"] as const,
      list: (search?: string) => ["fefo", "list", search] as const,
    },
    forecasts: {
      all: ["demandForecasts"] as const,
      list: () => ["demandForecasts", "list"] as const,
    },
    lowStock: {
      all: ["lowStockAlerts"] as const,
      list: () => ["lowStockAlerts", "list"] as const,
    },
  },

  // ── Orders ──────────────────────────────────────────────
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
    deliveryPartners: {
      all: ["deliveryPartners"] as const,
      list: (search?: string) =>
        ["deliveryPartners", "list", search] as const,
    },
    substitutions: {
      all: ["substitutions"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["substitutions", "list", filters] as const,
    },
    bulkJobs: {
      all: ["bulkJobs"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["bulkJobs", "list", filters] as const,
    },
  },

  // ── Customers ───────────────────────────────────────────
  customers: {
    all: ["customers"] as const,
    lists: () => [...queryKeys.customers.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.customers.lists(), filters] as const,
    details: () => [...queryKeys.customers.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.customers.details(), id] as const,
    segments: {
      all: ["customerSegments"] as const,
      list: () => ["customerSegments", "list"] as const,
    },
    analytics: {
      all: ["customerAnalytics"] as const,
      list: () => ["customerAnalytics", "list"] as const,
    },
    supportTickets: {
      all: ["supportTickets"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["supportTickets", "list", filters] as const,
    },
    fraudAlerts: {
      all: ["fraudAlerts"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["fraudAlerts", "list", filters] as const,
    },
  },

  // ── Promotions ──────────────────────────────────────────
  promotions: {
    all: ["promotions"] as const,
    lists: () => [...queryKeys.promotions.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.promotions.lists(), filters] as const,
    coupons: {
      all: ["coupons"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["coupons", "list", filters] as const,
    },
    flashSales: {
      all: ["flashSales"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["flashSales", "list", filters] as const,
    },
    campaigns: {
      all: ["campaigns"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["campaigns", "list", filters] as const,
    },
    pushNotifications: {
      all: ["pushNotifications"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["pushNotifications", "list", filters] as const,
    },
    abTests: {
      all: ["abTests"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["abTests", "list", filters] as const,
    },
    campaignAnalytics: {
      all: ["campaignAnalytics"] as const,
      list: () => ["campaignAnalytics", "list"] as const,
    },
  },

  // ── Reports ─────────────────────────────────────────────
  reports: {
    all: ["reports"] as const,
    gst: {
      all: ["gstReports"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["gstReports", "list", filters] as const,
    },
    customer: {
      all: ["customerReports"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["customerReports", "list", filters] as const,
    },
    sales: {
      all: ["salesReports"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["salesReports", "list", filters] as const,
    },
    inventory: {
      all: ["inventoryReports"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["inventoryReports", "list", filters] as const,
    },
    vendor: {
      all: ["vendorReports"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["vendorReports", "list", filters] as const,
    },
    tax: {
      all: ["taxReports"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["taxReports", "list", filters] as const,
    },
    cohort: {
      all: ["cohortData"] as const,
      list: () => ["cohortData", "list"] as const,
    },
    revenueAnalytics: {
      all: ["revenueAnalytics"] as const,
      list: () => ["revenueAnalytics", "list"] as const,
    },
    abandonedCart: {
      all: ["abandonedCart"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["abandonedCart", "list", filters] as const,
    },
    promotionROI: {
      all: ["promotionROI"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["promotionROI", "list", filters] as const,
    },
  },

  // ── Vendors ─────────────────────────────────────────────
  vendors: {
    all: ["vendors"] as const,
    list: (filters?: Record<string, unknown>) =>
      ["vendors", "list", filters] as const,
    onboarding: {
      all: ["vendorOnboarding"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["vendorOnboarding", "list", filters] as const,
    },
    products: {
      all: ["vendorProducts"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["vendorProducts", "list", filters] as const,
    },
    settlements: {
      all: ["vendorSettlements"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["vendorSettlements", "list", filters] as const,
    },
    analytics: {
      all: ["vendorAnalytics"] as const,
      list: (filters?: Record<string, unknown>) =>
        ["vendorAnalytics", "list", filters] as const,
    },
  },

  // ── Delivery ────────────────────────────────────────────
  delivery: {
    all: ["delivery"] as const,
    overview: (params?: Record<string, unknown>) =>
      ["delivery", "overview", params] as const,
    partners: {
      all: ["delivery", "partners"] as const,
      list: () => ["delivery", "partners", "list"] as const,
    },
    analytics: {
      all: ["delivery", "analytics"] as const,
      list: () => ["delivery", "analytics", "list"] as const,
    },
    sla: {
      all: ["delivery", "sla"] as const,
      list: () => ["delivery", "sla", "list"] as const,
    },
    performance: {
      all: ["delivery", "performance"] as const,
      list: () => ["delivery", "performance", "list"] as const,
    },
  },

  // ── Settings ────────────────────────────────────────────
  settings: {
    all: ["settings"] as const,
    notifications: ["settings", "notifications"] as const,
    roles: ["settings", "roles"] as const,
    apiKeys: ["settings", "apiKeys"] as const,
    auditLogs: ["settings", "auditLogs"] as const,
    configurations: ["settings", "configurations"] as const,
  },

  // ── Profile ──────────────────────────────────────────────
  profile: ["profile"] as const,

  // ── Cart ─────────────────────────────────────────────────
  cart: {
    all: ["cart"] as const,
    items: ["cart", "items"] as const,
    detail: () => [...queryKeys.cart.all, "detail"] as const,
  },

  // ── Wishlist ─────────────────────────────────────────────
  wishlist: {
    all: ["wishlist"] as const,
    items: ["wishlist", "items"] as const,
  },

  // ── Address ──────────────────────────────────────────────
  address: {
    all: ["address"] as const,
    list: () => ["address", "list"] as const,
  },

  // ── Upload ───────────────────────────────────────────────
  upload: {
    all: ["upload"] as const,
    productImage: ["upload", "productImage"] as const,
    avatar: ["upload", "avatar"] as const,
    banner: ["upload", "banner"] as const,
  },

  // ── Notifications ───────────────────────────────────────
  notifications: {
    all: ["notifications"] as const,
    feed: (params?: Record<string, unknown>) =>
      ["notifications", "feed", params] as const,
    stats: ["notifications", "stats"] as const,
  },
} as const;
