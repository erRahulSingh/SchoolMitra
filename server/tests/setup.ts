import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

// Global teardown or setup can go here
beforeAll(async () => {
  // If we wanted to connect to a test DB:
  // await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
  // await mongoose.disconnect();
});
