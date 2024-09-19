const {
  removeCommentById,
  updateCommentById,
} = require("../models/comments.model");
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).send({ msg: "Comment not found" });
      }
      res.status(204).send();
    })
    .catch((err) => {
      if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid comment ID format" });
      } else {
        next(err);
      }
    });
};

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number") {
    return res
      .status(400)
      .send({ msg: "Bad request: Missing or invalid field(s)" });
  }

  updateCommentById(comment_id, inc_votes)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch((err) => {
      if (err.code === "22P02" || err.code === "22003") {
        res.status(400).send({ msg: "Invalid comment ID" });
      } else if (err.status === 404) {
        res.status(404).send({ msg: "Comment not found" });
      } else {
        next(err);
      }
    });
};
