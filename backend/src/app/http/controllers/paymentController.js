const paymentService = require("../services/paymentService");
const errorMessages = require("../../../../constants/errors");
const endpointSecret = "whsec_...";
const stripe = require("stripe")(
  "sk_test_51Nf42AG90N0Ggzzzsi4c6P83E5nh6xyr3TFAa8KsQ0XlP2HeaUqU0ehVGTFFgGZE2H0POJwY7KPqX8ESSaU4UC1x004sVMTrA2"
);

exports.createPaymentTransaction = async (req, res) => {
  try {
    let event = req.body;

    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      } catch (err) {
        return response.sendStatus(400);
      }
    }
    switch (event.type) {
      case "payment_intent.created":
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        const payment = await paymentService.createPaymentTransactionForAnUser(req.body);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};

exports.stripeResponse = async (req, res) => {
  try {
    let event = req.body;
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      } catch (err) {
        return response.sendStatus(400);
      }
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const payment = await paymentService.updateTransactionForAnUser(req.body);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
    res.status(201).json({ message: "Stripe response was", payment });
  } catch (error) {
    console.log("Error from stripe:", error);
    res.status(400).json({ message: errorMessages.unsuccessfull });
  }
};
