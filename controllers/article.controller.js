const { fetchArticleById, insertCommentByArticleId, updateArticleById } = require('../models/model'); 
const { fetchCommentsByArticleId } = require('../models/comments.model');
const db = require('../db/connection');

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
      } else if (err.code === '22003') { 
        res.status(400).send({ msg: 'Invalid article ID' });
      } else if (err.status === 404) { 
        res.status(404).send({ msg: 'Article not found' });
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
      if (err.code === '22P02' || err.code === '22003') {
        res.status(400).send({ msg: 'Invalid article ID' });
      } else if (err.status === 404) {
        res.status(404).send({ msg: 'Article not found' });
      } else {
        next(err);
      }
    });
};

exports.addCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;


  if (!username || !body) {
    return res.status(400).send({ msg: 'Bad request: Missing required fields' });
  }

 
  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      if (err.code === '23503') { 
       
        if (err.constraint === 'comments_article_id_fkey') {
          res.status(404).send({ msg: 'Article not found' });
        } else if (err.constraint === 'comments_author_fkey') {
          res.status(404).send({ msg: 'User not found' });
        } else {
          next(err);
        }
      } else if (err.code === '22P02') { 
        res.status(400).send({ msg: 'Invalid article ID' });
      } else if (err.code === '22003') {
        res.status(404).send({ msg: 'Article not found' });
      } else {
        next(err);
      }
    });
}; 


exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  if (!inc_votes || typeof inc_votes !== 'number') {
    return res.status(400).send({ msg: 'Bad request: Missing or invalid field(s)' });
  }

  updateArticleById(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      if (err.code === '22P02' || err.code === '22003') {
        res.status(400).send({ msg: 'Invalid article ID' });
      } else if (err.status === 404) {
        res.status(404).send({ msg: 'Article not found' });
      } else {
        next(err);
      }
    });
};