const client = require("../database");
const jwtDecode = require("jwt-decode");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { getUserByEmail } = require("../utils/common");

exports.getComments = catchAsyncErrors(async (req, res, next) => {
  const { id: postId } = req.params;

  if (!postId) {
    return next(new ErrorHandler("No Post found with ths ID", 404));
  }

  const sqlQuery = `SELECT * FROM comment WHERE "postId" = ${postId}`;

  const results = await client.query(sqlQuery);

  res.status(200).json({
    success: true,
    data: {
      comments: results.rows,
    },
  });
});

exports.createComment = catchAsyncErrors(async (req, res, next) => {
  const { message, parentId } = req.body;

  const token = req.headers.authorization.split(" ")[1];

  const userInfo = jwtDecode(token);

  const userEmail = userInfo?.email;

  const { id: postId } = req.params;

  let sqlQuery;

  if (message === "") {
    return next(new ErrorHandler("invalid message", 404));
  }

  const user = await getUserByEmail(userEmail);

  if (!user.length) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const userId = user[0].id;

  if (parentId)
    sqlQuery = `Insert INTO comment (message, "userId", "parentId", "postId", "updatedAt") VALUES ('${message}','${userId}','${parentId}','${postId}', NOW())`;
  else
    sqlQuery = `Insert INTO comment (message, "userId", "postId", "updatedAt") VALUES ('${message}','${userId}','${postId}', NOW())`;

  await client.query(sqlQuery);

  res.status(201).json({ comment: req.body });
});

exports.updatedComment = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  const { commentId } = req.params;

  if (!commentId) {
    return next(new ErrorHandler("No Comment found with ths ID", 404));
  }

  const sqlQuery = `UPDATE comment SET message='${message}' WHERE id='${commentId}'`;

  await client.query(sqlQuery);
  res.status(201).json({ comment: req.body });
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  const { commentId } = req.params;

  const sqlQuery = `DELETE FROM comment WHERE id='${commentId}'`;

  if (!commentId) {
    return next(new ErrorHandler("No Comment found with ths ID", 404));
  }

  const results = await client.query(sqlQuery);
  res.status(201).json({ message: "Deleted" });
});

exports.toggleLike = catchAsyncErrors(async (req, res, next) => {
  const { commentId } = req.params;

  if (!commentId) {
    return next(new ErrorHandler("No Comment found with ths ID", 404));
  }

  const sqlQueryForFindLike = `SELECT * FROM "like" WHERE "userId" = 1 and "commentId" = ${commentId}`;

  const findRow = await client.query(sqlQueryForFindLike);

  let sqlQuery;

  if (findRow && findRow.rowCount > 0) {
    sqlQuery = `Insert INTO "like" ( "userId", "commentId") VALUES ('${1}','${commentId}')`;
  } else {
    sqlQuery = `DELETE FROM "like" WHERE "userId" = 1 and "commentId" = ${commentId}`;
  }

  await client.query(sqlQuery);
  res.sendStatus(201);
});
