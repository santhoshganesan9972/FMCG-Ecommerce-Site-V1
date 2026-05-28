export interface Permission {
  id: string;
  label: string;
  description: string;
  category:
    | "orders"
    | "inventory"
    | "vendors"
    | "delivery"
    | "finance"
    | "customers"
    | "subscriptions"
    | "returns"
    | "promotions"
    | "notifications"
    | "reports"
    | "settings"
    | "users"
    | "support";
  icon: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
  isEditable: boolean;
  isDeletable: boolean;
}

export const allPermissions: Permission[] = [
  // Orders
  { id: "orders_view", label: "View Orders", description: "Read-only access to orders", category: "orders", icon: "📦" },
  { id: "orders_create", label: "Create Order", description: "Create new orders", category: "orders", icon: "📦" },
  { id: "orders_edit", label: "Edit Order", description: "Modify order details", category: "orders", icon: "📦" },
  { id: "orders_cancel", label: "Cancel Order", description: "Cancel placed orders", category: "orders", icon: "📦" },
  { id: "orders_refund", label: "Refund Order", description: "Process order refunds", category: "orders", icon: "📦" },
  // Inventory
  { id: "inventory_view", label: "View Inventory", description: "Read-only access to stock", category: "inventory", icon: "📊" },
  { id: "inventory_edit", label: "Edit Inventory", description: "Add/update/remove products", category: "inventory", icon: "📊" },
  { id: "inventory_bulk_upload", label: "Bulk Upload", description: "CSV/Excel product uploads", category: "inventory", icon: "📊" },
  { id: "inventory_categories", label: "Manage Categories", description: "Add/remove product categories", category: "inventory", icon: "📊" },
  // Vendors
  { id: "vendors_view", label: "View Vendors", description: "Read-only access to vendors", category: "vendors", icon: "🏪" },
  { id: "vendors_edit", label: "Edit Vendors", description: "Add, update, or remove vendors", category: "vendors", icon: "🏪" },
  { id: "vendors_approve", label: "Approve Vendor", description: "Approve vendor onboarding", category: "vendors", icon: "🏪" },
  { id: "vendors_commission", label: "Set Commission", description: "Configure vendor commissions", category: "vendors", icon: "🏪" },
  // Delivery
  { id: "delivery_view", label: "View Delivery", description: "Read-only access to delivery", category: "delivery", icon: "🚚" },
  { id: "delivery_edit", label: "Edit Delivery", description: "Update delivery partners", category: "delivery", icon: "🚚" },
  { id: "delivery_suspend", label: "Suspend Partner", description: "Suspend delivery partners", category: "delivery", icon: "🚚" },
  { id: "delivery_routes", label: "Manage Routes", description: "Assign and reassign routes", category: "delivery", icon: "🚚" },
  // Finance
  { id: "finance_view", label: "View Finance", description: "Read-only access to finances", category: "finance", icon: "💰" },
  { id: "finance_transaction", label: "Transactions", description: "View and manage transactions", category: "finance", icon: "💰" },
  { id: "finance_refund", label: "Process Refunds", description: "Approve and process refunds", category: "finance", icon: "💰" },
  { id: "finance_settlement", label: "Vendor Settlements", description: "Process vendor payouts", category: "finance", icon: "💰" },
  { id: "finance_reports", label: "Finance Reports", description: "Access financial reports", category: "finance", icon: "💰" },
  { id: "finance_wallet", label: "Wallet Mgmt", description: "Manage customer & vendor wallets", category: "finance", icon: "💰" },
  // Customers
  { id: "customers_view", label: "View Customers", description: "Read-only access to customers", category: "customers", icon: "👤" },
  { id: "customers_edit", label: "Edit Customers", description: "Add, update or remove customers", category: "customers", icon: "👤" },
  { id: "customers_suspend", label: "Suspend Customer", description: "Suspend customer accounts", category: "customers", icon: "👤" },
  { id: "customers_export", label: "Export Customers", description: "Download customer data", category: "customers", icon: "👤" },
  // Subscriptions
  { id: "subscriptions_view", label: "View Subscriptions", description: "Read-only access to subscriptions", category: "subscriptions", icon: "🔄" },
  { id: "subscriptions_edit", label: "Manage Subscriptions", description: "Create, pause, cancel subscriptions", category: "subscriptions", icon: "🔄" },
  // Returns
  { id: "returns_view", label: "View Returns", description: "Read-only access to returns", category: "returns", icon: "↩️" },
  { id: "returns_approve", label: "Approve Returns", description: "Approve/reject return requests", category: "returns", icon: "↩️" },
  { id: "returns_pickup", label: "Manage Pickup", description: "Schedule and track pickup", category: "returns", icon: "↩️" },
  // Promotions
  { id: "promotions_view", label: "View Promotions", description: "Read-only access to promotions", category: "promotions", icon: "🏷️" },
  { id: "promotions_edit", label: "Manage Promotions", description: "Create, edit, schedule promos", category: "promotions", icon: "🏷️" },
  { id: "promotions_ab_test", label: "A/B Testing", description: "Create and run A/B tests", category: "promotions", icon: "🏷️" },
  // Notifications
  { id: "notifications_view", label: "View Notifications", description: "Read-only access to notifications", category: "notifications", icon: "🔔" },
  { id: "notifications_send", label: "Send Notifications", description: "Compose and send campaigns", category: "notifications", icon: "🔔" },
  { id: "notifications_channel", label: "Channel Settings", description: "SMS, email, push config", category: "notifications", icon: "🔔" },
  // Reports
  { id: "reports_sales", label: "Sales Report", description: "Sales analytics and trends", category: "reports", icon: "📈" },
  { id: "reports_user", label: "User Report", description: "User activity analytics", category: "reports", icon: "📈" },
  { id: "reports_delivery", label: "Delivery Report", description: "Delivery performance analytics", category: "reports", icon: "📈" },
  { id: "reports_inventory", label: "Inventory Report", description: "Stock analytics and reports", category: "reports", icon: "📈" },
  // Settings
  { id: "settings_general", label: "General Settings", description: "Edit general settings", category: "settings", icon: "⚙️" },
  { id: "settings_payment", label: "Payment Settings", description: "Configure payment gateways", category: "settings", icon: "⚙️" },
  { id: "settings_security", label: "Security Settings", description: "Password, 2FA, IP whitelist", category: "settings", icon: "⚙️" },
  { id: "settings_roles", label: "RBAC Settings", description: "Roles and permissions", category: "settings", icon: "⚙️" },
  // Users / Support
  { id: "users_view", label: "View Users", description: "List admin and staff users", category: "users", icon: "👥" },
  { id: "users_create", label: "Create User", description: "Add new admin/staff users", category: "users", icon: "👥" },
  { id: "users_roles", label: "Assign Roles", description: "Grant/revoke roles on users", category: "users", icon: "👥" },
  { id: "support_view", label: "View Tickets", description: "Access support tickets", category: "support", icon: "🎧" },
  { id: "support_manage", label: "Manage Tickets", description: "Resolve and escalate tickets", category: "support", icon: "🎧" },
];

