// ── Admin Profile API Adapter ───────────────────────────────
// Wraps mock admin profile data in standardized ApiResponse envelopes.

import type { ApiResponse, MutationResult } from "@/types/api";
import { successResponse } from "@/types/api";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  department: string;
  joinedAt: string;
  lastLogin: string;
  permissions: string[];
}

interface AdminActivity {
  id: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

const mockProfile: AdminProfile = {
  id: "USR-001",
  name: "Super Admin",
  email: "admin@fmcg.com",
  phone: "+91 98765 43210",
  role: "super_admin",
  avatar: "",
  department: "Management",
  joinedAt: "2024-01-01",
  lastLogin: new Date().toISOString(),
  permissions: ["*"],
};

const mockActivities: AdminActivity[] = Array.from({ length: 20 }, (_, i) => ({
  id: `ACT-${String(i + 1).padStart(3, "0")}`,
  action: ["login", "update", "create", "delete", "export"][i % 5],
  details: [
    "Logged in to admin panel",
    "Updated product pricing",
    "Created new category",
    "Deleted expired coupon",
    "Exported monthly report",
  ][i % 5],
  ip: `192.168.1.${100 + i}`,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
}));

// ── Profile ─────────────────────────────────────────────────

export async function getAdminProfile(): Promise<ApiResponse<AdminProfile>> {
  await delay(200);
  return successResponse(mockProfile);
}

export async function updateAdminProfile(data: Partial<AdminProfile>): Promise<ApiResponse<AdminProfile>> {
  await delay(300);
  Object.assign(mockProfile, data);
  return successResponse(mockProfile);
}

// ── Activity Log ──────────────────────────────────────────

export async function getAdminActivityLog(filters?: { action?: string }): Promise<ApiResponse<AdminActivity[]>> {
  await delay(200);
  let activities = [...mockActivities];
  if (filters?.action) {
    activities = activities.filter((a) => a.action === filters.action);
  }
  return successResponse(activities);
}
