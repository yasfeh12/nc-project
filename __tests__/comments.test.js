const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('DELETE /api/comments/:comment_id', () => {
  test('204: deletes the comment by comment_id and responds with no content', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204);
  });

  test('404: responds with error if comment_id does not exist', () => {
    return request(app)
      .delete('/api/comments/999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Comment not found');
      });
  });

  test('400: responds with error for invalid comment_id format', () => {
    return request(app)
      .delete('/api/comments/not-a-valid-id')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid comment ID format');
      });
  });
});
