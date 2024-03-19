const Transaction = require("../../database/models/TransactionModel");

const createTransaction = async (transactionData) => {
  try {
    const transaction = await Transaction.create(transactionData);
    return transaction;
  } catch (error) {
    console.log("Transaction service", error);
    throw new Error("Error creating transaction");
  }
};

const getAllTransactions = async () => {
  try {
    const transactions = await Transaction.findAll();
    return transactions;
  } catch (error) {
    console.log("Transaction service", error);
    throw new Error("Error fetching all transactions");
  }
};

const getTransactionById = async (transactionId) => {
  try {
    const transaction = await Transaction.findByPk(transactionId);
    return transaction;
  } catch (error) {
    console.log("Transaction service", error);
    throw new Error("Error fetching transaction");
  }
};

const updateTransactionById = async (transactionId, transactionData) => {
  try {
    const transaction = await Transaction.findByPk(transactionId);
    await transaction.update(transactionData);
    return transaction;
  } catch (error) {
    console.log("Transaction service", error);
    throw new Error("Error updating transaction");
  }
};

const deleteTransactionById = async (transactionId) => {
  try {
    const transaction = await Transaction.findByPk(transactionId);
    await transaction.destroy();
  } catch (error) {
    console.log("Transaction service", error);
    throw new Error("Error deleting transaction");
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
