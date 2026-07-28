const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\rahul\\.gemini\\antigravity-ide\\brain\\e787a014-2d26-42af-979e-7f449a627c6b';
const dest = path.join(__dirname, 'public', 'images', 'resources');

fs.mkdirSync(dest, { recursive: true });

const files = [
  ['resources_hero_3d_1785249295572.png', 'hero-3d.png'],
  ['card_erp_laptop_1785249306852.png', 'card-erp.png'],
  ['card_smart_school_1785249321834.png', 'card-school.png'],
  ['card_success_school_1785249331640.png', 'card-success.png'],
  ['article_bus_tracking_1785250098501.png', 'article-bus.png'],
  ['article_parent_comm_1785250111043.png', 'article-parent.png'],
  ['article_digitization_1785250121138.png', 'article-digital.png'],
  ['article_attendance_1785250134905.png', 'article-attendance.png'],
  ['webinar_presenter_1785250145699.png', 'webinar-presenter.png'],
  ['chat_headphones_3d_1785251226153.png', 'chat-headphones.png'],
  ['offices_map_view_1785251236263.png', 'map-view.png'],
];

files.forEach(([from, to]) => {
  const srcPath = path.join(src, from);
  const destPath = path.join(dest, to);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${from} -> ${to}`);
  } else {
    console.log(`SKIP (not found): ${from}`);
  }
});

console.log('All images copied!');
