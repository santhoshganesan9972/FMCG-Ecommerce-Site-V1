/**
 * Fix JSX fragments for admin pages with sibling elements.
 * 
 * After removing DashboardLayout wrappers, many admin pages have sibling
 * JSX elements in their return statements that need to be wrapped in <>...</>
 * 
 * Strategy: Find `return (` at a given indent, and the LAST `);` in the file
 * at the same indent level. Insert fragment open/close.
 */

const fs = require("fs");
const path = require("path");

const filesToFix = [
  "src/app/admin/customers/fraud-detection/page.tsx",
  "src/app/admin/delivery/partners/page.tsx",
  "src/app/admin/inventory/stock-transfers/page.tsx",
  "src/app/admin/orders/assign-partner/page.tsx",
  "src/app/admin/orders/status-management/page.tsx",
  "src/app/admin/customers/page.tsx",
  "src/app/admin/customers/support-tickets/page.tsx",
  "src/app/admin/delivery/page.tsx",
  "src/app/admin/delivery/status/page.tsx",
  "src/app/admin/inventory/fefo/page.tsx",
  "src/app/admin/inventory/page.tsx",
  "src/app/admin/inventory/safety-stock/page.tsx",
  "src/app/admin/inventory/warehouses/page.tsx",
  "src/app/admin/orders/bulk-processing/page.tsx",
  "src/app/admin/orders/page.tsx",
  "src/app/admin/orders/substitutions/page.tsx",
  "src/app/admin/products/categories/page.tsx",
  "src/app/admin/products/page.tsx",
  "src/app/admin/profile/page.tsx",
  "src/app/admin/promotions/ab-testing/page.tsx",
  "src/app/admin/promotions/campaign-builder/page.tsx",
  "src/app/admin/promotions/coupons/page.tsx",
  "src/app/admin/promotions/flash-sales/page.tsx",
  "src/app/admin/promotions/page.tsx",
  "src/app/admin/promotions/push-notifications/page.tsx",
  "src/app/admin/reports/inventory/page.tsx",
  "src/app/admin/reports/sales/page.tsx",
  "src/app/admin/reports/tax/page.tsx",
  "src/app/admin/reports/vendor/page.tsx",
  "src/app/admin/vendors/onboarding/page.tsx",
];

let fixedCount = 0;

for (const filePath of filesToFix) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, "utf8");

  // Check if already wrapped in a fragment
  if (content.includes("return (\n    <>") || content.includes("return (\n      <>") || content.includes("return (\n        <>") || content.includes("return (\r\n    <>") || content.includes("return (\r\n      <>") || content.includes("return (\r\n        <>")) {
    console.log(`SKIP (already wrapped): ${filePath}`);
    continue;
  }

  // Find the return statement. Match `return (` at typical indentation
  const returnRegex = /^(\s*)return\s*\($/m;
  const returnMatch = content.match(returnRegex);

  if (!returnMatch) {
    console.log(`SKIP (no return (): ${filePath}`);
    continue;
  }

  const returnIndex = returnMatch.index;
  const returnIndent = returnMatch[1]; // e.g., "  "
  const afterReturnParen = returnIndex + returnMatch[0].length;

  // Find the matching closing ");" at the same indent level.
  // Strategy: find the LAST occurrence of `${returnIndent});` in the file
  // that appears after the return statement.
  const closePattern = `${returnIndent});`;
  let lastIndex = content.lastIndexOf(closePattern);

  // If the last )}; is after the return, use it
  if (lastIndex > returnIndex) {
    // Insert <> after the return (
    content = content.slice(0, afterReturnParen) + "\n" + returnIndent + "  <>" + content.slice(afterReturnParen);

    // Adjust lastIndex
    const insertionLength = "\n" + returnIndent + "  <>".length;
    lastIndex += insertionLength;

    // Insert </> before the closing );
    content = content.slice(0, lastIndex) + "\n" + returnIndent + "  </>" + content.slice(lastIndex);

    fs.writeFileSync(fullPath, content, "utf8");
    console.log(`FIXED: ${filePath}`);
    fixedCount++;
  } else {
    console.log(`SKIP (no matching );): ${filePath}`);
  }
}

console.log(`\nDone! Fixed ${fixedCount} files.`);
