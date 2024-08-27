const express = require('express');
const router = express.Router();
const { getTopics, getAllEndpoints, getArticleById } = require('./controllers/topics.controller');

router.get('/topics', getTopics);
router.get('/', getAllEndpoints);
router.get('/articles/:article_id', getArticleById);

module.exports = router;

