import express, { Request, Response } from 'express';

const router = express.Router();

const stripe = require('stripe')(
  'sk_test_51L0Q21GEbXkm4zaAiivqDQ9mNEAS6rp3CmsDdLnYclX8GXXO2wKCjMaX3ycwtN1OQ8RsaGgP4mb7rZpvr0vzNgpz00IQegZzQv'
);

router.post('/api/payment/createIntent', async (req: Request, res: Response) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4500,
    currency: 'eur',
    payment_method_types: ['card'],
    receipt_email: 'stks.isen@gmail.com',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export { router as createIntent };