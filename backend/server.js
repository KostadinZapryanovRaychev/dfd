const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const { authenticateToken } = require("./middlewares/authenticate");
dotenv.config();
const userRoutes = require("./routes/userRoutes");

const User = require("./models/UserModel");

const port = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
db.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

app.use("/api", userRoutes);

app.use(authenticateToken);

app.get("/api/protected", (req, res) => {
  // You can access the authenticated user's data in req.user
  res.json({ message: "This is a protected route", user: req.user });
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
