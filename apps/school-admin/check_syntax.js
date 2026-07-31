const fs = require('fs');
const code = fs.readFileSync('src/app/students/page.tsx', 'utf8');
const lines = code.split('\n');
let braces = 0, parens = 0, angles = 0;
let inString = false, strChar = '';
let inTemplate = false;
let inLineComment = false, inBlockComment = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  inLineComment = false;
  
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    const next = line[j+1] || '';
    
    if (inBlockComment) {
      if (c === '*' && next === '/') { inBlockComment = false; j++; }
      continue;
    }
    if (inLineComment) continue;
    if (c === '/' && next === '/') { inLineComment = true; continue; }
    if (c === '/' && next === '*') { inBlockComment = true; j++; continue; }
    
    if (inString) {
      if (c === strChar && line[j-1] !== '\\') inString = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inString = true; strChar = c; continue; }
    
    if (c === '{') braces++;
    if (c === '}') braces--;
    if (c === '(') parens++;
    if (c === ')') parens--;
  }
  
  if (i >= 0 && i <= 260) {
    if (braces <= 0 || parens < 0) {
      console.log(`L${i+1}: braces=${braces} parens=${parens} ** ALERT **`);
    }
  }
}
console.log(`\nFinal: braces=${braces} parens=${parens}`);
console.log(`Lines: ${lines.length}`);
