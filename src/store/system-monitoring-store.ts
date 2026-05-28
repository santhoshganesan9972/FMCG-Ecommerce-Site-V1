import { create } from "zustand";
import {
  mockApiHealth,
  mockServers,
  mockDatabases,
  mockQueues,
  mockAlerts,
} from "@/data/system-monitoring";

interface MonitoringState {
  apiHealth: typeof mockApiHealth;
  servers: typeof mockServers;
  databases: typeof mockDatabases;
  queues: typeof mockQueues;
  alerts: typeof mockAlerts;
  acknowledgedAlerts: Set<string>;
  selectedTab: "overview" | "api" | "servers" | "database" | "queues" | "alerts";
  setSelectedTab: (tab: MonitoringState["selectedTab"]) => void;
  acknowledgeAlert: (id: string) => void;
  acknowledgeAllAlerts: () => void;
  restartServer: (hostname: string) => void;
  restartQueue: (name: string) => void;
}

export const useMonitoringStore = create<MonitoringState>((set) => ({
  apiHealth: mockApiHealth,
  servers: mockServers,
  databases: mockDatabases,
  queues: mockQueues,
  alerts: mockAlerts,
  acknowledgedAlerts: new Set(mockAlerts.filter((a) => a.acknowledged).map((a) => a.id)),
  selectedTab: "overview",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  acknowledgeAlert: (id) =>
    set((state) => {
      const next = new Set(state.acknowledgedAlerts);
      next.add(id);
      return { acknowledgedAlerts: next };
    }),
  acknowledgeAllAlerts: () =>
    set((state) => ({
      acknowledgedAlerts: new Set(state.alerts.map((a) => a.id)),
    })),
  restartServer: (hostname) =>
    set((state) => ({
      servers: state.servers.map((s) =>
        s.hostname === hostname ? { ...s, status: "online" as const, uptime: "0s" } : s
      ),
    })),
  restartQueue: (name) =>
    set((state) => ({
      queues: state.queues.map((q) =>
        q.name === name ? { ...q, status: "running" as const, pendingJobs: 0, failedJobs: 0 } : q
      ),
    })),
}));
