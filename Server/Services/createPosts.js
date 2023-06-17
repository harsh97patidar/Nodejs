const dotenv = require("dotenv");
const { Client } = require("pg");
dotenv.config();

// const client = require("../database");

const topics = [
  "Technology",
  "Sports",
  "Science",
  "Art",
  "Music",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Business",
  // Add more topics as needed
];

const getRandomTopic = () => {
  return topics[Math.floor(Math.random() * topics.length)];
};

const generateObjects = () => {
  const objects = [];

  for (let i = 0; i < 5; i++) {
    const title = getRandomTopic();
    const body =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum massa id orci scelerisque, vel aliquam ex consequat. Integer semper consectetur dui in convallis. Aenean eget mauris vitae elit pharetra iaculis.";
    const file = undefined;

    objects.push({ title, body, file });
  }

  return objects;
};

// Function to insert entries into the database
async function insertEntries() {
  const client = new Client({
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
  });

  const arrayOfObjects = generateObjects(); // Assuming you already have the array of objects

  // const insertQuery = "INSERT INTO post (title, body, file) VALUES (?, ?, ?)";

  const title = "126dsdsd";
  const body = "3455";

  const insertQuery = `INSERT INTO post (title, body) VALUES ('${title}', '${body}')`;

  try {
    console.log("Res before", insertQuery);
    const res = await client.query(insertQuery);
  } catch (err) {
    console.log("err", err);
  }

  console.log("Res", res);

  arrayOfObjects.forEach(async (obj) => {
    const { title, body, file } = obj;
    const values = [title, body, file];

    const insertQuery = `INSERT INTO post (title, body) VALUES ('${title}', '${body}')`;

    // await client.query(insertQuery);

    // await client.query(insertQuery, values, (err, result) => {
    //   if (err) {
    //     console.error("Error inserting entry:", err);
    //   } else {
    //     console.log("Entry inserted successfully.");
    //   }
    // });
  });

  // Close the database connection
  // client.end((err) => {
  //   if (err) {
  //     console.error("Error closing database connection:", err);
  //   } else {
  //     console.log("Database connection closed.");
  //   }
  // });
}

insertEntries();
