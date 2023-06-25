const client = require("../database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const axios = require("axios");
const ErrorHandler = require("../utils/errorHandler");

exports.getPosts = catchAsyncErrors(async (req, res, next) => {
  const results = await client.query(`SELECT p.*, i.filename
  FROM post p
  LEFT JOIN image i ON p.id = i."postId"
`);

  res.status(200).json({
    success: true,
    data: results.rows,
  });
});

exports.getPostById = catchAsyncErrors(async (req, res, next) => {
  const { id: postId } = req?.params;

  const post = await client.query(`SELECT * FROM post WHERE id = ${postId}`);

  if (!post.rowCount) {
    return next(new ErrorHandler("No Post found with ths ID", 404));
  }

  const comments = await client.query(`SELECT c.*, u.email, u.name
  FROM comment c
  JOIN "user" u ON c."userId" = u.id
  WHERE c."postId" = ${postId}
  ORDER BY "createdAt" DESC`);

  const images = await client.query(
    `SELECT * FROM image WHERE "postId" = ${postId}`
  );

  // format the response object
  const response = {
    ...post.rows[0],
    comments: comments.rows,
    images: images.rows,
  };

  res.status(200).json(response);
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const { title, body } = req.body;

  if (!title.length) {
    return next(new ErrorHandler("title is empty", 404));
  }

  if (!body.length) {
    return next(new ErrorHandler("body is empty", 404));
  }

  const sqlQuery = `INSERT INTO post (title, body) VALUES ('${title}', '${body}') RETURNING id`;
  let result = undefined;

  result = await client.query(sqlQuery);

  let response = { ...req.body };

  if (req.file && result && result.rows[0]) {
    await axios.post("http://localhost:8000/v1/image", {
      file: req.file,
      postId: result.rows[0].id,
    });
    response = { ...req.body, image: req.file.filename };

    return res.status(200).json(response);
  }

  return res.status(200).json(response);
});
