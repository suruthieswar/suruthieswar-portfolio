import React, { useEffect } from 'react';
import './Achievements.css';

const Achievements = () => {
  // Main achievements data - UPDATED ACHIEVEMENT 2
  const achievements = [
    {
      id: 1,
      title: "Best Team Collaboration",
      event: "BYTS INDIA HACKATHON 1.0",
      college: "Kongu Engineering College",
      achievement: "Winner",
      icon: "fas fa-trophy",
      color: "#FFD700",
      date: "April 2025",
      description: "Secured Team Collaboration award in 24-hour AI hackathon for exceptional teamwork and innovative AI solution development.",
      certificate: "bytes.jpeg"
    },
    {
      id: 2,
      title: "",
      event: "SYNERGIZE'25 - CSD",
      college: "Kongu Engineering College",
      achievement: "3rd Prize",
      icon: "fas fa-file-alt",
      color: "#6366f1",
      date: "March 2025",
      description: "",
      certificate: "third.jpeg"
    },
    {
      id: 3,
      title: "Project Expo Participation",
      event: "Ruby Year Celebrations",
      college: "Kongu Engineering College",
      achievement: "Participant",
      icon: "fas fa-project-diagram",
      color: "#8b5cf6",
      date: "January 2025",
      description: "Presented 'Care Connect System' project in Software/Hardware category exhibition.",
      certificate: "project.jpeg"
    },
    {
      id: 4,
      title: "Ideathon Participation",
      event: "IDEATHON'24",
      college: "Kongu Engineering College",
      achievement: "Participant",
      icon: "fas fa-lightbulb",
      color: "#3b82f6",
      date: "October 2024",
      description: "Participated in department-level ideathon competition for innovative AI ideas.",
      certificate: "ideathon.jpeg"
    },
    {
      id: 5,
      title: "CodeXetreme - Debugging",
      event: "Technical Symposium",
      college: "Kongu Engineering College",
      achievement: "3rd Prize",
      icon: "fas fa-bug",
      color: "#ef4444",
      date: "January 2026",
      description: "Secured 3rd prize in CodeXetreme, a competition focused on debugging complex errors in webpage code.",
      certificate: "codextreme_cert.jpg"
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Affective Computing",
      issuer: "NPTEL - IIT",
      year: "2024",
      credential: "NPTEL24123",
      icon: "fas fa-certificate",
      color: "#10b981",
      description: "Completed advanced course on emotional AI and human-computer interaction.",
      certificate: "nptel_certificate.jpeg"
    },
    {
      id: 2,
      title: "Responsible & Safe AI Systems",
      issuer: "NPTEL - IIIT Hyderabad",
      year: "2025",
      credential: "NPTEL25CS118S556001924",
      icon: "fas fa-certificate",
      color: "#10b981",
      description: "Successfully completed a 12-week course on Responsible and Safe AI Systems with an Elite certification (60% score).",
      certificate: "nptel_responsible_ai.png"
    }
  ];

  // Animate achievement cards on scroll
  useEffect(() => {
    const achievementCards = document.querySelectorAll('.achievement-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    achievementCards.forEach(card => observer.observe(card));

    // Animate on scroll elements
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

    return () => {
      observer.disconnect();
      scrollObserver.disconnect();
    };
  }, []);

  const openCertificate = (certificateFile) => {
    if (certificateFile) {
      window.open(`/${certificateFile}`, '_blank');
    }
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="achievements-bg-pattern"></div>

      <h2 className="section-title">Achievements & Certifications</h2>

      <div className="achievements-container">
        {/* Achievements Grid */}
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="achievement-card"
              style={{ '--animation-order': index }}
            >
              <div className="achievement-icon" style={{ backgroundColor: `${achievement.color}20` }}>
                <i
                  className={achievement.icon}
                  style={{ color: achievement.color }}
                ></i>
              </div>

              <div className="achievement-badge" style={{ backgroundColor: achievement.color }}>
                {achievement.achievement}
              </div>

              <div className="achievement-content">
                <div className="achievement-header">
                  {achievement.title && <h4>{achievement.title}</h4>}
                  <span className="achievement-date">{achievement.date}</span>
                </div>

                <div className="achievement-event">
                  <i className="fas fa-calendar-alt"></i>
                  {achievement.event}
                </div>

                <div className="achievement-college">
                  <i className="fas fa-university"></i>
                  {achievement.college}
                </div>

                {achievement.description && <p className="achievement-description">{achievement.description}</p>}

                <div className="achievement-tags">
                  <span className="tag">AI/ML</span>
                  <span className="tag">Innovation</span>
                  <span className="tag">Excellence</span>
                </div>

                {achievement.certificate && (
                  <button
                    className="view-btn"
                    onClick={() => openCertificate(achievement.certificate)}
                    style={{ marginTop: '0.8rem' }}
                  >
                    <i className="fas fa-eye"></i>
                    View Certificate
                  </button>
                )}
              </div>

              <div className="achievement-sparkle">
                <div className="sparkle-dot"></div>
                <div className="sparkle-dot"></div>
                <div className="sparkle-dot"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Certifications Section */}
        <div className="certifications-section card animate-on-scroll">
          <h3>Professional Certifications</h3>
          <div className="certifications-list">
            {certifications.map(cert => (
              <div key={cert.id} className="certification-card">
                <div className="certification-icon" style={{ backgroundColor: `${cert.color}20` }}>
                  <i
                    className={cert.icon}
                    style={{ color: cert.color }}
                  ></i>
                </div>
                <div className="certification-content">
                  <div className="certification-header">
                    <h4>{cert.title}</h4>
                    <span className="certification-year">{cert.year}</span>
                  </div>

                  <div className="certification-details">
                    <div className="detail">
                      <i className="fas fa-building"></i>
                      {cert.issuer}
                    </div>
                    <div className="detail">
                      <i className="fas fa-id-card"></i>
                      ID: {cert.credential}
                    </div>
                  </div>

                  <p className="certification-description">{cert.description}</p>

                  {cert.certificate && (
                    <button
                      className="view-btn"
                      onClick={() => openCertificate(cert.certificate)}
                    >
                      <i className="fas fa-external-link-alt"></i>
                      View Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Timeline */}
        <div className="timeline-section card animate-on-scroll">
          <h3>Achievement Timeline</h3>
          <div className="timeline">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="timeline-item">
                <div className="timeline-marker" style={{ backgroundColor: achievement.color }}>
                  <i className={achievement.icon}></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{achievement.date}</div>
                  {achievement.title && <h4>{achievement.title}</h4>}
                  <p>{achievement.event}</p>
                  <div className="timeline-badge" style={{ backgroundColor: achievement.color }}>
                    {achievement.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
