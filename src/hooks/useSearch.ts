"use client";

import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface UseSearchOptions<T> {
  items: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
}

interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  debouncedQuery: string;
  results: T[];
  hasResults: boolean;
  resultCount: number;
  clear: () => void;
}

export function useSearch<T extends Record<string, unknown>>({
  items,
  searchKeys,
  debounceMs = 300,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, debounceMs);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    const q = debouncedQuery.toLowerCase().trim();
    return items.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return String(value ?? "").toLowerCase().includes(q);
      })
    );
  }, [items, searchKeys, debouncedQuery]);

  const clear = useCallback(() => setQuery(""), []);

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    hasResults: results.length > 0,
    resultCount: results.length,
    clear,
  };
}
