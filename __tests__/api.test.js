  const app = require('.././app');
  const request = require('supertest');
  const db = require('../db/connection');
const { setDefaultHighWaterMark } = require('supertest/lib/test');
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

    test('GET 404: responds with an error for a non-existent route', () => {
      return request(app)
        .get('/api/non-existent-route')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Route not found');  
        });
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

  describe('/api', () => {
    test('GET 200: responds with a status code of 200', () => {
      return request(app)
        .get('/api')
        .expect(200);
    });
    
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
  
    test('GET 404: responds with an error for an invalid path', () => {
      return request(app)
        .get('/non-existent-route')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Route not found');
        });
    });
  });

  describe('/api/articles/:article_id', () => {
    test('GET 200: responds with an article object with the correct properties', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
            })
          );
        });
    });
  
    test('GET 404: responds with an error when the article_id does not exist', () => {
      return request(app)
        .get('/api/articles/9999')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Article not found');
        });
    });
  
    test('GET 400: responds with an error when the article_id is invalid', () => {
      return request(app)
        .get('/api/articles/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Invalid article ID');
        });
    });
  });