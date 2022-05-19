const Pool = require("pg").Pool;
const env = require("dotenv").config();
const fs = require("fs");

const password = "aq8l6kg0m5luaitk"//process.env.Password;

const pool = new Pool({
  user: "doadmin",
  password,
  host: "db-postgresql-fra1-55064-do-user-9520949-0.b.db.ondigitalocean.com",
  port: "25060",
  database: "danv4",
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(`${__dirname}/ca-certificate.crt`).toString(),
  },
});

module.exports = pool;
