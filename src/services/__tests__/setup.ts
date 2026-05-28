// ── Test Setup for Service Layer ────────────────────────────
// Provides shared mock functions for all API adapters that
// services import from @/services/api.
//
// Each test overrides the mock return values via
// mockResolvedValue / mockRejectedValue as needed.
// Call resetMocks() in beforeEach in every test file.

import { vi } from "vitest";

// ── Dashboard API ──────────────────────────────────────────

export const mockDashboardApi = {
  getOverview: vi.fn(),
  getRevenue: vi.fn(),
  getOrdersMetrics: vi.fn(),
  getCustomersMetrics: vi.fn(),
  getLiveOrders: vi.fn(),
  getLowStockAlerts: vi.fn(),
  getVendorPayments: vi.fn(),
  getTopProducts: vi.fn(),
  getAcquisitionMetrics: vi.fn(),
};

// ── Products API ───────────────────────────────────────────

export const mockProductsApi = {
  getProducts: vi.fn(),
  getProductById: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getPricingData: vi.fn(),
  updatePricing: vi.fn(),
  getProductMedia: vi.fn(),
  deleteMedia: vi.fn(),
  setPrimaryMedia: vi.fn(),
  getProductSEO: vi.fn(),
  updateProductSEO: vi.fn(),
  getBulkUploadHistory: vi.fn(),
  uploadBulkFile: vi.fn(),
  getAuditLogs: vi.fn(),
  getCategories: vi.fn(),
  getCategoryById: vi.fn(),
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  deleteCategory: vi.fn(),
};

// ── Orders API ─────────────────────────────────────────────

export const mockOrdersApi = {
  getOrders: vi.fn(),
  getOrderById: vi.fn(),
  updateOrderStatus: vi.fn(),
  assignPartner: vi.fn(),
  getDeliveryPartners: vi.fn(),
  getPartnersByZone: vi.fn(),
  getSubstitutions: vi.fn(),
  decideSubstitution: vi.fn(),
  getBulkJobs: vi.fn(),
  createBulkAction: vi.fn(),
  addOrderNote: vi.fn(),
};

// ── Customers API ──────────────────────────────────────────

export const mockCustomersApi = {
  getCustomers: vi.fn(),
  getCustomerById: vi.fn(),
  updateCustomer: vi.fn(),
  updateCustomerStatus: vi.fn(),
  addCustomerNote: vi.fn(),
  getCustomerActivities: vi.fn(),
  addCustomerActivity: vi.fn(),
  getSegments: vi.fn(),
  getAnalyticsMetrics: vi.fn(),
  getCohortData: vi.fn(),
  getAcquisitionChannels: vi.fn(),
  getTickets: vi.fn(),
  getTicketById: vi.fn(),
  updateTicketStatus: vi.fn(),
  addTicketMessage: vi.fn(),
  getFraudAlerts: vi.fn(),
  updateFraudAlertStatus: vi.fn(),
  getFraudAnalytics: vi.fn(),
  getExportRequests: vi.fn(),
  requestDataExport: vi.fn(),
};

// ── Vendors API ────────────────────────────────────────────

export const mockVendorsApi = {
  getVendors: vi.fn(),
  getVendorById: vi.fn(),
  getVendorSummary: vi.fn(),
  createVendor: vi.fn(),
  updateVendorStatus: vi.fn(),
  getOnboardingApplications: vi.fn(),
  getOnboardingSummary: vi.fn(),
  approveVendor: vi.fn(),
  rejectVendor: vi.fn(),
  getVendorProducts: vi.fn(),
  getProductSummary: vi.fn(),
  getSettlements: vi.fn(),
  getSettlementSummary: vi.fn(),
  processSettlement: vi.fn(),
  getVendorAnalytics: vi.fn(),
  getAnalyticsSummary: vi.fn(),
  exportVendors: vi.fn(),
};

// ── Promotions API ─────────────────────────────────────────

export const mockPromotionsApi = {
  getPromotions: vi.fn(),
  getPromotionById: vi.fn(),
  createPromotion: vi.fn(),
  updatePromotion: vi.fn(),
  deletePromotion: vi.fn(),
  getCoupons: vi.fn(),
  generateCoupon: vi.fn(),
  updateCoupon: vi.fn(),
  deleteCoupon: vi.fn(),
  getFlashSales: vi.fn(),
  createFlashSale: vi.fn(),
  updateFlashSale: vi.fn(),
  deleteFlashSale: vi.fn(),
  getCampaigns: vi.fn(),
  createCampaign: vi.fn(),
  updateCampaign: vi.fn(),
  deleteCampaign: vi.fn(),
  getPushNotifications: vi.fn(),
  createPushNotification: vi.fn(),
  updatePushNotification: vi.fn(),
  deletePushNotification: vi.fn(),
  getABTests: vi.fn(),
  createABTest: vi.fn(),
  updateABTest: vi.fn(),
  deleteABTest: vi.fn(),
  getCampaignAnalytics: vi.fn(),
};

