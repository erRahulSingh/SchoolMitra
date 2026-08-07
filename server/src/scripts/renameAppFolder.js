const fs = require('fs');

const teacherOld = 'd:/SchoolMitra/apps/teacher-app/src/app';
const teacherNew = 'd:/SchoolMitra/apps/teacher-app/src/web-app';

if (fs.existsSync(teacherOld)) {
  fs.renameSync(teacherOld, teacherNew);
  console.log('Renamed teacher-app src/app -> src/web-app');
}

const parentOld = 'd:/SchoolMitra/apps/parent-app/src/app';
const parentNew = 'd:/SchoolMitra/apps/parent-app/src/web-app';

if (fs.existsSync(parentOld)) {
  fs.renameSync(parentOld, parentNew);
  console.log('Renamed parent-app src/app -> src/web-app');
}
