// ── Settings Management Mock Data ─────────────────────────
// Designed to match types from types/settings.ts exactly.
// Swapping to real API requires only replacing the service layer — no UI changes.

import type {
  SettingsUser,
  Role,
  FeatureFlag,
  ThemeSettings,
  ApiKey,
  AuditLog,
  SystemConfig,
  PaymentMethodConfig,
  TaxRate,
  GstReturn,
  NotificationChannel,
  NotificationEventMapping,
} from "@/types/settings";

// ── Helper ────────────────────────────────────────────────

export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Users ─────────────────────────────────────────────────

export const mockSettingsUsers: SettingsUser[] = [
  { id: "USR-001", name: "Super Admin", email: "admin@fmcg.com", phone: "+91 98765 43210", role: "super_admin", team: "Management", status: "active", mfaEnabled: true, lastLogin: "2026-05-26 09:15", createdAt: "2024-01-01", permissions: ["*"] },
  { id: "USR-002", name: "Rohit Sharma", email: "rohit@fmcg.com", phone: "+91 98765 43211", role: "admin", team: "Operations", status: "active", mfaEnabled: true, lastLogin: "2026-05-26 08:30", createdAt: "2024-01-15", permissions: ["dashboard", "products", "orders", "customers"] },
  { id: "USR-003", name: "Priya Patel", email: "priya@fmcg.com", phone: "+91 98765 43212", role: "manager", team: "Inventory", status: "active", mfaEnabled: false, lastLogin: "2026-05-25 18:45", createdAt: "2024-03-01", permissions: ["products", "inventory", "reports"] },
  { id: "USR-004", name: "Amit Verma", email: "amit@fmcg.com", phone: "+91 98765 43213", role: "manager", team: "Vendors", status: "inactive", mfaEnabled: false, lastLogin: "2026-05-15 11:00", createdAt: "2024-02-10", permissions: ["vendors", "reports"] },
  { id: "USR-005", name: "Neha Singh", email: "neha@fmcg.com", phone: "+91 98765 43214", role: "operator", team: "Support", status: "active", mfaEnabled: false, lastLogin: "2026-05-26 10:00", createdAt: "2024-06-01", permissions: ["orders", "customers"] },
  { id: "USR-006", name: "Vikram Joshi", email: "vikram@fmcg.com", phone: "+91 98765 43215", role: "operator", team: "Delivery", status: "active", mfaEnabled: false, lastLogin: "2026-05-25 20:30", createdAt: "2024-07-15", permissions: ["delivery"] },
  { id: "USR-007", name: "Ananya Gupta", email: "ananya@fmcg.com", phone: "+91 98765 43216", role: "viewer", team: "Finance", status: "active", mfaEnabled: true, lastLogin: "2026-05-26 09:00", createdAt: "2024-04-20", permissions: ["dashboard", "reports"] },
  { id: "USR-008", name: "Rajesh Kumar", email: "rajesh@fmcg.com", phone: "+91 98765 43217", role: "admin", team: "Technology", status: "active", mfaEnabled: true, lastLogin: "2026-05-26 07:45", createdAt: "2024-01-10", permissions: ["*"] },
  { id: "USR-009", name: "Sneha Reddy", email: "sneha@fmcg.com", phone: "+91 98765 43218", role: "finance", team: "Finance", status: "active", mfaEnabled: true, lastLogin: "2026-05-25 17:30", createdAt: "2024-05-05", permissions: ["finance", "reports", "vendors"] },
  { id: "USR-010", name: "Manoj Patil", email: "manoj@fmcg.com", phone: "+91 98765 43219", role: "operator", team: "Orders", status: "suspended", mfaEnabled: false, lastLogin: "2026-05-10 14:00", createdAt: "2024-08-01", permissions: ["orders"] },
  { id: "USR-011", name: "Divya Sharma", email: "divya@fmcg.com", phone: "+91 98765 43220", role: "manager", team: "Marketing", status: "active", mfaEnabled: false, lastLogin: "2026-05-25 16:15", createdAt: "2024-09-01", permissions: ["promotions", "dashboard"] },
  { id: "USR-012", name: "Karan Mehta", email: "karan@fmcg.com", phone: "+91 98765 43221", role: "viewer", team: "Analytics", status: "inactive", mfaEnabled: false, lastLogin: "2026-04-28 12:00", createdAt: "2024-10-15", permissions: ["reports"] },
];

