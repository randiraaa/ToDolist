const jwt = require("jsonwebtoken");
const tokenSecret = require("../config/secret");
const connection = require("../config/db");

function verifyUser(roles) {
  return async (req, res, next) => {
    let tokenWithBearer = req.headers.authorization;

    if (tokenWithBearer) {
      let token = tokenWithBearer.split(" ")[1];
      jwt.verify(token, tokenSecret.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({ auth: false, message: "Unregistered tokens!" });
        } else {
          const userId = decoded.id;

          try {
            const query = "SELECT roles FROM users WHERE id = ?";
            const [rows] = await connection.query(query, [userId]);

            if (rows.length > 0) {
              const userRole = rows[0].roles;

              if (userRole === roles) {
                req.auth = decoded;
                next();
              } else {
                return res.status(401).send({ auth: false, message: "You don't have permission to access this page (invalid token)!" });
              }
            } else {
              return res.status(401).send({ auth: false, message: "User role not found!" });
            }
          } catch (error) {
            console.log(error);
            return res.status(500).send({ auth: false, message: "Internal server error!" });
          }
        }
      });
    } else {
      return res.status(401).send({ auth: false, message: "No tokens!" });
    }
  };
}

module.exports = verifyUser;
