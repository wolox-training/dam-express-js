const supertest = require('supertest');
const app = require('../../../app');
const jwt = require('../../../app/helpers/jwt');
const { createMany } = require('../../factories/users');

const request = supertest(app);

const token = jwt.encode({ userId: 1, email: 'email@wolox.co' });

const bad_request = {
  internal_code: 'bad_request'
};

const unauthorized = {
  internal_code: 'unauthorized'
};

const endpoint = '/users';
describe('/users list all users', () => {
  describe('successful cases', () => {
    describe.each([
      // offset, limit, total, position first, position last
      [0, 2, 2],
      [0, 10, 5],
      [4, 6, 1],
      [10, 10, 0]
      // eslint-disable-next-line max-params
    ])('with offset %i, limit %i should return %i users', (offset, limit, total) => {
      let response = {};
      beforeAll(async () => {
        await createMany();
        response = await request
          .get(`${endpoint}`)
          .query({ limit, offset })
          .set('Authorization', `Bearer ${token}`)
          .send({});
      });
      test('Should return server status ok', () => {
        expect(response.status).toBe(200);
      });
      test(`Should return a body with length ${total}`, () => {
        expect(response.body).toHaveLength(total);
      });
    });
  });
  describe('failure cases', () => {
    describe('body empty schema validations', () => {
      let response = {};
      beforeAll(async () => {
        response = await request
          .get(`${endpoint}`)
          .query()
          .set('Authorization', `Bearer ${token}`)
          .send({});
      });
      test('Should return server status bad request', () => {
        expect(response.status).toBe(400);
      });
      test('Should return a internal_code with bad_request', () => {
        expect(response.body).toMatchObject(bad_request);
      });
      test('Should message to be an array', () => {
        expect(response.body.message).toBeInstanceOf(Array);
      });
      test('Should have message error about offser invalid', () => {
        expect(response.body.message).toContain('offset must be a valid number greater than zero');
      });
      test('Should have message error about limit invalid', () => {
        expect(response.body.message).toContain(
          'limit must be a valid number greater than zero and less than 20'
        );
      });
    });
    describe("token don't send", () => {
      let response = {};
      beforeAll(async () => {
        response = await request
          .get(`${endpoint}`)
          .query({ limit: 20, offset: 0 })
          .send({});
      });
      test('Should return server status unauthorized', () => {
        expect(response.status).toBe(401);
      });
      test('Should return a internal_code with unauthorized', () => {
        expect(response.body).toMatchObject(unauthorized);
      });
      test('Should have message error about token not found', () => {
        expect(response.body.message).toContain('No authorization token was found');
      });
    });
    describe('token malformed', () => {
      let response = {};
      beforeAll(async () => {
        response = await request
          .get(`${endpoint}`)
          .query({ limit: 20, offset: 0 })
          .set('Authorization', 'Bearer ZZZZ')
          .send({});
      });
      test('Should return server status unauthorized', () => {
        expect(response.status).toBe(401);
      });
      test('Should return a internal_code with unauthorized', () => {
        expect(response.body).toMatchObject(unauthorized);
      });
      test('Should have message error about token malformed', () => {
        expect(response.body.message).toContain('jwt malformed');
      });
    });

    describe('token invalid', () => {
      let response = {};
      beforeAll(async () => {
        response = await request
          .get(`${endpoint}`)
          .query({ limit: 20, offset: 0 })
          .set('Authorization', 'Bearer XXX.YYY.ZZZZ')
          .send({});
      });
      test('Should return server status unauthorized', () => {
        expect(response.status).toBe(401);
      });
      test('Should return a internal_code with unauthorized', () => {
        expect(response.body).toMatchObject(unauthorized);
      });
      test('Should have message error about invalid token', () => {
        expect(response.body.message).toContain('invalid token');
      });
    });
  });
});
