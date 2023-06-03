const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const response = require("../routes/res");
const tokenSecret = require("../config/secret");
const ip = require("ip");

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
      res.json({ success: true, message: "Register success!" });
    } else {
      response.ok("Email already exists!", res);
    }
  } catch (error) {
    console.log(error);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const post = {
      email: req.body.email,
      password: req.body.password,
    };

    let query = "SELECT * FROM ?? WHERE email = ?";
    let table = ["users", post.email];
    query = mysql.format(query, table);

    const rows = await new Promise((resolve, reject) => {
      connection.query(query, async (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });

    if (rows.length == 1) {
      const passwordMatch = await bcrypt.compare(post.password, rows[0].password);

      if (passwordMatch) {
        const userId = rows[0].id;

        let query = "SELECT * FROM ?? WHERE id = ?";
        let table = ["tokenauth", userId];
        query = mysql.format(query, table);

        const existingTokens = await new Promise((resolve, reject) => {
          connection.query(query, (error, rows) => {
            if (error) {
              reject(error);
            } else {
              resolve(rows);
            }
          });
        });

        if (existingTokens.length > 0) {
          // Verifikasi token menghapus yang ada & mengganti baru
          let deleteQuery = "DELETE FROM ?? WHERE id = ?";
          let deleteTable = ["tokenauth", userId];
          deleteQuery = mysql.format(deleteQuery, deleteTable);

          await new Promise((resolve, reject) => {
            connection.query(deleteQuery, (error, rows) => {
              if (error) {
                reject(error);
              } else {
                resolve(rows);
              }
            });
          });
        }

        let token = jwt.sign({ id: rows[0].id }, tokenSecret.secret, {
          expiresIn: 1440,
        });
        const id = rows[0].id;

        let data = {
          id: id,
          access_token: token,
          ip_address: ip.address(),
        };

        let insertTokenQuery = "INSERT INTO ?? SET ?";
        let insertTokenTable = ["tokenauth"];
        insertTokenQuery = mysql.format(insertTokenQuery, insertTokenTable);

        await new Promise((resolve, reject) => {
          connection.query(insertTokenQuery, data, (error, rows) => {
            if (error) {
              reject(error);
            } else {
              resolve(rows);
            }
          });
        });

        res.json({
          success: true,
          message: "Token generated successfully!",
          token: token,
          currUser: data.id,
        });
      } else {
        res.json({
          error: true,
          message: "Incorrect email or password!",
        });
      }
    } else {
      res.json({
        error: true,
        message: "Incorrect email or password!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
