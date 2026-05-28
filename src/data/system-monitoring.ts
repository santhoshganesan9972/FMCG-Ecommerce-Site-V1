export interface ApiHealthMetric {
  endpoint: string;
  method: string;
  status: "200" | "400" | "404" | "500" | "503";
  latency: string;
  lastChecked: string;
}

export interface ServerMetric {
  hostname: string;
  ip: string;
  status: "online" | "offline" | "degraded";
  uptime: string;
  region: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  loadAvg: string;
  lastRestarted: string;
}

export interface DatabaseMetric {
  engine: string;
  status: "connected" | "disconnected" | "degraded";
  connections: number;
  maxConnections: number;
  queryLatency: string;
  storageUsed: string;
  storageTotal: string;
  storagePercent: number;
  slowQueries: number;
  lastBackup: string;
}

export interface QueueMetric {
  name: string;
  driver: string;
  status: "running" | "stopped" | "degraded";
  pendingJobs: number;
  processingJobs: number;
  failedJobs: number;
  completedToday: number;
  avgProcessTime: string;
  workers: number;
}

export interface MetricPoint {
  time: string;
  value: number;
}

export const mockApiHealth: ApiHealthMetric[] = [
  { endpoint: "/api/v1/orders", method: "GET", status: "200", latency: "45ms", lastChecked: "2s ago" },
  { endpoint: "/api/v1/products", method: "GET", status: "200", latency: "32ms", lastChecked: "3s ago" },
  { endpoint: "/api/v1/customers", method: "GET", status: "200", latency: "58ms", lastChecked: "1s ago" },
  { endpoint: "/api/v1/payments", method: "POST", status: "200", latency: "120ms", lastChecked: "5s ago" },
  { endpoint: "/api/v1/delivery/track", method: "GET", status: "200", latency: "28ms", lastChecked: "2s ago" },
  { endpoint: "/api/v1/subscriptions", method: "GET", status: "200", latency: "67ms", lastChecked: "4s ago" },
  { endpoint: "/api/v1/notifications", method: "POST", status: "200", latency: "89ms", lastChecked: "6s ago" },
  { endpoint: "/api/v1/reports/analytics", method: "GET", status: "200", latency: "340ms", lastChecked: "8s ago" },
];

export const mockServers: ServerMetric[] = [
  {
    hostname: "prod-fmcg-01",
    ip: "103.21.244.0",
    status: "online",
    uptime: "42d 14h 22m",
    region: "Mumbai, IN",
    cpuUsage: 67,
    memoryUsage: 72,
    diskUsage: 58,
    loadAvg: "1.42, 1.31, 1.08",
    lastRestarted: "2026-04-11 08:30 IST",
  },
  {
    hostname: "prod-fmcg-02",
    ip: "103.21.244.1",
    status: "online",
    uptime: "42d 14h 21m",
    region: "Mumbai, IN",
    cpuUsage: 54,
    memoryUsage: 61,
    diskUsage: 45,
    loadAvg: "0.98, 0.87, 0.76",
    lastRestarted: "2026-04-11 08:30 IST",
  },
  {
    hostname: "prod-fmcg-db",
    ip: "103.21.244.100",
    status: "online",
    uptime: "89d 06h 11m",
    region: "Chennai, IN",
    cpuUsage: 41,
    memoryUsage: 55,
    diskUsage: 62,
    loadAvg: "0.65, 0.52, 0.48",
    lastRestarted: "2026-02-23 02:15 IST",
  },
  {
    hostname: "prod-fmcg-cache",
    ip: "103.21.244.101",
    status: "degraded",
    uptime: "14d 03h 47m",
    region: "Mumbai, IN",
    cpuUsage: 89,
    memoryUsage: 91,
    diskUsage: 22,
    loadAvg: "3.12, 2.98, 2.75",
    lastRestarted: "2026-05-09 11:42 IST",
  },
];

