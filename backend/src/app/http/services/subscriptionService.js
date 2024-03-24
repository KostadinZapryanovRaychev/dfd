const Subscription = require("../../database/models/SubscriptionModel");

const createSubscription = async (subscriptionData) => {
  try {
    const subscription = await Subscription.create(subscriptionData);
    return subscription;
  } catch (error) {
    console.log("Subscription service", error);
    throw new Error("Error creating subscription");
  }
};

const getAllSubscriptions = async () => {
  try {
    const subscriptions = await Subscription.findAll();
    return subscriptions;
  } catch (error) {
    console.log("Subscription service", error);
    throw new Error("Error fetching all subscriptions");
  }
};

const getSubscriptionById = async (subscriptionId) => {
  try {
    const subscription = await Subscription.findByPk(subscriptionId);
    return subscription;
  } catch (error) {
    console.log("Subscription service", error);
    throw new Error("Error fetching subscription");
  }
};

const updateSubscriptionById = async (subscriptionId, subscriptionData) => {
  try {
    const subscription = await Subscription.findByPk(subscriptionId);
    await subscription.update(subscriptionData);
    return subscription;
  } catch (error) {
    console.log("Subscription service", error);
    throw new Error("Error updating subscription");
  }
};

const deleteSubscriptionById = async (subscriptionId) => {
  try {
    const subscription = await Subscription.findByPk(subscriptionId);
    await subscription.destroy();
  } catch (error) {
    console.log("Subscription service", error);
    throw new Error("Error deleting subscription");
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscriptionById,
  deleteSubscriptionById,
};
