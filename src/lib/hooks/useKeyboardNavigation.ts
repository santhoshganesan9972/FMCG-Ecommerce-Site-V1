"use client";

import { useEffect, useCallback, type RefObject } from "react";

// ── Escape key handler ─────────────────────────────────────────

/**
 * Calls `onEscape` when the Escape key is pressed.
 * Attaches/removes the listener based on `active`.
 *
 * @example
 * ```tsx
 * useEscapeKey(isOpen, () => setIsOpen(false));
 * ```
 */
export function useEscapeKey(
  active: boolean,
  onEscape: () => void
): void {
  useEffect(() => {
    if (!active) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active, onEscape]);
}

// ── Focus trap ─────────────────────────────────────────────────

/**
 * Traps focus within a container element when active.
 * Cycles focus between the first and last focusable elements.
 *
 * @example
 * ```tsx
 * const panelRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(panelRef, isOpen);
 * ```
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean
): void {
  useEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
      );

    // Focus the first focusable element on open
    const firstElement = getFocusableElements()[0];
    const activeElement = document.activeElement;
    // Only move focus if the active element is outside the container
    if (firstElement && !container.contains(activeElement)) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if focus is on first element, move to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if focus is on last element, move to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [ref, active]);
}

// ── Arrow key list navigation ──────────────────────────────────

export interface ArrowKeyNavigationOptions {
  /** Total number of items */
  itemCount: number;
  /** Currently focused index */
  currentIndex: number;
  /** Called with the new index when arrow keys are pressed */
  onIndexChange: (index: number) => void;
  /** Called when Enter or Space is pressed */
  onSelect?: (index: number) => void;
  /** Whether the navigation is active */
  enabled?: boolean;
}

/**
 * Handles arrow key navigation for lists (dropdowns, menus, etc.).
 * Returns a `handleKeyDown` handler to attach to the container.
 *
 * @example
 * ```tsx
 * const { handleKeyDown } = useArrowKeyNavigation({
 *   itemCount: items.length,
 *   currentIndex: focusedIndex,
 *   onIndexChange: setFocusedIndex,
 *   onSelect: (i) => selectItem(items[i]),
 * });
 * ```
 */
export function useArrowKeyNavigation({
  itemCount,
  currentIndex,
  onIndexChange,
  onSelect,
  enabled = true,
}: ArrowKeyNavigationOptions): {
  handleKeyDown: (e: React.KeyboardEvent) => void;
} {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          onIndexChange((currentIndex + 1) % itemCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          onIndexChange((currentIndex - 1 + itemCount) % itemCount);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (currentIndex >= 0 && onSelect) {
            onSelect(currentIndex);
          }
          break;
        case "Home":
          e.preventDefault();
          onIndexChange(0);
          break;
        case "End":
          e.preventDefault();
          onIndexChange(itemCount - 1);
          break;
      }
    },
    [itemCount, currentIndex, onIndexChange, onSelect, enabled]
  );

  return { handleKeyDown };
}
