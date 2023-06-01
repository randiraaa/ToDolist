"use strict";

module.exports = (app) => {
  const jsonData = require("../controllers/controller-res");

  app.route("/").get(jsonData.index);
};
