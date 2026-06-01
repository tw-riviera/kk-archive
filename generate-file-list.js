#!/usr/bin/env node
/**
 * Generate file-list.json for kk-archive File Browser
 * Usage: node generate-file-list.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = '.';
const OUTPUT = 'file-list.json';
const IGNORE = new Set([
  '.git',
  'node_modules',
  '.cache',
  'generate-file-list.js',
  'file-list.json',
  '.gitignore',
]);

function shouldIgnore(name) {
  return IGNORE.has(name) || name.startsWith('.') || name.endsWith('.map');
}

function scan(dir, relPath = '') {
  const items = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (shouldIgnore(entry.name)) continue;

    const itemPath = relPath ? `${relPath}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    const stat = fs.statSync(fullPath);

    const item = {
      name: entry.name,
      path: itemPath,
      type: entry.isDirectory() ? 'directory' : 'file',
      size: entry.isFile() ? stat.size : null,
      mtime: stat.mtime.toISOString(),
    };

    if (entry.isDirectory()) {
      item.children = scan(fullPath, itemPath);
    }

    items.push(item);
  }

  // Sort: directories first, then alphabetically
  items.sort((a, b) => {
    if (a.type === 'directory' && b.type !== 'directory') return -1;
    if (a.type !== 'directory' && b.type === 'directory') return 1;
    return a.name.localeCompare(b.name);
  });

  return items;
}

function main() {
  console.log('Scanning:', ROOT);
  const data = scan(ROOT);
  fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
  console.log(`Generated: ${OUTPUT} (${data.length} top-level items)`);
}

main();
