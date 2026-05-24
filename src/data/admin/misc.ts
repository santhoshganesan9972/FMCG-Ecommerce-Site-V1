// Mock data for remaining admin sections

// ── Abandoned Carts ─────────────────────────────────────────
export interface AbandonedCart {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  items: number;
  total: number;
  abandonedAt: string;
  status: "new" | "reminded" | "recovered" | "lost";
  recoveryAttempts: number;
  lastReminderSent: string | null;
  source: string;
}

export const mockAbandonedCarts: AbandonedCart[] = [
  { id: "AC-001", customerId: "CUST050", customerName: "Ravi Kumar", email: "ravi.k@example.com", phone: "+91 98765 43210", items: 5, total: 1240, abandonedAt: "2026-05-21 14:30", status: "new", recoveryAttempts: 0, lastReminderSent: null, source: "Direct" },
  { id: "AC-002", customerId: "CUST051", customerName: "Anita Singh", email: "anita.s@example.com", phone: "+91 87654 32109", items: 3, total: 680, abandonedAt: "2026-05-21 13:00", status: "reminded", recoveryAttempts: 1, lastReminderSent: "2026-05-21 14:00", source: "Email Campaign" },
  { id: "AC-003", customerId: "CUST052", customerName: "Vikram Patel", email: "vikram.p@example.com", phone: "+91 76543 21098", items: 8, total: 2150, abandonedAt: "2026-05-20 18:00", status: "recovered", recoveryAttempts: 2, lastReminderSent: "2026-05-21 10:00", source: "Push Notification" },
  { id: "AC-004", customerId: "CUST053", customerName: "Sunita Verma", email: "sunita.v@example.com", phone: "+91 65432 10987", items: 2, total: 450, abandonedAt: "2026-05-20 09:30", status: "lost", recoveryAttempts: 3, lastReminderSent: "2026-05-21 09:00", source: "Social Media" },
  { id: "AC-005", customerId: "CUST054", customerName: "Deepak Joshi", email: "deepak.j@example.com", phone: "+91 54321 09876", items: 12, total: 3800, abandonedAt: "2026-05-19 20:00", status: "reminded", recoveryAttempts: 1, lastReminderSent: "2026-05-20 10:00", source: "WhatsApp" },
  { id: "AC-006", customerId: "CUST055", customerName: "Pooja Reddy", email: "pooja.r@example.com", phone: "+91 91234 56789", items: 4, total: 890, abandonedAt: "2026-05-19 16:45", status: "new", recoveryAttempts: 0, lastReminderSent: null, source: "Direct" },
];

// ── Barcodes ────────────────────────────────────────────────
export interface BarcodeEntry {
  id: string;
  barcode: string;
  productId: string;
  productName: string;
  sku: string;
  variant: string;
  mrp: number;
  status: "active" | "inactive";
  lastScanned: string | null;
}