export const roleMeta = {
  "super admin": {
    description: "Full platform access — can manage everything including roles & permissions.",
    bgColor: "bg-[#fef2f2]",
    textColor: "text-[#b91c1c]",
    borderColor: "border-[#fecaca]",
  },
  "operations admin": {
    description: "Operations & logistics oversight — orders, delivery, inventory, vendors.",
    bgColor: "bg-[#fff0f6]",
    textColor: "text-[#ff4f8b]",
    borderColor: "border-[#fbbfd6]",
  },
  "finance admin": {
    description: "Full financial access — transactions, refunds, settlements & reports.",
    bgColor: "bg-[#e8f5e9]",
    textColor: "text-[#0c831f]",
    borderColor: "border-[#bbdbb9]",
  },
  "delivery admin": {
    description: "Delivery partner & route management only.",
    bgColor: "bg-[#fffbeb]",
    textColor: "text-[#d97706]",
    borderColor: "border-[#fde68a]",
  },
  "vendor admin": {
    description: "Vendor onboarding, approval & commission configuration.",
    bgColor: "bg-[#f0f9ff]",
    textColor: "text-[#0369a1]",
    borderColor: "border-[#bae0f3]",
  },
  "store manager": {
    description: "Store profile, inventory, pricing & store staff management.",
    bgColor: "bg-[#f5f0ff]",
    textColor: "text-[#7c3aed]",
    borderColor: "border-[#ddd6fe]",
  },
  "support agent": {
    description: "Read-only overview & ticket resolution access.",
    bgColor: "bg-[#f6f7f6]",
    textColor: "text-[#666]",
    borderColor: "border-[#e5e5e5]",
  },
  "analyst": {
    description: "Analytics-only access — read reports across all modules.",
    bgColor: "bg-[#f0fdf4]",
    textColor: "text-[#15803d]",
    borderColor: "border-[#bbdbb9]",
  },
};

