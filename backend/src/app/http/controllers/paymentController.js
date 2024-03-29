const paymentService = require("../services/paymentService");
const userService = require("../services/userService");
const errorMessages = require("../../../../constants/errors");
const constants = require("../../../../constants/constants");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

exports.createPaymentTransaction = async (req, res) => {
  try {
    const newPayment = await paymentService.createPaymentTransactionForAnUser(req.body);

    const transactionId = newPayment.id.toString();
    const amount = Number(newPayment.amount);
    const description = newPayment.description;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: transactionId,
              description: description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/profile",
      cancel_url: "http://localhost:3000/profile",
    });
    // TODO query param for succes payment
    res.status(201).json({ message: "Stripe response is", id: session.id });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.stripeResponse = async (req, res) => {
  const payload = req.rawBody;
  const sig = req.headers["stripe-signature"];
  let event;
  let updatedTransaction;
  try {
    event = await stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items"],
      });
      const lineItems = sessionWithLineItems.line_items;
      const transactionId = Number(lineItems?.data[0]?.description);

      if (event.data.object.payment_status === "paid") {
        updatedTransaction = await paymentService.updateStatusOfTransactionToCompleted(
          transactionId,
          constants.transactionStatus.completed
        );
        const userId = updatedTransaction.userId;
        const newExpDate = new Date(updatedTransaction.completedAt);
        newExpDate.setFullYear(newExpDate.getFullYear() + 1);
        const subscriptionLevel = updatedTransaction.name;

        await userService.updateUserSubscriptionExpDateAndLevel(userId, newExpDate, subscriptionLevel);
      } else {
        updatedTransaction = await paymentService.updateStatusOfTransactionToCompleted(
          transactionId,
          constants.transactionStatus.failed
        );
      }

      res.json({ received: true });
    }
  } catch (err) {
    console.log(err, "err updating resource");
  }
};
