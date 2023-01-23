// mysql connection script

const mysql = require("mysql2");

const pool = mysql.createPool({
  port: "3301",
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "yejiahao1234",
});

module.exports = pool.promise();
