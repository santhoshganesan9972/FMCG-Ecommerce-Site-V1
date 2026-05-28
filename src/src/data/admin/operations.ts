// Mock data for Delivery Zones, Warehouses, Search, and other admin sections

// ── Delivery Zones ──────────────────────────────────────────
export interface DeliveryZone {
  id: string;
  name: string;
  cities: string[];
  pincodes: string[];
  baseFee: number;
  perKmFee: number;
  minOrderForFree: number;
  estimatedDelivery: string;
  isActive: boolean;
  radiusKm: number;
  riders: number;
}

export const mockDeliveryZones: DeliveryZone[] = [
  { id: "DZ-001", name: "Mumbai Metro", cities: ["Mumbai", "Navi Mumbai", "Thane"], pincodes: ["400001-400080", "400601-400615"], baseFee: 20, perKmFee: 5, minOrderForFree: 199, estimatedDelivery: "10-15 min", isActive: true, radiusKm: 15, riders: 42 },
  { id: "DZ-002", name: "Bangalore North", cities: ["Bangalore (North)"], pincodes: ["560001-560050"], baseFee: 25, perKmFee: 6, minOrderForFree: 249, estimatedDelivery: "12-18 min", isActive: true, radiusKm: 12, riders: 28 },
  { id: "DZ-003", name: "Delhi NCR", cities: ["Delhi", "Gurgaon", "Noida"], pincodes: ["110001-110090", "201301-201309"], baseFee: 15, perKmFee: 4, minOrderForFree: 149, estimatedDelivery: "15-20 min", isActive: true, radiusKm: 20, riders: 56 },
  { id: "DZ-004", name: "Pune City", cities: ["Pune"], pincodes: ["411001-411045"], baseFee: 20, perKmFee: 5, minOrderForFree: 199, estimatedDelivery: "10-15 min", isActive: true, radiusKm: 12, riders: 18 },
  { id: "DZ-005", name: "Hyderabad", cities: ["Hyderabad"], pincodes: ["500001-500082"], baseFee: 20, perKmFee: 5, minOrderForFree: 199, estimatedDelivery: "12-18 min", isActive: false, radiusKm: 14, riders: 22 },
  { id: "DZ-006", name: "Chennai Central", cities: ["Chennai"], pincodes: ["600001-600040"], baseFee: 25, perKmFee: 6, minOrderForFree: 249, estimatedDelivery: "15-20 min", isActive: true, radiusKm: 10, riders: 15 },
];

// ── Warehouses ──────────────────────────────────────────────
export interface Warehouse {
  id: string;
  name: string;
  type: "hub" | "cold_storage" | "depot";
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalCapacity: number;
  usedCapacity: number;
  totalSkus: number;
  staffCount: number;
  operatingHours: string;
  isActive: boolean;
  createdAt: string;
}

export const mockWarehouses: Warehouse[] = [
  { id: "WH-001", name: "Mumbai Hub", type: "hub", address: "Plot 42, MIDC Industrial Area, Andheri East", city: "Mumbai", state: "Maharashtra", pincode: "400093", totalCapacity: 50000, usedCapacity: 38000, totalSkus: 1240, staffCount: 28, operatingHours: "24/7", isActive: true, createdAt: "2024-01-01" },
  { id: "WH-002", name: "Pune Cold Storage", type: "cold_storage", address: "Sector 15, Chakan Industrial Area", city: "Pune", state: "Maharashtra", pincode: "410501", totalCapacity: 20000, usedCapacity: 14500, totalSkus: 320, staffCount: 12, operatingHours: "06:00-22:00", isActive: true, createdAt: "2024-02-15" },
  { id: "WH-003", name: "Bangalore Cold Room", type: "cold_storage", address: "88, Electronic City Phase 1", city: "Bangalore", state: "Karnataka", pincode: "560100", totalCapacity: 25000, usedCapacity: 19200, totalSkus: 480, staffCount: 15, operatingHours: "24/7", isActive: true, createdAt: "2024-03-01" },
  { id: "WH-004", name: "Hyderabad Depot", type: "depot", address: "22, Hardware Park, Shamshabad", city: "Hyderabad", state: "Telangana", pincode: "501218", totalCapacity: 30000, usedCapacity: 21000, totalSkus: 680, staffCount: 18, operatingHours: "08:00-20:00", isActive: true, createdAt: "2024-04-10" },
  { id: "WH-005", name: "Delhi Central Hub", type: "hub", address: "56, Okhla Industrial Estate, Phase 3", city: "Delhi", state: "Delhi", pincode: "110020", totalCapacity: 60000, usedCapacity: 42000, totalSkus: 1560, staffCount: 35, operatingHours: "24/7", isActive: true, createdAt: "2024-01-15" },
];

