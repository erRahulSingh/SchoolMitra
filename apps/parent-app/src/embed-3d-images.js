const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\rahul\\.gemini\\antigravity-ide\\brain\\9c1e88a7-dd1f-4ced-8e81-fed443575aa3';
const assetsDir = 'd:\\SchoolMitra\\apps\\parent-app\\assets';
const tsFile = 'd:\\SchoolMitra\\apps\\parent-app\\src\\assets\\parent3dAssets.ts';

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const motherChildFile = 'mother_child_study_3d_1786180726882.png';
const studentRohanFile = 'student_rohan_avatar_3d_1786180743812.png';

const motherChildPath = path.join(brainDir, motherChildFile);
const studentRohanPath = path.join(brainDir, studentRohanFile);

// Copy to assets folder
fs.copyFileSync(motherChildPath, path.join(assetsDir, 'mother_child_3d.png'));
fs.copyFileSync(studentRohanPath, path.join(assetsDir, 'student_rohan_3d.png'));
console.log('Copied PNG files to assets directory!');

// Convert to base64 data URIs
const motherChildB64 = fs.readFileSync(motherChildPath).toString('base64');
const studentRohanB64 = fs.readFileSync(studentRohanPath).toString('base64');

const tsContent = `// Auto-generated 3D Image Assets Data URIs
export const motherChild3DUri = 'data:image/png;base64,${motherChildB64}';
export const studentRohan3DUri = 'data:image/png;base64,${studentRohanB64}';
`;

fs.writeFileSync(tsFile, tsContent);
console.log('Successfully written parent3dAssets.ts with Base64 URIs!');
