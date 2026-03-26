
// test-email-actual.ts
import { sendReservationConfirmation, sendNewsletterWelcome, sendContactAcknowledgement } from './lib/email';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function runTests() {
  console.log('🚀 Starting actual email tests...');
  
  try {
    console.log('1. Testing Reservation Email...');
    const res1 = await sendReservationConfirmation({
      name: 'AIO Test User',
      email: 'aio.test@example.com',
      date: '2026-04-01',
      time: '19:00',
      guests: 4
    });
    console.log('✅ Reservation Email Result:', res1);

    console.log('\n2. Testing Newsletter Email...');
    const res2 = await sendNewsletterWelcome('aio.test@example.com');
    console.log('✅ Newsletter Email Result:', res2);

    console.log('\n3. Testing Contact Email...');
    const res3 = await sendContactAcknowledgement({
      name: 'Test Inquirer',
      email: 'aio.test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message to verify the email system.'
    });
    console.log('✅ Contact Email Result:', res3);

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    if (error.response) {
      console.error('Response details:', await error.response.json());
    }
  }
}

runTests();
