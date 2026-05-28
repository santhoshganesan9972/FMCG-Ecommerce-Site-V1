const fs = require("fs");
const path = require("path");

const adminDir = "src/app/admin";

function walk(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory() && !item.startsWith(".")) {
      files.push(...walk(fullPath));
    } else if (item === "page.tsx" || item === "page.ts") {
      files.push(fullPath);
    }
  }
  return files;
}

const allPageFiles = walk(adminDir);

// Skip the dashboard-layout.tsx itself
const filesToFix = allPageFiles.filter(
  (f) => !f.endsWith("dashboard-layout.tsx")
);

let fixedCount = 0;
let skippedCount = 0;

for (const filePath of filesToFix) {
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;

  // 1. Remove import DashboardLayout lines
  content = content.replace(
    /import DashboardLayout from ["']\.\.\/dashboard-layout["'];\n?/g,
    ""
  );
  content = content.replace(
    /import DashboardLayout from ["']\.\.\/\.\.\/dashboard-layout["'];\n?/g,
    ""
  );

  // 2. Remove <DashboardLayout> opening tags (but keep children)
  // Handle <DashboardLayout> on its own line
  content = content.replace(/^\s*<DashboardLayout>\s*\n/gm, "");
  // Handle <DashboardLayout> inline
  content = content.replace(/<DashboardLayout>\s*/g, "");

  // 3. Remove </DashboardLayout> closing tags (but keep children)
  // Handle </DashboardLayout> on its own line
  content = content.replace(/^\s*<\/DashboardLayout>\s*\n/gm, "");
  // Handle </DashboardLayout> inline
  content = content.replace(/\s*<\/DashboardLayout>/g, "");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`FIXED: ${filePath}`);
    fixedCount++;
  } else {
    skippedCount++;
  }
}

console.log(`\nDone! Fixed ${fixedCount} files, skipped ${skippedCount} files.`);
