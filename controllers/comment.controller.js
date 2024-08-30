const { removeCommentById } = require('../models/comments.model');

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).send({ msg: 'Comment not found' });
      }
      res.status(204).send(); 
    })
    .catch((err) => {
      if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid comment ID format' });
      } else {
        next(err);
      }
    });
};
