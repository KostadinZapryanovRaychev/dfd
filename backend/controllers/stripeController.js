// const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env;
// const stripe = require("stripe")(STRIPE_SECRET_KEY);
// const YOUR_DOMAIN = "http://localhost:3000";

// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const prices = await stripe.prices.list({
//       lookup_keys: [req.body.lookup_key],
//       expand: ["data.product"],
//     });
//     const session = await stripe.checkout.sessions.create({
//       billing_address_collection: "auto",
//       line_items: [
//         {
//           price: prices.data[0].id,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });

//     res.redirect(303, session.url);
//   } catch (error) {
//     console.error("Error creating Checkout session:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.createPortalSession = async (req, res) => {
//   try {
//     const { session_id } = req.body;
//     const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
//     const returnUrl = YOUR_DOMAIN;

//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: checkoutSession.customer,
//       return_url: returnUrl,
//     });

//     res.redirect(303, portalSession.url);
//   } catch (error) {
//     console.error("Error creating portal session:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.handleWebhookEvent = (request, response) => {
//   let event = request.body;
//   const endpointSecret = "your_webhook_secret_here"; // Replace with your actual secret

//   if (endpointSecret) {
//     const signature = request.headers["stripe-signature"];
//     try {
//       event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
//     } catch (err) {
//       console.log("Webhook signature verification failed.", err.message);
//       return response.sendStatus(400);
//     }
//   }

//   switch (event.type) {
//     // Handle webhook events accordingly
//     // ...
//     default:
//       console.log(`Unhandled event type ${event.type}.`);
//   }

//   response.sendStatus(200);
// };
