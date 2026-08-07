const fs = require('fs');
const path = require('path');

function moveDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      moveDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);
    }
  }
  fs.rmdirSync(src);
}

try {
  // Teacher App
  const teacherAppSrc = 'd:/SchoolMitra/apps/teacher-app/src/app';
  const teacherAppDest = 'd:/SchoolMitra/apps/teacher-app/src/web-app';
  moveDirSync(teacherAppSrc, teacherAppDest);
  console.log('Teacher App src/app -> src/web-app successfully moved.');

  // Parent App
  const parentAppSrc = 'd:/SchoolMitra/apps/parent-app/src/app';
  const parentAppDest = 'd:/SchoolMitra/apps/parent-app/src/web-app';
  moveDirSync(parentAppSrc, parentAppDest);
  console.log('Parent App src/app -> src/web-app successfully moved.');
} catch (err) {
  console.error('Error during rename:', err.message);
}
