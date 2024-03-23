const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const { celebrate, Segments } = require("celebrate");
const paymentValidator = require("../validations/paymentValidator");
const bodyParser = require("body-parser");

router.post("/", PaymentController.createPaymentTransaction);
router.post("/webhook-onetime-payment", PaymentController.stripeResponse);

module.exports = router;
