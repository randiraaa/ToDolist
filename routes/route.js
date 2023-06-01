"use strict";

module.exports = (app) => {
  const jsonData = require("../controllers/controller-res");
  const jsonDataTodos = require("../controllers/controller-todos");

  app.route("/").get(jsonData.index);
  app.route("/todos").get(jsonDataTodos.allTodos);
  app.route("/todos/:id").get(jsonDataTodos.todosId);
  app.route("/todos/add").post(jsonDataTodos.addTodos);
  app.route("/todos/update/:id").put(jsonDataTodos.updateTodos);
};
