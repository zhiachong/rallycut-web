import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Get or create customer
    let customer;
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('email', email)
      .single();

    if (existingUser?.stripe_customer_id) {
      customer = { id: existingUser.stripe_customer_id };
    } else {
      // Create Stripe customer
      customer = await stripe.customers.create({
        email,
      });

      // Create or update user in Supabase
      await supabaseAdmin.from('users').upsert({
        email,
        stripe_customer_id: customer.id,
        trial_status: 'pending',
        video_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      subscription_data: {
        trial_period_days: 7,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
