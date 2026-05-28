"use client";

import { Clock, X, Search, Trash2 } from "lucide-react";
import { useSearchHistoryStore } from "@/store/search-history-store";

interface SearchHistoryProps {
  onSelect: (query: string) => void;
}

export default function SearchHistory({ onSelect }: SearchHistoryProps) {
  const { queries, removeQuery, clearHistory } = useSearchHistoryStore();

  if (queries.length === 0) return null;

  const formatTime = (index: number) => {
    if (index === 0) return "Just now";
    if (index < 3) return "Earlier today";
    return "Previous searches";
  };

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e8] shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#ff4f8b]" />
          <h3 className="text-sm font-bold text-[#1a1a1a]">Search History</h3>
          <span className="text-[10px] font-semibold text-[#999] bg-[#f2f2f2] px-1.5 py-0.5 rounded">
            {queries.length}
          </span>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1 text-xs font-semibold text-[#999] hover:text-[#ff4f8b] transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Clear all
        </button>
      </div>

      <div className="divide-y divide-[#e8e8e8]">
        {queries.slice(0, 15).map((q, idx) => (
          <div key={`${q}-${idx}`} className="flex items-center gap-2 px-4 py-2.5 group hover:bg-[#fafafa] transition-colors">
            <button
              onClick={() => onSelect(q)}
              className="flex-1 flex items-center gap-3 text-left min-h-[44px]"
            >
              <Search className="w-3.5 h-3.5 text-[#999] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1a1a1a] truncate">{q}</p>
                <p className="text-[10px] text-[#999]">{formatTime(idx)}</p>
              </div>
            </button>
            <button
              onClick={() => removeQuery(q)}
              className="opacity-0 group-hover:opacity-100 min-w-[44px] min-h-[44px] w-8 h-8 flex items-center justify-center hover:bg-[#f2f2f2] rounded-full transition-all"
              aria-label={`Remove ${q}`}
            >
              <X className="w-3.5 h-3.5 text-[#999]" />
            </button>
          </div>
        ))}
      </div>

      {queries.length > 15 && (
        <div className="px-4 py-2.5 border-t border-[#e8e8e8]">
          <p className="text-[10px] text-[#999] text-center">
            +{queries.length - 15} more searches
          </p>
        </div>
      )}
    </div>
  );
}
