const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./config/db");
const { authenticateToken } = require("./middlewares/authenticate");
const userRoutes = require("./routes/userRoutes");
const competitionRoutes = require("./routes/competitionRoutes");
const roleRoutes = require("./routes/roleRoutes");

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
  res.json({ message: "This is a protected route", user: req.user });
});
app.use("/api/competitions", competitionRoutes);
app.use("/api/roles", roleRoutes);

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
