const paymentService = require("../services/paymentService");
const errorMessages = require("../../../../constants/errors");
const endpointSecret = "whsec_...";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentTransaction = async (req, res) => {
  try {
    const newPayment = await paymentService.createPaymentTransactionForAnUser(req.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Subsctiption",
            },
            unit_amount: 20 * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/profile",
      cancel_url: "http://localhost:3000/profile",
    });
    res.status(201).json({ message: "Stripe response is", id: session.id });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.stripeResponse = async (req, res) => {
  try {
    const updatedPayment = await paymentService.updateTransactionForAnUser(req.body);
    res.status(201).json({ message: "Stripe response was", updatedPayment });
  } catch (error) {
    console.log("Error from stripe:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