// ── Search Management ───────────────────────────────────────
export interface SearchKeyword {
  id: string;
  keyword: string;
  searchCount: number;
  resultCount: number;
  conversionRate: string;
  trend: "up" | "down" | "stable";
  lastSearched: string;
}

export interface SearchSynonym {
  id: string;
  term: string;
  synonyms: string[];
  isActive: boolean;
}

export interface TrendingSearch {
  id: string;
  keyword: string;
  position: number;
  previousPosition: number | null;
  volume: number;
  change: string;
  period: string;
}

export const mockSearchKeywords: SearchKeyword[] = [
  { id: "SK-001", keyword: "basmati rice", searchCount: 2450, resultCount: 42, conversionRate: "18.5%", trend: "up", lastSearched: "2 min ago" },
  { id: "SK-002", keyword: "milk 1l", searchCount: 3890, resultCount: 18, conversionRate: "24.2%", trend: "up", lastSearched: "1 min ago" },
  { id: "SK-003", keyword: "apple", searchCount: 1820, resultCount: 56, conversionRate: "15.8%", trend: "stable", lastSearched: "5 min ago" },
  { id: "SK-004", keyword: "coca cola", searchCount: 2100, resultCount: 12, conversionRate: "28.1%", trend: "down", lastSearched: "3 min ago" },
  { id: "SK-005", keyword: "wheat flour", searchCount: 1560, resultCount: 28, conversionRate: "20.3%", trend: "stable", lastSearched: "8 min ago" },
  { id: "SK-006", keyword: "butter", searchCount: 980, resultCount: 22, conversionRate: "22.5%", trend: "up", lastSearched: "10 min ago" },
  { id: "SK-007", keyword: "chips", searchCount: 1340, resultCount: 65, conversionRate: "12.4%", trend: "down", lastSearched: "6 min ago" },
  { id: "SK-008", keyword: "eggs", searchCount: 3100, resultCount: 8, conversionRate: "32.0%", trend: "up", lastSearched: "1 min ago" },
];

export const mockSearchSynonyms: SearchSynonym[] = [
  { id: "SS-001", term: "mobile", synonyms: ["phone", "smartphone", "cell phone", "handset"], isActive: true },
  { id: "SS-002", term: "laptop", synonyms: ["notebook", "computer", "macbook"], isActive: true },
  { id: "SS-003", term: "sneakers", synonyms: ["shoes", "trainers", "running shoes", "footwear"], isActive: true },
  { id: "SS-004", term: "soap", synonyms: ["bath soap", "body wash", "face wash"], isActive: false },
  { id: "SS-005", term: "rice", synonyms: ["chawal", "arroz", "basmati", "pulao rice"], isActive: true },
];

export const mockTrendingSearches: TrendingSearch[] = [
  { id: "TS-001", keyword: "mango", position: 1, previousPosition: 3, volume: 5200, change: "+167%", period: "Last 7 days" },
  { id: "TS-002", keyword: "ice cream", position: 2, previousPosition: 5, volume: 4800, change: "+120%", period: "Last 7 days" },
  { id: "TS-003", keyword: "cold coffee", position: 3, previousPosition: 2, volume: 4100, change: "+85%", period: "Last 7 days" },
  { id: "TS-004", keyword: "summer juice", position: 4, previousPosition: null, volume: 3500, change: "New", period: "Last 7 days" },
  { id: "TS-005", keyword: "watermelon", position: 5, previousPosition: 7, volume: 2900, change: "+45%", period: "Last 7 days" },
];

// ── Fraud & Risk ───────────────────────────────────────────
export interface FraudScoreEntry {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  lastFlagged: string;
  totalFlags: number;
  reason: string;
  status: "monitoring" | "blocked" | "cleared" | "review" | "investigating";
}

export interface SuspiciousActivity {
  id: string;
  customerId: string;
  customerName: string;
  activity: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
  ipAddress: string;
  device: string;
  details: string;
  status: "new" | "investigating" | "resolved";
}

