const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
  .then(() => console.log('MongoDB connected to portfolio'))
  .catch(err => console.log('MongoDB error:', err.message));

// Simple contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  token: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, token } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message required' 
      });
    }
    
    const contact = new Contact({ name, email, message, token });
    await contact.save();
    
    res.json({ 
      successac: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ========================================
  PORTFOLIO BACKEND
  ========================================
  Port: ${PORT}
  Database: portfolio
  URL: http://localhost:${PORT}
  ========================================
  `);
});