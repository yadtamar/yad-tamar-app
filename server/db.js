const Pool = require("pg").Pool;
const fs = require("fs");
const pool = new Pool({
  user: "doadmin",
  password: "aq8l6kg0m5luaitk",
  host: "db-postgresql-fra1-55064-do-user-9520949-0.b.db.ondigitalocean.com",
  port: "25060",
  database: "danv4",
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('ca-certificate.crt').toString(),
    // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
  },
});

module.exports = pool;
