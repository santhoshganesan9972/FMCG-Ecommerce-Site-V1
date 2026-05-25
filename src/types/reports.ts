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