// ── Roles ─────────────────────────────────────────────────

export const mockRoles: Role[] = [
  {
    id: "ROL-001", name: "Super Admin", level: "super_admin",
    description: "Full system access including settings, user management, and all modules",
    usersCount: 2, isProtected: true, isDefault: false,
    permissions: [{ module: "*", actions: ["view", "create", "edit", "delete", "export", "approve"] }],
    createdAt: "2024-01-01",
  },
  {
    id: "ROL-002", name: "Admin", level: "admin",
    description: "Operational admin with most features enabled except system settings",
    usersCount: 4, isProtected: false, isDefault: false,
    permissions: [
      { module: "Dashboard", actions: ["view"] },
      { module: "Products", actions: ["view", "create", "edit", "delete", "export"] },
      { module: "Orders", actions: ["view", "create", "edit", "export"] },
      { module: "Customers", actions: ["view", "create", "edit", "export"] },
      { module: "Inventory", actions: ["view", "edit", "export"] },
      { module: "Reports", actions: ["view", "export"] },
      { module: "Vendors", actions: ["view", "edit"] },
      { module: "Delivery", actions: ["view", "edit"] },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: "ROL-003", name: "Manager", level: "manager",
    description: "Department-level management with module-specific access",
    usersCount: 8, isProtected: false, isDefault: true,
    permissions: [
      { module: "Dashboard", actions: ["view"] },
      { module: "Products", actions: ["view", "edit"] },
      { module: "Inventory", actions: ["view", "edit"] },
      { module: "Orders", actions: ["view", "edit"] },
      { module: "Reports", actions: ["view", "export"] },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: "ROL-004", name: "Operator", level: "operator",
    description: "Day-to-day operational tasks like order processing and customer support",
    usersCount: 15, isProtected: false, isDefault: true,
    permissions: [
      { module: "Orders", actions: ["view", "edit"] },
      { module: "Customers", actions: ["view", "edit"] },
      { module: "Delivery", actions: ["view", "edit"] },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: "ROL-005", name: "Viewer", level: "viewer",
    description: "Read-only access to dashboards, reports, and analytics",
    usersCount: 6, isProtected: false, isDefault: true,
    permissions: [
      { module: "Dashboard", actions: ["view"] },
      { module: "Reports", actions: ["view", "export"] },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: "ROL-006", name: "Finance", level: "finance",
    description: "Financial operations, settlements, and payout management",
    usersCount: 3, isProtected: false, isDefault: false,
    permissions: [
      { module: "Dashboard", actions: ["view"] },
      { module: "Reports", actions: ["view", "export"] },
      { module: "Vendors", actions: ["view", "edit"] },
      { module: "Finance", actions: ["view", "create", "edit", "export", "approve"] },
    ],
    createdAt: "2024-02-01",
  },
];

// ── Feature Flags ─────────────────────────────────────────

export const mockFeatureFlags: FeatureFlag[] = [
  { id: "FF-001", name: "Live Order Tracking", key: "live_order_tracking", description: "Real-time order tracking for customers", enabled: true, environment: "production", owner: "Product Team", rolloutPercentage: 100, createdAt: "2026-01-15", lastToggledBy: "Super Admin", lastToggledAt: "2026-04-15" },
  { id: "FF-002", name: "AI Product Recommendations", key: "ai_recommendations", description: "AI-powered product recommendations", enabled: true, environment: "production", owner: "ML Team", rolloutPercentage: 100, createdAt: "2026-02-01", lastToggledBy: "Rohit Sharma", lastToggledAt: "2026-05-01" },
  { id: "FF-003", name: "Vendor Self-Onboarding", key: "vendor_onboarding", description: "Allow vendors to self-register", enabled: false, environment: "staging", owner: "Vendor Team", rolloutPercentage: 50, createdAt: "2026-03-10", lastToggledBy: "Rajesh Kumar", lastToggledAt: "2026-05-10" },
  { id: "FF-004", name: "Dark Mode Admin", key: "dark_mode_admin", description: "Dark mode for admin panel", enabled: true, environment: "staging", owner: "UI Team", rolloutPercentage: 25, createdAt: "2026-03-15", lastToggledBy: "Priya Patel", lastToggledAt: "2026-05-10" },
  { id: "FF-005", name: "Wallet Cashback", key: "wallet_cashback", description: "Wallet cashback and rewards", enabled: true, environment: "production", owner: "Finance Team", rolloutPercentage: 100, createdAt: "2026-01-20", lastToggledBy: "Super Admin", lastToggledAt: "2026-04-20" },
  { id: "FF-006", name: "Subscription Box", key: "subscription_box", description: "Weekly subscription box feature", enabled: false, environment: "development", owner: "Product Team", rolloutPercentage: 10, createdAt: "2026-04-01", lastToggledBy: "Divya Sharma", lastToggledAt: "2026-05-15" },
  { id: "FF-007", name: "Bulk Order Processing", key: "bulk_orders", description: "Bulk order status updates", enabled: true, environment: "production", owner: "Ops Team", rolloutPercentage: 100, createdAt: "2026-02-10", lastToggledBy: "Rohit Sharma", lastToggledAt: "2026-05-14" },
  { id: "FF-008", name: "Fraud Detection Engine", key: "fraud_detection", description: "AI-based fraud detection", enabled: false, environment: "staging", owner: "Security Team", rolloutPercentage: 30, createdAt: "2026-03-20", lastToggledBy: "Rajesh Kumar", lastToggledAt: "2026-05-12" },
  { id: "FF-009", name: "Multi-Language Support", key: "multi_language", description: "Enable multiple language support", enabled: false, environment: "development", owner: "Product Team", rolloutPercentage: 0, createdAt: "2026-04-15", lastToggledAt: undefined },
  { id: "FF-010", name: "Express Delivery", key: "express_delivery", description: "30-min express delivery option", enabled: true, environment: "production", owner: "Ops Team", rolloutPercentage: 75, createdAt: "2026-02-20", lastToggledBy: "Super Admin", lastToggledAt: "2026-05-05" },
];

// ── Theme Settings ────────────────────────────────────────

export const mockThemeSettings: ThemeSettings = {
  mode: "system",
  primaryColor: "#0c831f",
  sidebarCollapsed: false,
  fontSize: "medium",
  reducedMotion: false,
  highContrast: false,
  compactMode: false,
  accentColor: "#0c831f",
  borderRadius: "md",
  fontFamily: "inter",
};

// ── API Keys ──────────────────────────────────────────────

export const mockApiKeys: ApiKey[] = [
  { id: "API-001", name: "Production Gateway", key: "fmcg_live_8xK3mR9pQ2wV5nY7", prefix: "fmcg_live", status: "active", permissions: ["orders.read", "orders.write", "products.read", "delivery.read"], rateLimit: 10000, allowedIPs: ["103.25.48.0/24"], createdBy: "Super Admin", createdAt: "2026-01-10", lastUsedAt: "2026-05-26T08:30:00Z", usageCount: 145230 },
  { id: "API-002", name: "Staging Gateway", key: "fmcg_test_4aB7cD9eF1gH2iJ3", prefix: "fmcg_test", status: "active", permissions: ["*"], rateLimit: 50000, allowedIPs: [], createdBy: "Rajesh Kumar", createdAt: "2026-01-15", lastUsedAt: "2026-05-25T18:00:00Z", usageCount: 23450 },
  { id: "API-003", name: "Mobile App Key", key: "fmcg_mob_6kL8mN0pQ2rS4tU6", prefix: "fmcg_mob", status: "active", permissions: ["products.read", "orders.read", "orders.write"], rateLimit: 5000, allowedIPs: [], createdBy: "Rohit Sharma", createdAt: "2026-02-01", lastUsedAt: "2026-05-26T09:00:00Z", usageCount: 89200 },
  { id: "API-004", name: "Analytics Webhook", key: "fmcg_web_1xY3zA5bC7dE9fG0", prefix: "fmcg_web", status: "active", permissions: ["orders.read", "reports.read"], rateLimit: 2000, allowedIPs: ["52.84.120.0/24"], createdBy: "Ananya Gupta", createdAt: "2026-03-05", lastUsedAt: "2026-05-25T22:00:00Z", usageCount: 12300 },
  { id: "API-005", name: "Partner Integration", key: "fmcg_prt_2hJ4kL6mN8pQ0rS2", prefix: "fmcg_prt", status: "expired", permissions: ["delivery.read", "delivery.write"], rateLimit: 1000, allowedIPs: ["103.15.30.0/24"], createdBy: "Vikram Joshi", createdAt: "2025-11-01", expiresAt: "2026-04-30", lastUsedAt: "2026-04-28T16:00:00Z", usageCount: 56100 },
  { id: "API-006", name: "Old Mobile Key (v1)", key: "fmcg_v1_3tU5vW7xY9zA1bC3", prefix: "fmcg_v1", status: "revoked", permissions: ["orders.read"], rateLimit: 1000, allowedIPs: [], createdBy: "Super Admin", createdAt: "2024-06-01", revokedAt: "2026-02-01", lastUsedAt: "2026-01-31T23:59:00Z", usageCount: 345000 },
  { id: "API-007", name: "Vendor Portal", key: "fmcg_vnd_5dE7fG9hI1jK3lM5", prefix: "fmcg_vnd", status: "active", permissions: ["products.read", "products.write", "orders.read"], rateLimit: 3000, allowedIPs: ["103.45.60.0/24"], createdBy: "Amit Verma", createdAt: "2026-04-01", lastUsedAt: "2026-05-26T06:30:00Z", usageCount: 8900 },
  { id: "API-008", name: "Frontend SDK", key: "fmcg_sdk_7nO9pQ1rS3tU5vW7", prefix: "fmcg_sdk", status: "active", permissions: ["products.read", "categories.read"], rateLimit: 10000, allowedIPs: [], createdBy: "Priya Patel", createdAt: "2026-05-01", lastUsedAt: "2026-05-26T09:15:00Z", usageCount: 1200 },
];

// ── Audit Logs ────────────────────────────────────────────

export const mockAuditLogs: AuditLog[] = [
  { id: "AUD-001", action: "login", entity: "settings", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Admin login to settings panel", ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-26T09:15:00Z" },
  { id: "AUD-002", action: "update", entity: "feature_flag", entityId: "FF-004", entityName: "Dark Mode Admin", performedBy: "Priya Patel", performedByEmail: "priya@fmcg.com", details: "Enabled dark mode flag on staging", changes: [{ field: "enabled", oldValue: "false", newValue: "true" }], ipAddress: "192.168.1.102", status: "success", timestamp: "2026-05-25T18:45:00Z" },
  { id: "AUD-003", action: "create", entity: "user", entityId: "USR-012", entityName: "Karan Mehta", performedBy: "Rohit Sharma", performedByEmail: "rohit@fmcg.com", details: "Created new viewer user for analytics team", ipAddress: "192.168.1.101", status: "success", timestamp: "2026-05-25T14:30:00Z" },
  { id: "AUD-004", action: "update", entity: "settings", entityId: "payment", entityName: "Payment Settings", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Updated COD max amount from ₹10,000 to ₹5,000", changes: [{ field: "maxCodAmount", oldValue: "10000", newValue: "5000" }], ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-25T11:00:00Z" },
  { id: "AUD-005", action: "delete", entity: "api_key", entityId: "API-006", entityName: "Old Mobile Key (v1)", performedBy: "Rajesh Kumar", performedByEmail: "rajesh@fmcg.com", details: "Revoked expired mobile API key", ipAddress: "192.168.1.104", status: "success", timestamp: "2026-05-24T16:00:00Z" },
  { id: "AUD-006", action: "update", entity: "tax", entityId: "TAX-003", entityName: "GST 12% Rate", performedBy: "Sneha Reddy", performedByEmail: "sneha@fmcg.com", details: "Updated HSN code for processed foods", changes: [{ field: "hsn", oldValue: "1901", newValue: "1902" }], ipAddress: "192.168.1.105", status: "success", timestamp: "2026-05-24T14:20:00Z" },
  { id: "AUD-007", action: "export", entity: "reports", performedBy: "Ananya Gupta", performedByEmail: "ananya@fmcg.com", details: "Exported monthly financial report (XLSX)", ipAddress: "192.168.1.103", status: "success", timestamp: "2026-05-24T10:00:00Z" },
  { id: "AUD-008", action: "update", entity: "role", entityId: "ROL-003", entityName: "Manager Role", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Added export permission to manager role", changes: [{ field: "permissions", newValue: "Added export action to Reports module" }], ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-23T15:45:00Z" },
  { id: "AUD-009", action: "login", entity: "settings", performedBy: "Neha Singh", performedByEmail: "neha@fmcg.com", ipAddress: "192.168.1.106", status: "failure", details: "Failed login attempt - invalid credentials", timestamp: "2026-05-23T09:30:00Z" },
  { id: "AUD-010", action: "create", entity: "api_key", entityId: "API-008", entityName: "Frontend SDK", performedBy: "Priya Patel", performedByEmail: "priya@fmcg.com", details: "Created new frontend SDK API key for production", ipAddress: "192.168.1.102", status: "success", timestamp: "2026-05-22T11:30:00Z" },
  { id: "AUD-011", action: "update", entity: "system_config", entityId: "CONFIG-002", entityName: "Session Timeout", performedBy: "Rajesh Kumar", performedByEmail: "rajesh@fmcg.com", details: "Changed session timeout from 30 min to 60 min", changes: [{ field: "value", oldValue: "30", newValue: "60" }], ipAddress: "192.168.1.104", status: "success", timestamp: "2026-05-22T10:15:00Z" },
  { id: "AUD-012", action: "update", entity: "notification_config", performedBy: "Rohit Sharma", performedByEmail: "rohit@fmcg.com", details: "Enabled SMS notifications for low stock alerts", ipAddress: "192.168.1.101", status: "success", timestamp: "2026-05-21T16:00:00Z" },
  { id: "AUD-013", action: "create", entity: "user", entityId: "USR-011", entityName: "Divya Sharma", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Created new marketing manager account", ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-21T14:00:00Z" },
  { id: "AUD-014", action: "update", entity: "payment", entityId: "PM-003", entityName: "Net Banking", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Disabled net banking temporarily for maintenance", changes: [{ field: "enabled", oldValue: "true", newValue: "false" }], ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-21T09:00:00Z" },
  { id: "AUD-015", action: "logout", entity: "settings", performedBy: "Amit Verma", performedByEmail: "amit@fmcg.com", ipAddress: "192.168.1.107", status: "success", details: "User logged out", timestamp: "2026-05-20T18:30:00Z" },
  { id: "AUD-016", action: "config_change", entity: "system_config", entityId: "CONFIG-005", entityName: "Max Upload Size", performedBy: "Rajesh Kumar", performedByEmail: "rajesh@fmcg.com", details: "Increased max upload size from 5MB to 10MB", changes: [{ field: "value", oldValue: "5", newValue: "10" }], ipAddress: "192.168.1.104", status: "success", timestamp: "2026-05-20T15:00:00Z" },
  { id: "AUD-017", action: "update", entity: "theme", entityId: "theme_settings", entityName: "Theme Settings", performedBy: "Priya Patel", performedByEmail: "priya@fmcg.com", details: "Changed accent color from blue to green", changes: [{ field: "accentColor", oldValue: "#2563eb", newValue: "#0c831f" }], ipAddress: "192.168.1.102", status: "success", timestamp: "2026-05-19T12:00:00Z" },
  { id: "AUD-018", action: "import", entity: "products", performedBy: "Rohit Sharma", performedByEmail: "rohit@fmcg.com", details: "Bulk imported 150 new products via CSV", ipAddress: "192.168.1.101", status: "success", timestamp: "2026-05-19T10:30:00Z" },
  { id: "AUD-019", action: "delete", entity: "user", entityId: "USR-010", entityName: "Manoj Patil", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Suspended operator account due to policy violation", ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-18T16:00:00Z" },
  { id: "AUD-020", action: "update", entity: "settings", entityId: "store", entityName: "Store Settings", performedBy: "Super Admin", performedByEmail: "admin@fmcg.com", details: "Updated store name from QuickMart to FMCG Commerce", changes: [{ field: "storeName", oldValue: "QuickMart", newValue: "FMCG Commerce" }], ipAddress: "192.168.1.100", status: "success", timestamp: "2026-05-18T09:00:00Z" },
];

// ── System Configurations ─────────────────────────────────

export const mockSystemConfigs: SystemConfig[] = [
  { id: "CONFIG-001", category: "general", key: "store_name", label: "Store Name", value: "FMCG Commerce", type: "text", description: "The display name of your store", isEncrypted: false, isEditable: true, updatedBy: "Super Admin", updatedAt: "2026-05-18" },
  { id: "CONFIG-002", category: "security", key: "session_timeout", label: "Session Timeout (minutes)", value: 60, type: "number", description: "Admin session idle timeout in minutes", isEncrypted: false, isEditable: true, updatedBy: "Rajesh Kumar", updatedAt: "2026-05-22" },
  { id: "CONFIG-003", category: "security", key: "max_login_attempts", label: "Max Login Attempts", value: 5, type: "number", description: "Maximum failed login attempts before lockout", isEncrypted: false, isEditable: true, updatedBy: "Super Admin", updatedAt: "2026-05-01" },
  { id: "CONFIG-004", category: "security", key: "password_min_length", label: "Minimum Password Length", value: 8, type: "number", description: "Minimum characters required for passwords", isEncrypted: false, isEditable: true },
  { id: "CONFIG-005", category: "general", key: "max_upload_size", label: "Max Upload Size (MB)", value: 10, type: "number", description: "Maximum file upload size in megabytes", isEncrypted: false, isEditable: true, updatedBy: "Rajesh Kumar", updatedAt: "2026-05-20" },
  { id: "CONFIG-006", category: "performance", key: "items_per_page", label: "Items Per Page", value: 50, type: "number", description: "Default number of items to display per page", isEncrypted: false, isEditable: true },
  { id: "CONFIG-007", category: "performance", key: "cache_ttl", label: "Cache TTL (seconds)", value: 300, type: "number", description: "API response cache time-to-live", isEncrypted: false, isEditable: true },
  { id: "CONFIG-008", category: "integration", key: "razorpay_key", label: "Razorpay API Key", value: "rzp_live_XXXXXXXXXXXX", type: "text", description: "Razorpay payment gateway API key", isEncrypted: true, isEditable: true },
  { id: "CONFIG-009", category: "integration", key: "razorpay_secret", label: "Razorpay API Secret", value: "••••••••••••••••", type: "text", description: "Razorpay payment gateway secret key", isEncrypted: true, isEditable: true },
  { id: "CONFIG-010", category: "integration", key: "firebase_server_key", label: "Firebase Server Key", value: "AAAAxxxxxxxxxxxx", type: "text", description: "Firebase Cloud Messaging server key", isEncrypted: true, isEditable: true },
  { id: "CONFIG-011", category: "localization", key: "default_currency", label: "Default Currency", value: "INR", type: "select", options: ["INR", "USD", "EUR", "GBP"], description: "Default currency for all transactions", isEncrypted: false, isEditable: false },
  { id: "CONFIG-012", category: "localization", key: "timezone", label: "Timezone", value: "Asia/Kolkata (IST)", type: "select", options: ["Asia/Kolkata (IST)", "UTC", "America/New_York", "Europe/London"], description: "System timezone", isEncrypted: false, isEditable: false },
  { id: "CONFIG-013", category: "general", key: "support_email", label: "Support Email", value: "support@fmcg.com", type: "text", description: "Customer support email address", isEncrypted: false, isEditable: true },
  { id: "CONFIG-014", category: "general", key: "support_phone", label: "Support Phone", value: "+91 1800-123-456", type: "text", description: "Customer support phone number", isEncrypted: false, isEditable: true },
  { id: "CONFIG-015", category: "general", key: "delivery_radius", label: "Delivery Radius (km)", value: 15, type: "number", description: "Maximum delivery radius from warehouses", isEncrypted: false, isEditable: true },
  { id: "CONFIG-016", category: "security", key: "mfa_required", label: "MFA Required", value: true, type: "boolean", description: "Require multi-factor authentication for all admins", isEncrypted: false, isEditable: true, updatedBy: "Super Admin", updatedAt: "2026-05-15" },
  { id: "CONFIG-017", category: "security", key: "ip_whitelist_enabled", label: "IP Whitelist Enabled", value: true, type: "boolean", description: "Restrict admin access to whitelisted IPs only", isEncrypted: false, isEditable: true },
  { id: "CONFIG-018", category: "performance", key: "enable_compression", label: "Enable Response Compression", value: true, type: "boolean", description: "Enable Gzip compression for API responses", isEncrypted: false, isEditable: true },
  { id: "CONFIG-019", category: "general", key: "store_description", label: "Store Description", value: "India's fastest grocery delivery platform", type: "text", description: "Short description for meta tags and emails", isEncrypted: false, isEditable: true },
  { id: "CONFIG-020", category: "localization", key: "default_language", label: "Default Language", value: "en", type: "select", options: ["en", "hi", "ta", "te", "bn", "mr"], description: "Default language for the platform", isEncrypted: false, isEditable: true },
];

// ── Payment Methods ───────────────────────────────────────

export const mockPaymentMethods: PaymentMethodConfig[] = [
  { id: "PM-001", name: "UPI", enabled: true, provider: "Razorpay", fee: "1.5%", settlement: "T+1", limit: "₹1,00,000", sortOrder: 1 },
  { id: "PM-002", name: "Credit/Debit Card", enabled: true, provider: "Razorpay", fee: "2.0%", settlement: "T+2", limit: "₹2,00,000", sortOrder: 2 },
  { id: "PM-003", name: "Net Banking", enabled: true, provider: "Razorpay", fee: "0.8%", settlement: "T+1", limit: "₹5,00,000", sortOrder: 3 },
  { id: "PM-004", name: "Wallet", enabled: true, provider: "In-house", fee: "0%", settlement: "Instant", limit: "₹25,000", sortOrder: 4 },
  { id: "PM-005", name: "COD", enabled: true, provider: "Razorpay", fee: "1.0%", settlement: "T+1", limit: "₹5,000", sortOrder: 5 },
  { id: "PM-006", name: "EMI", enabled: false, provider: "Razorpay", fee: "1.5%", settlement: "T+3", limit: "₹3,00,000", sortOrder: 6 },
];

// ── Tax Rates ─────────────────────────────────────────────

export const mockTaxRates: TaxRate[] = [
  { id: "TAX-001", name: "GST 0%", rate: "0%", category: "Essential Goods", hsn: "0401", type: "exempt", applicableOn: "Milk, Eggs, Bread, Fresh Vegetables", isActive: true },
  { id: "TAX-002", name: "GST 5%", rate: "5%", category: "Daily Essentials", hsn: "2105", type: "standard", applicableOn: "Sugar, Tea, Spices, Cooking Oil", isActive: true },
  { id: "TAX-003", name: "GST 12%", rate: "12%", category: "Processed Foods", hsn: "1902", type: "standard", applicableOn: "Biscuits, Noodles, Butter, Cheese", isActive: true },
  { id: "TAX-004", name: "GST 18%", rate: "18%", category: "General Goods", hsn: "3304", type: "standard", applicableOn: "Toiletries, Cosmetics, Electronics", isActive: true },
  { id: "TAX-005", name: "GST 28%", rate: "28%", category: "Luxury Items", hsn: "9503", type: "luxury", applicableOn: "Premium Cosmetics, Luxury Items", isActive: true },
  { id: "TAX-006", name: "GST 3% (Gold)", rate: "3%", category: "Precious Metals", hsn: "7108", type: "reduced", applicableOn: "Gold and Silver items", isActive: false },
];

// ── GST Returns ───────────────────────────────────────────

export const mockGstReturns: GstReturn[] = [
  { period: "May 2026", status: "pending", dueDate: "2026-06-11", amount: "₹1,32,450" },
  { period: "Apr 2026", status: "filed", dueDate: "2026-05-11", filedOn: "2026-05-10", amount: "₹1,24,560" },
  { period: "Mar 2026", status: "filed", dueDate: "2026-04-11", filedOn: "2026-04-09", amount: "₹1,12,340" },
  { period: "Feb 2026", status: "filed", dueDate: "2026-03-11", filedOn: "2026-03-08", amount: "₹1,08,920" },
  { period: "Jan 2026", status: "filed", dueDate: "2026-02-11", filedOn: "2026-02-07", amount: "₹98,450" },
  { period: "Dec 2025", status: "filed", dueDate: "2026-01-11", filedOn: "2026-01-09", amount: "₹1,05,670" },
];

// ── Notification Channels ─────────────────────────────────

export const mockNotificationChannels: NotificationChannel[] = [
  { name: "Push Notifications", enabled: true, providers: "Firebase, Web Push", config: { vapidKey: "BKxxxxxxxx" } },
  { name: "Email", enabled: true, providers: "SendGrid, AWS SES", config: { sendGridKey: "SG.xxxxx", fromAddress: "noreply@fmcg.com" } },
  { name: "SMS", enabled: true, providers: "Twilio, MSG91", config: { twilioSid: "ACxxxxx", twilioPhone: "+1234567890" } },
  { name: "In-App", enabled: true, providers: "WebSocket", config: { wsEndpoint: "wss://notify.fmcg.com" } },
];

// ── Notification Event Mappings ─────────────────────────

export const mockNotificationEventMappings: NotificationEventMapping[] = [
  { event: "Order Confirmation", push: true, email: true, sms: true, inApp: true },
  { event: "Order Status Update", push: true, email: true, sms: true, inApp: true },
  { event: "Delivery Updates", push: true, email: false, sms: true, inApp: true },
  { event: "Payment Confirmation", push: true, email: true, sms: false, inApp: true },
  { event: "Promotional Offers", push: true, email: true, sms: false, inApp: true },
  { event: "Low Stock Alerts", push: true, email: true, sms: true, inApp: false },
  { event: "Vendor Settlements", push: false, email: true, sms: false, inApp: true },
  { event: "System Alerts", push: true, email: true, sms: true, inApp: true },
  { event: "Password Reset", push: false, email: true, sms: true, inApp: false },
  { event: "Account Suspension", push: true, email: true, sms: false, inApp: true },
];
