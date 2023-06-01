const mysql = require("mysql2");

// Connection to DATABASE
const conn = mysql2.createConnection({
  host: "db4free.net",
  user: "randira",
  password: "123randi4",
  database: "dbtpatodolist",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = conn;
