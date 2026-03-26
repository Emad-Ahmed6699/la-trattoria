const http = require('http');

function testAPI(endpoint, data) {
  return new Promise((resolve) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 3003,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    };
    
    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        console.log(`[${endpoint}] Status: ${res.statusCode}`);
        console.log(`[${endpoint}] Response: ${responseBody}\n`);
        resolve();
      });
    });
    
    req.on('error', (e) => console.error('Error:', e.message));
    req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Email APIs...\n');
  
  await testAPI('/api/newsletter', { email: 'aio.test@example.com' });
  
  // Wait a bit for compilation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await testAPI('/api/contact', {
    name: 'Test User',
    email: 'aio.test@example.com',
    subject: 'Test Inquiry',
    message: 'This is a test message'
  });
}

runTests();
