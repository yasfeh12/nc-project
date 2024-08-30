const db = require('../db/connection');
exports.fetchCommentsByArticleId = (article_id) => {
  const commentQuery = db.query(
    'SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC',
    [article_id]
  );
  const articleCheckQuery = db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]);

  return Promise.all([commentQuery, articleCheckQuery])
    .then(([commentResult, articleCheckResult]) => {
 
      if (articleCheckResult.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }

      return commentResult.rows;
    });
};
exports.removeCommentById = (comment_id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    .then((result) => {
      return result.rowCount > 0;
    });
};