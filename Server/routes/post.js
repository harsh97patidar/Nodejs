const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
} = require("../controller/postController");

const multer = require("multer");
const { toggleLike } = require("../controller/commentController");

// Create multer object
const imageUpload = multer({
  dest: "images",
});

const router = express.Router();

router.route("/posts").get(getPosts);

router.route("/posts/:id").get(getPostById);

router.route("/post").post(imageUpload.single("file"), createPost);

module.exports = router;
