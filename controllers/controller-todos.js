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
    response.error("Error Get All TODOS!", res);
  }
};

// Menampilkan TODOS berdasarkan id
exports.todosId = async (req, res) => {
  try {
    let id = req.params.id;
    const query = "SELECT * FROM todolist WHERE id = ?";
    const rows = await new Promise((resolve, reject) => {
      connection.query(query, [id], (error, rows, fields) => {
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
    response.error("Failed to select TODOS!", res);
  }
};

// Menambahkan TODOS
exports.addTodos = async (req, res) => {
  try {
    let description = req.body.description;
    const query = "INSERT INTO todolist (description) VALUES (?)";
    const rows = await new Promise((resolve, reject) => {
      connection.query(query, [description], (error, rows, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
    response.ok("Add TODOS success!", res);
  } catch (error) {
    console.log(error);
    response.error("Failed to add TODOS!", res);
  }
};
