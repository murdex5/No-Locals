import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './index.js'; // Import your express app

describe('Express Server API Tests', () => {

  // Test the basic health check
  test('GET /test returns "Server is online!"', async () => {
    const response = await request(app).get('/test');
    
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Server is online!");
  });

  // Test a 404 for non-existent routes
  test('404 on unknown route', async () => {
    const response = await request(app).get('/this-route-does-not-exist');
    assert.strictEqual(response.status, 404);
  });

});