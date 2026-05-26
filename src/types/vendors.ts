import { z } from "zod";

// ── Vendor Core ───────────────────────────────────────────

export const VendorStatusSchema = z.enum([
  "active",
  "inactive",
  "pending",
  "suspended",
  "rejected",
]);
export type VendorStatus = z.infer<typeof VendorStatusSchema>;

export const VendorPerformanceSchema = z.enum([
  "excellent",
  "good",
  "average",
  "poor",
]);
export type VendorPerformance = z.infer<typeof VendorPerformanceSchema>;

export const VendorSchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  category: z.string(),
  subCategories: z.array(z.string()),
  status: VendorStatusSchema,
  performance: VendorPerformanceSchema,
  rating: z.number().min(0).max(5),
  totalProducts: z.number(),
  activeProducts: z.number(),
  totalOrders: z.number(),
  totalSales: z.number(),
  commissionRate: z.number(),
  totalCommission: z.number(),
  netPayout: z.number(),
  pendingPayout: z.number(),
  onTimeDeliveryRate: z.number(),
  returnRate: z.number(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  address: z.string(),
  gstin: z.string(),
  pan: z.string(),
  bankAccount: z.string(),
  ifsc: z.string(),
  bankName: z.string(),
  contactPerson: z.string(),
  joinedDate: z.string(),
  lastActiveDate: z.string(),
  tags: z.array(z.string()),
  notes: z.string().optional(),
});
export type Vendor = z.infer<typeof VendorSchema>;

// ── Vendor Onboarding ─────────────────────────────────────

export const OnboardingStatusSchema = z.enum([
  "pending_review",
  "pending_documents",
  "approved",
  "rejected",
  "processing",
]);
export type OnboardingStatus = z.infer<typeof OnboardingStatusSchema>;

export const VendorDocumentSchema = z.object({
  type: z.enum(["GST", "PAN", "FSSAI", "Bank Details", "Trade License", "MSME"]),
  status: z.enum(["uploaded", "verified", "rejected", "pending"]),
  uploadedAt: z.string().optional(),
  verifiedAt: z.string().optional(),
  rejectionReason: z.string().optional(),
  fileUrl: z.string().optional(),
});
export type VendorDocument = z.infer<typeof VendorDocumentSchema>;

export const VendorOnboardingSchema = z.object({
  id: z.string(),
  company: z.string(),
  owner: z.string(),
  email: z.string().email(),
  phone: z.string(),
  category: z.string(),
  status: OnboardingStatusSchema,
  appliedDate: z.string(),
  reviewedDate: z.string().optional(),
  reviewedBy: z.string().optional(),
  rejectionReason: z.string().optional(),
  documents: z.array(VendorDocumentSchema),
  gstin: z.string().optional(),
  city: z.string(),
  state: z.string(),
  expectedMonthlyVolume: z.number().optional(),
  notes: z.string().optional(),
});
export type VendorOnboarding = z.infer<typeof VendorOnboardingSchema>;

// ── Vendor Product ────────────────────────────────────────

export const VendorProductSchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  vendorName: z.string(),
  productName: z.string(),
  sku: z.string(),
  category: z.string(),
  price: z.number(),
  mrp: z.number(),
  costPrice: z.number(),
  margin: z.number(),
  stock: z.number(),
  reserved: z.number(),
  sold: z.number(),
  status: z.enum(["active", "inactive", "out_of_stock", "discontinued"]),
  rating: z.number().optional(),
  returnRate: z.number(),
  lastRestocked: z.string(),
  createdAt: z.string(),
});
export type VendorProduct = z.infer<typeof VendorProductSchema>;

// ── Vendor Settlement ─────────────────────────────────────

export const SettlementStatusSchema = z.enum([
  "pending",
  "processing",
  "completed",
  "failed",
  "on_hold",
]);
export type SettlementStatus = z.infer<typeof SettlementStatusSchema>;

export const VendorSettlementSchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  vendorName: z.string(),
  period: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  totalOrders: z.number(),
  grossSales: z.number(),
  returns: z.number(),
  netSales: z.number(),
  commissionRate: z.number(),
  commission: z.number(),
  tax: z.number(),
  adjustments: z.number(),
  netPayable: z.number(),
  status: SettlementStatusSchema,
  dueDate: z.string(),
  paidDate: z.string().optional(),
  paymentRef: z.string().optional(),
  bankAccount: z.string(),
  ifsc: z.string(),
  notes: z.string().optional(),
});
export type VendorSettlement = z.infer<typeof VendorSettlementSchema>;

// ── Vendor Analytics ──────────────────────────────────────

export const VendorAnalyticsEntrySchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  vendorName: z.string(),
  category: z.string(),
  month: z.string(),
  totalSales: z.number(),
  totalOrders: z.number(),
  avgOrderValue: z.number(),
  returns: z.number(),
  returnRate: z.number(),
  rating: z.number(),
  onTimeDelivery: z.number(),
  newProducts: z.number(),
  growth: z.number(),
  rank: z.number(),
});
export type VendorAnalyticsEntry = z.infer<typeof VendorAnalyticsEntrySchema>;

export const VendorAnalyticsSummarySchema = z.object({
  totalVendors: z.number(),
  activeVendors: z.number(),
  totalSales: z.number(),
  totalOrders: z.number(),
  avgRating: z.number(),
  avgOnTimeDelivery: z.number(),
  topVendor: z.string(),
  totalCommission: z.number(),
});
export type VendorAnalyticsSummary = z.infer<typeof VendorAnalyticsSummarySchema>;

// ── Vendor Filters ────────────────────────────────────────

export const VendorFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional(),
  performance: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
export type VendorFilters = z.infer<typeof VendorFiltersSchema>;

// ── Pagination ────────────────────────────────────────────

export const VendorPageMetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
});
export type VendorPageMeta = z.infer<typeof VendorPageMetaSchema>;

// ── Vendor Summary (for KPI cards) ───────────────────────

export interface VendorSummary {
  totalVendors: number;
  activeVendors: number;
  pendingVendors: number;
  suspendedVendors: number;
  totalProducts: number;
  totalSales: number;
  totalCommission: number;
  pendingPayouts: number;
  avgRating: number;
  excellentCount: number;
  poorCount: number;
}

// ── Settlement Summary ────────────────────────────────────

export interface SettlementSummary {
  totalSettlements: number;
  pendingCount: number;
  processingCount: number;
  completedCount: number;
  totalGrossSales: number;
  totalCommission: number;
  totalNetPayable: number;
  pendingAmount: number;
}

// ── Onboarding Summary ────────────────────────────────────

export interface OnboardingSummary {
  total: number;
  pendingReview: number;
  pendingDocuments: number;
  approved: number;
  rejected: number;
}
