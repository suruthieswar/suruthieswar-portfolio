const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// MongoDB Connection - Connect to CALC database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

console.log('ðŸ”— Connecting to MongoDB at:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('âœ… MongoDB connected to portfolio database');

    // List all Collections in portfolio database
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
        return;
      }
      console.log('ðŸ“ Collections in portfolio:', collections.map(c => c.name));
    });
  })
  .catch(err => {
    console.error('âŒ MongoDB connection error:', err.message);
    console.log('\nðŸ”§ Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check if "calc" database exists');
    console.log('3. Or try: mongodb://127.0.0.1:27017/portfolio');
  });

// ==================== SCHEMAS ====================

// Contact Schema - INCLUDES JWT TOKEN FIELD
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, default: 'No Subject', trim: true },
  message: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  submissionToken: { type: String, unique: true }, // Unique ID for the user
  token: { type: String }, // JWT token stored HERE with each message
  tokenExpiry: { type: Date } // Optional: when token expires
});

// Admin Schema (for login only)
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
const Admin = mongoose.model('Admin', adminSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ==================== AUTH MIDDLEWARE ====================

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// ==================== AUTH ROUTES ====================

// Create default admin
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new Admin({
        username: 'admin',
        password: hashedPassword
      });
      await admin.save();
      console.log('ðŸ‘‘ Default admin created (username: admin, password: admin123)');
    } else {
      console.log('ðŸ‘‘ Admin already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

// Login - Get JWT Token
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token (valid for 7 days)
    const token = jwt.sign(
      {
        userId: admin._id,
        username: admin.username,
        loginTime: Date.now()
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Calculate expiry date
    const tokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    res.json({
      success: true,
      message: 'Login successful',
      token, // Send this to frontend
      tokenExpiry: tokenExpiry.toISOString(),
      user: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// ==================== CONTACT ROUTES ====================

// Send message - Store WITH token in contact document
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, token } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Generate unique submission token
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const submissionToken = `REF-${timestamp}-${random}`;

    // Explicitly determine token value to ensure it is NEVER null
    const finalToken = (token && token !== 'null') ? token : submissionToken;

    console.log('DEBUG: Input token:', token);
    console.log('DEBUG: Generated REF:', submissionToken);
    console.log('DEBUG: Final Saved Token:', finalToken);

    // Create contact - token is OPTIONAL
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'No Subject',
      message: message.trim(),
      submissionToken: submissionToken,
      token: finalToken, // Store generated ID if no JWT provided
      tokenExpiry: token ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null
    });

    await newContact.save();

    console.log(`ðŸ“¨ New contact saved with REF: ${submissionToken}`);
    console.log(`   Database: portfolio, Collection: contacts`);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      submissionToken: submissionToken,
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        hasToken: !!token,
        token: token ? token.substring(0, 20) + '...' : 'No token provided'
      }
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message
    });
  }
});

// Get all messages (PROTECTED - requires valid JWT)
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });

    res.json({
      success: true,
      authenticatedWith: req.user.username,
      tokenUsed: req.token.substring(0, 20) + '...', // First 20 chars
      count: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// Get contacts by specific token
app.get('/api/contacts/token/:token', async (req, res) => {
  try {
    const contacts = await Contact.find({ token: req.params.token }).sort({ date: -1 });

    res.json({
      success: true,
      token: req.params.token.substring(0, 20) + '...',
      count: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// Mark message as read
app.put('/api/contacts/:id/read', authenticateToken, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true, message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact' });
  }
});

// Delete message
app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting contact' });
  }
});

// ==================== OTHER ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    success: true,
    status: 'Server is running',
    database: statusMap[dbStatus] || 'unknown',
    databaseName: 'portfolio',
    timestamp: new Date().toISOString(),
    port: PORT,
    hasJWT: !!JWT_SECRET
  });
});

// Validate token
app.get('/api/auth/validate', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user,
    token: req.token.substring(0, 20) + '...'
  });
});

// Get stats
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const contactsWithToken = await Contact.countDocuments({ token: { $ne: null } });
    const contactsWithoutToken = await Contact.countDocuments({ token: null });

    res.json({
      success: true,
      stats: {
        totalContacts,
        contactsWithToken,
        contactsWithoutToken,
        database: 'portfolio'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
});

// Root
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Portfolio Backend</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #6c63ff; }
        .endpoint { padding: 5px; margin: 5px 0; background: #f8f9fa; }
      </style>
    </head>
    <body>
      <h1>ðŸš€ Portfolio Backend (calc database)</h1>
      <p>Server is running on port ${PORT}</p>
      <p><strong>Database:</strong> calc</p>
      
      <h3>ðŸ”‘ Auth Endpoints:</h3>
      <div class="endpoint"><strong>POST</strong> /api/auth/login - Login (get JWT token)</div>
      <div class="endpoint"><strong>GET</strong> /api/auth/validate - Validate token</div>
      
      <h3>ðŸ“¨ Public Endpoints:</h3>
      <div class="endpoint"><strong>POST</strong> /api/contact - Submit contact form (with optional token)</div>
      <div class="endpoint"><strong>GET</strong> <a href="/api/health">/api/health</a> - Health check</div>
      
      <h3>ðŸ”’ Protected Endpoints (need Authorization header):</h3>
      <div class="endpoint"><strong>GET</strong> /api/contacts - Get all messages</div>
      <div class="endpoint"><strong>GET</strong> /api/stats - Get statistics</div>
      <div class="endpoint"><strong>GET</strong> /api/contacts/token/:token - Get messages by token</div>
      
      <p><strong>Default Admin:</strong> admin / admin123</p>
      <p><strong>JWT Tokens:</strong> Stored in contacts collection</p>
    </body>
    </html>
  `);
});

// ==================== SERVER START ====================

app.listen(5000, '0.0.0.0', async () => {
  console.log(`
  ========================================
  ðŸš€ PORTFOLIO BACKEND
  ========================================
  ðŸ“ Port: ${PORT}
  ðŸ”— Database: calc
  ðŸ“ Collections: contacts, admins
  ðŸ” JWT: Tokens stored IN contacts
  ðŸ‘¤ Admin: admin / admin123
  ðŸŒ Local: http://localhost:${PORT}
  ========================================
  
  ðŸ”‘ Login: POST /api/auth/login
  ðŸ“¨ Send: POST /api/contact (include token in body)
  ðŸ”’ View: GET /api/contacts (Authorization header)
  ðŸ“Š Stats: GET /api/stats
  ========================================
  `);

  await createDefaultAdmin();
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});
