import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendNewsletterWelcome } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Save subscription to database
    const { error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: data.email }]);

    if (dbError) {
      if (dbError.code === '23505') {
        // Email already subscribed
        return NextResponse.json({ 
          success: true, 
          message: 'You are already subscribed to our newsletter!' 
        });
      }
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // Send welcome email
    try {
      console.log('Sending newsletter welcome to:', data.email);
      await sendNewsletterWelcome(data.email);
    } catch (emailError: any) {
      console.error('Email sending error (Newsletter):', emailError.message || emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for subscribing! Check your email for welcome details.' 
    });
  } catch (error: any) {
    console.error('Newsletter unexpected error:', error.message || error);
    return NextResponse.json({ error: 'Failed to subscribe: ' + (error.message || 'Unknown error') }, { status: 500 });
  }
}
