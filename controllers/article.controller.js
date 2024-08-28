const { fetchArticleById } = require('../models/articles.model');
const { fetchCommentsByArticleId } = require('../models/comments.model');

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

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
  
    fetchCommentsByArticleId(article_id)
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch((err) => {
        if (err.code === '22P02') {
          res.status(400).send({ msg: 'Invalid article ID' });
        } else if (err.status === 404) {
          res.status(404).send({ msg: 'Article not found' });
        } else {
          next(err);
        }
      });
  };

