const express = require('express');
const router = express.Router();
const {
  getTopics,
  getAllEndpoints
} = require('./controllers/topics.controller');
const {
  getArticleById,
  getCommentsByArticleId,
  addCommentByArticleId,
  updateArticleVotes
} = require('./controllers/article.controller');

router.get('/topics', getTopics);
router.get('/', getAllEndpoints);
router.get('/articles/:article_id', getArticleById);
router.get('/articles/:article_id/comments', getCommentsByArticleId);
router.post('/articles/:article_id/comments', addCommentByArticleId);
router.patch('/articles/:article_id', updateArticleVotes);

module.exports = router;
