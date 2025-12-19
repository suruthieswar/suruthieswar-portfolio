import React, { useEffect, useRef } from 'react';
import './Achievements.css';

const Achievements = () => {
  const achievementsRef = useRef(null);

  const achievements = [
    {
      id: 1,
      title: "Paper Presentation",
      event: "SYNERGIZE'25 - CSD",
      college: "Kongu Engineering College",
      achievement: "3rd Prize",
      icon: "fas fa-file-alt",
      color: "#6366f1",
      date: "2024",
      description: "Presented innovative research on AI applications in education."
    },
    {
      id: 2,
      title: "Hackathon Excellence",
      event: "BYTS INDIA HACKATHON 1.0",
      college: "Kongu Engineering College",
      achievement: "Best Presentation & Team Collaboration",
      icon: "fas fa-trophy",
      color: "#8b5cf6",
      date: "2024",
      description: "Developed an AI solution with exceptional teamwork and presentation skills."
    },
    {
      id: 3,
      title: "AI Chatbot Innovation",
      event: "Internal Club Competition",
      college: "Kongu Engineering College",
      achievement: "1st Prize",
      icon: "fas fa-robot",
      color: "#3b82f6",
      date: "2024",
      description: "Created an interactive Tamil language chatbot with voice features."
    },
    {
      id: 4,
      title: "NPTEL Certification",
      event: "Affective Computing",
      college: "NPTEL - IIT",
      achievement: "Certified",
      icon: "fas fa-certificate",
      color: "#10b981",
      date: "2024",
      description: "Completed advanced course on emotional AI and human-computer interaction."
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Affective Computing",
      issuer: "NPTEL - IIT",
      year: "2024",
      credential: "NPTEL24123"
    }
  ];

  useEffect(() => {
    // Animate achievement cards on scroll
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

    // Particle effect for achievements
    const container = achievementsRef.current;
    if (container) {
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'achievement-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.background = `radial-gradient(circle, 
          rgba(${Math.floor(Math.random() * 100 + 155)}, 
          ${Math.floor(Math.random() * 100 + 100)}, 
          241, 0.8), transparent)`;

        container.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 15000);
      };

      // Create initial particles
      for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 300);
      }

      // Continue creating particles
      const interval = setInterval(createParticle, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section id="achievements" className="achievements-section" ref={achievementsRef}>
      <div className="achievements-bg-pattern"></div>

      <h2 className="section-title">Achievements & Certifications</h2>

      <div className="achievements-container">
        <div className="achievements-header card animate-on-scroll">
          <h3>Recognitions & Awards</h3>
          <p className="header-description">
            A showcase of academic excellence, innovation, and technical prowess
            recognized by esteemed institutions and competitions.
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-number">{achievements.length}</div>
              <div className="stat-label">Awards</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{certifications.length}</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="achievement-card card"
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
                  <h4>{achievement.title}</h4>
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

                <p className="achievement-description">{achievement.description}</p>

                <div className="achievement-tags">
                  <span className="tag">AI/ML</span>
                  <span className="tag">Innovation</span>
                  <span className="tag">Excellence</span>
                </div>
              </div>

              <div className="achievement-sparkle">
                <div className="sparkle-dot"></div>
                <div className="sparkle-dot"></div>
                <div className="sparkle-dot"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications-section card animate-on-scroll">
          <h3>Professional Certifications</h3>
          <div className="certifications-list">
            {certifications.map(cert => (
              <div key={cert.id} className="certification-card">
                <div className="certification-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="certification-content">
                  <h4>{cert.title}</h4>
                  <div className="certification-details">
                    <div className="detail">
                      <i className="fas fa-building"></i>
                      {cert.issuer}
                    </div>
                    <div className="detail">
                      <i className="fas fa-calendar"></i>
                      {cert.year}
                    </div>
                    <div className="detail">
                      <i className="fas fa-id-card"></i>
                      ID: {cert.credential}
                    </div>
                  </div>
                  <button className="view-certificate-btn">
                    View Certificate
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="certification-note">
            <i className="fas fa-lightbulb"></i>
            <p>
              Continuously updating skills through certified courses and professional
              development programs to stay at the forefront of technology.
            </p>
          </div>
        </div>

        <div className="timeline-section card animate-on-scroll">
          <h3>Achievement Timeline</h3>
          <div className="timeline">
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className="timeline-item">
                <div className="timeline-marker" style={{ backgroundColor: achievement.color }}>
                  <i className={achievement.icon}></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{achievement.date}</div>
                  <h4>{achievement.title}</h4>
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