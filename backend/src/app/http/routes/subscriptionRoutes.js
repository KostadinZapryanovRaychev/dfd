const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controllers/subscriptionController");
const subscriptionValidator = require("../validations/subscriptionValidator");
const { adminAuthorizationMiddleware } = require("../middlewares/adminAuthorization");
const { celebrate, Segments } = require("celebrate");

router.post("/", adminAuthorizationMiddleware, SubscriptionController.createSubscription);
router.get("/", adminAuthorizationMiddleware, SubscriptionController.getAllSubscriptions);
router.get("/:subscriptionId", adminAuthorizationMiddleware, SubscriptionController.getSubscriptionById);
router.patch("/:subscriptionId", adminAuthorizationMiddleware, SubscriptionController.updateSubscriptionById);
router.delete("/:subscriptionId", adminAuthorizationMiddleware, SubscriptionController.deleteSubscriptionById);

module.exports = router;
