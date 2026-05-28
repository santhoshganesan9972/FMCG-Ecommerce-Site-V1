/**
 * Fix JSX fragments for admin pages that lost their DashboardLayout wrappers.
 * 
 * The cleanup script removed <DashboardLayout> and </DashboardLayout> but the
 * pages had sibling elements (e.g., <div>...</div> followed by <ReusableModal>...</ReusableModal>)
 * which need to be wrapped in a React fragment <>...</>
 * 
 * Pattern to fix:
 *   return (
 *       <div ...>     ← first child
 *       ...
 *       </div>
 * 
 *       <ReusableModal ...>  ← sibling!
 *       ...
 *       </ReusableModal>
 *   );
 * 
 * Becomes:
 *   return (
 *     <>
 *       <div ...>
 *       ...
 *       </div>
 * 
 *       <ReusableModal ...>
 *       ...
 *       </ReusableModal>
 *     </>
 *   );
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
  "src/app/admin/vendors/page.tsx",
  "src/app/admin/vendors/products/page.tsx",
  "src/app/admin/vendors/settlements/page.tsx",
];

let fixedCount = 0;

for (const filePath of filesToFix) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, "utf8");
  let modified = false;

  // We need to find the return statement that has sibling elements.
  // The pattern is: `return (` followed by content, then `);` at the end of the function.
  // We need to add `<>` after `return (` and `</>` before the matching `);`
  
  // Strategy: Find the first "return (" that is at the start of a meaningful line (after some whitespace)
  // and add <> right after, then find the matching ");" and add </> before it.

  // Find the return statement
  const returnRegex = /(\s*)return\s*\(/;
  const returnMatch = content.match(returnRegex);
  
  if (!returnMatch) {
    console.log(`SKIP (no return (): ${filePath}`);
    continue;
  }

  const returnIndex = returnMatch.index;
  const afterReturnParen = returnIndex + returnMatch[0].length;

  // Now find the corresponding ");" that closes this return.
  // We need to track paren nesting from afterReturnParen to find the matching ");"
  let depth = 0;
  let foundOpen = false;
  let closeIndex = -1;
  
  for (let i = afterReturnParen; i < content.length; i++) {
    if (content[i] === "(") {
      depth++;
      foundOpen = true;
    } else if (content[i] === ")") {
      depth--;
      if (foundOpen && depth === 0 && content[i + 1] === ";") {
        closeIndex = i;
        break;
      }
    }
  }

  if (closeIndex === -1) {
    console.log(`SKIP (no matching );): ${filePath}`);
    continue;
  }

  // Check if sibling elements exist (i.e., there are two top-level children)
  // We look for a pattern where after the first child closes (e.g., </div>), there's
  // another opening tag at the same level.
  
  // Check if content between afterReturnParen and closeIndex has multiple top-level children
  // by looking if there are multiple elements at the same indentation level (not nested)
  
  // Simpler approach: check if the file has sibling elements (not a fragment issue)
  const betweenReturnAndClose = content.slice(afterReturnParen, closeIndex);
  
  // If there's already a fragment wrapper, skip
  if (betweenReturnAndClose.trimStart().startsWith("<>") || betweenReturnAndClose.trimStart().startsWith("<React.Fragment>") || betweenReturnAndClose.trimStart().startsWith("<Fragment>")) {
    console.log(`SKIP (already wrapped): ${filePath}`);
    continue;
  }

  // Check for multiple top-level elements by looking at indentation patterns
  // A simple heuristic: after some content, there's a blank line followed by a < at the same or less indentation
  const lines = betweenReturnAndClose.split("\n");
  let hasSiblings = false;
  let firstChildIndent = -1;
  let elementCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("<") && !trimmed.startsWith("</") && !trimmed.startsWith("<!--")) {
      const indent = line.search(/\S/);
      if (firstChildIndent === -1) {
        firstChildIndent = indent;
      }
      // If this element is at the same indent level as the first child, it's a sibling
      if (indent === firstChildIndent) {
        elementCount++;
      }
    }
  }

  if (elementCount < 2) {
    console.log(`SKIP (single child): ${filePath}`);
    continue;
  }

  // Add fragment wrapper
  // Insert <> right after the return (
  const indent = returnMatch[1]; // whitespace before "return"
  content = content.slice(0, afterReturnParen) + "\n" + indent + "  <>" + content.slice(afterReturnParen);
  
  // Adjust closeIndex since we inserted content
  const newCloseIndex = closeIndex + indent.length + 4; // "\n" + "  <>"
  
  // Insert </> before the matching );
  content = content.slice(0, newCloseIndex) + "\n" + indent + "  </>" + content.slice(newCloseIndex);

  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`FIXED: ${filePath}`);
  fixedCount++;
}

console.log(`\nDone! Fixed ${fixedCount} files.`);
