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

  describe('/api/articles/:article_id/comments', () => {
    test('GET 200: responds with an array of comments for the given article_id', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(11);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                article_id: 1,
              })
            );
          });
          for (let i = 0; i < comments.length - 1; i++) {
            expect(new Date(comments[i].created_at).getTime()).toBeGreaterThanOrEqual(
              new Date(comments[i + 1].created_at).getTime()
            );
          }
        });
    });
  
  test('GET 200: responds with an empty array if the article has no comments', () => {
    return request(app)
      .get('/api/articles/2/comments')
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([]);
      });
  });

  test('GET 404: responds with an error when the article_id does not exist', () => {
    return request(app)
      .get('/api/articles/9999/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Article not found');
      });
  });

  test('GET 400: responds with an error when the article_id is invalid', () => {
    return request(app)
      .get('/api/articles/not-a-number/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid article ID');
      });
  });
});

describe('/api/articles/:article_id/comments', () => {
  describe('POST', () => {
    test('POST 201: adds a new comment to the specified article', () => {
      const newComment = {
        username: 'butter_bridge',
        body: 'This is a test comment'
      };

      return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: 'This is a test comment',
              article_id: 1,
              author: 'butter_bridge',
              votes: 0,
              created_at: expect.any(String)
            })
          );
        });
    });

    test('POST 400: responds with an error when the request body is missing required fields', () => {
      const newComment = {
        username: 'butter_bridge'
      };

      return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request: Missing required fields');
        });
    });

    test('POST 404: responds with an error when article_id does not exist', () => {
      const newComment = {
        username: 'butter_bridge',
        body: 'This is a test comment'
      };

      return request(app)
        .post('/api/articles/9999999999/comments') 
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Article not found');
        });
    });

    test('POST 404: responds with an error when the username does not exist', () => {
      const newComment = {
        username: 'non_existent_user',
        body: 'This is a test comment'
      };

      return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('User not found');
        });
    });
  });
}); 