import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ isAuthenticated, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      const response = await axios.get(`${API_BASE_URL}/api/contacts`, {
        withCredentials: true
      });

      if (response.data.success) {
        setMessages(response.data.contacts);
      }
    } catch (error) {
      setError('Failed to fetch messages');
      console.error('Fetch messages error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/contacts/${id}/read`, {}, {
        withCredentials: true
      });

      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
          withCredentials: true
        });

        setMessages(messages.filter(msg => msg._id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-panel">
        <div className="admin-login-required">
          <i className="fas fa-lock"></i>
          <h3>Admin Access Required</h3>
          <p>Please login to view messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>📨 Messages Dashboard</h2>
        <div className="admin-actions">
          <button onClick={fetchMessages} className="btn btn-refresh">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <button onClick={onLogout} className="btn btn-logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{messages.length}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{messages.filter(m => !m.read).length}</div>
          <div className="stat-label">Unread</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{messages.filter(m => m.read).length}</div>
          <div className="stat-label">Read</div>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i> Loading messages...
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : messages.length === 0 ? (
        <div className="no-messages">
          <i className="fas fa-inbox"></i>
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message._id} className={`message-card ${message.read ? 'read' : 'unread'}`}>
              <div className="message-header">
                <div className="message-sender">
                  <div className="sender-avatar">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="sender-info">
                    <h4>{message.name}</h4>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </div>
                </div>
                <div className="message-meta">
                  <div className="message-date">
                    {new Date(message.date).toLocaleDateString()} at{' '}
                    {new Date(message.date).toLocaleTimeString()}
                  </div>
                  <div className="message-actions">
                    {!message.read && (
                      <button
                        onClick={() => markAsRead(message._id)}
                        className="action-btn mark-read"
                      >
                        <i className="fas fa-check"></i> Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="action-btn delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="message-subject">
                <strong>Subject:</strong> {message.subject || 'No Subject'}
              </div>

              <div className="message-content">
                {message.message}
              </div>

              <div className="message-footer">
                <span className="message-id">Ref ID: {message.submissionToken || 'N/A'}</span>
                <span className="message-id">ID: {message._id}</span>
                <span className={`read-status ${message.read ? 'read' : 'unread'}`}>
                  {message.read ? '✓ Read' : '● Unread'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;