export const mockBarcodes: BarcodeEntry[] = [
  { id: "BAR-001", barcode: "8901234567890", productId: "PRD-001", productName: "Organic Basmati Rice", sku: "RICE-BAS-001", variant: "5 kg", mrp: 699, status: "active", lastScanned: "2026-05-21 10:30" },
  { id: "BAR-002", barcode: "8901234567891", productId: "PRD-002", productName: "Fresh Red Apples", sku: "FRUIT-APL-001", variant: "1 kg", mrp: 249, status: "active", lastScanned: "2026-05-21 09:15" },
  { id: "BAR-003", barcode: "8901234567892", productId: "PRD-003", productName: "Natural Honey 500g", sku: "HEALTH-HNY-001", variant: "500 ml", mrp: 449, status: "inactive", lastScanned: null },
  { id: "BAR-004", barcode: "8901234567893", productId: "PRD-004", productName: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", variant: "1 L", mrp: 85, status: "active", lastScanned: "2026-05-21 11:00" },
  { id: "BAR-005", barcode: "8901234567894", productId: "PRD-005", productName: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", variant: "250 ml", mrp: 299, status: "active", lastScanned: "2026-05-20 16:45" },
];

// ── BI / Analytics ──────────────────────────────────────────
export interface CustomerInsight {
  metric: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

export interface ProductInsight {
  productId: string;
  productName: string;
  category: string;
  revenue: number;
  unitsSold: number;
  growth: string;
  topCategory: boolean;
}

export const mockCustomerInsights: CustomerInsight[] = [
  { metric: "Customer Lifetime Value", value: "₹8,420", change: "+12.5%", trend: "up", description: "Average CLV across all segments" },
  { metric: "Repeat Purchase Rate", value: "62.3%", change: "+4.1%", trend: "up", description: "Customers who ordered more than once" },
  { metric: "Avg Acquisition Cost", value: "₹185", change: "-8.2%", trend: "down", description: "Cost to acquire a new customer" },
  { metric: "Churn Rate", value: "8.7%", change: "-1.3%", trend: "down", description: "Monthly customer churn rate" },
  { metric: "NPS Score", value: "72", change: "+5", trend: "up", description: "Net Promoter Score (0-100)" },
  { metric: "Avg Order Frequency", value: "4.2/mo", change: "+0.6", trend: "up", description: "Orders per active customer per month" },
];

export const mockProductInsights: ProductInsight[] = [
  { productId: "PRD-001", productName: "Organic Basmati Rice", category: "Groceries", revenue: 58400, unitsSold: 117, growth: "+24%", topCategory: false },
  { productId: "PRD-004", productName: "Full Cream Milk 1L", category: "Dairy", revenue: 95200, unitsSold: 1400, growth: "+18%", topCategory: true },
  { productId: "PRD-008", productName: "Cold Brew Coffee", category: "Beverages", revenue: 37400, unitsSold: 150, growth: "+42%", topCategory: false },
  { productId: "PRD-010", productName: "Green Tea Pack", category: "Beverages", revenue: 27800, unitsSold: 140, growth: "+8%", topCategory: false },
  { productId: "PRD-002", productName: "Fresh Red Apples", category: "Fruits", revenue: 41800, unitsSold: 210, growth: "+31%", topCategory: true },
];

export interface PredictiveAnalytics {
  forecast: string;
  confidence: number;
  factors: string[];
  recommendation: string;
}

export const mockPredictiveAnalytics: Record<string, PredictiveAnalytics> = {
  demand: { forecast: "12.4% increase in next 30 days", confidence: 87, factors: ["Seasonal demand (summer)", "New user growth", "Upcoming promotions"], recommendation: "Increase inventory for beverages and dairy by 20%" },
  revenue: { forecast: "₹48.2L projected for next month (↑15%)", confidence: 82, factors: ["Historical growth trend", "Monsoon season impact", "Marketing campaigns"], recommendation: "Plan stock for high-demand monsoon essentials" },
  churn: { forecast: "7.2% churn rate predicted (↓1.5%)", confidence: 78, factors: ["Improved delivery times", "Loyalty program impact", "Coupon usage trends"], recommendation: "Target at-risk segment with personalized offers" },
};

// ── Templates ───────────────────────────────────────────────
export interface MessageTemplate {
  id: string;
  name: string;
  type: "order" | "otp" | "promotional" | "transactional" | "alert";
  channel: "email" | "sms" | "whatsapp";
  subject: string;
  content: string;
  variables: string[];
  status: "active" | "draft" | "archived";
  lastUsed: string | null;
  updatedAt: string;
}

export const mockTemplates: MessageTemplate[] = [
  { id: "TMP-001", name: "Order Confirmation", type: "order", channel: "email", subject: "Your Order #{{order_id}} is Confirmed!", content: "Hi {{customer_name}}, your order of {{items_count}} items worth ₹{{total}} has been confirmed. Expected delivery: {{delivery_time}}.", variables: ["order_id", "customer_name", "items_count", "total", "delivery_time"], status: "active", lastUsed: "2026-05-21 14:00", updatedAt: "2026-05-01" },
  { id: "TMP-002", name: "Order Delivery Update", type: "order", channel: "sms", subject: "Delivery Update", content: "{{customer_name}}, your order #{{order_id}} is out for delivery! Track here: {{tracking_url}}", variables: ["customer_name", "order_id", "tracking_url"], status: "active", lastUsed: "2026-05-21 13:30", updatedAt: "2026-05-05" },
  { id: "TMP-003", name: "OTP Verification", type: "otp", channel: "sms", subject: "Your OTP Code", content: "Your OTP for {{action}} is {{otp}}. Valid for 5 minutes. - FMCG", variables: ["action", "otp"], status: "active", lastUsed: "2026-05-21 14:15", updatedAt: "2026-04-15" },
  { id: "TMP-004", name: "Welcome Promo", type: "promotional", channel: "email", subject: "Welcome! Get ₹100 Off Your First Order", content: "Hi {{customer_name}}, welcome to FMCG Commerce! Use code {{coupon_code}} to get ₹100 off on your first order.", variables: ["customer_name", "coupon_code"], status: "active", lastUsed: "2026-05-21 12:00", updatedAt: "2026-04-20" },
  { id: "TMP-005", name: "Abandoned Cart Reminder", type: "promotional", channel: "whatsapp", subject: "Complete Your Order", content: "Hi {{customer_name}}, you left items worth ₹{{total}} in your cart! Order now and get free delivery.", variables: ["customer_name", "total"], status: "draft", lastUsed: null, updatedAt: "2026-05-10" },
  { id: "TMP-006", name: "Password Reset OTP", type: "otp", channel: "sms", subject: "Password Reset OTP", content: "OTP to reset password: {{otp}}. Valid for 10 minutes. - FMCG", variables: ["otp"], status: "active", lastUsed: "2026-05-21 11:45", updatedAt: "2026-03-01" },
];

// ── Purchase Orders ─────────────────────────────────────────
export interface PurchaseOrder {
  id: string;
  supplier: string;
  items: number;
  totalQty: number;
  totalAmount: number;
  status: "draft" | "pending_approval" | "approved" | "sent" | "partially_received" | "completed" | "cancelled";
  orderedBy: string;
  approvedBy: string | null;
  createdAt: string;
  expectedDelivery: string;
  receivedDate: string | null;
  notes: string;
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: "PO-001", supplier: "Fortune Foods Ltd", items: 5, totalQty: 500, totalAmount: 245000, status: "pending_approval", orderedBy: "Store Manager", approvedBy: null, createdAt: "2026-05-21 10:00", expectedDelivery: "2026-05-28", receivedDate: null, notes: "Urgent - Basmati rice stock running low" },
  { id: "PO-002", supplier: "Kashmir Fruit Co.", items: 3, totalQty: 200, totalAmount: 56000, status: "approved", orderedBy: "Admin User", approvedBy: "Super Admin", createdAt: "2026-05-20 14:00", expectedDelivery: "2026-05-26", receivedDate: null, notes: "" },
  { id: "PO-003", supplier: "Dabur India Ltd", items: 8, totalQty: 1000, totalAmount: 480000, status: "sent", orderedBy: "Store Manager", approvedBy: "Admin User", createdAt: "2026-05-19 09:00", expectedDelivery: "2026-06-02", receivedDate: null, notes: "Quarterly bulk order" },
  { id: "PO-004", supplier: "Amul Dairy", items: 4, totalQty: 2000, totalAmount: 136000, status: "partially_received", orderedBy: "Admin User", approvedBy: "Super Admin", createdAt: "2026-05-15 11:00", expectedDelivery: "2026-05-22", receivedDate: "2026-05-22 (partial)", notes: "Received 1200 units, 800 pending" },
  { id: "PO-005", supplier: "Local Farm Produce", items: 6, totalQty: 300, totalAmount: 78000, status: "completed", orderedBy: "Store Manager", approvedBy: "Admin User", createdAt: "2026-05-10 08:00", expectedDelivery: "2026-05-17", receivedDate: "2026-05-17", notes: "" },
  { id: "PO-006", supplier: "Snack World Distributors", items: 10, totalQty: 1500, totalAmount: 225000, status: "draft", orderedBy: "Store Manager", approvedBy: null, createdAt: "2026-05-21 15:00", expectedDelivery: "2026-05-30", receivedDate: null, notes: "New supplier onboarding" },
];

// ── Queue Jobs ──────────────────────────────────────────────
export interface QueueJob {
  id: string;
  queue: string;
  type: "notification" | "order" | "report" | "email" | "billing" | "dispatch";
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  priority: "low" | "normal" | "high" | "critical";
  payload: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  attempts: number;
  error: string | null;
}

export const mockQueueJobs: QueueJob[] = [
  { id: "QJ-001", queue: "notifications", type: "notification", status: "processing", priority: "high", payload: "Push notification to 500 users", createdAt: "2026-05-21 14:30", startedAt: "2026-05-21 14:30", completedAt: null, attempts: 1, error: null },
  { id: "QJ-002", queue: "notifications", type: "notification", status: "pending", priority: "normal", payload: "Email campaign - Summer Sale", createdAt: "2026-05-21 14:25", startedAt: null, completedAt: null, attempts: 0, error: null },
  { id: "QJ-003", queue: "emails", type: "email", status: "failed", priority: "normal", payload: "Order confirmation #ORD-2026-100", createdAt: "2026-05-21 14:00", startedAt: "2026-05-21 14:00", completedAt: null, attempts: 3, error: "SMTP connection timeout" },
  { id: "QJ-004", queue: "order", type: "order", status: "completed", priority: "critical", payload: "Process order #ORD-2026-095", createdAt: "2026-05-21 13:45", startedAt: "2026-05-21 13:45", completedAt: "2026-05-21 13:46", attempts: 1, error: null },
  { id: "QJ-005", queue: "emails", type: "email", status: "pending", priority: "low", payload: "Weekly newsletter to 50K subscribers", createdAt: "2026-05-21 12:00", startedAt: null, completedAt: null, attempts: 0, error: null },
  { id: "QJ-006", queue: "report-generation", type: "report", status: "failed", priority: "low", payload: "Monthly inventory report - April", createdAt: "2026-05-20 08:00", startedAt: "2026-05-20 08:00", completedAt: null, attempts: 4, error: "Database connection timeout" },
  { id: "QJ-007", queue: "subscription-billing", type: "billing", status: "pending", priority: "high", payload: "Process 250 subscription renewals", createdAt: "2026-05-21 00:00", startedAt: null, completedAt: null, attempts: 0, error: null },
  { id: "QJ-008", queue: "delivery-dispatch", type: "dispatch", status: "completed", priority: "critical", payload: "Dispatch 45 orders to riders", createdAt: "2026-05-21 08:00", startedAt: "2026-05-21 08:00", completedAt: "2026-05-21 08:02", attempts: 1, error: null },
];

// ── Media / File Management ─────────────────────────────────
export interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "other";
  format: string;
  size: string;
  dimensions: string;
  url: string;
  relatedTo: string;
  relatedId: string;
  uploadedBy: string;
  uploadedAt: string;
  status: "active" | "archived";
}

export const mockMediaFiles: MediaFile[] = [
  { id: "MED-F-001", name: "basmati-rice-pack.jpg", type: "image", format: "JPEG", size: "2.4 MB", dimensions: "1920x1080", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c", relatedTo: "Product", relatedId: "PRD-001", uploadedBy: "Admin User", uploadedAt: "2026-01-15", status: "active" },
  { id: "MED-F-002", name: "summer-sale-banner.png", type: "image", format: "PNG", size: "1.8 MB", dimensions: "1200x400", url: "#", relatedTo: "Campaign", relatedId: "CAMP-001", uploadedBy: "Marketing", uploadedAt: "2026-05-01", status: "active" },
  { id: "MED-F-003", name: "product-catalog-april.pdf", type: "document", format: "PDF", size: "8.2 MB", dimensions: "N/A", url: "#", relatedTo: "Product", relatedId: "PRD-ALL", uploadedBy: "Admin User", uploadedAt: "2026-04-15", status: "active" },
  { id: "MED-F-004", name: "new-arrivals-promo.mp4", type: "video", format: "MP4", size: "45 MB", dimensions: "1920x1080", url: "#", relatedTo: "Campaign", relatedId: "CAMP-002", uploadedBy: "Marketing", uploadedAt: "2026-05-10", status: "active" },
  { id: "MED-F-005", name: "old-logo.png", type: "image", format: "PNG", size: "0.5 MB", dimensions: "500x200", url: "#", relatedTo: "Brand", relatedId: "BRAND-OLD", uploadedBy: "Admin User", uploadedAt: "2025-06-01", status: "archived" },
];

// ── Delivery Partners ───────────────────────────────────────
export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  email: string;
  zone: string;
  vehicleType: "bike" | "scooter" | "ev_scooter" | "cycle";
  status: "online" | "offline" | "busy" | "suspended";
  rating: number;
  totalDeliveries: number;
  earnings: string;
  shift: string;
  joinedAt: string;
  lastActive: string;
}

export const mockDeliveryPartners: DeliveryPartner[] = [
  { id: "DP-001", name: "Rahul Sharma", phone: "+91 98765 43201", email: "rahul.s@example.com", zone: "Mumbai Metro", vehicleType: "bike", status: "online", rating: 4.9, totalDeliveries: 3420, earnings: "₹1.82L", shift: "06:00-14:00", joinedAt: "2025-01-15", lastActive: "Now" },
  { id: "DP-002", name: "Suresh Reddy", phone: "+91 98765 43202", email: "suresh.r@example.com", zone: "Mumbai Metro", vehicleType: "ev_scooter", status: "busy", rating: 4.7, totalDeliveries: 2150, earnings: "₹1.20L", shift: "14:00-22:00", joinedAt: "2025-03-10", lastActive: "2 min ago" },
  { id: "DP-003", name: "Amit Kumar", phone: "+91 98765 43203", email: "amit.k@example.com", zone: "Delhi NCR", vehicleType: "scooter", status: "online", rating: 4.8, totalDeliveries: 1890, earnings: "₹98K", shift: "06:00-14:00", joinedAt: "2025-04-01", lastActive: "Now" },
  { id: "DP-004", name: "Vijay Singh", phone: "+91 98765 43204", email: "vijay.s@example.com", zone: "Delhi NCR", vehicleType: "cycle", status: "offline", rating: 4.5, totalDeliveries: 890, earnings: "₹45K", shift: "14:00-22:00", joinedAt: "2025-06-15", lastActive: "3 hours ago" },
  { id: "DP-005", name: "Manoj Patil", phone: "+91 98765 43205", email: "manoj.p@example.com", zone: "Pune City", vehicleType: "bike", status: "online", rating: 4.6, totalDeliveries: 1560, earnings: "₹78K", shift: "06:00-14:00", joinedAt: "2025-05-20", lastActive: "Now" },
  { id: "DP-006", name: "Kiran Joshi", phone: "+91 98765 43206", email: "kiran.j@example.com", zone: "Bangalore North", vehicleType: "ev_scooter", status: "suspended", rating: 3.2, totalDeliveries: 420, earnings: "₹22K", shift: "10:00-18:00", joinedAt: "2026-01-10", lastActive: "1 day ago" },
];

// ── Pickup Stores ───────────────────────────────────────────
export interface PickupStore {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  timing: string;
  isActive: boolean;
  capacity: number;
  currentLoad: number;
}

export const mockPickupStores: PickupStore[] = [
  { id: "PS-001", name: "Andheri Pickup Point", address: "Shop 5, Andheri West, Near Station", city: "Mumbai", pincode: "400058", phone: "+91 98765 43001", timing: "08:00-21:00", isActive: true, capacity: 200, currentLoad: 45 },
  { id: "PS-002", name: "Bandra Hub", address: "12, Hill Road, Bandra West", city: "Mumbai", pincode: "400050", phone: "+91 98765 43002", timing: "07:00-22:00", isActive: true, capacity: 150, currentLoad: 78 },
  { id: "PS-003", name: "Koramangala Store", address: "55, 5th Block, Koramangala", city: "Bangalore", pincode: "560095", phone: "+91 98765 43003", timing: "09:00-20:00", isActive: true, capacity: 180, currentLoad: 92 },
  { id: "PS-004", name: "Connaught Place Kiosk", address: "CP Metro Station, Gate 4", city: "Delhi", pincode: "110001", phone: "+91 98765 43004", timing: "08:00-21:00", isActive: false, capacity: 100, currentLoad: 0 },
  { id: "PS-005", name: "Baner Pickup Point", address: "36, ITI Road, Baner", city: "Pune", pincode: "411045", phone: "+91 98765 43005", timing: "08:00-20:00", isActive: true, capacity: 120, currentLoad: 34 },
];
