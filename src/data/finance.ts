// Mock data for Finance & Payments module

export interface Transaction {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  status: "success" | "failed" | "pending" | "refunded";
  gateway: string;
  createdAt: string;
  updatedAt: string;
  referenceId: string;
}

export interface FailedPayment {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  failureReason: string;
  gateway: string;
  attempts: number;
  createdAt: string;
  canRetry: boolean;
}

export interface Refund {
  id: string;
  orderId: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "rejected";
  reason: string;
  requestedBy: string;
  requestedAt: string;
  processedAt?: string;
}

export interface Wallet {
  customerId: string;
  customerName: string;
  email: string;
  balance: number;
  cashback: number;
  totalSpent: number;
  lastTransaction: string;
  status: "active" | "suspended";
}

export interface VendorSettlement {
  id: string;
  vendorId: string;
  vendorName: string;
  totalOrders: number;
  grossAmount: number;
  commission: number;
  tax: number;
  netAmount: number;
  status: "pending" | "processing" | "settled";
  settlementDate: string;
  period: string;
}

export interface PaymentMethodStats {
  method: string;
  transactions: number;
  successRate: number;
  totalAmount: number;
  avgTransactionValue: number;
}

export const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    orderId: "ORD-2026-001",
    customerId: "CUST001",
    customerName: "John Doe",
    amount: 1250.00,
    paymentMethod: "UPI",
    status: "success",
    gateway: "Razorpay",
    createdAt: "2026-05-21 14:30:00",
    updatedAt: "2026-05-21 14:30:05",
    referenceId: "PAY_abc123xyz",
  },
  {
    id: "TXN002",
    orderId: "ORD-2026-002",
    customerId: "CUST002",
    customerName: "Jane Smith",
    amount: 890.50,
    paymentMethod: "Credit Card",
    status: "success",
    gateway: "Stripe",
    createdAt: "2026-05-21 13:45:00",
    updatedAt: "2026-05-21 13:45:10",
    referenceId: "PAY_def456uvw",
  },
  {
    id: "TXN003",
    orderId: "ORD-2026-003",
    customerId: "CUST003",
    customerName: "Bob Johnson",
    amount: 2100.00,
    paymentMethod: "Net Banking",
    status: "pending",
    gateway: "PayU",
    createdAt: "2026-05-21 12:20:00",
    updatedAt: "2026-05-21 12:20:00",
    referenceId: "PAY_ghi789rst",
  },
  {
    id: "TXN004",
    orderId: "ORD-2026-004",
    customerId: "CUST004",
    customerName: "Alice Brown",
    amount: 560.75,
    paymentMethod: "Wallet",
    status: "refunded",
    gateway: "Internal",
    createdAt: "2026-05-21 11:10:00",
    updatedAt: "2026-05-21 15:00:00",
    referenceId: "PAY_jkl012mno",
  },
  {
    id: "TXN005",
    orderId: "ORD-2026-005",
    customerId: "CUST005",
    customerName: "Charlie Wilson",
    amount: 3200.00,
    paymentMethod: "Debit Card",
    status: "success",
    gateway: "Razorpay",
    createdAt: "2026-05-21 10:05:00",
    updatedAt: "2026-05-21 10:05:08",
    referenceId: "PAY_pqr345stu",
  },
  {
    id: "TXN006",
    orderId: "ORD-2026-006",
    customerId: "CUST006",
    customerName: "Diana Prince",
    amount: 780.25,
    paymentMethod: "UPI",
    status: "success",
    gateway: "PhonePe",
    createdAt: "2026-05-20 18:30:00",
    updatedAt: "2026-05-20 18:30:03",
    referenceId: "PAY_vwx678yza",
  },
];

export const mockFailedPayments: FailedPayment[] = [
  {
    id: "FAIL001",
    orderId: "ORD-2026-101",
    customerId: "CUST101",
    customerName: "Mark Davis",
    amount: 1500.00,
    paymentMethod: "Credit Card",
    failureReason: "Insufficient funds",
    gateway: "Stripe",
    attempts: 2,
    createdAt: "2026-05-21 16:00:00",
    canRetry: true,
  },
  {
    id: "FAIL002",
    orderId: "ORD-2026-102",
    customerId: "CUST102",
    customerName: "Sarah Connor",
    amount: 890.00,
    paymentMethod: "Net Banking",
    failureReason: "Bank timeout",
    gateway: "PayU",
    attempts: 1,
    createdAt: "2026-05-21 15:30:00",
    canRetry: true,
  },
  {
    id: "FAIL003",
    orderId: "ORD-2026-103",
    customerId: "CUST103",
    customerName: "Mike Ross",
    amount: 2300.00,
    paymentMethod: "UPI",
    failureReason: "Invalid UPI ID",
    gateway: "Razorpay",
    attempts: 3,
    createdAt: "2026-05-21 14:15:00",
    canRetry: false,
  },
  {
    id: "FAIL004",
    orderId: "ORD-2026-104",
    customerId: "CUST104",
    customerName: "Emily Clark",
    amount: 670.50,
    paymentMethod: "Debit Card",
    failureReason: "Card expired",
    gateway: "Stripe",
    attempts: 1,
    createdAt: "2026-05-21 13:00:00",
    canRetry: false,
  },
];

