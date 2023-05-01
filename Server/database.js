const dotenv = require("dotenv");
dotenv.config();

const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  post: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect(function (err) {
  if (err) {
    console.log("Fail to connect with database", err);
  } else {
    console.log("Connected with database");
  }
});

module.exports = client;
