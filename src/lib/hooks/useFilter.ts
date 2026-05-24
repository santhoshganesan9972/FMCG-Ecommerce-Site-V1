"use client";

import { useState, useCallback, useMemo } from "react";

/**
 * A single filter field definition.
 */
export interface FilterField<T extends string> {
  key: T;
  label: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
}

/**
 * Configuration for useFilter.
 */
export interface UseFilterConfig<T extends string> {
  fields: readonly FilterField<T>[];
  initialValues?: Partial<Record<T, string>>;
}

/**
 * Return type for useFilter.
 */
export interface UseFilterReturn<T extends string> {
  /** Current filter values keyed by field key */
  values: Record<T, string>;
  /** Update a single filter value */
  setFilter: (key: T, value: string) => void;
  /** Reset all filters to their defaults */
  resetFilters: () => void;
  /** Check if any filter is different from its default */
  hasActiveFilters: boolean;
  /** Count of filters that differ from default */
  activeFilterCount: number;
}

/**
 * Generic hook for managing filter state across any number of fields.
 *
 * @example
 * ```ts
 * const filters = useFilter({
 *   fields: [
 *     { key: "status", label: "Status", options: [
 *       { value: "all", label: "All" },
 *       { value: "active", label: "Active" },
 *     ]},
 *   ],
 * });
 * ```
 */
export function useFilter<T extends string>(
  config: UseFilterConfig<T>
): UseFilterReturn<T> {
  const { fields, initialValues } = config;

  const defaultValues = useMemo(() => {
    const defaults = {} as Record<T, string>;
    for (const field of fields) {
      defaults[field.key] = field.defaultValue ?? "all";
    }
    return defaults;
  }, [fields]);

  const [values, setValues] = useState<Record<T, string>>(() => ({
    ...defaultValues,
    ...(initialValues as Partial<Record<T, string>> | undefined),
  }));

  const setFilter = useCallback((key: T, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setValues({ ...defaultValues, ...(initialValues as Partial<Record<T, string>> | undefined) });
  }, [defaultValues, initialValues]);

  const { hasActiveFilters, activeFilterCount } = useMemo(() => {
    let count = 0;
    for (const key of Object.keys(defaultValues) as T[]) {
      if (values[key] !== defaultValues[key]) {
        count++;
      }
    }
    return { hasActiveFilters: count > 0, activeFilterCount: count };
  }, [values, defaultValues]);

  return {
    values,
    setFilter,
    resetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