export const mockRefunds: Refund[] = [
  {
    id: "REF001",
    orderId: "ORD-2026-050",
    transactionId: "TXN004",
    customerId: "CUST004",
    customerName: "Alice Brown",
    amount: 560.75,
    status: "completed",
    reason: "Order cancelled by customer",
    requestedBy: "Customer",
    requestedAt: "2026-05-21 14:00:00",
    processedAt: "2026-05-21 15:00:00",
  },
  {
    id: "REF002",
    orderId: "ORD-2026-055",
    transactionId: "TXN010",
    customerId: "CUST010",
    customerName: "Tom Hardy",
    amount: 1200.00,
    status: "processing",
    reason: "Damaged product received",
    requestedBy: "Customer",
    requestedAt: "2026-05-21 10:30:00",
  },
  {
    id: "REF003",
    orderId: "ORD-2026-060",
    transactionId: "TXN015",
    customerId: "CUST015",
    customerName: "Lisa Ray",
    amount: 450.25,
    status: "pending",
    reason: "Wrong item delivered",
    requestedBy: "Support Agent",
    requestedAt: "2026-05-21 09:00:00",
  },
  {
    id: "REF004",
    orderId: "ORD-2026-065",
    transactionId: "TXN020",
    customerId: "CUST020",
    customerName: "Raj Kumar",
    amount: 890.00,
    status: "rejected",
    reason: "Product not in returnable condition",
    requestedBy: "Customer",
    requestedAt: "2026-05-20 16:00:00",
    processedAt: "2026-05-20 18:00:00",
  },
];

export const mockWallets: Wallet[] = [
  {
    customerId: "CUST001",
    customerName: "John Doe",
    email: "john.doe@example.com",
    balance: 250.00,
    cashback: 125.50,
    totalSpent: 15200.00,
    lastTransaction: "2026-05-21",
    status: "active",
  },
  {
    customerId: "CUST002",
    customerName: "Jane Smith",
    email: "jane.smith@example.com",
    balance: 580.75,
    cashback: 89.25,
    totalSpent: 8900.00,
    lastTransaction: "2026-05-20",
    status: "active",
  },
  {
    customerId: "CUST003",
    customerName: "Bob Johnson",
    email: "bob.johnson@example.com",
    balance: 0.00,
    cashback: 45.00,
    totalSpent: 3200.00,
    lastTransaction: "2026-05-18",
    status: "active",
  },
  {
    customerId: "CUST004",
    customerName: "Alice Brown",
    email: "alice.brown@example.com",
    balance: 1200.50,
    cashback: 234.75,
    totalSpent: 28500.00,
    lastTransaction: "2026-05-21",
    status: "active",
  },
  {
    customerId: "CUST005",
    customerName: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    balance: 75.25,
    cashback: 12.00,
    totalSpent: 1500.00,
    lastTransaction: "2026-05-15",
    status: "suspended",
  },
];

export const mockVendorSettlements: VendorSettlement[] = [
  {
    id: "SETTLE001",
    vendorId: "VEND001",
    vendorName: "Fresh Foods Pvt Ltd",
    totalOrders: 156,
    grossAmount: 125000.00,
    commission: 12500.00,
    tax: 2025.00,
    netAmount: 110475.00,
    status: "settled",
    settlementDate: "2026-05-20",
    period: "May 1-15, 2026",
  },
  {
    id: "SETTLE002",
    vendorId: "VEND002",
    vendorName: "Organic Farms",
    totalOrders: 89,
    grossAmount: 78500.00,
    commission: 7850.00,
    tax: 1269.75,
    netAmount: 69380.25,
    status: "processing",
    settlementDate: "2026-05-22",
    period: "May 1-15, 2026",
  },
  {
    id: "SETTLE003",
    vendorId: "VEND003",
    vendorName: "Daily Essentials Co",
    totalOrders: 234,
    grossAmount: 189000.00,
    commission: 18900.00,
    tax: 3055.50,
    netAmount: 167044.50,
    status: "pending",
    settlementDate: "2026-05-25",
    period: "May 1-15, 2026",
  },
  {
    id: "SETTLE004",
    vendorId: "VEND004",
    vendorName: "Snacks World",
    totalOrders: 67,
    grossAmount: 45600.00,
    commission: 4560.00,
    tax: 737.40,
    netAmount: 40302.60,
    status: "settled",
    settlementDate: "2026-05-18",
    period: "May 1-15, 2026",
  },
];

