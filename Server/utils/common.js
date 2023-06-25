const client = require("../database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getUserByEmail = async (email) => {
  const result = await client.query('SELECT * from "user" WHERE email=$1', [
    email,
  ]);

  return result?.rows;
};
