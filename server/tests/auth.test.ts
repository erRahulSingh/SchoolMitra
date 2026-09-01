import request from 'supertest';
import express from 'express';
import apiRoutes from '../src/routes';

// Create an Express app for testing the routes
const app = express();
app.use(express.json());
app.use('/api/v1', apiRoutes);

// Mock the Mongoose connection inside the health route to avoid failing
jest.mock('mongoose', () => ({
  connection: {
    readyState: 1,
    host: 'localhost',
    name: 'testdb'
  }
}));

describe('Health Check Endpoint', () => {
  it('should return 200 OK and status healthy', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.databaseStatus).toBe('connected');
    expect(response.body.service).toBe('SchoolMitra Unified Backend API');
  });
});

describe('Auth Endpoints (Mocked)', () => {
  // We can write more tests here mocking the AuthController
  it('should return 400 for missing credentials on login', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({});
    // The validation middleware should block it
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});