export const mockRoles: Role[] = [
  {
    id: "role-001",
    name: "Super Admin",
    description: roleMeta["super admin"].description,
    color: roleMeta["super admin"].textColor,
    bgColor: roleMeta["super admin"].bgColor,
    permissions: allPermissions.map((p) => p.id),
    userCount: 2,
    createdAt: "2025-01-01",
    updatedAt: "2025-12-01",
    isEditable: false,
    isDeletable: false,
  },
  {
    id: "role-002",
    name: "Operations Admin",
    description: roleMeta["operations admin"].description,
    color: roleMeta["operations admin"].textColor,
    bgColor: roleMeta["operations admin"].bgColor,
    permissions: [
      "orders_view", "orders_create", "orders_edit", "orders_cancel",
      "inventory_view", "inventory_edit", "inventory_categories",
      "vendors_view", "vendors_edit", "vendors_approve",
      "delivery_view", "delivery_edit", "delivery_suspend", "delivery_routes",
      "customers_view", "customers_edit",
      "subscriptions_view", "subscriptions_edit",
      "returns_view", "returns_approve", "returns_pickup",
      "notifications_send",
      "reports_sales", "reports_delivery", "reports_inventory",
    ],
    userCount: 4,
    createdAt: "2025-01-15",
    updatedAt: "2026-04-10",
    isEditable: true,
    isDeletable: false,
  },
  {
    id: "role-003",
    name: "Finance Admin",
    description: roleMeta["finance admin"].description,
    color: roleMeta["finance admin"].textColor,
    bgColor: roleMeta["finance admin"].bgColor,
    permissions: [
      "finance_view", "finance_transaction", "finance_refund",
      "finance_settlement", "finance_wallet", "finance_reports",
      "orders_view", "orders_refund",
      "reports_sales",
    ],
    userCount: 3,
    createdAt: "2025-02-01",
    updatedAt: "2026-03-22",
    isEditable: true,
    isDeletable: true,
  },
  {
    id: "role-004",
    name: "Delivery Admin",
    description: roleMeta["delivery admin"].description,
    color: roleMeta["delivery admin"].textColor,
    bgColor: roleMeta["delivery admin"].bgColor,
    permissions: [
      "delivery_view", "delivery_edit", "delivery_suspend", "delivery_routes",
      "orders_view", "orders_edit",
      "reports_delivery",
    ],
    userCount: 2,
    createdAt: "2025-03-10",
    updatedAt: "2026-05-01",
    isEditable: true,
    isDeletable: true,
  },
  {
    id: "role-005",
    name: "Vendor Admin",
    description: roleMeta["vendor admin"].description,
    color: roleMeta["vendor admin"].textColor,
    bgColor: roleMeta["vendor admin"].bgColor,
    permissions: [
      "vendors_view", "vendors_edit", "vendors_approve", "vendors_commission",
      "inventory_view",
      "reports_sales",
    ],
    userCount: 3,
    createdAt: "2025-04-20",
    updatedAt: "2026-04-15",
    isEditable: true,
    isDeletable: true,
  },
  {
    id: "role-006",
    name: "Store Manager",
    description: roleMeta["store manager"].description,
    color: roleMeta["store manager"].textColor,
    bgColor: roleMeta["store manager"].bgColor,
    permissions: [
      "inventory_view", "inventory_edit", "inventory_bulk_upload", "inventory_categories",
      "orders_view", "orders_edit", "orders_cancel",
      "promotions_view", "promotions_edit",
      "settings_general", "settings_store",
    ],
    userCount: 5,
    createdAt: "2025-05-01",
    updatedAt: "2026-05-10",
    isEditable: true,
    isDeletable: true,
  },
  {
    id: "role-007",
    name: "Support Agent",
    description: roleMeta["support agent"].description,
    color: roleMeta["support agent"].textColor,
    bgColor: roleMeta["support agent"].bgColor,
    permissions: [
      "customers_view",
      "orders_view",
      "returns_view",
      "support_view", "support_manage",
      "notifications_view",
    ],
    userCount: 12,
    createdAt: "2025-06-01",
    updatedAt: "2026-05-18",
    isEditable: true,
    isDeletable: true,
  },
  {
    id: "role-008",
    name: "Analyst",
    description: roleMeta["analyst"].description,
    color: roleMeta["analyst"].textColor,
    bgColor: roleMeta["analyst"].bgColor,
    permissions: [
      "reports_sales", "reports_user", "reports_delivery", "reports_inventory",
      "orders_view", "inventory_view", "vendors_view", "delivery_view",
      "customers_view", "subscriptions_view", "returns_view", "promotions_view",
      "finance_view",
    ],
    userCount: 3,
    createdAt: "2025-07-01",
    updatedAt: "2026-04-28",
    isEditable: true,
    isDeletable: false,
  },
];

export const permissionCategories = [
  { key: "orders", label: "Orders", icon: "📦" },
  { key: "inventory", label: "Inventory & Catalog", icon: "📊" },
  { key: "vendors", label: "Vendors", icon: "🏪" },
  { key: "delivery", label: "Delivery", icon: "🚚" },
  { key: "finance", label: "Finance", icon: "💰" },
  { key: "customers", label: "Customers", icon: "👤" },
  { key: "subscriptions", label: "Subscriptions", icon: "🔄" },
  { key: "returns", label: "Returns & Refunds", icon: "↩️" },
  { key: "promotions", label: "Promotions", icon: "🏷️" },
  { key: "notifications", label: "Notifications", icon: "🔔" },
  { key: "reports", label: "Reports & Analytics", icon: "📈" },
  { key: "settings", label: "Settings", icon: "⚙️" },
  { key: "users", label: "User Management", icon: "👥" },
  { key: "support", label: "Support", icon: "🎧" },
];
