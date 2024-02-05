const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// ...

const secretKey = process.env.SECRET_KEY || "KAMEN";

const adminAuthorizationMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    if (!user.isAdmin) {
      return res.status(403).json({ message: "You do not have permission to access this resource" });
    }
    next();
  });
};

module.exports = { adminAuthorizationMiddleware };
