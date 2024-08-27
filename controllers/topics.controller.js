const { fetchTopics, fetchArticleById } = require('../models/model');
const fs = require('fs');
const path = require('path'); 

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      console.log('Fetched topics:', topics);
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.error('Error in getTopics:', err); 
      next(err); 
    });
};

exports.getAllEndpoints = (req, res, next) => {
  const endpointsPath = path.join(__dirname, '../endpoints.json');
  fs.readFile(endpointsPath, 'utf8', (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({ msg: 'Article not found' });
      }
      res.status(200).send({ article });
    })
    .catch((err) => {
      if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid article ID' });
      } else {
        next(err);
      }
    });
};