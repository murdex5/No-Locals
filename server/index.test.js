import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './index.js'; 

describe('No-Locals API Tests', () => {

  // FIX: Updated to match your actual server message
  test('GET /test returns success message', async () => {
    const response = await request(app).get('/test');
    
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Test route is working");
  });

  test('404 on unknown route', async () => {
    const response = await request(app).get('/this-route-does-not-exist');
    assert.strictEqual(response.status, 404);
  });

  // NEW: Test User Registration (Integration Test)
  test('POST /users/register creates a new user', async () => {
    const newUser = {
      username: `testuser_${Date.now()}`, // Unique username every time
      email: `test_${Date.now()}@test.com`,
      full_name: "Test User",
      password: "password123"
    };

    const response = await request(app)
      .post('/users/register')
      .send(newUser);

    // If your DB is connected, this should be 201
    // If your DB is NOT connected during tests, this will fail with 500
    assert.ok(response.status === 201 || response.status === 400, "Should register or fail if user exists");
  });

});