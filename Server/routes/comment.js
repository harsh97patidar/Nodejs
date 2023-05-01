const express = require("express");
const {
  getComments,
  createComment,
  updatedComment,
  deleteComment,
  toggleLike,
} = require("../controller/commentController");
const { route } = require("./post");

const router = express.Router();

router.route("/posts/:id/comments").get(getComments);
router.route("/posts/:id/comments").post(createComment);
router
  .route("/posts/:id/comments/:commentId")
  .put(updatedComment)
  .delete(deleteComment);

router.route("/posts/:id/comments/:commentId/toggleLike").post(toggleLike);

module.exports = router;
