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

exports.fetchAllArticles = ({ sort_by = 'created_at', order = 'desc' }) => {
  const validSortBy = ['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'article_img_url'];
  const validOrder = ['asc', 'desc'];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort_by column' });
  }

  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid order query' });
  }

  // Use parameterized queries to avoid SQL injection risks
  const queryStr = `SELECT * FROM articles ORDER BY ${sort_by} ${order};`;
  return db.query(queryStr)
    .then((result) => {
      return result.rows;
    });
};
