const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./config/db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { authenticateToken } = require("./middlewares/authenticate");
const userRoutes = require("./routes/userRoutes");

const User = require("./models/UserModel");

const port = process.env.SERVER_PORT;

const storedItems = new Map([
  [1, { priceCents: 1000, name: "Lea" }],
  [2, { priceCents: 2000, name: "Miro" }],
]);

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
