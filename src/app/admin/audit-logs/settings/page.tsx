"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  ChevronLeft,
  ScrollText,
  Clock,
  Bell,
  Shield,
  Download,
  Mail,
  MessageSquare,
  Globe,
  AlertTriangle,
  RefreshCw,
  Save,
  Trash2,
  HardDrive,
  FileSpreadsheet,
} from "lucide-react";

export default function AuditLogSettingsPage() {
  // ── Retention ──────────────────────────────────────────────
  const [retentionPeriod, setRetentionPeriod] = useState("90");
  const [archiveAfter, setArchiveAfter] = useState("30");
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [storageQuota, setStorageQuota] = useState("5");

  // ── Export Schedule ────────────────────────────────────────
  const [exportSchedule, setExportSchedule] = useState("weekly");
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportTime, setExportTime] = useState("02:00");
  const [exportDay, setExportDay] = useState("monday");
  const [exportEmail, setExportEmail] = useState("admin@fmcg.com");
  const [autoExport, setAutoExport] = useState(true);
  const [includeIpDetails, setIncludeIpDetails] = useState(true);
  const [includeChanges, setIncludeChanges] = useState(true);

  // ── Notification Alerts ────────────────────────────────────
  const [alertOnLogin, setAlertOnLogin] = useState(true);
  const [alertOnPermissionChange, setAlertOnPermissionChange] = useState(true);
  const [alertOnPasswordReset, setAlertOnPasswordReset] = useState(true);
  const [alertOnFailedLogin, setAlertOnFailedLogin] = useState(true);
  const [alertOnSettingsChange, setAlertOnSettingsChange] = useState(false);
  const [alertOnDelete, setAlertOnDelete] = useState(true);
  const [alertOnExport, setAlertOnExport] = useState(false);
  const [alertChannel, setAlertChannel] = useState("email");
  const [alertThreshold, setAlertThreshold] = useState("10");
  const [alertEmailAddress, setAlertEmailAddress] = useState("security@fmcg.com");
  const [alertPhoneNumber, setAlertPhoneNumber] = useState("+91-9876543210");

  // ── IP Tracking ────────────────────────────────────────────
  const [ipTracking, setIpTracking] = useState(true);
  const [geoLocation, setGeoLocation] = useState(false);
  const [anonymizeIp, setAnonymizeIp] = useState(false);

  // ── Save Handler ──────────────────────────────────────────
  const handleSave = () => {
    alert("Audit log settings saved successfully! (Demo)");
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/audit-logs"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]"
          >
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Audit Logs
            </p>
            <h1 className="text-xl font-black text-[#1a1a1a]">
              Audit Log Settings
            </h1>
          </div>
        </div>

        {/* ── Quick Stats ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Current Log Size",
              value: "1.2 GB",
              icon: HardDrive,
              color: "text-[#0c831f]",
            },
            {
              label: "Avg. Daily Volume",
              value: "~350 events",
              icon: ScrollText,
              color: "text-[#2563eb]",
            },
            {
              label: "Retention Period",
              value: `${retentionPeriod} days`,
              icon: Clock,
              color: "text-[#d97706]",
            },
            {
              label: "Storage Quota",
              value: `${storageQuota} GB`,
              icon: Save,
              color: "text-[#ff4f8b]",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${color}`} />
                <p className="text-[10px] font-bold text-[#666]">{label}</p>
              </div>
              <p className={`mt-1 text-lg font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Log Retention ────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">
              Log Retention
            </h2>
          </div>
          <p className="mb-4 text-xs text-[#666]">
            Control how long audit logs are retained, when they get archived,
            and set storage limits to manage disk usage.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-bold text-[#666]">
                Retention Period
              </label>
              <select
                value={retentionPeriod}
                onChange={(e) => setRetentionPeriod(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
                <option value="0">Never delete</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Archive After
              </label>
              <select
                value={archiveAfter}
                onChange={(e) => setArchiveAfter(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              >
                <option value="7">7 days</option>
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Storage Quota (GB)
              </label>
              <input
                type="number"
                value={storageQuota}
                onChange={(e) => setStorageQuota(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4 self-end">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">
                  Auto Cleanup
                </p>
                <p className="text-xs text-[#666]">
                  Delete logs beyond retention
                </p>
              </div>
              <button
                onClick={() => setAutoCleanup(!autoCleanup)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  autoCleanup ? "bg-[#0c831f]" : "bg-[#ccc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    autoCleanup ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Storage Usage Bar */}
          <div className="mt-4 rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#666]">
                Storage Usage
              </span>
              <span className="text-[10px] font-bold text-[#666]">
                1.2 GB / {storageQuota} GB (24%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
              <div
                className="h-full rounded-full bg-[#0c831f] transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (1.2 / Math.max(1, parseInt(storageQuota) || 1)) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          <button className="mt-3 flex items-center gap-2 rounded-lg border-2 border-dashed border-[#e8e8e8] px-4 py-2 text-xs font-bold text-[#ff4f8b] transition hover:border-[#ff4f8b]">
            <Trash2 className="h-3.5 w-3.5" />
            Purge Logs Older Than Retention Period
          </button>
        </section>

        {/* ── Export Schedule ──────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">
              Export Schedule
            </h2>
          </div>
          <p className="mb-4 text-xs text-[#666]">
            Schedule automated exports of audit logs to keep offline records
            for compliance and auditing purposes.
          </p>

          <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4 mb-4">
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">
                Auto Export
              </p>
              <p className="text-xs text-[#666]">
                Scheduled log exports to email
              </p>
            </div>
            <button
              onClick={() => setAutoExport(!autoExport)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                autoExport ? "bg-[#0c831f]" : "bg-[#ccc]"
              }`}
            >
              <span
                className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  autoExport ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {autoExport && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-xs font-bold text-[#666]">
                    Frequency
                  </label>
                  <select
                    value={exportSchedule}
                    onChange={(e) => setExportSchedule(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">
                    Export Format
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                  >
                    <option value="csv">CSV (.csv)</option>
                    <option value="json">JSON (.json)</option>
                    <option value="xlsx">Excel (.xlsx)</option>
                    <option value="pdf">PDF (.pdf)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">
                    Time
                  </label>
                  <input
                    type="time"
                    value={exportTime}
                    onChange={(e) => setExportTime(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                  />
                </div>
                {exportSchedule === "weekly" && (
                  <div>
                    <label className="text-xs font-bold text-[#666]">
                      Day of Week
                    </label>
                    <select
                      value={exportDay}
                      onChange={(e) => setExportDay(e.target.value)}
                      className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                    >
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                  </div>
                )}
                {exportSchedule === "monthly" && (
                  <div>
                    <label className="text-xs font-bold text-[#666]">
                      Day of Month
                    </label>
                    <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                      {Array.from({ length: 28 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                          {i === 0
                            ? "st"
                            : i === 1
                              ? "nd"
                              : i === 2
                                ? "rd"
                                : "th"}
                        </option>
                      ))}
                      <option value="last">Last day</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-[#666]">
                  Send Report To
                </label>
                <input
                  type="email"
                  value={exportEmail}
                  onChange={(e) => setExportEmail(e.target.value)}
                  className="mt-1 h-10 w-full max-w-md rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                />
              </div>

              {/* Export Content Options */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#666]" />
                    <span className="text-xs font-bold text-[#1a1a1a]">
                      Include IP Details
                    </span>
                  </div>
                  <button
                    onClick={() => setIncludeIpDetails(!includeIpDetails)}
                    className={`relative h-5 w-9 rounded-full transition-colors ${
                      includeIpDetails ? "bg-[#0c831f]" : "bg-[#ccc]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        includeIpDetails ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-[#666]" />
                    <span className="text-xs font-bold text-[#1a1a1a]">
                      Include Change Details
                    </span>
                  </div>
                  <button
                    onClick={() => setIncludeChanges(!includeChanges)}
                    className={`relative h-5 w-9 rounded-full transition-colors ${
                      includeChanges ? "bg-[#0c831f]" : "bg-[#ccc]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        includeChanges ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Last Export Info */}
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-2.5">
            <Download className="h-4 w-4 text-[#0c831f]" />
            <div className="flex-1">
              <p className="text-xs font-bold text-[#1a1a1a]">
                Last Export
              </p>
              <p className="text-[10px] text-[#999]">
                Monday, May 19, 2026 at 02:00 AM — CSV, 1,247 entries
              </p>
            </div>
            <button className="text-[10px] font-bold text-[#ff4f8b] hover:underline">
              Download
            </button>
          </div>
        </section>

        {/* ── Notification Alerts ──────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">
              Security Alert Notifications
            </h2>
          </div>
          <p className="mb-4 text-xs text-[#666]">
            Get real-time alerts for critical security events. Configure which
            events trigger notifications and how they are delivered.
          </p>

          {/* Alert Events */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">
              Trigger Events
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Login Events",
                  desc: "Admin & agent logins",
                  enabled: alertOnLogin,
                  setter: setAlertOnLogin,
                  icon: Shield,
                  color: "text-[#0c831f]",
                },
                {
                  label: "Failed Logins",
                  desc: "Alert on threshold breach",
                  enabled: alertOnFailedLogin,
                  setter: setAlertOnFailedLogin,
                  icon: AlertTriangle,
                  color: "text-[#dc2626]",
                },
                {
                  label: "Permission Changes",
                  desc: "Role & access modifications",
                  enabled: alertOnPermissionChange,
                  setter: setAlertOnPermissionChange,
                  icon: Shield,
                  color: "text-[#ff4f8b]",
                },
                {
                  label: "Password Resets",
                  desc: "Admin-initiated resets",
                  enabled: alertOnPasswordReset,
                  setter: setAlertOnPasswordReset,
                  icon: RefreshCw,
                  color: "text-[#d97706]",
                },
                {
                  label: "Settings Changes",
                  desc: "System config updates",
                  enabled: alertOnSettingsChange,
                  setter: setAlertOnSettingsChange,
                  icon: Save,
                  color: "text-[#9333ea]",
                },
                {
                  label: "Delete Events",
                  desc: "Record & data deletions",
                  enabled: alertOnDelete,
                  setter: setAlertOnDelete,
                  icon: Trash2,
                  color: "text-[#dc2626]",
                },
                {
                  label: "Data Exports",
                  desc: "Bulk data exports",
                  enabled: alertOnExport,
                  setter: setAlertOnExport,
                  icon: Download,
                  color: "text-[#2563eb]",
                },
              ].map(({ label, desc, enabled, setter, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3"
                >
                  <div className="flex items-start gap-2">
                    <Icon className={`h-4 w-4 mt-0.5 ${color}`} />
                    <div>
                      <p className="text-xs font-bold text-[#1a1a1a]">
                        {label}
                      </p>
                      <p className="text-[10px] text-[#999]">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setter(!enabled)}
                    className={`relative h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
                      enabled ? "bg-[#0c831f]" : "bg-[#ccc]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        enabled ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Threshold */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">
                Failed Login Threshold
              </label>
              <div className="mt-1 flex items-center gap-2">
                <select
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                >
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                  <option value="10">10 attempts</option>
                  <option value="20">20 attempts</option>
                  <option value="50">50 attempts</option>
                </select>
                <span className="text-xs text-[#666]">per hour</span>
              </div>
            </div>

            {/* Alert Channel */}
            <div>
              <label className="text-xs font-bold text-[#666]">
                Notification Channel
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAlertChannel("email")}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-bold transition ${
                    alertChannel === "email"
                      ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
                      : "border-[#e8e8e8] bg-[#fafafa] text-[#666] hover:bg-[#f6f7f6]"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </button>
                <button
                  onClick={() => setAlertChannel("sms")}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-bold transition ${
                    alertChannel === "sms"
                      ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
                      : "border-[#e8e8e8] bg-[#fafafa] text-[#666] hover:bg-[#f6f7f6]"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  SMS
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#666]">
                {alertChannel === "email"
                  ? "Notification Email"
                  : "Phone Number"}
              </label>
              <input
                type={alertChannel === "email" ? "email" : "tel"}
                value={
                  alertChannel === "email"
                    ? alertEmailAddress
                    : alertPhoneNumber
                }
                onChange={(e) =>
                  alertChannel === "email"
                    ? setAlertEmailAddress(e.target.value)
                    : setAlertPhoneNumber(e.target.value)
                }
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
            </div>
          </div>
        </section>

        {/* ── IP Tracking ───────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">
              IP Address Tracking
            </h2>
          </div>
          <p className="mb-4 text-xs text-[#666]">
            Configure how IP addresses are captured and displayed in audit logs.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">
                  IP Tracking
                </p>
                <p className="text-xs text-[#666]">
                  Record IP for all events
                </p>
              </div>
              <button
                onClick={() => setIpTracking(!ipTracking)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  ipTracking ? "bg-[#0c831f]" : "bg-[#ccc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    ipTracking ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">
                  Geo-Location
                </p>
                <p className="text-xs text-[#666]">
                  Resolve IP to location
                </p>
              </div>
              <button
                onClick={() => setGeoLocation(!geoLocation)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  geoLocation ? "bg-[#0c831f]" : "bg-[#ccc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    geoLocation ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">
                  Anonymize IP
                </p>
                <p className="text-xs text-[#666]">
                  Mask last octet (GDPR)
                </p>
              </div>
              <button
                onClick={() => setAnonymizeIp(!anonymizeIp)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  anonymizeIp ? "bg-[#0c831f]" : "bg-[#ccc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    anonymizeIp ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ── Save / Cancel ────────────────────────────────────── */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/audit-logs"
            className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            className="flex h-10 items-center gap-2 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
