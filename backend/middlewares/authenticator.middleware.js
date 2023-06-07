const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticator = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ msg: "Unauthorized" });
      }
      req.userid = decoded.userid;
      next();
    });
  } catch (error) {
    res.json({ msg: "Server Error", Error: error.message });
  }
};

module.exports = { authenticator };
