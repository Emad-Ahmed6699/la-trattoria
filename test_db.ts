import { supabase } from './lib/supabase';

async function testTables() {
  console.log('Testing contact_inquiries...');
  const { data: contact, error: contactError } = await supabase.from('contact_inquiries').select('*').limit(1);
  if (contactError) console.error('contact_inquiries error:', contactError);
  else console.log('contact_inquiries count:', contact?.length);

  console.log('Testing event_inquiries...');
  const { data: event, error: eventError } = await supabase.from('event_inquiries').select('*').limit(1);
  if (eventError) console.error('event_inquiries error:', eventError);
  else console.log('event_inquiries count:', event?.length);

  console.log('Testing reservations...');
  const { data: res, error: resError } = await supabase.from('reservations').select('*').limit(1);
  if (resError) console.error('reservations error:', resError);
  else console.log('reservations count:', res?.length);
}

testTables();
