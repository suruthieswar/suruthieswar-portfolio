const http = require('http');
const mongoose = require('mongoose');

// Connect to DB to verify directly
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    token: { type: String }, // This is what we want to check
    submissionToken: { type: String }
});

const Contact = mongoose.model('Contact', contactSchema);

function makeRequest() {
    const data = JSON.stringify({
        name: 'Verification Bot',
        email: 'verify@bot.com',
        message: 'Checking if token is saved correctly',
        token: null // Explicitly sending null to force fallback
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/contact',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log('1. Sending request to API...');
    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', async () => {
            console.log('2. API Response:', body);

            // Wait a moment for DB save
            setTimeout(checkDB, 2000);
        });
    });

    req.on('error', (e) => {
        console.error('API Error:', e);
        process.exit(1);
    });

    req.write(data);
    req.end();
}

async function checkDB() {
    console.log('3. Checking Database...');
    try {
        const contact = await Contact.findOne({ email: 'verify@bot.com' }).sort({ _id: -1 });
        console.log('------------------------------------------------');
        console.log('LATEST RECORD FOUND:');
        console.log('Name:', contact.name);
        console.log('Message:', contact.message);
        console.log('Token Field:', contact.token);
        console.log('SubmissionToken Field:', contact.submissionToken);
        console.log('------------------------------------------------');

        if (contact.token && contact.token !== 'null') {
            console.log('✅ PASS: Token field is populated correctly!');
        } else {
            console.log('❌ FAIL: Token field is NULL or invalid.');
        }
        process.exit(0);
    } catch (err) {
        console.error('DB Error:', err);
        process.exit(1);
    }
}

// Start
console.log('Waiting for server to be ready...');
setTimeout(makeRequest, 3000);
