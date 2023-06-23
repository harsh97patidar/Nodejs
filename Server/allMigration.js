const dbMigrate = require("db-migrate");

function runMigration() {
  const dbConfig = {
    dev: {
      driver: "pg",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      ssl: true,
    },
  };

  const db = dbMigrate.getInstance(true, { config: dbConfig });
  return db.up();
}

module.exports = runMigration;
