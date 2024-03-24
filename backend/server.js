const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./config/db");
const { authenticateToken } = require("./src/app/http/middlewares/authenticate");
const userRoutes = require("./src/app/http/routes/userRoutes");
const competitionRoutes = require("./src/app/http/routes/competitionRoutes");
const roleRoutes = require("./src/app/http/routes/roleRoutes");
const applicationRoutes = require("./src/app/http/routes/applicationRoutes");
const paymentRoutes = require("./src/app/http/routes/paymentRoutes");
const subscriptionRoutes = require("./src/app/http/routes/subscriptionRoutes");

const port = process.env.SERVER_PORT;

const app = express();
app.use("/public", express.static("public"));
app.use("/profilepictures", express.static("profilepictures"));
app.use("/solutions", express.static("solutions"));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
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

app.use("/api/payments", paymentRoutes);

app.use(authenticateToken);

app.use("/api/applications", applicationRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/roles", roleRoutes);

app.get("/api/protected", (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
