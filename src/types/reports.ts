import { z } from "zod";

export const ChartPointSchema = z.object({
  label: z.string(),
  value: z.number(),
});
export type ChartPoint = z.infer<typeof ChartPointSchema>;

export const TrendIndicatorSchema = z.object({
  value: z.string(),
  direction: z.enum(["up", "down", "neutral"]),
  label: z.string().optional(),
});
export type TrendIndicator = z.infer<typeof TrendIndicatorSchema>;

export const DateRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
});
export type DateRange = z.infer<typeof DateRangeSchema>;

export const ReportFiltersSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  period: z.enum(["7d", "30d", "90d", "ytd", "custom"]).optional().default("30d"),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});
export type ReportFilters = z.infer<typeof ReportFiltersSchema>;

export const SalesReportEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  grossRevenue: z.number(),
  netRevenue: z.number(),
  orders: z.number(),
  avgOrderValue: z.number(),
  refunds: z.number(),
  discounts: z.number(),
  promoCost: z.number(),
  cashTransactions: z.number(),
  cardTransactions: z.number(),
  upiTransactions: z.number(),
  topCategory: z.string().optional(),
  returnRate: z.number().optional(),
});
export type SalesReportEntry = z.infer<typeof SalesReportEntrySchema>;

export const CustomerReportEntrySchema = z.object({
  id: z.string(),
  customerId: z.string(),
  name: z.string(),
  email: z.string(),
  totalOrders: z.number(),
  totalSpent: z.number(),
  avgOrderValue: z.number(),
  lastOrderDate: z.string(),
  lifetimeValue: z.string(),
  segment: z.enum(["platinum", "gold", "silver", "bronze", "new"]),
  acquisitionChannel: z.string(),
  retentionRate: z.number(),
  ordersThisMonth: z.number(),
  preferredCategory: z.string(),
  city: z.string(),
});
export type CustomerReportEntry = z.infer<typeof CustomerReportEntrySchema>;

export const GSTReportEntrySchema = z.object({
  id: z.string(),
  period: z.string(),
  gstin: z.string(),
  businessName: z.string(),
  grossSales: z.number(),
  taxableValue: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  igst: z.number(),
  totalTaxLiability: z.number(),
  inputCredit: z.number(),
  netPayable: z.number(),
  returnType: z.enum(["GSTR-1", "GSTR-3B", "GSTR-9"]),
  status: z.enum(["filed", "pending", "overdue", "processing"]),
  dueDate: z.string(),
  filedDate: z.string().optional(),
});
export type GSTReportEntry = z.infer<typeof GSTReportEntrySchema>;

export const CohortEntrySchema = z.object({
  id: z.string(),
  cohort: z.string(),
  period: z.string(),
  users: z.number(),
  week0: z.number(),
  week1: z.number(),
  week2: z.number(),
  week3: z.number(),
  week4: z.number(),
  week5: z.number(),
  week6: z.number(),
  week7: z.number(),
  week8: z.number(),
  week9: z.number(),
  week10: z.number(),
  week11: z.number(),
});
export type CohortEntry = z.infer<typeof CohortEntrySchema>;

export const CohortSummarySchema = z.object({
  totalCohorts: z.number(),
  totalUsers: z.number(),
  avgRetentionWeek1: z.number(),
  avgRetentionWeek4: z.number(),
  avgRetentionWeek12: z.number(),
  bestPerformingCohort: z.string(),
  worstPerformingCohort: z.string(),
});
export type CohortSummary = z.infer<typeof CohortSummarySchema>;

export const AbandonedCartEntrySchema = z.object({
  id: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  items: z.number(),
  cartValue: z.number(),
  status: z.enum(["abandoned", "recovered", "lost"]),
  abandonedAt: z.string(),
  recoveredAt: z.string().optional(),
  recoveryMethod: z.string().optional(),
  itemsList: z.array(z.string()),
});
export type AbandonedCartEntry = z.infer<typeof AbandonedCartEntrySchema>;

export const AbandonedCartSummarySchema = z.object({
  totalAbandoned: z.number(),
  totalRecovered: z.number(),
  recoveryRate: z.number(),
  lostRevenue: z.number(),
  recoveredRevenue: z.number(),
  avgCartValue: z.number(),
  topAbandonedCategory: z.string(),
});
export type AbandonedCartSummary = z.infer<typeof AbandonedCartSummarySchema>;

export const RevenueAnalyticsEntrySchema = z.object({
  id: z.string(),
  month: z.string(),
  revenue: z.number(),
  cogs: z.number(),
  grossProfit: z.number(),
  grossMargin: z.number(),
  operatingExpenses: z.number(),
  operatingProfit: z.number(),
  netProfit: z.number(),
  ebitda: z.number(),
  revenuePerOrder: z.number(),
  costPerOrder: z.number(),
});
export type RevenueAnalyticsEntry = z.infer<typeof RevenueAnalyticsEntrySchema>;

export const RevenueSummarySchema = z.object({
  totalRevenue: z.number(),
  totalCOGS: z.number(),
  totalGrossProfit: z.number(),
  avgGrossMargin: z.number(),
  totalNetProfit: z.number(),
  revenueGrowth: z.number(),
  profitGrowth: z.number(),
});
export type RevenueSummary = z.infer<typeof RevenueSummarySchema>;

