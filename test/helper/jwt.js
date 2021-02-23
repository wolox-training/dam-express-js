// const supertest = require('supertest');
// const app = require('../../../app');

// const request = supertest(app);

// const testJwt = ({ endpoint, method, token, body, query }) => {
//   describe("token don't send", () => {
//     let response = {};
//     beforeAll(async () => {
//       response = await request
//         .get(`${endpoint}`)
//         .query({ limit: 20, offset: 0 })
//         .send({});
//     });
//     test('Should return server status unauthorized', () => {
//       expect(response.status).toBe(401);
//     });
//     test('Should return a internal_code with unauthorized', () => {
//       expect(response.body).toMatchObject(unauthorized);
//     });
//     test('Should have message error about token not found', () => {
//       expect(response.body.message).toContain('No authorization token was found');
//     });
//   });
//   describe('token malformed', () => {
//     let response = {};
//     beforeAll(async () => {
//       response = await request
//         .get(`${endpoint}`)
//         .query({ limit: 20, offset: 0 })
//         .set('Authorization', 'Bearer ZZZZ')
//         .send({});
//     });
//     test('Should return server status unauthorized', () => {
//       expect(response.status).toBe(401);
//     });
//     test('Should return a internal_code with unauthorized', () => {
//       expect(response.body).toMatchObject(unauthorized);
//     });
//     test('Should have message error about token malformed', () => {
//       expect(response.body.message).toContain('jwt malformed');
//     });
//   });

//   describe('token invalid', () => {
//     let response = {};
//     beforeAll(async () => {
//       response = await request
//         .get(`${endpoint}`)
//         .query({ limit: 20, offset: 0 })
//         .set('Authorization', 'Bearer XXX.YYY.ZZZZ')
//         .send({});
//     });
//     test('Should return server status unauthorized', () => {
//       expect(response.status).toBe(401);
//     });
//     test('Should return a internal_code with unauthorized', () => {
//       expect(response.body).toMatchObject(unauthorized);
//     });
//     test('Should have message error about invalid token', () => {
//       expect(response.body.message).toContain('invalid token');
//     });
//   });
// };
