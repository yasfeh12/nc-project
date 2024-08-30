const db = require('../db/connection');

exports.fetchTopics = () => {
  return db.query('SELECT * FROM topics;')
    .then((result) => {
      return result.rows;
    });
};
exports.fetchArticleById = (article_id) => {
  return db
    .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return result.rows[0];
    });
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body, created_at, votes) 
       VALUES ($1, $2, $3, NOW(), 0) RETURNING *`,
      [article_id, username, body]
    )
    .then((result) => result.rows[0]);
};

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles 
       SET votes = votes + $1 
       WHERE article_id = $2 
       RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return result.rows[0];
    });
  };  

  exports.fetchAllUsers = () => {
    return db.query('SELECT username, name, avatar_url FROM users;')
      .then((result) => result.rows);
  };