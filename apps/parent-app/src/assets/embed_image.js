const fs = require('fs');
const imgPath = 'C:/Users/rahul/.gemini/antigravity-ide/brain/9c1e88a7-dd1f-4ced-8e81-fed443575aa3/mother_son_school_3d_1786186677421.png';
const tsPath = 'd:/SchoolMitra/apps/parent-app/src/assets/parent3dAssets.ts';

if (fs.existsSync(imgPath)) {
  const base64 = fs.readFileSync(imgPath).toString('base64');
  const content = `// 3D Generated Image Assets for Parent App
export const motherChild3DUri = 'data:image/png;base64,${base64}';
export const studentRohan3DUri = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80';
`;
  fs.writeFileSync(tsPath, content, 'utf8');
  console.log('Successfully updated parent3dAssets.ts with local base64 3D image!');
} else {
  console.log('Image file not found:', imgPath);
}
