const mongoose = require('mongoose');

// Database connection logic - Simplified for serverless
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    // Fallback to local if URI not provided (local dev)
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Timeout faster for serverless
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // We don't throw here to allow the function to return a "DB Unavailable" message
    }
};

// Define Schema (Simplified)
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: 'No Subject' },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    token: { type: String }
});

// Avoid "OverwriteModelError" in serverless environments
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { name, email, subject, message, token } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Required fields missing' });
        }

        await connectDB();

        if (mongoose.connection.readyState === 1) {
            const newContact = new Contact({ name, email, subject, message, token });
            await newContact.save();
            return res.status(200).json({
                success: true,
                message: 'Message sent and saved to database successfully!'
            });
        } else {
            // If DB is offline (like on Vercel without a Cloud DB), still return success to frontend
            // but log that storage failed.
            console.log('DB Offline - Message received but NOT saved:', { name, email });
            return res.status(200).json({
                success: true,
                message: 'Message received! (Database currently unavailable in production, but your message reached the server).'
            });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
