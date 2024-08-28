const express = require('express');
const router = express.Router();
const { getTopics, getAllEndpoints, getArticleById, getCommentsByArticleId  } = require('./controllers/topics.controller');

router.get('/topics', getTopics);
router.get('/', getAllEndpoints);
router.get('/articles/:article_id', getArticleById);
router.get('/articles/:article_id/comments', getCommentsByArticleId);

module.exports = router;

