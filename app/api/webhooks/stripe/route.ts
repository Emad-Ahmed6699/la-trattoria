import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Since we are using Next.js App Router, body must be text for raw processing
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed.`, error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Check if it's our gift card product (based on metadata or line items)
    const { cardType, recipientEmail, message } = session.metadata || {};
    
    console.log(`Payment successful for Session ID: ${session.id}`);
    console.log(`Card Type: ${cardType}, Recipient: ${recipientEmail}, Message: ${message}`);

    // 1. Generate a random promo code.
    // 2. Call stripe.promotionCodes.create to create it with the amount from the session.
    
    try {
      if (session.amount_total) {
        // Create a once-off coupon for the exact amount paid
        const coupon = await stripe.coupons.create({
          amount_off: session.amount_total,
          currency: session.currency || 'eur',
          duration: 'once',
          name: `Gift Card - ${session.id}`,
        });
        
        // Create the actual string code that the user can use
        const codeString = 'GIFT-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        
        await stripe.promotionCodes.create({ 
          coupon: coupon.id as any, 
          code: codeString,
          metadata: {
             checkout_session: session.id,
             card_type: cardType,
             recipient: recipientEmail
          }
        } as any);
        
        console.log(`Generated Gift Card Code: ${codeString} for Session: ${session.id}`);
        // In a production app, you would send an email to recipientEmail here.
      }
    } catch (promoError: any) {
      console.error(`Failed to generate promo code for session ${session.id}:`, promoError.message);
    }
  }

  return new NextResponse('Webhook received successfully', { status: 200 });
}
