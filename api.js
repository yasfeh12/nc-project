const express = require('express');
const router = express.Router();
const { getTopics } = require('./controllers/topics.controller');

router.get('/topics', getTopics);