export const mockPaymentMethodStats: PaymentMethodStats[] = [
  {
    method: "UPI",
    transactions: 1250,
    successRate: 96.5,
    totalAmount: 1250000.00,
    avgTransactionValue: 1000.00,
  },
  {
    method: "Credit Card",
    transactions: 580,
    successRate: 94.2,
    totalAmount: 870000.00,
    avgTransactionValue: 1500.00,
  },
  {
    method: "Debit Card",
    transactions: 420,
    successRate: 93.8,
    totalAmount: 420000.00,
    avgTransactionValue: 1000.00,
  },
  {
    method: "Net Banking",
    transactions: 310,
    successRate: 91.5,
    totalAmount: 465000.00,
    avgTransactionValue: 1500.00,
  },
  {
    method: "Wallet",
    transactions: 890,
    successRate: 99.1,
    totalAmount: 445000.00,
    avgTransactionValue: 500.00,
  },
];

// Revenue report data
export interface RevenueData {
  date: string;
  grossRevenue: number;
  netRevenue: number;
  orders: number;
  avgOrderValue: number;
  refunds: number;
  discounts: number;
}

export const mockRevenueData: RevenueData[] = [
  { date: "2026-05-01", grossRevenue: 125000, netRevenue: 118750, orders: 156, avgOrderValue: 801.28, refunds: 3125, discounts: 3125 },
  { date: "2026-05-02", grossRevenue: 98000, netRevenue: 93100, orders: 122, avgOrderValue: 803.28, refunds: 2450, discounts: 2450 },
  { date: "2026-05-03", grossRevenue: 145000, netRevenue: 137750, orders: 178, avgOrderValue: 814.61, refunds: 3625, discounts: 3625 },
  { date: "2026-05-04", grossRevenue: 112000, netRevenue: 106400, orders: 140, avgOrderValue: 800.00, refunds: 2800, discounts: 2800 },
  { date: "2026-05-05", grossRevenue: 156000, netRevenue: 148200, orders: 195, avgOrderValue: 800.00, refunds: 3900, discounts: 3900 },
  { date: "2026-05-06", grossRevenue: 134000, netRevenue: 127300, orders: 167, avgOrderValue: 802.40, refunds: 3350, discounts: 3350 },
  { date: "2026-05-07", grossRevenue: 178000, netRevenue: 169100, orders: 223, avgOrderValue: 798.21, refunds: 4450, discounts: 4450 },
];

// GST Report data
export interface GSTReport {
  month: string;
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  taxableValue: number;
  filings: "filed" | "pending" | "overdue";
}

export const mockGSTReports: GSTReport[] = [
  { month: "April 2026", cgst: 45000, sgst: 45000, igst: 32000, totalGST: 122000, taxableValue: 677777.78, filings: "filed" },
  { month: "March 2026", cgst: 52000, sgst: 52000, igst: 38000, totalGST: 142000, taxableValue: 788888.89, filings: "filed" },
  { month: "February 2026", cgst: 48000, sgst: 48000, igst: 35000, totalGST: 131000, taxableValue: 727777.78, filings: "filed" },
  { month: "January 2026", cgst: 55000, sgst: 55000, igst: 40000, totalGST: 150000, taxableValue: 833333.33, filings: "pending" },
];

// Tax Report data
export interface TaxReport {
  period: string;
  tdsCollected: number;
  tcsCollected: number;
  totalTax: number;
  filings: "filed" | "pending" | "overdue";
}

export const mockTaxReports: TaxReport[] = [
  { period: "Q4 FY 2025-26", tdsCollected: 125000, tcsCollected: 85000, totalTax: 210000, filings: "pending" },
  { period: "Q3 FY 2025-26", tdsCollected: 118000, tcsCollected: 79000, totalTax: 197000, filings: "filed" },
  { period: "Q2 FY 2025-26", tdsCollected: 112000, tcsCollected: 75000, totalTax: 187000, filings: "filed" },
  { period: "Q1 FY 2025-26", tdsCollected: 105000, tcsCollected: 71000, totalTax: 176000, filings: "filed" },
];