import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './index.js'; 

describe('Express Server API Tests', () => {

  test('GET /test returns correct message', async () => {
    const response = await request(app)
      .get('/test')
      .set('Accept', 'application/json');
    
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Test route is working"); 
  });

  // test('404 on unknown API route', async () => {
  //   const response = await request(app)
  //     .get('/this-api-route-does-not-exist')
  //     .set('Accept', 'application/json'); // This is the crucial line to add

  //   assert.strictEqual(response.status, 404);
  // });
});