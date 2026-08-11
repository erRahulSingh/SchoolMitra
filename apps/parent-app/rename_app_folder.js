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

// 3. Copy 3D generated PNG images and create TS base64 asset file
try {
  const brainDir = 'C:\\Users\\rahul\\.gemini\\antigravity-ide\\brain\\9c1e88a7-dd1f-4ced-8e81-fed443575aa3';
  const assetsDir = path.join(__dirname, 'assets');
  const srcAssetsDir = path.join(__dirname, 'src', 'assets');

  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  if (!fs.existsSync(srcAssetsDir)) fs.mkdirSync(srcAssetsDir, { recursive: true });

  const motherChildFile = 'mother_child_study_3d_1786180726882.png';
  const studentRohanFile = 'student_rohan_avatar_3d_1786180743812.png';

  const motherChildPath = path.join(brainDir, motherChildFile);
  const studentRohanPath = path.join(brainDir, studentRohanFile);

  if (fs.existsSync(motherChildPath) && fs.existsSync(studentRohanPath)) {
    fs.copyFileSync(motherChildPath, path.join(assetsDir, 'mother_child_3d.png'));
    fs.copyFileSync(studentRohanPath, path.join(assetsDir, 'student_rohan_3d.png'));

    const motherChildB64 = fs.readFileSync(motherChildPath).toString('base64');
    const studentRohanB64 = fs.readFileSync(studentRohanPath).toString('base64');

    const tsContent = `// Generated 3D Base64 Assets
export const motherChild3DUri = 'data:image/png;base64,${motherChildB64}';
export const studentRohan3DUri = 'data:image/png;base64,${studentRohanB64}';
`;
    fs.writeFileSync(path.join(srcAssetsDir, 'parent3dAssets.ts'), tsContent);
    console.log('Successfully generated parent3dAssets.ts!');
  }
} catch (err) {
  console.log('Asset processing error:', err.message);
}
