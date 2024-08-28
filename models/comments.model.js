const db = require('../db/connection');

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return db
          .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
          .then((articleCheck) => {
            if (articleCheck.rows.length === 0) {
              return Promise.reject({ status: 404, msg: 'Article not found' });
            }
            return [];
          });
      }
      return result.rows;
    });
};
