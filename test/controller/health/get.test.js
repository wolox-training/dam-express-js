const supertest = require('supertest');
const app = require('../../../app');

const request = supertest(app);

const endpoint = '/health';

describe('/health health endpoint', () => {
  let response = {};
  beforeAll(async () => {
    response = await request.get(endpoint).send();
  });
  test('Should return server status ok', () => {
    expect(response.status).toBe(200);
  });
});
