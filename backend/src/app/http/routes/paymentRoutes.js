const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const { celebrate, Segments } = require("celebrate");
const paymentValidator = require("../validations/paymentValidator");
const bodyParser = require("body-parser");
const { authenticateToken } = require("../middlewares/authenticate");

router.post("/", authenticateToken, PaymentController.createPaymentTransaction);
router.post("/webhook-onetime-payment", PaymentController.stripeResponse);

module.exports = router;
