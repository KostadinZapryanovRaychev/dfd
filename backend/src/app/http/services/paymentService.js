const Transaction = require("../../database/models/TransactionModel");

const createPaymentTransactionForAnUser = async (roleData) => {
  try {
    const payment = await Transaction.create(roleData);
    return payment;
  } catch (error) {
    console.log("Error creating payment transaction", error);
    throw new Error("Error creating payment transaction");
  }
};

module.exports = {
  createPaymentTransactionForAnUser,
};
