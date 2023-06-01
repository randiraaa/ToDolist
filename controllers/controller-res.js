"use strict";

const response = require("../routes/res");
const connection = require("../config/db");

exports.index = async (req, res) => {
  try {
    response.ok("Application is Running!", res);
  } catch (error) {
    console.log(error);
    response.error("Internal Server Error", res);
  }
};
