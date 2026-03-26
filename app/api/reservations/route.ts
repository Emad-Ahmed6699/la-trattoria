import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendReservationConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Server-side validation
    if (!data.name || !data.email || !data.date || !data.time || !data.guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Supabase
    const { data: reservationData, error: dbError } = await supabase
      .from('reservations')
      .insert([
        {
          customer_name: data.name,
          email: data.email,
          phone: data.phone,
          reservation_date: data.date,
          reservation_time: data.time,
          guests: Number.parseInt(data.guests, 10),
          special_requests: data.requests || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
    }

    // Send confirmation emails
    try {
      await sendReservationConfirmation({
        name: data.name,
        email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the reservation if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Reservation confirmed. Check your email for details.',
      data: reservationData
    });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'Failed to process reservation' }, { status: 500 });
  }
}
