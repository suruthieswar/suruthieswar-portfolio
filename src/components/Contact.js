import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // Backend URL - CHANGE THIS IF NEEDED
  const API_BASE_URL = 'http://localhost:5000';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission - FIXED VERSION
  const handleSubmit = async (e) => {
    e.preventDefault(); // CRITICAL: Prevents page reload

    console.log('🔄 FORM SUBMISSION STARTED');

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('❌ Please fill in all required fields (Name, Email, Message)');
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending your message...');

    try {
      // Get JWT token from localStorage (if user logged in)
      const token = localStorage.getItem('jwtToken');

      // Prepare data to send
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'No Subject',
        message: formData.message.trim(),
        token: token || null // Include token if exists
      };

      console.log('📤 SENDING DATA TO:', `${API_BASE_URL}/api/contact`);
      console.log('📦 DATA BEING SENT:', {
        ...dataToSend,
        hasToken: !!token,
        tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
      });

      // Send request to backend - USING DIRECT URL
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      console.log('📥 RESPONSE STATUS:', response.status, response.statusText);

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ SERVER RESPONSE:', result);

      if (result.success) {
        setStatus(`✅ Thank you! Message sent successfully.`);

        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Log success details
        if (token) {
          console.log('🎯 Message saved WITH JWT token in database');
        } else {
          console.log('ℹ️ Message saved WITHOUT token (user not logged in)');
        }
      } else {
        setStatus(`❌ Server error: ${result.message || 'Unknown error'}`);
      }

    } catch (error) {
      console.error('❌ FORM SUBMISSION FAILED:', error);

      // Detailed error messages
      if (error.message.includes('Failed to fetch')) {
        setStatus('❌ Cannot connect to server. Make sure the backend is running on port 5000.');
      } else if (error.message.includes('NetworkError')) {
        setStatus('❌ Network error. Check your internet connection and CORS settings.');
      } else {
        setStatus(`❌ Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-wrapper">
          {/* Left Column: Contact Info */}
          <div className="contact-info">
            {/* ADDED HEADING AND NAME HERE */}
            <div className="contact-header">
              <h2 className="contact-heading">Get in Touch</h2>
              <h3 className="contact-name">SURUTHI E</h3>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Erode, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="info-details">
                <h3>Phone</h3>
                <p>+91 93612 48399</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-details">
                <h3>Email</h3>
                <p>
                  <a href="mailto:suruthieswaramoorthi@gmail.com" className="email-link">
                    suruthieswaramoorthi@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Me</h3>
              <div className="social-icons">
                <a href="https://github.com/suruthieswar" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/suruthi-eswaramoorthi-9426b631b" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://leetcode.com/u/suruthieswar/" target="_blank" rel="noopener noreferrer" className="social-link" title="LeetCode">
                  <i className="fas fa-code"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                    style={{ borderColor: formData.name ? '#6c63ff' : '#ddd' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    style={{ borderColor: formData.email ? '#6c63ff' : '#ddd' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject (Optional)</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="6"
                  required
                  disabled={isSubmitting}
                  style={{ borderColor: formData.message ? '#6c63ff' : '#ddd' }}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                style={{
                  opacity: (!formData.name || !formData.email || !formData.message) ? 0.6 : 1
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status message */}
              {status && (
                <div className="status-message" style={{
                  backgroundColor: status.includes('✅') ? '#d4edda' :
                    status.includes('❌') ? '#f8d7da' : '#fff3cd',
                  color: status.includes('✅') ? '#155724' :
                    status.includes('❌') ? '#721c24' : '#856404',
                  border: status.includes('✅') ? '1px solid #c3e6cb' :
                    status.includes('❌') ? '1px solid #f5c6cb' : '1px solid #ffeaa7',
                  marginTop: '20px',
                  padding: '15px',
                  borderRadius: '5px',
                  textAlign: 'center'
                }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{status}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;