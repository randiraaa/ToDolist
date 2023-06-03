const express = require("express");
const auth = require("../controllers/controller-users");
const verifyUser = require("./verify");
const router = express.Router();

// Authorization
router.delete("/delete/:id", verifyUser("admin"), auth.deleteUser);

module.exports = router;
