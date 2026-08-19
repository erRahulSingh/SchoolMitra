const fs = require('fs');
const path = require('path');

const src = path.join('C:', 'Users', 'rahul', '.gemini', 'antigravity-ide', 'brain', '4326b832-415c-4619-a4eb-debe67881b52', 'teacher_app_logo_1786724617235.png');
const destDir = path.join(__dirname, 'src', 'assets');
const dest = path.join(destDir, 'logo.png');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log('Logo copied successfully to:', dest);
