// ── Container / Card ─────────────────────────────────────
/** Standard card wrapper: rounded-xl border border-[#e8e8e8] bg-white */
export const CARD = "rounded-xl border border-[#e8e8e8] bg-white";

/** Card with shadow + hover elevation */
export const CARD_HOVER = `${CARD} shadow-sm hover:shadow-md transition-all duration-200`;

/** Dashed upload area */
export const CARD_DASHED = "rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6]";

// ── Text colours ─────────────────────────────────────────
export const TEXT_PRIMARY = "text-[#1a1a1a]";
export const TEXT_MUTED = "text-[#666]";
export const TEXT_DISABLED = "text-[#999]";

// ── Background colours ───────────────────────────────────
export const BG_PRIMARY = "bg-[#0c831f]";
export const BG_DARK = "bg-[#1a1a1a]";
export const BG_WHITE = "bg-white";
export const BG_LIGHT = "bg-[#f6f7f6]";
export const BG_HOVER = "bg-[#f8f9fa]";
export const BG_ROW_HOVER = "bg-[#f6f7f6]";

// ── Border ───────────────────────────────────────────────
export const BORDER = "border border-[#e8e8e8]";
export const BORDER_FOCUS = "focus:border-[#0c831f] focus:outline-none";

// ── Buttons ──────────────────────────────────────────────
/** Primary green button */
export const BTN_PRIMARY = `rounded-xl ${BG_PRIMARY} px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50 transition-colors`;

/** Secondary outline button */
export const BTN_SECONDARY = `rounded-xl ${BORDER} ${BG_WHITE} px-5 py-2.5 text-sm font-semibold ${TEXT_MUTED} hover:${BG_HOVER} transition-colors`;

/** Small tertiary ghost button */
export const BTN_GHOST = "rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0] transition-colors";

// ── Inputs ───────────────────────────────────────────────
export const INPUT = `h-11 w-full rounded-xl ${BORDER} ${BG_LIGHT} px-3 text-sm ${TEXT_PRIMARY} outline-none transition ${BORDER_FOCUS} placeholder:${TEXT_DISABLED}`;

/** Standard form select/input */
export const INPUT_SIMPLE = `w-full rounded-lg ${BORDER} px-3 py-2 text-sm ${TEXT_PRIMARY} ${BORDER_FOCUS}`;

// ── Badge ────────────────────────────────────────────────
export const BADGE_BASE = "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold";

// ── Focus ring ───────────────────────────────────────────
export const FOCUS_RING = "focus:outline-none focus:ring-1 focus:ring-[#0c831f]";

// ── Transition ───────────────────────────────────────────
export const TRANSITION = "transition-colors";

// ── Interactive element ──────────────────────────────────
export const INTERACTIVE = `cursor-pointer ${TRANSITION}`;
