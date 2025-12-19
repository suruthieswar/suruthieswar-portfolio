const http = require('http');

// Test data
const data = JSON.stringify({
    name: 'Test Verifier',
    email: 'verify@example.com',
    message: 'Testing token generation'
});

const options = {
    hostname: 'localhost',
    port: 5001, // Testing on 5001 to avoid conflict
    path: '/api/contact',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Testing POST /api/contact on port 5001...');

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Status Base:', res.statusCode);
        try {
            const json = JSON.parse(body);
            console.log('Response:', json);
            if (json.success && json.submissionToken && json.submissionToken.startsWith('REF-')) {
                console.log('✅ VERIFICATION SUCCESS: Token generated correctly:', json.submissionToken);
            } else {
                console.error('❌ VERIFICATION FAILED: Token missing or invalid format.');
                process.exit(1);
            }
        } catch (e) {
            console.error('❌ VERIFICATION FAILED: Invalid JSON', body);
            process.exit(1);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ CONNECTION ERROR:', error.message);
    process.exit(1);
});

req.write(data);
req.end();
