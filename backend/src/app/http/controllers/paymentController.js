const paymentService = require("../services/paymentService");
const errorMessages = require("../../../../constants/errors");

exports.createPaymentTransaction = async (req, res) => {
  try {
    const payment = await paymentService.createPaymentTransactionForAnUser(req.body);

    // TODO call Stripe endpoint when my transaction is created
    // when stripe reply update my transaction and its status
    // get all this to the FE
    res.status(201).json({ message: "Transaction created successfully", payment });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
