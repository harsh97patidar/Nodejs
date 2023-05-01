const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const client = require("../database");

exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
  const { filename, mimetype, size, path } = req.body.file;

  const { postId } = req.body;

  if (!postId) {
    return next(new ErrorHandler("No Post found with ths ID", 404));
  }

  const sqlQuery = `INSERT INTO "image" ("postId","filepath","filename","mimetype","size") VALUES (${postId}, '${path}','${filename}', '${mimetype}', ${size})`;

  await client.query(sqlQuery);

  return res.status(201).json({ success: true, filename });
});

exports.getImage = catchAsyncErrors(async (req, res, next) => {
  const { filename } = req.params;

  const dirname = process.cwd();

  const sqlQuery = `SELECT * from image WHERE filename = '${filename}'`;

  let fullfilepath = "";

  const results = await client.query(sqlQuery);

  const image = results.rows[0];

  fullfilepath = dirname + "/" + image.filepath;

  return res.type(image.mimetype).sendFile(fullfilepath);
});
