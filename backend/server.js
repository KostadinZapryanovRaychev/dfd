const express = require("express");
require("dotenv");
const cors = require("cors");
const db = require("./config/db");

const User = require("./models/UserModel");

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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
