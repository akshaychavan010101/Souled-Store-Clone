const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticator = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.secretKey, (err, result) => {
      if (result) {
        next();
      } else {
        res.send({ msg: "You are not Logged in", Error: err.message });
      }
    });
  } catch (error) {
    res.send({ msg: "Server Error", Error: error.message });
  }
};

module.exports = { authenticator };
