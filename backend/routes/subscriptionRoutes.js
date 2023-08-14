const express = require("express");
const router = express.Router();
const SubscribeController = require("../controllers/subscribeController");

router.get("/subscribe", SubscribeController.subscribe);
router.post("/subscribe", SubscribeController.pay);
router.post("/success", SubscribeController.success);
router.post("/failure", SubscribeController.failure);
