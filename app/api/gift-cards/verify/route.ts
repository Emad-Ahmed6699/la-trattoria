import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Gift card code is required' }, { status: 400 });
    }

    // List active promotion codes that match the submitted code exactly.
    const promotionCodes = await stripe.promotionCodes.list({
      code: code,
      active: true,
      limit: 1,
    });

    if (promotionCodes.data.length === 0) {
      return NextResponse.json({ error: 'Invalid or inactive gift card code.' }, { status: 404 });
    }

    const promoCode = promotionCodes.data[0];
    
    // Cast coupon to access the ID properly
    const promoCodeData = promoCode as any;
    const couponId = promoCodeData.coupon;
    
    if (!couponId) {
      return NextResponse.json({ error: 'Gift card coupon not found.' }, { status: 400 });
    }
    
    const coupon = await stripe.coupons.retrieve(couponId);

    // Check if the underlying coupon is valid (e.g., amount_off exists)
    if (!coupon || !coupon.amount_off) {
       return NextResponse.json({ error: 'Invalid gift card configuration.' }, { status: 400 });
    }

    // Format the balance (Stripe stores amounts in cents)
    const formattedBalance = new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: coupon.currency || 'eur',
    }).format(coupon.amount_off / 100);

    return NextResponse.json({ 
      valid: true, 
      balance: formattedBalance,
      code: promoCode.code
    });

  } catch (error: any) {
    console.error('Error verifying gift card:', error);
    return NextResponse.json({ error: 'Failed to verify gift card.' }, { status: 500 });
  }
}
