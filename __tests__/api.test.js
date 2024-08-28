  const app = require('.././app');
  const request = require('supertest');
  const db = require('../db/connection');
const seed = require('../db/seeds/seed');
  const seedDATA = require('../db/data/test-data/index')
  const fs = require('fs');
const path = require('path'); 

  afterAll(() => db.end());
  beforeEach(()=>{
    return seed(seedDATA);
  })

describe('/api/topics', () => {
    test('GET 200: responds with a status code of 200', () => {
      return request(app)
        .get('/api/topics')
        .expect(200);
    });
    test('GET 200: responds with an array', () => {
      return request(app)
        .get('/api/topics')
        .then(({ body: { topics } }) => {
          expect(topics).toBeInstanceOf(Array);
        });
    });
  
    test('GET 200: each topic object contains a slug and description', () => {
      return request(app)
        .get('/api/topics')
        .then(({ body: { topics } }) => {
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String), 
                description: expect.any(String),  
              })
            );
          });
        });
    });
  });

  describe('/api/topics', () => {
    test('GET 404: responds with an error for a non-existent route', () => {
      return request(app)
        .get('/api/non-existent-route')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Route not found');  
        });
    });
  });

  describe('/api', () => {
    test('GET 200: responds with a JSON object detailing all available endpoints', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          const endpointsPath = path.join(__dirname, '../endpoints.json');
          const expectedEndpoints = JSON.parse(fs.readFileSync(endpointsPath, 'utf8'));
          
          expect(body).toEqual(expectedEndpoints);
        });
    });
  });

  describe('/api', () => {
    test('GET 404: responds with an error for an invalid path', () => {
      return request(app)
        .get('/fakey-mcfake')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Route not found');
        });
    });
    
  });

