"use client";

import { CARD_HOVER, TEXT_PRIMARY, TEXT_MUTED, BG_ROW_HOVER, BADGE_BASE } from "@/lib/shared-classes";

interface KanbanItem {
  id: string;
  title: string;
  subtitle?: string;
  badges?: { label: string; variant?: string }[];
}

interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  color: string;
  items: KanbanItem[];
}

interface ReusableKanbanBoardProps {
  columns: KanbanColumn[];
  onItemClick?: (columnId: string, itemId: string) => void;
  onDragEnd?: (columnId: string, itemId: string, fromIndex: number, toIndex: number) => void;
  className?: string;
}

export function ReusableKanbanBoard({ columns, onItemClick, className = "" }: ReusableKanbanBoardProps) {
  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`} style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
      {columns.map((col) => (
        <div key={col.id} className="min-w-[280px] max-w-[320px] flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
              <h3 className={`text-sm font-black ${TEXT_PRIMARY}`}>{col.title}</h3>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f0f0] text-[10px] font-bold text-[#666]">{col.count}</span>
          </div>
          <div className="space-y-2">
            {col.items.map((item) => (
              <div
                key={item.id}
                onClick={() => onItemClick?.(col.id, item.id)}
                className={`cursor-pointer ${CARD_HOVER} p-3 hover:-translate-y-0.5`}
              >
                <p className={`text-sm font-bold ${TEXT_PRIMARY}`}>{item.title}</p>
                {item.subtitle && <p className={`mt-1 text-xs ${TEXT_MUTED}`}>{item.subtitle}</p>}
                {item.badges && item.badges.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.badges.map((badge, i) => (
                      <span key={i} className={`${BADGE_BASE} text-[10px] font-bold ${
                        badge.variant === "success" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        badge.variant === "warning" ? "bg-[#fffbeb] text-amber-600" :
                        badge.variant === "danger" ? "bg-[#fef2f2] text-red-600" :
                        `${BG_ROW_HOVER} ${TEXT_MUTED}`
                      }`}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
