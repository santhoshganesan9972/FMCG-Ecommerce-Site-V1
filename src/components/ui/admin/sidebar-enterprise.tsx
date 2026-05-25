"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { menuItems } from "@/data/admin/navigation";

// ── Sidebar Component ─────────────────────────────────────

export default function SidebarEnterprise({
  collapsed: collapsedProp,
  onToggle,
}: {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();
  const collapsed = collapsedProp ?? false;
  const setCollapsed = (value: boolean) => onToggle?.(value);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine active parent menu item (not submenu)
  const activeParent = useMemo(() => {
    const match = menuItems.find(
      (item) =>
        pathname === item.href ||
        (item.submenu && item.submenu.some((sub) => pathname.startsWith(sub.href)))
    );
    return match?.label ?? null;
  }, [pathname]);

  // Toggle accordion: close others, open clicked
  const toggleSection = useCallback((label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  }, []);

  // Auto-open when navigating to a sub-route
  useEffect(() => {
    const parent = menuItems.find(
      (item) =>
        item.submenu && item.submenu.some((sub) => pathname.startsWith(sub.href))
    );
    if (parent && parent.label !== expandedSection) {
      setExpandedSection(parent.label);
    }
  }, [pathname, expandedSection]);

  // Hover-based expand for collapsed state
  const handleMouseEnter = useCallback(
    (label: string) => {
      if (!collapsed) return;
      expandTimerRef.current = setTimeout(() => {
        setHoveredItem(label);
      }, 200);
    },
    [collapsed]
  );

  const handleMouseLeave = useCallback(() => {
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
    }
    setHoveredItem(null);
  }, []);

  return (
    <>
      {/* Collapsed sidebar (floating) */}
      {collapsed && (
        <aside className="fixed left-0 top-0 z-30 flex h-screen w-16 flex-col items-center border-r border-[#e8e8e8] bg-white py-4 shadow-sm">
          {/* Logo */}
          <Link href="/admin" className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4f8b]">
            <span className="text-sm font-black text-white">F</span>
          </Link>

          {/* Menu icons */}
          <nav className="flex flex-col items-center gap-1 flex-1">
            {menuItems.map((item) => {
              const isActive = activeParent === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#e8f5e9] text-[#0c831f]"
                        : "text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                    }`}
                    title={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>

                  {/* Tooltip */}
                  {hoveredItem === item.label && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50">
                      <div className="rounded-lg bg-[#1a1a1a] px-3 py-1.5 text-xs font-bold text-white shadow-lg whitespace-nowrap">
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1a1a]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Expand button */}
          <button
            onClick={() => setCollapsed(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-all"
            title="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </aside>
      )}

      {/* Expanded sidebar */}
      {!collapsed && (
        <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-[#e8e8e8] bg-white md:flex">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#e8e8e8]">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#ff4f8b]">
                <span className="text-sm font-black text-white">F</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">Admin Panel</p>
                <h1 className="mt-0.5 text-sm font-black leading-tight text-[#1a1a1a]">FMCG Commerce</h1>
              </div>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-all"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
            {menuItems.map((item) => {
              const isActive = activeParent === item.label;
              const isExpanded = expandedSection === item.label;
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.label}>
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSection(item.label)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                        isActive
                          ? "bg-[#e8f5e9] text-[#0c831f]"
                          : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="block text-sm font-bold leading-tight">{item.label}</span>
                        {item.caption && (
                          <span className="block truncate text-[10px] font-medium opacity-70">{item.caption}</span>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                        isActive
                          ? "bg-[#e8f5e9] text-[#0c831f]"
                          : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-sm font-bold leading-tight">{item.label}</span>
                        {item.caption && (
                          <span className="block truncate text-[10px] font-medium opacity-70">{item.caption}</span>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* Submenu with animation */}
                  {hasSubmenu && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isExpanded ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-3 border-l-2 border-[#e8e8e8] pl-3 space-y-0.5">
                        {item.submenu!.map((sub) => {
                          const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + "/");
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                                isSubActive
                                  ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                  : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                              }`}
                            >
                              <sub.icon className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${
                                isSubActive ? "text-[#0c831f]" : "text-[#999] group-hover:text-[#666]"
                              }`} />
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-[#e8e8e8] px-4 py-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-[#f6f7f6] px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#0c831f] animate-pulse" />
                <span className="text-xs font-bold text-[#666]">System Online</span>
              </div>
              <span className="text-xs font-bold text-[#0c831f]">99.9%</span>
            </div>
            <div className="flex items-center gap-2.5 px-1">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0c831f] text-xs font-bold text-white">
                SA
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-[#1a1a1a]">Super Admin</p>
                <p className="truncate text-[10px] text-[#999]">admin@fmcg.com</p>
              </div>
            </div>
          </div>
        </aside>
      )}


    </>
  );
}

