import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendContactAcknowledgement } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ 
        error: 'Missing required fields (name, email, subject, message)' 
      }, { status: 400 });
    }

    // Save inquiry to database
    const { data: inquiryData, error: dbError } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      
      // Handle specific error types
      if (dbError.code === '42501') {
        return NextResponse.json({ 
          error: 'Permissions error: Please check Supabase RLS policies' 
        }, { status: 403 });
      }
      
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    // Send confirmation and notification emails
    try {
      await sendContactAcknowledgement({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the inquiry if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon.',
      data: inquiryData
    });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
