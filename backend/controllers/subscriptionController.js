const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.subscribe = async (req, res) => {
  try {
    res.render("buy", {
      key: STRIPE_PUBLIC_KEY,
      amount: 25,
    });
  } catch (e) {
    console.log(e.message);
  }
};

exports.pay = async (req, res) => {
  try {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Sandeep Sharma",
        adress: {
          line1: "115, Vikas Nagar",
          postal_code: "281001",
          city: "Mathura",
          state: "Uttar Pradesh",
          country: "India",
        },
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: req.body.amount, // amount will be amount*100
          description: req.body.productName,
          currency: "INR",
          customer: customer.id,
        });
      })
      .then((charge) => {
        res.redirect("/success");
      })
      .catch((err) => {
        res.redirect("/failure");
      });
  } catch (e) {
    console.log(e.message);
  }
};

exports.success = async (req, res) => {
  try {
    res.render("success");
  } catch (error) {
    console.log(error.message);
  }
};

exports.failure = async (req, res) => {
  try {
    res.render("failure");
  } catch (error) {
    console.log(error.message);
  }
};
