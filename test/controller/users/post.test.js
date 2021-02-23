/* eslint-disable max-lines */
const supertest = require('supertest');

const app = require('../../../app');
const { create: createUser } = require('../../factories/users');
const jwt = require('../../../app/helpers/jwt');
const { User } = require('../../../app/models');
const { ADMIN, USER } = require('../../../app/constants/rols');

const request = supertest(app);

const endpoint = '/users';

const bad_request = {
  internal_code: 'bad_request'
};

const not_found = {
  internal_code: 'not_found'
};

const database_error = {
  internal_code: 'database_error'
};
// const unauthorized = {
//   internal_code: 'unauthorized'
// };

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

const unauthorized = {
  internal_code: 'unauthorized'
};

const forbidden = {
  internal_code: 'forbidden'
};

const userSignIn = {
  wrongPassword: {
    email: 'noexist@wolox.co',
    password: '1234567890'
  },
  correct: {
    email: 'email@wolox.co',
    password: '12345678'
  }
};

const adminToken = jwt.encode({ permissions: [ADMIN] });

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
    describe('schema validations', () => {
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
    describe('database error', () => {
      let response = {};
      let createSpy = {};
      const errorDatabase = 'Error creating user';
      beforeAll(async () => {
        createSpy = jest.spyOn(User, 'create').mockRejectedValue(new Error(errorDatabase));
        response = await request.post(endpoint).send(userValidInfo.request);
      });
      test('Should return server status database error', () => {
        expect(response.status).toBe(503);
      });
      test('Should called create function model', () => {
        expect(createSpy).toHaveBeenCalledTimes(1);
      });
      test('Should have message error about database error', () => {
        expect(response.body.message).toContain(errorDatabase);
      });
      test('Should return a internal_code with database_error', () => {
        expect(response.body).toMatchObject(database_error);
      });
    });
  });
});

describe('/users/sessions sign up', () => {
  describe('successful cases', () => {
    let response = {};
    let userInserted = {};

    beforeAll(async () => {
      userInserted = await createUser(userSignIn.correct);
      response = await request.post(`${endpoint}/sessions`).send(userSignIn.correct);
    });
    test('Should return server status ok', () => {
      expect(response.status).toBe(200);
    });
    test('Should return a token with email and id', () => {
      const payloadToken = jwt.decoded(response.body.token);
      expect(payloadToken).toStrictEqual({
        userId: userInserted.id,
        email: userInserted.email,
        permissions: [USER]
      });
    });
  });
  describe('failure cases', () => {
    describe('body empty schema validations', () => {
      let response = {};
      beforeAll(async () => {
        response = await request.post(`${endpoint}/sessions`).send({});
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

    describe("user doesn't exists", () => {
      let response = {};
      beforeAll(async () => {
        response = await request.post(`${endpoint}/sessions`).send(userSignIn.wrongPassword);
      });
      test('Should return server status bad request', () => {
        expect(response.status).toBe(404);
      });
      test('Should return a internal_code with not_found', () => {
        expect(response.body).toMatchObject(not_found);
      });
      test('Should have message error about user or password invalid', () => {
        expect(response.body.message).toContain('invalid email or password');
      });
    });

    describe('user exist but password is incorrect', () => {
      let response = {};
      beforeAll(async () => {
        await createUser({ email: userSignIn.wrongPassword.email });
        response = await request.post(`${endpoint}/sessions`).send(userSignIn.wrongPassword);
      });
      test('Should return server status not found', () => {
        expect(response.status).toBe(404);
      });
      test('Should return a internal_code with not_found', () => {
        expect(response.body).toMatchObject(not_found);
      });
      test('Should have message error about user or password invalid', () => {
        expect(response.body.message).toContain('invalid email or password');
      });
    });
  });
});

describe('/admin/users sign up admin', () => {
  describe('successful cases', () => {
    describe("when user does'n exists", () => {
      let response = {};

      beforeAll(async () => {
        response = await request
          .post(`/admin${endpoint}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(userValidInfo.request);
      });
      test('Should return server status created', () => {
        expect(response.status).toBe(201);
      });
    });
  });
  describe('failure cases', () => {
    describe('body empty schema validations', () => {
      let response = {};
      beforeAll(async () => {
        response = await request
          .post(`/admin${endpoint}`)
          .set('Authorization', `Bearer ${adminToken}`)
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

    describe("token don't send", () => {
      let response = {};
      beforeAll(async () => {
        response = await request.post(`/admin${endpoint}`).send(userValidInfo.request);
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
          .post(`/admin${endpoint}`)
          .set('Authorization', 'Bearer ZZZZZZ')
          .send(userValidInfo.request);
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
          .post(`/admin${endpoint}`)
          .set('Authorization', 'Bearer XXX.YYY.ZZZZ')
          .send(userValidInfo.request);
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

    describe("token haven't correct permissions", () => {
      let response = {};
      beforeAll(async () => {
        const tokenUser = jwt.encode({ permissions: [USER] });
        response = await request
          .post(`/admin${endpoint}`)
          .set('Authorization', `Bearer ${tokenUser}`)
          .send(userValidInfo.request);
      });
      test('Should return server status forbbiden', () => {
        expect(response.status).toBe(403);
      });
      test('Should return a internal_code with forbidden', () => {
        expect(response.body).toMatchObject(forbidden);
      });
      test('Should have message error about permissions denied', () => {
        expect(response.body.message).toContain('Permission denied');
      });
    });
  });
});
