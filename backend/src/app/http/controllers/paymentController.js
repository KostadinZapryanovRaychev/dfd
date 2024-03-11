const paymentService = require("../services/paymentService");
const errorMessages = require("../../../../constants/errors");

exports.createPaymentTransaction = async (req, res) => {
  try {
    const role = await paymentService.createPaymentTransactionForAnUser(req.body);
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.log("Error creating role:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
