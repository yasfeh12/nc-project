const db = require('../db/connection');

exports.fetchTopics = () => {
  return db.query('SELECT * FROM topics;')
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error('Error in fetchTopics:', err);
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then((result) => {
      return result.rows[0];
    });
  };