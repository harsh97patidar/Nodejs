const client = require("../database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createUser = catchAsyncErrors(async (payload) => {
  const results = await client.query(
    'INSERT INTO "user" (name, email) VALUES($1, $2)',
    [payload.name, payload.email]
  );

  return results;
});
