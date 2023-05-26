const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/verifyToken");

const todo = require("./todo.route");
const users = require("./user.route");

router.use("/todos", authenticateToken, todo);
router.use("/users", users);

module.exports = router;
