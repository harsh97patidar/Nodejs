const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
const runMigration = require("./allMigration");
const authenticateToken = require("./authenticate");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Routes
const post = require("./routes/post");
const comment = require("./routes/comment");
const imageRoutes = require("./routes/image");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authenticateToken);

// Log API calls using Morgan
app.use(morgan("combined"));

dotenv.config();

app.use(cors());

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hi");
});

// Post Routes
app.use("/v1", post);

// Commets Routes
app.use("/v1", comment);

// Import Routes
app.use("/v1", imageRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
  // await runMigration();
});
