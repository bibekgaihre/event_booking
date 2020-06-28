const jwt = require("jsonwebtoken");
const config = require("config");

const secureAPI = () => {
  return function (req, res, next) {
    try {
      console.log(req.headers.authorization);
      const tok = req.headers.authorization.split(" ")[1];
      console.log(tok);
      const decoded = jwt.verify(tok, config.get("app.secret"));
      req.userData = decoded;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Auth Failed. Must send valid token" });
    }
  };
};

module.exports = secureAPI;
