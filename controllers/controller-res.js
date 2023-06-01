"use strict";

const response = require("../routes/res");
const connection = require("../config/db");

exports.index = (req, res) => {
  response.ok("Application is Running!", res);
};
