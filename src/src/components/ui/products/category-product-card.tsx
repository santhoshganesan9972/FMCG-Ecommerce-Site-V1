// Re-exports ProductCard for use in server-rendered category pages.
// Keeping this as a separate file lets the category page stay a Server Component
// while the interactive card logic stays in the "use client" ProductCard.
export { default } from "./product-card";
