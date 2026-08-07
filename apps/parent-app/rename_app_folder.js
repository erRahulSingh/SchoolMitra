const fs = require('fs');
const path = require('path');

// 1. Rename src/app to src/old_next_web_app
const oldPath = path.join(__dirname, 'src', 'app');
const newPath = path.join(__dirname, 'src', 'old_next_web_app');

if (fs.existsSync(oldPath)) {
  try {
    fs.renameSync(oldPath, newPath);
    console.log('Successfully renamed src/app to src/old_next_web_app!');
  } catch (err) {
    console.log('Renaming src/app failed, continuing...');
  }
}

// 2. Clean .expo and node_modules/.cache to prevent PlatformConstants TurboModule mismatch
const expoCache = path.join(__dirname, '.expo');
if (fs.existsSync(expoCache)) {
  try {
    fs.rmSync(expoCache, { recursive: true, force: true });
    console.log('Cleaned .expo cache.');
  } catch (e) {}
}

const metroCache = path.join(__dirname, 'node_modules', '.cache');
if (fs.existsSync(metroCache)) {
  try {
    fs.rmSync(metroCache, { recursive: true, force: true });
    console.log('Cleaned Metro bundler cache.');
  } catch (e) {}
}
