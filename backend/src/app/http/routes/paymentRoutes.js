const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const { celebrate, Segments } = require("celebrate");
const paymentValidator = require("../validations/paymentValidator");

router.post("/", PaymentController.createPaymentTransaction);

module.exports = router;
