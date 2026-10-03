const mongoose = require('mongoose');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/schoolmitra');
  const db = mongoose.connection.db;

  let school = await db.collection('schools').findOne({ code: 'sch-1000' });
  if (!school) {
    school = await db.collection('schools').findOne();
  }

  if (!school) {
    console.error('No school found to link students to.');
    process.exit(1);
  }

  const dummyStudents = [
    {
      name: 'Aarav Sharma',
      rollNo: '101',
      rollNumber: '101',
      admissionNo: 'ADM-101',
      admissionNumber: 'ADM-101',
      class: 'Class 10 - A',
      gender: 'Male',
      bloodGroup: 'B+',
      status: 'Active',
      schoolId: school._id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Riya Patel',
      rollNo: '102',
      rollNumber: '102',
      admissionNo: 'ADM-102',
      admissionNumber: 'ADM-102',
      class: 'Class 8 - B',
      gender: 'Female',
      bloodGroup: 'O+',
      status: 'Active',
      schoolId: school._id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rohan Verma',
      rollNo: '103',
      rollNumber: '103',
      admissionNo: 'ADM-103',
      admissionNumber: 'ADM-103',
      class: 'Class 5 - A',
      gender: 'Male',
      bloodGroup: 'A+',
      status: 'Active',
      schoolId: school._id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  for (const st of dummyStudents) {
    await db.collection('students').updateOne(
      { admissionNo: st.admissionNo, schoolId: school._id },
      { $set: st },
      { upsert: true }
    );
  }

  console.log(`✅ Successfully seeded 3 dummy students for school: ${school.name} (Code: ${school.code})`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