export const mockFraudScores: FraudScoreEntry[] = [
  { id: "FRD-001", customerId: "CUST101", customerName: "Mark Davis", email: "mark.davis@example.com", riskScore: 85, riskLevel: "high", lastFlagged: "2026-05-21 16:30", totalFlags: 7, reason: "Multiple failed payment attempts from different cards", status: "blocked" },
  { id: "FRD-002", customerId: "CUST102", customerName: "Sarah Connor", email: "sarah.c@example.com", riskScore: 92, riskLevel: "critical", lastFlagged: "2026-05-21 15:00", totalFlags: 12, reason: "Suspicious bulk ordering pattern with stolen cards", status: "review" },
  { id: "FRD-003", customerId: "CUST103", customerName: "Mike Ross", email: "mike.ross@example.com", riskScore: 45, riskLevel: "medium", lastFlagged: "2026-05-20 10:00", totalFlags: 3, reason: "Shipping address mismatch with billing address", status: "monitoring" },
  { id: "FRD-004", customerId: "CUST104", customerName: "Emily Clark", email: "emily.c@example.com", riskScore: 15, riskLevel: "low", lastFlagged: "2026-05-19 09:00", totalFlags: 1, reason: "Single failed OTP attempt", status: "cleared" },
  { id: "FRD-005", customerId: "CUST105", customerName: "Tom Hardy", email: "tom.hardy@example.com", riskScore: 78, riskLevel: "high", lastFlagged: "2026-05-21 14:00", totalFlags: 5, reason: "Multiple accounts registered with same phone number", status: "investigating" },
];

export const mockSuspiciousActivities: SuspiciousActivity[] = [
  { id: "SA-001", customerId: "CUST101", customerName: "Mark Davis", activity: "Bulk order cancellation after delivery", severity: "high", timestamp: "2026-05-21 16:30", ipAddress: "103.xx.xx.45", device: "Chrome / Windows", details: "Customer ordered 15 items worth ₹4,200 and cancelled all within 5 min of delivery", status: "new" },
  { id: "SA-002", customerId: "CUST102", customerName: "Sarah Connor", activity: "Multiple failed transactions with different cards", severity: "high", timestamp: "2026-05-21 15:00", ipAddress: "203.xx.xx.12", device: "Safari / macOS", details: "Attempted 8 payments with 4 different credit cards in 10 minutes", status: "investigating" },
  { id: "SA-003", customerId: "CUST106", customerName: "Alex Turner", activity: "Login from unusual location", severity: "medium", timestamp: "2026-05-21 12:00", ipAddress: "45.xx.xx.78", device: "Mobile / Android", details: "Account accessed from IP in Nigeria — user is based in Mumbai", status: "new" },
  { id: "SA-004", customerId: "CUST107", customerName: "Lisa Wong", activity: "Rapid-fire coupon usage", severity: "medium", timestamp: "2026-05-20 18:00", ipAddress: "182.xx.xx.34", device: "Chrome / Android", details: "Used 12 different new-user coupons on 12 accounts in 30 mins", status: "investigating" },
  { id: "SA-005", customerId: "CUST108", customerName: "Raj Mehta", activity: "Changed delivery address after payment", severity: "low", timestamp: "2026-05-20 14:00", ipAddress: "120.xx.xx.56", device: "Firefox / Windows", details: "Changed delivery address to different city post-payment", status: "resolved" },
];

// ── Device & Session ────────────────────────────────────────
export interface ActiveSession {
  id: string;
  customerId: string;
  customerName: string;
  deviceType: "mobile" | "desktop" | "tablet";
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  loginTime: string;
  isCurrent: boolean;
}

export const mockActiveSessions: ActiveSession[] = [
  { id: "SES-001", customerId: "CUST001", customerName: "John Doe", deviceType: "mobile", browser: "Chrome 124", os: "Android 14", ipAddress: "103.xx.xx.100", location: "Mumbai, IN", lastActive: "Now", loginTime: "2026-05-21 14:00", isCurrent: true },
  { id: "SES-002", customerId: "CUST001", customerName: "John Doe", deviceType: "desktop", browser: "Firefox 126", os: "Windows 11", ipAddress: "103.xx.xx.100", location: "Mumbai, IN", lastActive: "2 hours ago", loginTime: "2026-05-21 09:00", isCurrent: false },
  { id: "SES-003", customerId: "CUST002", customerName: "Jane Smith", deviceType: "mobile", browser: "Safari 17", os: "iOS 18", ipAddress: "182.xx.xx.50", location: "Bangalore, IN", lastActive: "30 min ago", loginTime: "2026-05-21 11:00", isCurrent: false },
  { id: "SES-004", customerId: "CUST002", customerName: "Jane Smith", deviceType: "tablet", browser: "Safari 17", os: "iPadOS 18", ipAddress: "182.xx.xx.50", location: "Bangalore, IN", lastActive: "1 hour ago", loginTime: "2026-05-21 10:00", isCurrent: false },
  { id: "SES-005", customerId: "CUST003", customerName: "Bob Johnson", deviceType: "mobile", browser: "Chrome 124", os: "Android 13", ipAddress: "45.xx.xx.200", location: "Delhi, IN", lastActive: "5 min ago", loginTime: "2026-05-21 08:00", isCurrent: false },
];
