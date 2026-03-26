import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PRODUCT_IDS = {
  physical: 'prod_UAPF6g8h0Yuc8a',
  egift: 'prod_UAPFZ6wO5ECm3T',
};

export async function POST(req: Request) {
  try {
    const { amount, cardType, recipientEmail, message } = await req.json();

    if (!amount || !cardType) {
      return NextResponse.json(
        { error: 'Amount and card Type are required' },
        { status: 400 }
      );
    }

    const productId = cardType === 'physical' ? PRODUCT_IDS.physical : PRODUCT_IDS.egift;
    // Map € symbol strings (e.g. '€50') to cents
    let amountInCents = 0;
    if (typeof amount === 'string') {
        const numericAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10);
        amountInCents = numericAmount * 100;
    } else {
        amountInCents = amount * 100;
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product: productId,
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/gift-cards/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/gift-cards/cancel`,
      metadata: {
        cardType,
        recipientEmail: recipientEmail || '',
        message: message || '',
      },
      // Ask for shipping address if it's a physical card
      ...(cardType === 'physical' && {
        shipping_address_collection: {
          allowed_countries: ['IT', 'US', 'GB', 'FR', 'DE', 'ES'],
        },
      }),
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: err.statusCode || 500 }
    );
  }
}