export const mockDatabases: DatabaseMetric[] = [
  {
    engine: "PostgreSQL 16",
    status: "connected",
    connections: 128,
    maxConnections: 200,
    queryLatency: "2.3ms avg",
    storageUsed: "142.7 GB",
    storageTotal: "500 GB",
    storagePercent: 28,
    slowQueries: 3,
    lastBackup: "2026-05-23 00:00 IST",
  },
  {
    engine: "Redis 7.2",
    status: "connected",
    connections: 42,
    maxConnections: 100,
    queryLatency: "0.4ms avg",
    storageUsed: "8.2 GB",
    storageTotal: "32 GB",
    storagePercent: 25,
    slowQueries: 0,
    lastBackup: "2026-05-23 06:00 IST",
  },
];

export const mockQueues: QueueMetric[] = [
  {
    name: "emails",
    driver: "Redis",
    status: "running",
    pendingJobs: 23,
    processingJobs: 5,
    failedJobs: 2,
    completedToday: 1842,
    avgProcessTime: "820ms",
    workers: 4,
  },
  {
    name: "notifications",
    driver: "Redis",
    status: "running",
    pendingJobs: 7,
    processingJobs: 3,
    failedJobs: 0,
    completedToday: 3891,
    avgProcessTime: "150ms",
    workers: 6,
  },
  {
    name: "report-generation",
    driver: "Database",
    status: "stopped",
    pendingJobs: 156,
    processingJobs: 0,
    failedJobs: 4,
    completedToday: 0,
    avgProcessTime: "—",
    workers: 0,
  },
  {
    name: "subscription-billing",
    driver: "SQS",
    status: "running",
    pendingJobs: 12,
    processingJobs: 2,
    failedJobs: 0,
    completedToday: 843,
    avgProcessTime: "340ms",
    workers: 3,
  },
  {
    name: "delivery-dispatch",
    driver: "Redis",
    status: "running",
    pendingJobs: 45,
    processingJobs: 8,
    failedJobs: 1,
    completedToday: 5627,
    avgProcessTime: "210ms",
    workers: 10,
  },
];

export const mockAlerts = [
  {
    id: "ALT-001",
    severity: "warning",
    message: "Cache server memory usage at 91% — running out of memory",
    source: "Cache Server",
    timestamp: "2026-05-23 14:55 IST",
    acknowledged: false,
  },
  {
    id: "ALT-002",
    severity: "warning",
    message: "Queue worker stopped — report-generation using Database driver",
    source: "Queue Worker",
    timestamp: "2026-05-23 13:20 IST",
    acknowledged: true,
  },
  {
    id: "ALT-003",
    severity: "error",
    message: "3 slow PostgreSQL queries detected — avg response > 500ms",
    source: "Database",
    timestamp: "2026-05-23 11:45 IST",
    acknowledged: false,
  },
  {
    id: "ALT-004",
    severity: "info",
    message: "Scheduled backup completed successfully — 142.7 GB",
    source: "Backup Scheduler",
    timestamp: "2026-05-23 00:02 IST",
    acknowledged: true,
  },
  {
    id: "ALT-005",
    severity: "warning",
    message: "prod-fmcg-cache CPU at 89% — sustained for 10 minutes",
    source: "Cache Server",
    timestamp: "2026-05-22 22:30 IST",
    acknowledged: true,
  },
];

export const mockCpuHistory: { time: string; value: number }[] = Array.from(
  { length: 24 },
  (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    value: Math.round(40 + Math.random() * 45 + Math.sin(i / 4) * 20),
  })
);

export const mockMemoryHistory: { time: string; value: number }[] = Array.from(
  { length: 24 },
  (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    value: Math.round(55 + Math.random() * 25 + Math.cos(i / 4) * 10),
  })
);

export const mockCacheMetrics = {
  hitRate: "97.3%",
  missRate: "2.7%",
  evictions: 1243,
  keysTotal: 847293,
  keysExpired: 15231,
  connectedClients: 842,
  memoryUsed: "8.2 GB",
  memoryPeak: "9.1 GB",
  uptime: "14d 03h 47m",
};
