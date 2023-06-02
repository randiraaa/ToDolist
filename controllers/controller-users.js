const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const response = require("../routes/res");
const tokenSecret = require("../config/secret");

// Register
exports.register = async (req, res) => {
  try {
    const post = {
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      roles: req.body.roles,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ["users", "email", post.email];
    query = mysql.format(query, table);

    const rows = await new Promise((resolve, reject) => {
      connection.query(query, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });

    if (rows.length == 0) {
      let query = "INSERT INTO ?? SET ?";
      let table = ["users"];
      query = mysql.format(query, table);

      await new Promise((resolve, reject) => {
        connection.query(query, post, (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });
      response.ok("Register success!", res);
    } else {
      response.ok("Email already exists!", res);
    }
  } catch (error) {
    console.log(error);
  }
};
