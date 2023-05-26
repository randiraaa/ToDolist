const Users = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, phone, email, password } = req.body;
      const saltRounds = await bcrypt.genSalt(10);
      const hasPassword = await bcrypt.hash(password, saltRounds);

      const newDataRegister = {
        username,
        phone,
        email,
        password: hasPassword,
      };

      const users = await Users.create(newDataRegister);
      console.log(users);
      res.status(201).json({
        message: "Register success",
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const users = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!users) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const hasPassword = await bcrypt.compare(req.body.password, users.password);

      if (!hasPassword) {
        return res.status(401).json({
          accessToken: null,
          message: "Password is incorrect",
        });
      }

      const token = jwt.sign(
        {
          id: users.id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "3600s",
        }
      );

      res.status(200).json({
        users: {
          id: users.id,
          email: users.email,
        },
        message: "Login Successfully",
        accessToken: token,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    }
  },
};
