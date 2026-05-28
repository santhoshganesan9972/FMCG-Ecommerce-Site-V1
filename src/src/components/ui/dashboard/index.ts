// ── Dashboard Components Barrel ───────────────────────────

// Chart Primitives
export {
  BarChart,
  DonutChart,
  MiniProgressBar,
  SectionHeader,
  ChartCard,
  LegendRow,
  LegendRows,
} from "./charts";
export type { ChartPoint } from "./charts";

// Dashboard Sections
export {
  KpiGrid,
  QuickActions,
  ChartsSection,
  DonutSection,
  ConversionFunnel,
  TopProductsCategories,
  DeliverySystemHealth,
  SidePanels,
  CustomerMetrics,
  InventoryHealth,
} from "./dashboard-sections";

// Loading & Error States
export { DashboardSkeleton, DashboardError } from "./skeleton";