// ── Reports API ────────────────────────────────────────────

export const mockReportsApi = {
  getGSTReports: vi.fn(),
  getGSTSummary: vi.fn(),
  getCustomerReports: vi.fn(),
  getCustomerSummary: vi.fn(),
  getCohortData: vi.fn(),
  getCohortSummary: vi.fn(),
  getAbandonedCartData: vi.fn(),
  getAbandonedCartSummary: vi.fn(),
  getRevenueAnalytics: vi.fn(),
  getRevenueSummary: vi.fn(),
  getPromotionROIData: vi.fn(),
  getPromotionROISummary: vi.fn(),
  getSalesReports: vi.fn(),
  getSalesSummary: vi.fn(),
  getInventoryReports: vi.fn(),
  getInventorySummary: vi.fn(),
  getVendorReports: vi.fn(),
  getVendorSummary: vi.fn(),
  getTaxReports: vi.fn(),
  getTaxSummary: vi.fn(),
  exportReport: vi.fn(),
};

// ── Delivery API ───────────────────────────────────────────

export const mockDeliveryApi = {
  getPartners: vi.fn(),
  getPartnerProfile: vi.fn(),
  updatePartnerStatus: vi.fn(),
  getLiveDeliveries: vi.fn(),
  updateDeliveryLocation: vi.fn(),
  getRoutes: vi.fn(),
  optimizeRoute: vi.fn(),
  optimizeAllRoutes: vi.fn(),
  getDeliveryStatuses: vi.fn(),
  updateDeliveryStatus: vi.fn(),
  assignDelivery: vi.fn(),
  getPartnerPerformance: vi.fn(),
  getAllPartnerPerformance: vi.fn(),
  getAnalytics: vi.fn(),
  getSLADashboard: vi.fn(),
};

// ── Inventory API ──────────────────────────────────────────

export const mockInventoryApi = {
  getInventory: vi.fn(),
  getInventoryItem: vi.fn(),
  updateStock: vi.fn(),
  getWarehouses: vi.fn(),
  getWarehouse: vi.fn(),
  updateWarehouse: vi.fn(),
  getTransfers: vi.fn(),
  createTransfer: vi.fn(),
  updateTransferStatus: vi.fn(),
  getSafetyStockRules: vi.fn(),
  updateSafetyStockRule: vi.fn(),
  getFEFOBatches: vi.fn(),
  getDemandForecasts: vi.fn(),
  getLowStockAlerts: vi.fn(),
};

// ── Settings API ───────────────────────────────────────────

export const mockSettingsApi = {
  getUsers: vi.fn(),
  getUserById: vi.fn(),
  createUser: vi.fn(),
  updateUserStatus: vi.fn(),
  getRoles: vi.fn(),
  createRole: vi.fn(),
  getFeatureFlags: vi.fn(),
  toggleFeatureFlag: vi.fn(),
  getThemeSettings: vi.fn(),
  updateThemeSettings: vi.fn(),
  getApiKeys: vi.fn(),
  createApiKey: vi.fn(),
  revokeApiKey: vi.fn(),
  getAuditLogs: vi.fn(),
  getSystemConfigs: vi.fn(),
  updateSystemConfig: vi.fn(),
  getPaymentMethods: vi.fn(),
  togglePaymentMethod: vi.fn(),
  getTaxRates: vi.fn(),
  getGstReturns: vi.fn(),
  getNotificationChannels: vi.fn(),
  getNotificationEventMappings: vi.fn(),
  toggleNotificationChannel: vi.fn(),
};

// ── Mock the entire barrel export ──────────────────────────
// Each namespace export from @/services/api/index.ts is mocked
// so services receive our mock functions.

vi.mock("@/services/api", () => ({
  dashboardApi: mockDashboardApi,
  productsApi: mockProductsApi,
  ordersApi: mockOrdersApi,
  customersApi: mockCustomersApi,
  vendorsApi: mockVendorsApi,
  promotionsApi: mockPromotionsApi,
  reportsApi: mockReportsApi,
  deliveryApi: mockDeliveryApi,
  inventoryApi: mockInventoryApi,
  settingsApi: mockSettingsApi,
}));

// ── Reset all mocks between tests ──────────────────────────
// Call this in beforeEach in every test file.

export function resetMocks(): void {
  const allMocks = [
    mockDashboardApi,
    mockProductsApi,
    mockOrdersApi,
    mockCustomersApi,
    mockVendorsApi,
    mockPromotionsApi,
    mockReportsApi,
    mockDeliveryApi,
    mockInventoryApi,
    mockSettingsApi,
  ];
  for (const group of allMocks) {
    for (const fn of Object.values(group)) {
      fn.mockReset();
    }
  }
}
