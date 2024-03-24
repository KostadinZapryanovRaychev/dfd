const subscriptionService = require("../services/subscriptionService");
const errorMessages = require("../../../../constants/errors");

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    console.log("Error creating subscription:", error);
    res.status(400).json({ message: errorMessages.unsuccessful });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json({ subscriptions });
  } catch (error) {
    console.log("Error fetching all subscriptions:", error);
    res.status(400).json({ message: errorMessages.unsuccessful });
  }
};

exports.getSubscriptionById = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await subscriptionService.getSubscriptionById(subscriptionId);
    res.status(200).json({ subscription });
  } catch (error) {
    console.log("Error fetching subscription:", error);
    res.status(400).json({ message: errorMessages.unsuccessful });
  }
};

exports.updateSubscriptionById = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await subscriptionService.updateSubscriptionById(subscriptionId, req.body);
    res.status(200).json({ message: "Subscription updated successfully", subscription });
  } catch (error) {
    console.log("Error updating subscription:", error);
    res.status(400).json({ message: errorMessages.unsuccessful });
  }
};

exports.deleteSubscriptionById = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    await subscriptionService.deleteSubscriptionById(subscriptionId);
    res.status(204);
  } catch (error) {
    console.log("Error deleting subscription:", error);
    res.status(400).json({ message: errorMessages.unsuccessful });
  }
};
