const express = require("express");
require("dotenv");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
