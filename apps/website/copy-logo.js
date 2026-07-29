const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../parent-app/public/logo.png');
const dest = path.join(__dirname, 'public/logo.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied logo.png to website/public/logo.png');
}
