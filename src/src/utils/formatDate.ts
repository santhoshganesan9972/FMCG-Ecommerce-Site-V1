const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

type DateInput = string | number | Date;

/**
 * Format a date string/timestamp into a human-readable format.
 *
 * @example
 * formatDate("2026-05-21")              // "21 May 2026"
 * formatDate("2026-05-21", "short")     // "21 May"
 * formatDate("2026-05-21", "full")      // "21 May 2026"
 * formatDate("2026-05-21", "relative")  // "2 days ago"
 * formatDate("2026-05-21", "month-year")// "May 2026"
 */
export function formatDate(
  input: DateInput,
  style: "short" | "full" | "relative" | "month-year" = "full",
): string {
  const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;

  if (isNaN(date.getTime())) return "—";

  if (style === "relative") {
    return formatRelative(date);
  }

  const day = date.getDate();
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();

  if (style === "short") return `${day} ${month}`;
  if (style === "month-year") return `${MONTHS_LONG[date.getMonth()]} ${year}`;
  return `${day} ${month} ${year}`;
}

function formatRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

/**
 * Format a date range string (e.g. "21 May – 15 Jun 2026").
 */
export function formatDateRange(from: DateInput, to: DateInput): string {
  const d1 = formatDate(from, "short");
  const d2 = formatDate(to, new Date(from).getFullYear() === new Date(to).getFullYear() ? "short" : "full");
  return `${d1} – ${d2}`;
}
