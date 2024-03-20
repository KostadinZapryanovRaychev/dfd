const Transaction = require("../../database/models/TransactionModel");

const createPaymentTransactionForAnUser = async (paymentObj) => {
  try {
    const payment = await Transaction.create(paymentObj);
    return payment;
  } catch (error) {
    console.log("Error creating payment transaction", error);
    throw new Error("Error creating payment transaction");
  }
};

const updateTransactionForAnUser = async (transactionId, transactionData) => {
  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    await transaction.update(transactionData);
    return transaction;
  } catch (error) {
    console.log("Error updating payment transaction", error);
    throw new Error("Error updating payment transaction");
  }
};

module.exports = {
  createPaymentTransactionForAnUser,
  updateTransactionForAnUser,
};
