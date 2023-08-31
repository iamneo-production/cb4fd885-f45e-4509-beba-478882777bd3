require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JumLXBPQeAuTgL1QVsE0GVcb1QTHCvZvQyt8CHmamQksCsoQcm6DHiZLSJceUX4YQjwVvZznLfjzEprdr2lqWWw0059xAZwXu"
);

app.use(express.json());
app.use(cors());

app.post("/api/make-payment", async (req, res) => {
  const { product } = req.body;
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          // id: product.id,
          name: product.header,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/order-history",
    cancel_url: "http://localhost:3000/",
  });

  res.json({ id: session.id });
});

app.listen(7000, () => {
  console.log("server listening...");
});
