import { getFetch, postFetch, patchFetch, deleteFetch } from "../lib/fetch";

const API_BASE_URL = "http://localhost:5000/api";

export const createPayment = async (payment) => {
  try {
    return await postFetch("/payments", payment);
  } catch (error) {
    throw new Error("Error creating payment");
  }
};

export const updatePaymentAfterStripeRes = async (payment) => {
  try {
    return await patchFetch(`/payments/stripe/webhook`, payment);
  } catch (error) {
    throw new Error("Error updating payment");
  }
};

export const getAllPayments = async () => {
  try {
    return await getFetch("/payments");
  } catch (error) {
    throw new Error("Error fetching all payments");
  }
};

export const getPaymentById = async (paymentId) => {
  try {
    return await getFetch(`/payments/${paymentId}`);
  } catch (error) {
    throw new Error("Error fetching payment");
  }
};

export const updatePaymentById = async (paymentId, payment) => {
  try {
    return await patchFetch(`/payments/${paymentId}`, payment);
  } catch (error) {
    throw new Error("Error updating payment");
  }
};
