const fs = require('fs');
const path = require('path');

const src = 'C:/Users/rahul/.gemini/antigravity-ide/brain/ca10d855-ea34-4713-83eb-301fd325d744/schoolmitra_hero_dashboard_1785946435595.png';
const dest = path.join(__dirname, 'public', 'images', 'hero-dashboard.png');

fs.copyFileSync(src, dest);
console.log('Image copied successfully to ' + dest);
