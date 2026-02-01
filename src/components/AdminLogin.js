import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials, {
        withCredentials: true
      });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        onLoginSuccess(response.data.admin);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <i className="fas fa-lock"></i>
            <h2>Admin Login</h2>
            <p>Access your messages dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="login-error">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="login-info">
              <p><strong>Default credentials:</strong></p>
              <p>Username: <code>admin</code></p>
              <p>Password: <code>admin123</code></p>
              <p className="warning">⚠️ Change these in production!</p>
            </div>
          </form>
        </div>

        <div className="login-sidebar">
          <h3>Messages Dashboard Features</h3>
          <ul className="features-list">
            <li><i className="fas fa-envelope"></i> View all contact messages</li>
            <li><i className="fas fa-check"></i> Mark messages as read</li>
            <li><i className="fas fa-trash"></i> Delete messages</li>
            <li><i className="fas fa-chart-bar"></i> View statistics</li>
            <li><i className="fas fa-shield-alt"></i> Secure token-based authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;