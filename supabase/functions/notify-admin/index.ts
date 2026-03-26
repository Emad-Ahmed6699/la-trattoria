import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record, table, type } = await req.json()

    let subject = ""
    let html = ""

    if (table === 'reservations' && type === 'INSERT') {
      subject = "New Reservation - La Trattoria"
      html = `
        <h1>New Reservation Received</h1>
        <p><strong>Customer:</strong> ${record.customer_name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Date:</strong> ${record.reservation_date}</p>
        <p><strong>Time:</strong> ${record.reservation_time}</p>
        <p><strong>Guests:</strong> ${record.guests}</p>
        <hr />
        <p><a href="https://latrattoria.com/admin">View in Dashboard</a></p>
      `
    } else if (table === 'contact_inquiries' && type === 'INSERT') {
      subject = "New Contact Inquiry - La Trattoria"
      html = `
        <h1>New Message from Website</h1>
        <p><strong>From:</strong> ${record.name} (${record.email})</p>
        <p><strong>Subject:</strong> ${record.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${record.message}</p>
        <hr />
        <p><a href="https://latrattoria.com/admin/inquiries">View in Dashboard</a></p>
      `
    }

    if (subject && html) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'La Trattoria <notifications@latrattoria.com>',
          to: ['admin@latrattoria.com'], // Replace with actual admin email
          subject: subject,
          html: html,
        }),
      })

      const responseData = await res.json()
      return new Response(JSON.stringify(responseData), { status: 200 })
    }

    return new Response(JSON.stringify({ message: "No action taken" }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
