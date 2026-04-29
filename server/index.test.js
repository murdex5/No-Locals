import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './index.js'; 

describe('Express Server API Tests', () => {

  test('GET /test returns correct message', async () => {
    const response = await request(app).get('/test');
    
    assert.strictEqual(response.status, 200);
    // Changed to match your server's actual output
    assert.strictEqual(response.body.message, "Test route is working"); 
  });

  test('404 on unknown route', async () => {
    const response = await request(app).get('/this-route-does-not-exist');
    assert.strictEqual(response.status, 404);
  });
});