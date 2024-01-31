const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// ...

const secretKey = process.env.SECRET_KEY || "KAMEN";

const authenticateToken = (req, res, next) => {
  //next();
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
