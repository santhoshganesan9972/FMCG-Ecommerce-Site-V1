import Link from "next/link";
import { Metadata } from "next";

const categories = [
  { label: "Groceries", emoji: "🛒" },
  { label: "Vegetables", emoji: "🥦" },
  { label: "Fruits", emoji: "🍎" },
  { label: "Snacks", emoji: "🍿" },
  { label: "Beverages", emoji: "🥤" },
  { label: "Dairy", emoji: "🥛" },
  { label: "Personal Care", emoji: "🧴" },
  { label: "Bakery", emoji: "🍞" },
  { label: "Frozen", emoji: "🧊" },
  { label: "Cleaning", emoji: "🧹" },
];

export default function CategoryPills() {
  return (
    <nav
      className="w-full bg-white border-b border-[#e8e8e8]"
      aria-label="Product categories"
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <ul className="flex items-center gap-2 sm:gap-3 overflow-x-auto hide-scrollbar py-3">
                {categories.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={`/search?category=${encodeURIComponent(item.label)}`}
                      className="flex-shrink-0 flex flex-col items-center justify-center gap-1 min-w-[70px] sm:min-w-[80px] px-2 sm:px-4 py-3 sm:py-2 rounded-xl bg-[#f2f2f2] hover-bg-pink-light hover-border-pink border border-transparent transition-all group"
                      aria-label={`Browse ${item.label} category`}
                    >
                      <span className="text-xl sm:text-xl" aria-hidden="true">{item.emoji}</span>
                      <span className="text-[11px] sm:text-xs font-semibold text-[#1a1a1a] hover-text-pink whitespace-nowrap text-center leading-tight">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
        </ul>
      </div>
    </nav>
  );
}
