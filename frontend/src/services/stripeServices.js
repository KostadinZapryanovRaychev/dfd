//TO DO to add the needed STRIPE_API_BASE_URLF

import { postFetch } from "../lib/fetch";

const STRIPE_API_BASE_URL = "https://api.stripe.com/v1";

const stripeHeaders = {
  Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
};

export const createStripeCustomer = async (customerData) => {
  try {
    return await postFetch(`${STRIPE_API_BASE_URL}/customers`, customerData, stripeHeaders);
  } catch (error) {
    throw new Error("Error creating Stripe customer");
  }
};

export const createStripeCharge = async (chargeData) => {
  try {
    return await postFetch(`${STRIPE_API_BASE_URL}/charges`, chargeData, stripeHeaders);
  } catch (error) {
    throw new Error("Error creating Stripe charge");
  }
};
