const dbMigrate = require("db-migrate");
const dbConfig = require("./database.json");

function runMigration() {
  const db = dbMigrate.getInstance(true, { config: dbConfig });
  return db.up();
}

module.exports = runMigration;
