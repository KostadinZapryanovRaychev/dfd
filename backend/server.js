const express = require("express");
require("dotenv");
const cors = require("cors");
const db = require("./config/db");

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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
