/**
 * Haptic feedback utility using the Vibration API (Navigator.vibrate).
 * Gracefully degrades on platforms that don't support vibration.
 */

const isSupported = typeof navigator !== "undefined" && "vibrate" in navigator;

/** Light tap — button press, toggle */
export function lightTap() {
  if (isSupported) navigator.vibrate(5);
}

/** Medium tap — confirming an action */
export function mediumTap() {
  if (isSupported) navigator.vibrate(10);
}

/** Heavy tap — destructive action, warning */
export function heavyTap() {
  if (isSupported) navigator.vibrate(20);
}

/** Selection changed — picker scroll, slider movement */
export function selectionTick() {
  if (isSupported) navigator.vibrate(3);
}

/** Success — order placed, item added */
export function success() {
  if (isSupported) navigator.vibrate([10, 30, 10]);
}

/** Error — failed action */
export function error() {
  if (isSupported) navigator.vibrate([20, 50, 20, 50, 40]);
}

/** Notification received */
export function notification() {
  if (isSupported) navigator.vibrate([10, 50, 10]);
}

/** Pull-to-refresh threshold reached */
export function refreshThreshold() {
  if (isSupported) navigator.vibrate(15);
}

/** Custom pattern */
export function custom(pattern: number | number[]) {
  if (isSupported) navigator.vibrate(pattern);
}

export default {
  lightTap,
  mediumTap,
  heavyTap,
  selectionTick,
  success,
  error,
  notification,
  refreshThreshold,
  custom,
};
