const express = require("express");
const router = express.Router();
const {
  getTopics,
  getAllEndpoints,
} = require("./controllers/topics.controller");
const {
  deleteCommentById,
  updateCommentVotes,
} = require("./controllers/comment.controller");
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  addCommentByArticleId,
  updateArticleVotes,
} = require("./controllers/article.controller");
const { getUsers } = require("./controllers/user.controller");

router.get("/topics", getTopics);
router.get("/", getAllEndpoints);
router.get("/articles", getArticles);
router.get("/articles/:article_id", getArticleById);
router.get("/articles/:article_id/comments", getCommentsByArticleId);
router.post("/articles/:article_id/comments", addCommentByArticleId);
router.patch("/articles/:article_id", updateArticleVotes);
router.delete("/comments/:comment_id", deleteCommentById);
router.get("/users", getUsers);
router.patch("/articles/:article_id/comments/:comment_id", updateCommentVotes);

module.exports = router;
