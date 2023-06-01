"use strict";

const response = require("../routes/res");
const connection = require("../config/db");

// Menampilkan TODOS
exports.allTodos = async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM todolist", (error, rows, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
    response.ok(rows, res);
  } catch (error) {
    console.log(error);
    response.error("Error Get All Todos!", res);
  }
};
