import Stripe from 'stripe';

// Use a dummy placeholder at build time, real key from env at runtime
// This allows Next.js build to proceed even without STRIPE_SECRET_KEY
const apiKey = process.env.STRIPE_SECRET_KEY || 'dummy_placeholder_key';

export const stripe = new Stripe(apiKey, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});
