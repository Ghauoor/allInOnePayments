require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('Hello Bhaii Log');
});

const stripe = require('stripe')(process.env.S_KEY);

app.post('/payment-sheet', async (req, res) => {
  const {amount, currency} = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-04-10'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.SP_KEY,
  });
});

const PORT = 4002;

app.listen(PORT, () => {
  console.log(`Running on the http://localhost:${PORT}`);
});
