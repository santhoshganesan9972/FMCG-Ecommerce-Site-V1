// ── Mutation Key Factory ────────────────────────────────────
// Structured mutation keys map 1:1 to their corresponding
// query keys so that invalidation is always predictable.
//
// Usage:
//   mutationKey: mutationKeys.products.update
//   onSuccess: () => invalidateQueries({ queryKey: queryKeys.products.all })

export const mutationKeys = {
  // ── Dashboard ───────────────────────────────────────────
  dashboard: {
    dismissAlert: ["dashboard", "dismissAlert"] as const,
  },

  // ── Products ────────────────────────────────────────────
  products: {
    create: ["products", "create"] as const,
    update: ["products", "update"] as const,
    delete: ["products", "delete"] as const,
    bulkUpload: ["products", "bulkUpload"] as const,
    updatePricing: ["products", "updatePricing"] as const,
    updateMedia: ["products", "updateMedia"] as const,
    updateSEO: ["products", "updateSEO"] as const,
    approve: ["products", "approve"] as const,
    reject: ["products", "reject"] as const,
  },

  // ── Orders ──────────────────────────────────────────────
  orders: {
    updateStatus: ["orders", "updateStatus"] as const,
    assignPartner: ["orders", "assignPartner"] as const,
    updateSubstitution: ["orders", "updateSubstitution"] as const,
    bulkAction: ["orders", "bulkAction"] as const,
  },

  // ── Customers ───────────────────────────────────────────
  customers: {
    update: ["customers", "update"] as const,
    delete: ["customers", "delete"] as const,
    resolveTicket: ["customers", "resolveTicket"] as const,
    dismissFraudAlert: ["customers", "dismissFraudAlert"] as const,
  },

  // ── Inventory ───────────────────────────────────────────
  inventory: {
    adjustStock: ["inventory", "adjustStock"] as const,
    createTransfer: ["inventory", "createTransfer"] as const,
    updateWarehouse: ["inventory", "updateWarehouse"] as const,
    setSafetyStock: ["inventory", "setSafetyStock"] as const,
  },

  // ── Promotions ──────────────────────────────────────────
  promotions: {
    create: ["promotions", "create"] as const,
    update: ["promotions", "update"] as const,
    delete: ["promotions", "delete"] as const,
    activate: ["promotions", "activate"] as const,
    deactivate: ["promotions", "deactivate"] as const,
  },

  // ── Vendors ─────────────────────────────────────────────
  vendors: {
    update: ["vendors", "update"] as const,
    approve: ["vendors", "approve"] as const,
    reject: ["vendors", "reject"] as const,
    processSettlement: ["vendors", "processSettlement"] as const,
  },

  // ── Delivery ────────────────────────────────────────────
  delivery: {
    assignPartner: ["delivery", "assignPartner"] as const,
    updateStatus: ["delivery", "updateStatus"] as const,
  },

  // ── Settings ────────────────────────────────────────────
  settings: {
    updateConfig: ["settings", "updateConfig"] as const,
    updateRoles: ["settings", "updateRoles"] as const,
    regenerateApiKey: ["settings", "regenerateApiKey"] as const,
    toggleFeature: ["settings", "toggleFeature"] as const,
    updateNotifications: ["settings", "updateNotifications"] as const,
  },

  // ── Notifications ───────────────────────────────────────
  notifications: {
    markRead: ["notifications", "markRead"] as const,
    markAllRead: ["notifications", "markAllRead"] as const,
    dismiss: ["notifications", "dismiss"] as const,
  },
} as const;
