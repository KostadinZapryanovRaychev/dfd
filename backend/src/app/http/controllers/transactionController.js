const transactionService = require("../services/transactionService");
const errorMessages = require("../../../../constants/errors");

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({ transactions });
  } catch (error) {
    console.log("Error fetching all transactions:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.getTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await transactionService.getTransactionById(transactionId);
    res.status(200).json({ transaction });
  } catch (error) {
    console.log("Error fetching transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.updateTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await transactionService.updateTransactionById(transactionId, req.body);
    res.status(200).json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    console.log("Error updating transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.deleteTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    await transactionService.deleteTransactionById(transactionId);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
