"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { Trash2, Heart, ShoppingBag, Archive, ArrowLeft } from "lucide-react";

export interface SwipeAction {
  icon: React.ElementType;
  label: string;
  color: string;
  bgColor: string;
  onClick: () => void;
}

interface SwipeActionsProps {
  children: ReactNode;
  /** Actions revealed when swiping left */
  leftActions?: SwipeAction[];
  /** Actions revealed when swiping right */
  rightActions?: SwipeAction[];
  /** Swipe threshold to trigger action (px) */
  threshold?: number;
  /** Max swipe distance (px) */
  maxSwipe?: number;
  disabled?: boolean;
  /** Callback when swipe state changes */
  onSwipeChange?: (isSwiping: boolean) => void;
  /** Unique id for this row */
  id: string;
}

export default function SwipeActions({
  children,
  leftActions = [],
  rightActions = [],
  threshold = 80,
  maxSwipe = 160,
  disabled = false,
  onSwipeChange,
  id,
}: SwipeActionsProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startX = useRef(0);
  const currentOffset = useRef(0);

  const actionWidth = Math.min(maxSwipe, (rightActions.length + leftActions.length) * 80);
  const maxSwipeLeft = rightActions.length * 80;
  const maxSwipeRight = leftActions.length * 80;

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      startX.current = e.touches[0].clientX;
      currentOffset.current = swipeOffset;
      setIsSwiping(true);
      onSwipeChange?.(true);
    },
    [disabled, swipeOffset, onSwipeChange]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || !isSwiping) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX.current;
      const newOffset = Math.max(
        -maxSwipeLeft,
        Math.min(maxSwipeRight, currentOffset.current + diff)
      );
      setSwipeOffset(newOffset);

      // Haptic feedback at threshold
      if (Math.abs(newOffset) >= threshold && Math.abs(currentOffset.current + diff) < threshold) {
        if (navigator.vibrate) navigator.vibrate(10);
      }
    },
    [disabled, isSwiping, maxSwipeLeft, maxSwipeRight, threshold]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping) return;
    setIsSwiping(false);
    onSwipeChange?.(false);

    // If past threshold, snap to show actions
    if (Math.abs(swipeOffset) >= threshold) {
      const snapped = swipeOffset < 0
        ? Math.min(swipeOffset, -80)
        : Math.max(swipeOffset, 80);
      setSwipeOffset(snapped);
    } else {
      setSwipeOffset(0);
    }
  }, [isSwiping, swipeOffset, threshold, onSwipeChange]);

  const resetSwipe = useCallback(() => {
    setSwipeOffset(0);
  }, []);

  // Determine which actions are visible
  const showLeftActions = leftActions.length > 0 && swipeOffset > 10;
  const showRightActions = rightActions.length > 0 && swipeOffset < -10;

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Background actions */}
      <div className="absolute inset-0 flex">
        {/* Left actions (swipe right) */}
        {showLeftActions && (
          <div className="flex h-full" style={{ width: `${Math.abs(swipeOffset)}px` }}>
            {leftActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick();
                  resetSwipe();
                  if (navigator.vibrate) navigator.vibrate(15);
                }}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-white text-[9px] font-bold transition-all active:scale-95 ${action.bgColor}`}
                aria-label={action.label}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Right actions (swipe left) */}
        {showRightActions && (
          <div className="flex h-full ml-auto" style={{ width: `${Math.abs(swipeOffset)}px` }}>
            {rightActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick();
                  resetSwipe();
                  if (navigator.vibrate) navigator.vibrate(15);
                }}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-white text-[9px] font-bold transition-all active:scale-95 ${action.bgColor}`}
                aria-label={action.label}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Foreground content */}
      <div
        className="relative bg-white touch-pan-y transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transitionDuration: isSwiping ? "0ms" : "250ms",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => {
          // Desktop mouse support for swipe
          if (disabled) return;
          startX.current = e.clientX;
          currentOffset.current = 0; // Reset offset ref for fresh drag
          setIsSwiping(true);
          onSwipeChange?.(true);

          const handleMouseMove = (me: MouseEvent) => {
            const diff = me.clientX - startX.current;
            const newOffset = Math.max(
              -maxSwipeLeft,
              Math.min(maxSwipeRight, currentOffset.current + diff)
            );
            currentOffset.current = newOffset; // Keep ref in sync
            setSwipeOffset(newOffset);
          };

          const handleMouseUp = () => {
            setIsSwiping(false);
            onSwipeChange?.(false);
            // Use currentOffset ref instead of stale closure state
            if (Math.abs(currentOffset.current) >= threshold) {
              const snapped = currentOffset.current < 0
                ? Math.min(currentOffset.current, -80)
                : Math.max(currentOffset.current, 80);
              setSwipeOffset(snapped);
            } else {
              setSwipeOffset(0);
            }
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Preset action creators — use these to quickly create common actions
export const SwipeActionPresets = {
  /**
   * Common delete action (red, swipe left)
   */
  delete: (onDelete: () => void): SwipeAction => ({
    icon: Trash2,
    label: "Delete",
    color: "text-white",
    bgColor: "bg-[#dc2626]",
    onClick: onDelete,
  }),

  /**
   * Common wishlist action (pink)
   */
  wishlist: (onToggle: () => void, isWishlisted: boolean): SwipeAction => ({
    icon: Heart,
    label: isWishlisted ? "Remove" : "Save",
    color: "text-white",
    bgColor: "bg-[#ff4f8b]",
    onClick: onToggle,
  }),

  /**
   * Common cart action (green)
   */
  addToCart: (onAdd: () => void): SwipeAction => ({
    icon: ShoppingBag,
    label: "Add",
    color: "text-white",
    bgColor: "bg-[#0c831f]",
    onClick: onAdd,
  }),

  /**
   * Common archive action (amber)
   */
  archive: (onArchive: () => void): SwipeAction => ({
    icon: Archive,
    label: "Archive",
    color: "text-white",
    bgColor: "bg-[#d97706]",
    onClick: onArchive,
  }),

  /**
   * Restore/swipe back action (gray)
   */
  restore: (onRestore: () => void): SwipeAction => ({
    icon: ArrowLeft,
    label: "Restore",
    color: "text-white",
    bgColor: "bg-[#666]",
    onClick: onRestore,
  }),
};
