const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\rahul\\.gemini\\antigravity-ide\\brain\\05ed6b77-f63d-4dec-93b5-5ec980d1c52a';
const destDir = 'd:\\SchoolMitra\\apps\\parent-app\\public';

const files = [
  { src: 'sports_day_1785426360054.png', dest: 'sports_day.png' },
  { src: 'republic_day_1785426374546.png', dest: 'republic_day.png' },
  { src: 'science_exhibition_1785426388033.png', dest: 'science_exhibition.png' },
  { src: 'childrens_day_1785426403163.png', dest: 'childrens_day.png' },
  { src: 'educational_trip_1785426418825.png', dest: 'educational_trip.png' },
  { src: 'art_craft_1785426433279.png', dest: 'art_craft.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } catch (err) {
    console.error(`Error copying ${f.src}:`, err.message);
  }
});
