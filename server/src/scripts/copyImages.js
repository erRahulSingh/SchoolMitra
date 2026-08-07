const fs = require('fs');
const path = require('path');

const publicDir = 'd:/SchoolMitra/apps/teacher-app/public';
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = [
  { src: 'C:/Users/rahul/.gemini/antigravity-ide/brain/1e3c8cbf-945a-42a5-9db1-ab60d4690833/teacher_onboarding_hero_1786097385458.png', dest: 'teacher_onboarding_hero.png' },
  { src: 'C:/Users/rahul/.gemini/antigravity-ide/brain/1e3c8cbf-945a-42a5-9db1-ab60d4690833/teacher_welcome_desk_1786097404598.png', dest: 'teacher_welcome_desk.png' },
  { src: 'C:/Users/rahul/.gemini/antigravity-ide/brain/1e3c8cbf-945a-42a5-9db1-ab60d4690833/forgot_password_envelope_1786097422401.png', dest: 'forgot_password_envelope.png' },
  { src: 'C:/Users/rahul/.gemini/antigravity-ide/brain/1e3c8cbf-945a-42a5-9db1-ab60d4690833/reset_password_shield_1786097443551.png', dest: 'reset_password_shield.png' }
];

files.forEach(f => {
  const destPath = path.join(publicDir, f.dest);
  fs.copyFileSync(f.src, destPath);
  console.log(`Copied ${f.dest} successfully.`);
});
