const mongoose = require('mongoose');

async function seedTransportAndStudent() {
  await mongoose.connect('mongodb://localhost:27017/schoolmitra');
  const db = mongoose.connection.db;

  console.log('🚀 Connecting to DB...');

  // 1. Find school
  let school = await db.collection('schools').findOne({ code: { $regex: /^sch-1000$/i } });
  if (!school) school = await db.collection('schools').findOne();
  if (!school) {
    console.error('No school found!');
    process.exit(1);
  }
  const schoolId = school._id;
  console.log(`🏫 School: ${school.name} (${school.code})`);

  // 2. Seed / Update Driver
  const driverData = {
    schoolId,
    name: 'Ram Singh',
    phone: '+91 98111 22334',
    licenseNo: 'DL-14201100987',
    address: 'Sector 12, Dwarka, New Delhi',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const driverRes = await db.collection('drivers').findOneAndUpdate(
    { schoolId, phone: driverData.phone },
    { $set: driverData },
    { upsert: true, returnDocument: 'after' }
  );
  const driverId = driverRes._id || (await db.collection('drivers').findOne({ schoolId, phone: driverData.phone }))._id;

  // 3. Seed / Update Bus
  const busData = {
    schoolId,
    busNumber: 'Bus #01',
    registrationNo: 'DL 01 AB 4321',
    capacity: 42,
    busType: 'School Bus',
    driverId,
    driverName: 'Ram Singh',
    routeName: 'Route 1 Dwarka Belt',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const busRes = await db.collection('buses').findOneAndUpdate(
    { schoolId, busNumber: busData.busNumber },
    { $set: busData },
    { upsert: true, returnDocument: 'after' }
  );
  const busId = busRes._id || (await db.collection('buses').findOne({ schoolId, busNumber: busData.busNumber }))._id;

  // 4. Seed / Update Route
  const routeData = {
    schoolId,
    routeName: 'Route 1 Dwarka Belt',
    routeCode: 'RT-01',
    startLocation: 'Sector 21 Metro Terminal',
    endLocation: `${school.name} Campus`,
    totalDistanceKm: 18.5,
    estimatedDurationMins: 45,
    pickupTime: '07:15 AM',
    dropTime: '02:30 PM',
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const routeRes = await db.collection('routes').findOneAndUpdate(
    { schoolId, routeName: routeData.routeName },
    { $set: routeData },
    { upsert: true, returnDocument: 'after' }
  );
  const routeId = routeRes._id || (await db.collection('routes').findOne({ schoolId, routeName: routeData.routeName }))._id;

  // 5. Seed Route Stops with real Coordinates
  const stops = [
    { stopName: 'Sector 21 Metro', stopSequence: 1, pickupTime: '07:15 AM', dropTime: '02:45 PM', latitude: 28.5520, longitude: 77.0580 },
    { stopName: 'Main Market', stopSequence: 2, pickupTime: '07:35 AM', dropTime: '02:30 PM', latitude: 28.5700, longitude: 77.0620 },
    { stopName: 'Maple Park', stopSequence: 3, pickupTime: '07:48 AM', dropTime: '02:15 PM', latitude: 28.5833, longitude: 77.0667 },
    { stopName: 'Sector 52', stopSequence: 4, pickupTime: '08:00 AM', dropTime: '02:00 PM', latitude: 28.5880, longitude: 77.0690 },
    { stopName: `${school.name} Campus`, stopSequence: 5, pickupTime: '08:15 AM', dropTime: '01:45 PM', latitude: 28.5900, longitude: 77.0700 },
  ];

  let pickupStopId = null;
  for (const s of stops) {
    const sDoc = await db.collection('stops').findOneAndUpdate(
      { schoolId, routeId, stopName: s.stopName },
      { $set: { ...s, schoolId, routeId, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );
    const stopDocId = sDoc._id || (await db.collection('stops').findOne({ schoolId, routeId, stopName: s.stopName }))._id;
    if (s.stopName === 'Main Market') {
      pickupStopId = stopDocId;
    }
  }

  // 6. Find existing Parent or create test parent
  let parentUser = await db.collection('users').findOne({ role: { $regex: /^parent$/i } });
  let parentProfile = await db.collection('parents').findOne();

  // 7. Seed / Update 3 Students (Aarav, Riya, Rohan) with Transport attached
  const studentSeeds = [
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
      schoolId,
      transportMode: 'Bus',
      busNo: 'Bus #01',
      teacherName: 'Mrs. Priya Singh',
      attendanceRate: '96%',
      dueFee: '₹0',
      parentInfo: {
        fatherName: 'Sunil Sharma',
        motherName: 'Sunita Sharma',
        phone: '+91 98765 43210'
      }
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
      schoolId,
      transportMode: 'Bus',
      busNo: 'Bus #01',
      teacherName: 'Mr. Rajesh Gupta',
      attendanceRate: '94%',
      dueFee: '₹1,500',
      parentInfo: {
        fatherName: 'Kishore Patel',
        motherName: 'Meena Patel',
        phone: '+91 98765 43211'
      }
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
      schoolId,
      transportMode: 'Bus',
      busNo: 'Bus #01',
      teacherName: 'Mrs. Anjali Mehta',
      attendanceRate: '98%',
      dueFee: '₹0',
      parentInfo: {
        fatherName: 'Vikram Verma',
        motherName: 'Kavita Verma',
        phone: '+91 98765 43212'
      }
    }
  ];

  const seededStudents = [];
  for (const st of studentSeeds) {
    // If parentProfile exists, link parentId
    if (parentProfile) {
      st.parentId = parentProfile._id;
    }
    const updatedSt = await db.collection('students').findOneAndUpdate(
      { admissionNo: st.admissionNo, schoolId },
      { $set: { ...st, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );
    const sDoc = updatedSt._id ? updatedSt : (await db.collection('students').findOne({ admissionNo: st.admissionNo, schoolId }));
    seededStudents.push(sDoc);

    // 8. Create StudentRoute Assignment
    await db.collection('studentroutes').updateOne(
      { schoolId, studentId: sDoc._id },
      { 
        $set: {
          schoolId,
          studentId: sDoc._id,
          busId,
          routeId,
          pickupStopId,
          pickupTime: '07:35 AM',
          dropTime: '02:30 PM',
          status: 'Active',
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );
  }

  // 9. Also update parent document's children list
  if (parentProfile) {
    const allChildIds = seededStudents.map(s => s._id);
    await db.collection('parents').updateOne(
      { _id: parentProfile._id },
      { $addToSet: { children: { $each: allChildIds } } }
    );
    console.log(`👨‍👩‍👧 Linked ${allChildIds.length} students to parent: ${parentProfile.name || parentProfile.fatherName || parentProfile._id}`);
  }

  console.log('✅ Successfully seeded:');
  console.log(`   - Bus: Bus #01 (DL 01 AB 4321)`);
  console.log(`   - Driver: Ram Singh (+91 98111 22334)`);
  console.log(`   - Route: Route 1 Dwarka Belt (5 Stops)`);
  console.log(`   - Students: Aarav Sharma (Roll: 101), Riya Patel (Roll: 102), Rohan Verma (Roll: 103)`);
  console.log(`   - Transport Assignment: Active on Bus #01 with Stop 'Main Market'`);

  process.exit(0);
}

seedTransportAndStudent().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
