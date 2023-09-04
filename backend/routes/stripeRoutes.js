const express = require("express");
const router = express.Router();
const StripeController = require("../controllers/stripeController");

router.post("/create-checkout-session", StripeController.createCheckoutSession);
router.post("/create-portal-session", StripeController.createPortalSession);
router.post("/webhook", StripeController.handleWebhookEvent);

module.exports = router;
