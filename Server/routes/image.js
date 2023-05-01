const express = require("express");
const { uploadImage, getImage } = require("../controller/imageController");
const router = express.Router();

const multer = require("multer");

// Create multer object
const imageUpload = multer({
  dest: "images",
});

router.route("/image").post(imageUpload.single("file"), uploadImage);

router.route("/image/:filename").get(getImage);

module.exports = router;