export const PromotionROIEntrySchema = z.object({
  id: z.string(),
  promotionName: z.string(),
  type: z.enum(["percentage", "fixed", "bogo", "free_shipping"]),
  cost: z.number(),
  revenueGenerated: z.number(),
  ordersIncremented: z.number(),
  redemptionCount: z.number(),
  roi: z.number(),
  conversionRate: z.number(),
  avgOrderValue: z.number(),
  status: z.enum(["active", "completed", "scheduled", "ended"]),
  startDate: z.string(),
  endDate: z.string(),
});
export type PromotionROIEntry = z.infer<typeof PromotionROIEntrySchema>;

export const PromotionROISummarySchema = z.object({
  totalPromotions: z.number(),
  totalCost: z.number(),
  totalRevenue: z.number(),
  avgROI: z.number(),
  bestPromotion: z.string(),
  highestROI: z.number(),
  totalRedemptions: z.number(),
});
export type PromotionROISummary = z.infer<typeof PromotionROISummarySchema>;

export const KPIMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  change: z.string(),
  trend: z.enum(["up", "down", "neutral"]),
  subtitle: z.string().optional(),
});
export type KPIMetric = z.infer<typeof KPIMetricSchema>;

export const ReportPageMetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
});
export type ReportPageMeta = z.infer<typeof ReportPageMetaSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    meta: ReportPageMetaSchema.optional(),
    error: z.string().nullable().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: ReportPageMeta;
  error?: string | null;
};

// ── Inventory Report Types ────────────────────────────────

export const InventoryReportEntrySchema = z.object({
  id: z.string(),
  sku: z.string(),
  productName: z.string(),
  category: z.string(),
  warehouse: z.string(),
  totalStock: z.number(),
  reserved: z.number(),
  available: z.number(),
  damaged: z.number(),
  reorderPoint: z.number(),
  daysUntilStockout: z.number(),
  monthlyVelocity: z.number(),
  turnoverRate: z.number(),
  stockStatus: z.enum(["healthy", "low", "critical", "out_of_stock", "overstocked"]),
  lastRestocked: z.string(),
  unitCost: z.number(),
  stockValue: z.number(),
});
export type InventoryReportEntry = z.infer<typeof InventoryReportEntrySchema>;

export const InventoryReportSummarySchema = z.object({
  totalSKUs: z.number(),
  totalStockValue: z.number(),
  lowStockCount: z.number(),
  outOfStockCount: z.number(),
  overstockedCount: z.number(),
  avgTurnoverRate: z.number(),
  totalDamagedValue: z.number(),
});
export type InventoryReportSummary = z.infer<typeof InventoryReportSummarySchema>;

// ── Vendor Report Types ───────────────────────────────────

export const VendorReportEntrySchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  vendorName: z.string(),
  category: z.string(),
  totalOrders: z.number(),
  grossSales: z.number(),
  commission: z.number(),
  commissionRate: z.number(),
  netPayout: z.number(),
  pendingPayout: z.number(),
  rating: z.number(),
  performance: z.enum(["excellent", "good", "average", "poor"]),
  onTimeDeliveryRate: z.number(),
  returnRate: z.number(),
  activeProducts: z.number(),
  joinedDate: z.string(),
  lastPayoutDate: z.string(),
});
export type VendorReportEntry = z.infer<typeof VendorReportEntrySchema>;

export const VendorReportSummarySchema = z.object({
  totalVendors: z.number(),
  totalGrossSales: z.number(),
  totalCommission: z.number(),
  totalNetPayout: z.number(),
  totalPendingPayout: z.number(),
  avgRating: z.number(),
  excellentCount: z.number(),
  poorCount: z.number(),
});
export type VendorReportSummary = z.infer<typeof VendorReportSummarySchema>;

// ── Tax Report Types ──────────────────────────────────────

export const TaxReportEntrySchema = z.object({
  id: z.string(),
  reportTitle: z.string(),
  period: z.string(),
  type: z.enum(["GSTR-1", "GSTR-3B", "GSTR-9", "TDS", "ITC", "Annual"]),
  totalTaxAmount: z.number(),
  taxableValue: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  igst: z.number(),
  tds: z.number(),
  status: z.enum(["ready", "generating", "filed", "pending", "overdue"]),
  format: z.enum(["xlsx", "pdf", "csv"]),
  fileSize: z.string(),
  dueDate: z.string(),
  generatedAt: z.string(),
  filedDate: z.string().optional(),
});
export type TaxReportEntry = z.infer<typeof TaxReportEntrySchema>;

export const TaxReportSummarySchema = z.object({
  totalTaxCollected: z.number(),
  totalTaxPaid: z.number(),
  pendingFilings: z.number(),
  overdueFilings: z.number(),
  nextDueDate: z.string(),
  totalITCClaimed: z.number(),
});
export type TaxReportSummary = z.infer<typeof TaxReportSummarySchema>;

// ── Sales Report Summary ──────────────────────────────────

export const SalesReportSummarySchema = z.object({
  totalRevenue: z.number(),
  totalOrders: z.number(),
  avgOrderValue: z.number(),
  totalRefunds: z.number(),
  totalDiscounts: z.number(),
  revenueGrowth: z.number(),
  ordersGrowth: z.number(),
  topCategory: z.string(),
});
export type SalesReportSummary = z.infer<typeof SalesReportSummarySchema>;
