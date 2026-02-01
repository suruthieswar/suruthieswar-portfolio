// src/components/Certificates.js
import React from 'react';
import CertificateSlider from './CertificateSlider';
import './Certificates.css';

const Certificates = () => {
  return (
    <section id="certificates" className="certificates-section">
      <div className="certificates-container">
        <div className="certificates-header">
          <h2 className="section-title">Certificates & Recognition</h2>
          <p className="section-subtitle">
            Official certifications and awards received throughout my academic and professional journey
          </p>
        </div>
        
        <CertificateSlider />
        
        <div className="certificates-info">
          <div className="info-card">
            <i className="fas fa-medal"></i>
            <h4>Verified Achievements</h4>
            <p>All certificates are officially verified and can be validated upon request</p>
          </div>
          <div className="info-card">
            <i className="fas fa-award"></i>
            <h4>Award-Winning Projects</h4>
            <p>Recognized for excellence in both academic and competitive environments</p>
          </div>
          <div className="info-card">
            <i className="fas fa-graduation-cap"></i>
            <h4>Continuous Learning</h4>
            <p>Committed to professional development through certifications and workshops</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;