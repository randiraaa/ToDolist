const jwt = require("jsonwebtoken");
const tokenSecret = require("../config/secret");

function verifyUser(roles) {
  return (req, res, next) => {
    let tokenWithBearer = req.headers.authorization;

    if (tokenWithBearer) {
      let token = tokenWithBearer.split(" ")[1];
      jwt.verify(token, tokenSecret.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ auth: false, message: "Tokens are not listed!" });
        } else {
          if (roles === "admin" && decoded.roles === "admin") {
            req.auth = decoded;
            next();
          } else {
            return res.status(401).send({ auth: false, message: "You are not granted permission! Please contact admin for help center!" });
          }
        }
      });
    } else {
      return res.status(401).send({ auth: false, message: "No tokens!" });
    }
  };
}

module.exports = verifyUser;
