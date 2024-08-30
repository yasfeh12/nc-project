const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const seedData = require('../db/data/test-data');

beforeEach(() => seed(seedData));
afterAll(() => db.end());

describe('/api/users', () => {
  test('GET 200: responds with an array of user objects with the correct properties', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toBeInstanceOf(Array);
        body.users.forEach(user => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String)
            })
          );
        });
      });
  });

  test('GET 404: responds with an error for a non-existent route', () => {
    return request(app)
      .get('/api/non-existent-route')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Route not found');
      });
  });
});
