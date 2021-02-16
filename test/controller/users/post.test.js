const supertest = require('supertest');
const app = require('../../../app');

const request = supertest(app);

const endpoint = '/users';

const bad_request = {
  internal_code: 'bad_request'
};

const userValidInfo = {
  request: {
    email: 'prueba@wolox.co',
    password: '12312312',
    first_name: 'pepito',
    last_name: 'caminos'
  },
  response: {
    email: 'prueba@wolox.co',
    first_name: 'pepito',
    last_name: 'caminos'
  }
};

describe('/users create user', () => {
  describe('successful cases', () => {
    describe('create user', () => {
      let response = {};
      beforeAll(async () => {
        response = await request.post(endpoint).send(userValidInfo.request);
      });
      test('Should return server status created', () => {
        expect(response.status).toBe(201);
      });
      test('Should return users info', () => {
        expect(response.body).toMatchObject(userValidInfo.response);
      });
      test('Should return correct keys', () => {
        expect(Object.keys(response.body)).toEqual([
          'id',
          'email',
          'first_name',
          'last_name',
          'created_at',
          'updated_at'
        ]);
      });
    });
  });

  describe('failure cases', () => {
    let response = {};
    beforeAll(async () => {
      response = await request.post(endpoint).send({});
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
    test('Should have message error about first_name is required', () => {
      expect(response.body.message).toContain('first_name must be valid');
    });
    test('Should have message error about email must be valid', () => {
      expect(response.body.message).toContain('Email must be a valid email');
    });
    test('Should have message error about email must be a wolox domain', () => {
      expect(response.body.message).toContain('Email must be a wolox domain');
    });
    test('Should have message error about password must be at least 8 characters', () => {
      expect(response.body.message).toContain('password must be at least 8 characters');
    });
    test('Should have message error about passwrod must be alphanumeric', () => {
      expect(response.body.message).toContain('password must have only alphanumeric characters');
    });
  });
});
